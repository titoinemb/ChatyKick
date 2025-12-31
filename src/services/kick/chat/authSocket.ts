import { invoke } from '@tauri-apps/api/core';

export const authSocket = async (channelName: string, socketId: string): Promise<string | false> => {
  try {
    let bearerToken = localStorage.getItem("BearerToken")
    let result: any = await invoke('auth_socket', { bearerToken, channelName, socketId });

    if (result) {
      return result.auth;
    } else {
      return false;
    };
  } catch (error) {
    console.log(error)
    return false;
  };
};