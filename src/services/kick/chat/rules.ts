import { invoke } from '@tauri-apps/api/core';

export const rules = async (channelName: string): Promise<false | any> => {
  try {
    let name = channelName.replace("_", "-");
    let result: any = await invoke('rules', { name });

    if (result) {
      return result.data.rules;
    } else {
      return false;
    };
  } catch (error) {
    return false;
  };
};