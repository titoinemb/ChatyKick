import { useState, createElement, useEffect, useRef, useCallback } from "react";
import { createRoot } from 'react-dom/client';
import { getChannelinformations, chatHistory, sendMessage, getEmotes, rules } from "@services";
import { ChatSettings, ChatState, Message } from "@types";
import { showNotif } from "@utils";
import { AddChat } from "@components";

export const useChat = () => {
  let initChatList = JSON.parse((localStorage.getItem("chatList") as string)) || [];
  let currentPopupRoot: any = null;
  let socketRef = useRef<WebSocket | null>(null);
  let connectingRef = useRef<boolean>(false);
  let pingIntervalRef = useRef<number | null>(null);

  const [state, setState] = useState<ChatState>({
    chatList: initChatList, // list of chat
    channelSelected: null, // channel id selected
    channelChatroomSelected: null, // chatroom id selected
    channelMessages: [], // list of message in chat
    channelMaxMessage: (Number(localStorage.getItem("channelMaxMessage"))),
    isAtBottom: true,
    emotesList: null,
    message: "", // message for send
    channelName: null, // the channel name selected
    emotesListBox: false,
    settingsBox: false,
    lastMessageSent: 0, // Variable to store the last message sent timestamp
    rulesInfos: "",
  });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  /**
   * function for add a new channel in channel list
   * @param channel channel id
   * @returns reload page
   */
  const addChat = async (channel: string) => {
    let name = channel.replace("_", "-");
    // check if this channel is not in the channelList
    let verifIfNameExiste = state.chatList.some(chat => chat.name === name);
    if (verifIfNameExiste) return showNotif("this channel is deja added");
    // check if this channel exist
    let channelInfos = await getChannelinformations(name);
    if (!channelInfos) return showNotif("error: channel dont existe");

    let newChat: ChatSettings = {
      name: channel,
      channelId: channelInfos.id,
      chatroomId: channelInfos.chatroom.id,
    };
    // add newchat informations in the list on localstorage and the useState
    setState(prevState => {
      let updatedState = {
        ...prevState,
        chatList: [...prevState.chatList, newChat],
      };

      localStorage.setItem("chatList", JSON.stringify(updatedState.chatList));

      return updatedState;
    });

    return window.location.reload();
  };
  /**
   * function for show popup for add new channel in channel list
   * @returns open or close popup ui
   */
  const popup = (): void => {
    let chatContainer = document.querySelector('#root') as HTMLElement;

    if (!currentPopupRoot) {
      // Create a new div for the popup
      let div = document.createElement('div');
      div.id = "popupBox"; // Set the ID for the popup
      div.onclick = (e: MouseEvent) => {
        let clickedEl = e.target as HTMLElement;
        let handlerDiv = e.currentTarget as HTMLElement;

        if (clickedEl === handlerDiv) popup();
      };

      // Prepend the new div to the #root container
      chatContainer.prepend(div); // Prepend to ensure it is the first child

      // Create and render the popup with the component
      currentPopupRoot = createRoot(div);
      currentPopupRoot.render(createElement(AddChat));
    } else {
      // If the popup is already displayed, unmount and remove it
      let popupDiv = document.getElementById("popupBox") as HTMLDivElement;
      currentPopupRoot.unmount(); // Unmount the component rendered in the popup
      chatContainer.removeChild(popupDiv); // Remove the popup div from the DOM
      currentPopupRoot = null; // Reset the reference
    };
  };
  /**
   * function for setup the websocket for chat
   * @param channelId 
   * @param chatroomId
   * @param channelName
   * @returns connection to websocket
   */
  const setChat = useCallback(async ( channelId: number | null, chatroomId: number | null, channelName: string | null ): Promise<void> => {
    if (!channelId || !chatroomId || !channelName) return;
    if (connectingRef.current) return;

    connectingRef.current = true;

    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
      setState({ ...state, rulesInfos: "" });
    };

    if (pingIntervalRef.current) {
      clearInterval(pingIntervalRef.current);
      pingIntervalRef.current = null;
      setState({ ...state, rulesInfos: "" });
    };

    let messagesHistory = await chatHistory(channelId);
    let emotes = await getEmotes(channelName, localStorage.getItem("BearerToken")!);

    setState(s => ({
      ...s,
      channelSelected: channelId.toString(),
      channelMessages: messagesHistory,
      channelChatroomSelected: chatroomId.toString(),
      channelName,
      emotesList: emotes as any[],
    }));

    showRules(channelName);

    let socket = new WebSocket(`wss://ws-us2.pusher.com/app/32cbd69e4b950bf97679?protocol=7&client=js&version=8.4.0&flash=false`);
    socketRef.current = socket;

    socket.addEventListener("open", () => {
      let subscribe = (channel: string) => {
        socket.send(JSON.stringify({
          event: "pusher:subscribe",
          data: { auth: "", channel },
        }));
      };

      subscribe(`chatroom_${chatroomId}`);
      subscribe(`chatrooms.${chatroomId}.v2`);
      subscribe(`chatrooms.${chatroomId}`);
      subscribe(`channel_${channelId}`);
      subscribe(`channel.${channelId}`);
      subscribe(`predictions-channel-${channelId}`);

      pingIntervalRef.current = window.setInterval(() => {
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify({ event: "pusher:ping", data: {} }));
        };
      }, 60000);

      connectingRef.current = false;
    });

    socket.addEventListener("message", (e) => {
      let data = JSON.parse(e.data);

      if (data.event === "App\\Events\\ChatMessageEvent") {
        setState(s => ({
          ...s,
          channelMessages: [JSON.parse(data.data), ...s.channelMessages].slice(0, state.channelMaxMessage),
        }));
      };
    });

    socket.addEventListener("close", () => {
      if (socketRef.current === socket) {
        socketRef.current = null;
      };
      connectingRef.current = false;
    });

    socket.addEventListener("error", () => {
      connectingRef.current = false;
      showNotif("Error with chat");
    });
  }, []);
  /**
   * function for send message in chat with enter key
   * @param event 
   * @param reply 
   * @param removeReply 
   * @returns send message or open error notification
   */
  const inputMessageEnter = async (event: React.KeyboardEvent<HTMLInputElement>, reply: Message | null, removeReply: () => void): Promise<void> => {
    if (event.key !== "Enter") return;

    // Check the timestamp to ensure messages can only be sent after 100ms
    const currentTime = Date.now();
    if (currentTime - state.lastMessageSent < 100) return; // Prevent sending messages too quickly
    setState({ ...state, lastMessageSent: currentTime }); // Update the timestamp of the last sent message

    // close reply box
    removeReply()

    event.preventDefault();

    let rawValue = event.currentTarget.value;
    let trimmed = rawValue.trim();

    if (!trimmed) return;

    if (!event.ctrlKey) await handleChangeInput("");

    let metaData = null;
    // if the type message is reply set metata for this
    if(reply) {
      metaData = {
        original_message: {
          content: reply.content,
          id: reply.id,
        },
        original_sender: {
          id: reply.sender.id,
          username: reply.sender.username,
        },
      };
    };

    let response = await sendMessage(trimmed, state.channelChatroomSelected!, !metaData ? "message" : "reply", metaData);

    if (!response) return await showNotif("send message error");
  };
  /**
   * function for scroll in chat
   * @returns scroll to bottom chat
   */
  const handleScroll = (): void => {
    let el = containerRef.current;
    if (!el) return;

    let atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 50;

    setState({ ...state, isAtBottom: atBottom });
  };
  /**
   * function for show emotes list UI
   * @returns change emoteListBox, settingsBox infotmations in useState
   */
  const showEmotesList = (): void => setState(prevState => ({ ...prevState, emotesListBox: !prevState.emotesListBox, settingsBox: false }));
  /**
   * function for show settings UI
   * @returns change emoteListBox, settingsBox infotmations in useState
   */
  const showSettingsList = (): void => setState(prevState => ({ ...prevState, settingsBox: !prevState.settingsBox, emotesListBox: false }));
  /**
   * function for remove channel in channel list
   * @param channelId
   * @returns remove chat informations in chatlist in useState
   */
  const trashChat = (channelId: number): void => {
    // remove chat informations in localStorage and useState
    setState(prevState => {
      let updatedChatList = prevState.chatList.filter(chat => chat.channelId !== channelId);

      localStorage.setItem("chatList", JSON.stringify(updatedChatList));

      if (channelId === Number(state.channelSelected)) setChat(
        updatedChatList.length ? updatedChatList[0].channelId : null,
        updatedChatList.length ? updatedChatList[0].chatroomId : null,
        updatedChatList.length ? updatedChatList[0].name : null
      );

      window.location.reload();

      return {
        ...prevState,
        chatList: updatedChatList
      };
    });
  };
  /**
   * function for refresh the input balise for show the message
   * @param message 
   * @returns change message content in useState
   */
  const handleChangeInput = (message: string): void => setState(prevState => ({ ...prevState, message }));
  /**
   * function for change max message in chatroom value
   * @param event 
   * @returns change channelMaxMessage in useState for display a maximum of message in chatroom
   */
  const handleChangeMaxMessage = (event: React.ChangeEvent<HTMLInputElement>): void => {
    let value = Math.max(50, Math.min(999, Number(event.target.value)));

    localStorage.setItem("channelMaxMessage", value.toString());

    return setState({ ...state, channelMaxMessage: value});
  };
  /**
   * function for show rules
   * @param channelName the channel name
   * @returns show popup box with rules
   */
  const showRules = async (channelName: string): Promise<void> => {
    let rulesOption: boolean = JSON.parse(localStorage.getItem("settings")!).rules;
    let rulesBlackList: string[] = JSON.parse(localStorage.getItem("rulesBlackList")!);

    // strandartised channel name
    let normalizedChannelName = channelName.replace(/_/g, '-').toLowerCase();
    let isBlacklisted = rulesBlackList.some(rule => rule.replace(/_/g, '-').toLowerCase() === normalizedChannelName);
    // 
    if(rulesOption === true) {
      // check if the channel name is not in the black list
      if(!isBlacklisted) {
        // get rules informations
        let rulesInfos = await rules(channelName);

        if(rulesInfos) {
          // set informations
          setState(s => ({
            ...s,
            rulesInfos,
          }));
        };
      };
    };
  };
  /**
   * function for remove popup with rules and add channel name in blacklist
   * @param channelName channel name to blacklist
   * @returns remove popup box with rules and blacklist the channel for never re show the rules
   */
  const blackListChannelRules = (channelName: string) => {
    let rulesBlackList: string[] = JSON.parse(localStorage.getItem("rulesBlackList")!);
    // add channel name in blacklist
    rulesBlackList.push(channelName);
    localStorage.setItem("rulesBlackList", JSON.stringify(rulesBlackList));
    // remove the popup rules
    setState({
      ...state,
      rulesInfos: "",
    });
  };
  // exec in launch
  let exec = 0;

  useEffect((): void => {
    if (exec >= 1) return;
    setChat(
      initChatList.length ? initChatList[0].channelId : null,
      initChatList.length ? initChatList[0].chatroomId : null,
      initChatList.length ? initChatList[0].name : null,
    );
    exec++;
  }, [])
  // auto scroll
  useEffect((): any => state.isAtBottom && bottomRef.current?.scrollIntoView({ behavior: "instant" }), [state.channelMessages, state.isAtBottom]);
  // export function/variables
  return {
    ...state,
    containerRef,
    bottomRef,
    inputRef,
    setState,
    addChat,
    popup,
    setChat,
    inputMessageEnter,
    handleScroll,
    showEmotesList,
    showSettingsList,
    trashChat,
    handleChangeInput,
    handleChangeMaxMessage,
    showRules,
    blackListChannelRules,
  };
};