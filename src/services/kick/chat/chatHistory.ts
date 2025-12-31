import { invoke } from '@tauri-apps/api/core';

export const chatHistory = async (channelId: number): Promise<false | any> => {
  try {
    let result: any = await invoke('chat_history', { channelId });

    if (result) {
      return result.data.messages;
    } else {
      return false;
    };
  } catch (error) {
    return false;
  };
};