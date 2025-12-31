import { invoke } from '@tauri-apps/api/core';

export const setChatIdentity = async (): Promise<boolean> => {
  try {

    return true;
  } catch (e) {
    return false;
  };
};