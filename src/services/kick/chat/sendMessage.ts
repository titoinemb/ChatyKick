import { invoke } from '@tauri-apps/api/core';

export const sendMessage = async (content: string, channelId: string, messageType: string, metadata: any | null): Promise<boolean> => {
  try {
    let bearerToken = localStorage.getItem("BearerToken")
    let result: any = await invoke('send_message', { bearerToken, channelId, messageType, metadata, content });

    if (result) {
      return true;
    } else {
      return false;
    };
  } catch (error) {
    console.log(error)
    return false;
  };
};