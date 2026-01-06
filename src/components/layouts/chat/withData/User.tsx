import React from "react";
import { UserProps } from "@types";
import { Add, Badges } from "@components";

export const User: React.FC<UserProps> = ({ item, followingSince, profilePic, username, removeUserPopup }) => (
  <div className="user">
    <div className="top">
      <div className="left">
        <img src={profilePic} />
      </div>
      <div className="right" onClick={removeUserPopup}>
        <Add height="20px" width="20px" transform="rotate(90deg)" />
      </div>
    </div>
    <div className="bottom">
      <div className="username">{username}</div>
      <div className="follow">Following since: {followingSince}</div>
      <div className="badges">
        <div className="title">Badges:</div>
        <div className="badgeslist">
          <Badges item={item} />
        </div>
      </div>
    </div>
  </div>
);