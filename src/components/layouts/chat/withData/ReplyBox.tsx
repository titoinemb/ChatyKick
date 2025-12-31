import React from 'react';
import { ReplayBoxProps } from "@types";
import { Reply, Message, Add } from "@components";

export const ReplyBox: React.FC<ReplayBoxProps> = ({ replyMessageData, removeReply, channelName }) => (
  <div className="replyBox">
    {replyMessageData && (
      <>
        <div className="title">
          <div>
            <Reply/>
            Replying to {replyMessageData.sender.username}:
          </div>
          <div onClick={removeReply} style={{ cursor: "pointer" }}>
            <Add transform="rotate(90deg)" width="20px" height="20px" />
          </div>
        </div>
        <Message item={replyMessageData} channelName={channelName} />
      </>
    )}
  </div>
);