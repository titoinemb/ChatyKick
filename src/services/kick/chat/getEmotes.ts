import { invoke } from '@tauri-apps/api/core';

export const getEmotes = async (channelName: string): Promise<false | any> => {
  try {
    let name = channelName.replace("_", "-");
    let result: any = await invoke('get_emotes', { name });

    if (result) {
      return result;
    } else {
      return false;
    };
  } catch (error) {
    return false;
  };
};