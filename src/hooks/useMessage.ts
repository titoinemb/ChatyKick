import { useState } from "react";
import { Message, MessageState } from "@types";

export const useMessage = () => {
  const [state, setState] = useState<MessageState>({
    replyMessageData: null,
    isReplyOpen: false,
  });
  /**
   * function to show the reply button on mouseover of the cursor 
   * @param id message id
   * @returns show reply button
   */
  const handleMouseEnter = (id: string) => {
    let element = document.getElementById(id);

    return element && (element.style.display = "flex");
  };
  /**
   * function for hide reply button on mouse leave the message
   * @param id message id
   * @returns hide reply button
   */
  const handleMouseLeave = (id: string) => {
    let element = document.getElementById(id);

    return element && (element.style.display = "none");
  };
  /**
   * function to pass to reply mode
   * @param item message informations
   * @returns change state informations
   */
  const replyMode = (item: Message): void => setState(s => ({ ...s, replyMessageData: item, isReplyOpen: true }));
  /**
   * function to pass to message mode
   * @returns change state informations
   */
  const removeReply = (): void => setState(s => ({ ...s, replyMessageData: null, isReplyOpen: false }));
  // export function/variables
  return {
    handleMouseEnter,
    handleMouseLeave,
    replyMode,
    ...state,
    removeReply
  };
};