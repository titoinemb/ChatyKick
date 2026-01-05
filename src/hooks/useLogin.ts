import { bearerChecker, kicksBalance } from "@services";
import { showNotif } from "@utils";

export const useLogin = () => {
  const BearerToken = localStorage.getItem("BearerToken");
  /**
   * function for go to chat page
   * @returns redirection
   */
  const toChat = () => window.location.href = "/chat";
  /**
   * function for set bearerToke and informations for use the kick api
   * @param token the bearer token
   * @returns to chat page
   */
  const setBearerToken = async (token: string) => {
    if (!token) return showNotif("please set your bearer token");
    // check if the bearer token is valide
    let bearercheck = await bearerChecker(token);
    if(!bearercheck) return showNotif("Bearer Token is not valide");
    // get the channelId whits the kicks balance api
    let id = await kicksBalance(token);
    if(!id) return showNotif("impossible to get your channel id");
    // set informations in localStorage
    localStorage.setItem("BearerToken", token);
    localStorage.setItem("channelId", id.data.balance.user_id);
    localStorage.setItem("channelMaxMessage", "50");

    return toChat();
  };
  // export function/variables
  return {
    BearerToken,
    setBearerToken,
    toChat,
  };
};