import { invoke } from '@tauri-apps/api/core';

export const bearerChecker = async (bearerToken: string): Promise<boolean> => {
  try {
    let result: any = await invoke('bearer_checker', { bearerToken });

    if (result) {
      return true;
    } else {
      return false;
    };
  } catch (error) {
    return false;
  };
};