import { lazy } from "react";
// features
export const Login = lazy(() => import("./features/login").then(mod => ({ default: mod.Login })));
export const Chat = lazy(() => import("./features/Chat").then(mod => ({ default: mod.Chat })));
// svg
export const KickLogo = lazy(() => import("./svg/KickLogo").then(mod => ({ default: mod.KickLogo })));
export const Add = lazy(() => import("./svg/Add").then(mod => ({ default: mod.Add })));
export const Info = lazy(() => import("./svg/Info").then(mod => ({ default: mod.Info })));
export const Emoji = lazy(() => import("./svg/Emoji").then(mod => ({ default: mod.Emoji })));
export const Settings = lazy(() => import("./svg/Settings").then(mod => ({ default: mod.Settings })));
export const World = lazy(() => import("./svg/World").then(mod => ({ default: mod.World })));
export const Trash = lazy(() => import("./svg/Trash").then(mod => ({ default: mod.Trash })));
export const Reply = lazy(() => import("./svg/Reply").then(mod => ({ default: mod.Reply })));
// layouts
export const ChatWithOutData = lazy(() => import("./layouts/chat/WithOutData").then(mod => ({ default: mod.ChatWithOutData })));
export const ChatWithData = lazy(() => import("./layouts/chat/WithData").then(mod => ({ default: mod.ChatWithData })));
export const Notif = lazy(() => import("./layouts/popups/Notif").then(mod => ({ default: mod.Notif })));
export const AddChat = lazy(() => import("./layouts/popups/AddChat").then(mod => ({ default: mod.AddChat })));
export const Message = lazy(() => import("./layouts/Message").then(mod => ({ default: mod.Message })));
export const User = lazy(() => import("./layouts/popups/User").then(mod => ({ default: mod.User })));
// badges
export const Broadcaster = lazy(() =>import("./svg/badges/Broadcaster").then(mod => ({ default: mod.Broadcaster })));
export const Founder = lazy(() =>import("./svg/badges/Founder").then(mod => ({ default: mod.Founder })));
export const Moderator = lazy(() =>import("./svg/badges/Moderator").then(mod => ({ default: mod.Moderator })));
export const OG = lazy(() =>import("./svg/badges/OG").then(mod => ({ default: mod.OG })));
export const Sidekick = lazy(() =>import("./svg/badges/Sidekick").then(mod => ({ default: mod.SideKick })));
export const Subgifter = lazy(() =>import("./svg/badges/Subgifter").then(mod => ({ default: mod.SubGifter })));
export const Subscriber = lazy(() =>import("./svg/badges/Subscriber").then(mod => ({ default: mod.Subscriber })));
export const Trainwreckstv = lazy(() =>import("./svg/badges/Trainwreckstv").then(mod => ({ default: mod.Trainwreckstv })));
export const Verified = lazy(() =>import("./svg/badges/Verified").then(mod => ({ default: mod.Verified })));
export const VIP = lazy(() =>import("./svg/badges/VIP").then(mod => ({ default: mod.VIP })));
// layout for chat with data
export const Navigator = lazy(() =>import("./layouts/chat/withData/Navigator").then(mod => ({ default: mod.Navigator })));
export const ReplyBox = lazy(() =>import("./layouts/chat/withData/ReplyBox").then(mod => ({ default: mod.ReplyBox })));
export const EmotesList = lazy(() =>import("./layouts/chat/withData/EmotesList").then(mod => ({ default: mod.EmotesList })));
export const SettingsBox = lazy(() =>import("./layouts/chat/withData/Settings").then(mod => ({ default: mod.Settings })));

export const BadgeMap = {
  Broadcaster,
  Founder,
  Moderator,
  OG,
  Sidekick,
  Subgifter,
  Subscriber,
  Trainwreckstv,
  Verified,
  VIP,
};