import React from "react";
import { RuleProps } from "@types";

import "@styles/layouts/chat/withData/rules.scss";

export const Rules: React.FC<RuleProps> = ({ rules, channelName, blackListChannelRules }) => (
  <div className="rules">
    <div className="top">
      <div className="title">Chat Rules</div>
      <div className="channelName">{channelName}</div>
    </div>
    <div className="text">{rules}</div>
    <button onClick={() => blackListChannelRules(channelName)}>I agree</button>
  </div>
);