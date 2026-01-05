import { useState } from "react";
import { SettingsState, SettingsTabs } from "@types";
import { getChatIdentity } from "@services";

export const useSettings = () => {
  const [state, setState] = useState<SettingsState>({
    tab: "global",
    settings: JSON.parse(localStorage.getItem("settings")!),
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
  /**
   * function for update rules options in settings and localStorage
   * @param event 
   * @returns change rules options in settings and localStorage
   */
  const rulesUpdate = (event: React.ChangeEvent<HTMLInputElement>): void => {
    let cheker: boolean = event.target.checked;

    if (cheker) {
      // active for show rules
      var newSettings = {
        ...state.settings,
        rules: true,
      };
    } else {
      // disable rules
      var newSettings = {
        ...state.settings,
        rules: false,
      };
    };
    // change data in state
    setState({
      ...state,
      settings: newSettings
    });
    // change data in localstorage
    localStorage.setItem("settings", JSON.stringify(newSettings));
  };
  // export function/variables
  return {
    logOut,
    ...state,
    changeSettingsMenu,
    updateSettings,
    rulesUpdate
  };
};