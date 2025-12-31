import { Message, ChatSettings } from "@types";

export type SubGiftProps = {
  dark: string;
  light: string;
};
export type NotifProps = {
  message: string;
};
export type MessageProps = {
  item: Message;
  handleMouseEnter?: (id: string) => void;
  handleMouseLeave?: (id: string) => void;
  replyMode?: (item: Message) => void;
};
export type UserProps = {
  userId: number;
};
export type OptionsChatProps = {
  channelId: number;
};
export type AddProps = {
  transform: string;
  width: string;
  height: string;
};
export type NavigatorProps = {
  chatList: ChatSettings[];
  channelName: string | null;
  channelSelected: string | null;
  trashChat: (channelId: number) => void;
  popup: () => void;
  setChat: (channelId: number | null, chatroomId: number | null, channelName: string | null) => Promise<void>;
};
export type ReplayBoxProps = {
  replyMessageData: Message | null;
  removeReply: () => void;
};
export type EmotesListProps = {
  emotesList: any[] | null;
  handleChangeInput: (message: string) => void;
  showEmotesList: () => void;
  inputRef: any;
  message: string;
};
export type SettingsProps = {
  channelName: string | null;
  channelMaxMessage: number;
  handleChangeMaxMessage: (event: React.ChangeEvent<HTMLInputElement>) => void;
};