import { invoke } from '@tauri-apps/api/core';

export const getUserInfos = async (channelName: string, username: string): Promise<false | any> => {
  try {
    let result: any = await invoke('get_user_infos', { channelName, username });

    if (result) {
      return result;
    } else {
      return false;
    };
  } catch (error) {
    console.log(error)
    return false;
  };
};