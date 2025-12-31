import { invoke } from '@tauri-apps/api/core';

export const getChatIdentity = async (channelId: number, myId: string): Promise<false | any> => {
  try {
    let result: any = await invoke('get_chat_identity', { channelId, myId });

    if (result) {
      return result.data.messages;
    } else {
      return false;
    };
  } catch (error) {
    return false;
  };
};