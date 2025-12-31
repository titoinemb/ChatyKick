import { invoke } from '@tauri-apps/api/core';

export const kicksBalance = async (bearerToken: string): Promise<any | false> => {
  try {
    let result: any = await invoke('kicks_balance', { bearerToken });

    if (result) {
      return result;
    } else {
      return false;
    };
  } catch (error) {
    return false;
  };
};