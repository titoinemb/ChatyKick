import { useState } from "react";
import { SettingsState, SettingsTabs } from "@types";
import { getChatIdentity } from "@services";

export const useSettings = () => {
  const [state, setState] = useState<SettingsState>({
    tab: "global",
    settings: localStorage.getItem("settings") || [],
    channelIdentity: null
  });
  /**
   * function for logout the account in the app
   * @returns go to login page
   */
  const logOut = () => {
    localStorage.removeItem("BearerToken");

    return window.location.href = "/";
  };
  /**
   * function for change settings tab
   * @param tab the settings tab name
   * @returns change state informations
   */
  const changeSettingsMenu = (tab: SettingsTabs): void => setState({ ...state, tab: tab });
  /**
   * function for update settings informations
   * @param channelId 
   * @returns change state informations
   */
  const updateSettings = async (channelId: string): Promise<void> => setState({ ...state, channelIdentity: await getChatIdentity(channelId, localStorage.getItem("channelId")!) });
  // export function/variables
  return {
    logOut,
    ...state,
    changeSettingsMenu,
    updateSettings
  };
};