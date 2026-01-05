import { invoke } from '@tauri-apps/api/core';

export const rules = async (channelName: string): Promise<false | any> => {
  try {
    var channelName = channelName.replace("_", "-");
    let result: any = await invoke('rules', { channelName });

    if (result) {
      return result.data.rules;
    } else {
      return false;
    };
  } catch (error) {
    return false;
  };
};