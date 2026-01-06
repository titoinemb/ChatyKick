import React from "react";
import { useChat, useMessage } from "@hooks";
import { Emoji, Settings, Message, EmotesList, Navigator, ReplyBox, SettingsBox, Rules } from "@components";

import "@styles/layouts/chat/withData.scss";

export const ChatWithData: React.FC = () => {
  let {
    settingsBox,
    emotesListBox,
    chatList,
    channelMessages,
    channelMaxMessage,
    bottomRef,
    containerRef,
    channelSelected,
    emotesList,
    message,
    inputRef,
    channelName,
    rulesInfos,
    popup,
    setChat,
    handleChangeMaxMessage,
    inputMessageEnter,
    handleScroll,
    handleChangeInput,
    showSettingsList,
    showEmotesList,
    trashChat,
    blackListChannelRules,
  } = useChat();
  let {
    replyMessageData,
    isReplyOpen,
    handleMouseEnter,
    handleMouseLeave,
    replyMode,
    removeReply,
  } = useMessage();

  return (
    <div className="data" id="chat">
      <Navigator
        setChat={setChat}
        popup={popup}
        trashChat={trashChat}
        channelSelected={channelSelected}
        chatList={chatList}
        channelName={channelName}
      />
      <div className="content">
        <div className="chat" ref={containerRef} onScroll={handleScroll}>
          {channelMessages.slice().reverse().map((item) => (
            <Message
              key={item.id}
              item={item}
              {...{ handleMouseEnter, handleMouseLeave, replyMode }}
              channelName={channelName!}
            />
          ))}
          <div ref={bottomRef} />
          <div style={{ padding: "35px" }}></div>
        </div>
        <div className="message">
          {emotesListBox && (
            <EmotesList
              emotesList={emotesList}
              handleChangeInput={handleChangeInput}
              inputRef={inputRef}
              message={message}
              showEmotesList={showEmotesList}
            />
          )}
          {settingsBox && (
            <SettingsBox
              channelName={channelName}
              channelMaxMessage={channelMaxMessage}
              handleChangeMaxMessage={handleChangeMaxMessage}
              channelId={channelSelected!}
            />
          )}
          {isReplyOpen && channelName && (
            <ReplyBox
              replyMessageData={replyMessageData}
              removeReply={removeReply}
              channelName={channelName}
            />
          )}
          {rulesInfos && channelName && (
            <Rules
              rules={rulesInfos}
              channelName={channelName}
              blackListChannelRules={blackListChannelRules}
            />
          )}
          {/** if rules is displayed is impossible to send a message*/}
          {!rulesInfos && (
            <div className="box">
              <input type="text" ref={inputRef} placeholder="Type a message…" value={message}
                onChange={(event) => {
                  handleChangeInput(event.target.value);
                }}
                onKeyDown={(event) => {
                  inputMessageEnter(event, replyMessageData, removeReply);
                }}
              />
              <div style={{ margin: "4px" }}></div>
              <div className="button" onClick={showEmotesList}>
                <Emoji />
              </div>
              <div style={{ margin: "2.5px" }}></div>
              <div className="button" onClick={showSettingsList}>
                <Settings />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};