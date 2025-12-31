export type ChatSettings = {
  // pseudo of channel
  name: string;
  // channel id for get informations of channel
  channelId: number;
  // chatroom id for get informations of chatroom channel
  chatroomId: number
};
export type Badge = {
  // name of badge for get icon
  type: string;
  // name of badge
  text: string;
  // count is for sub badge
  count: number | never;
};
export type Message = {
  id: string;
  chat_id: number;
  user_id: number;
  content: string;
  // metadata json in string
  metadata: string;
  sender: {
    id: number;
    // slug is the pseudo for request url
    slug: string;
    username: string;
    identity: {
      color: string;
      badges: Badge[];
    };
  };
  created_at: string;
};
// list of settings tab
export type SettingsTabs = "global" | "channel";
// list of subgift badge
export type BadgeTypes = "subgfifter" | "subgifter25" | "subgifter50" | "subgifter100" | "subGifter200";
// color for subgift badge
export type SubGiftBadgesColorType = {
  [K in BadgeTypes]: {
    dark: string;
    light: string;
  };
};
export const SubGiftBadgesColor: SubGiftBadgesColorType = {
  subgfifter: { dark: "#0269D4", light: "#04D0FF" },
  subgifter25: { dark: "#7B1BAB", light: "#A947D3" },
  subgifter50: { dark: "#CF0038", light: "#FA4E78" },
  subgifter100: { dark: "#FF5008", light: "#FFC800" },
  subGifter200: { dark: "#2FA604", light: "#53F918" },
};
// date format 
export const formatDate: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};