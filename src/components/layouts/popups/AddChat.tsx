import React from "react";
import { useChat } from "@hooks";

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