import React from "react";
import { ChatWithOutData, ChatWithData } from "@components";
import { loginCheck } from "@utils";
import { useStreamNotif, useChat } from "@hooks";
import "@styles/components/chat.scss";

export const Chat: React.FC = () => {
  let { chatList } = useChat();
  let { } = useStreamNotif();

  // if bearertoken is not defined go to login page
  if(loginCheck() === false) return window.location.href = "/";

  return (
    <div className='app'>
      {!chatList.length ? (
        <ChatWithOutData />
      ) : (
        <ChatWithData />
      )}
    </div>
  );
};