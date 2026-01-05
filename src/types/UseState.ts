import { Badge, ChatSettings, Message, SettingsTabs } from "@types";

export type ChatState = {
  chatList: ChatSettings[];
  channelSelected: string | null;
  channelChatroomSelected: string | null;
  channelMessages: Message[];
  isAtBottom: boolean;
  emotesList: any[] | null;
  message: string;
  channelName: string | null;
  emotesListBox: boolean;
  settingsBox: boolean;
  channelMaxMessage: number;
  lastMessageSent: number;
  rulesInfos: string;
};
export type MessageState = {
  replyMessageData: Message | null;
  isReplyOpen: boolean;
};
export type SettingsState = {
  tab: SettingsTabs;
  settings: any;
  channelIdentity: any | null;
};
export type UserStates = {
  badges: Badge[] | null;
  username: string | null;
  profilePic: string | null;
  followingSince: string | null;
  // ui for show user informations
  visible: boolean;
};