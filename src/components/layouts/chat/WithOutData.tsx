import React from "react";
import { Add } from "@components";
import { useChat } from "@hooks";

import "@styles/layouts/chat/withOutData.scss";

export const ChatWithOutData: React.FC = () => {
  let { popup } = useChat();

  return (
    <div className='nodata' id="chat" onClick={popup}>
      <div className="back">
        <Add transform="rotate(45deg)" width="50px" height="50px" />
        <div className="title">Add Chat</div>
      </div>
    </div>
  );
};