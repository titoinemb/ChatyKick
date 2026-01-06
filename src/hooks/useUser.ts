import { useState } from "react";
import { UserStates, formatDate} from "@types";
import { getUserInfos } from "@services";
import { showNotif } from "@utils";

export const useUser = () => {
  const [state, setState] = useState<UserStates>({
    followingSince: null,
    profilePic: null,
    username: null,
    visible: false
  });
  /**
   * function for get and set states with user info
   * @param channel_name 
   * @param username 
   * @returns show ui interfaces with user informations
   */
  const getUserInfo = async (channelName: string, username: string): Promise<void> => {
    if(state.username) return;

    let identity = await getUserInfos(channelName, username);

    if(!identity) return showNotif("error for get user identity");

    var profilePicture = "https://kick.com/img/default-profile-pictures/default-avatar-2.webp";

    if(identity.profile_pic) profilePicture = identity.profile_pic;


    if(identity.following_since) {
      let date = new Date(identity.following_since);
      var formattedDate = date.toLocaleDateString('fr-FR', formatDate);
    } else {
      var formattedDate = "never";
    };

    return setState({
      ...state,
      followingSince: formattedDate,
      profilePic: profilePicture,
      username: username,
      visible: true
    });
  };
  /**
   * function for close user info ui
   * @returns change data value in states
   */
  const removeUserPopup = (): void => {
    return setState({
      ...state,
      visible: false,
      followingSince: null,
      profilePic: null,
      username: null
    });
  };
  // export function/variables
  return {
    ...state,
    getUserInfo,
    removeUserPopup
  };
};