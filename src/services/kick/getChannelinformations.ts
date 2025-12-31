import { invoke } from '@tauri-apps/api/core';

export const getChannelinformations = async (name: string): Promise<any | false> => {
  try {
    let result: any = await invoke('get_channel_informations', { name });

    if (result) {
      return result;
    } else {
      return false;
    };
  } catch (error) {
    return false;
  };
};