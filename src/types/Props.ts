import { Message, ChatSettings, Badge } from "@types";

export type SubGiftProps = {
  dark: string;
  light: string;
};
export type NotifProps = {
  message: string;
};
export type MessageProps = {
  item: Message;
  channelName: string;
  handleMouseEnter?: (id: string) => void;
  handleMouseLeave?: (id: string) => void;
  replyMode?: (item: Message) => void;
};
export type UserProps = {
  item: any;
  followingSince: string;
  profilePic: string;
  username: string;
  removeUserPopup: () => void;
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
  channelName: string;
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
  channelId: string;
  handleChangeMaxMessage: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
export type RuleProps = {
  rules: string;
  channelName: string;
  blackListChannelRules: (channelName: string) => void;
};
export type BadgesProps = {
  item: any;
};