import React from "react";
import { useChat } from "@hooks";
import "@styles/layouts/popup.scss";

export const AddChat: React.FC = () => {
  let { addChat } = useChat();

  return (
    <div className="popup">
      <div className="title">Channel name:</div>
      <input type="text" id="channelName" />
      <button onClick={() => addChat((document.getElementById("channelName") as HTMLInputElement).value)}>Add</button>
    </div>
  );
};