import { invoke } from '@tauri-apps/api/core';

export const getChatIdentity = async (channelId: string, userId: string): Promise<false | any> => {
  try {
    let result: any = await invoke('get_chat_identity', { channelId, userId });

    if (result) {
      return result;
    } else {
      return false;
    };
  } catch (error) {
    return false;
  };
};