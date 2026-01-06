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
  const changeSettingsMenu = (tab: SettingsTabs, channelId: string): void => {
    setState(s => ({
      ...s,
      tab: tab
    }));

    if(tab === "channel") {
      loadChannelSettings(channelId);
    };
  };
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
  /**
   * function for get channel settings
   * @param channelId the channel id do u want get user settings
   * @returns show channel settings in settings UI
   */
  const loadChannelSettings = async (channelId: string): Promise<void> => {
    let channelIdentity = await getChatIdentity(channelId, localStorage.getItem("channelId")!);
    setState(s => ({
      ...s,
      channelIdentity: channelIdentity.data.identity,
    }));
  };
  // export function/variables
  return {
    ...state,
    logOut,
    changeSettingsMenu,
    rulesUpdate,
    loadChannelSettings,
  };
};