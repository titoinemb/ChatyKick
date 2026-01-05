import React from "react";
import { UserProps, SubGiftBadgesColor, BadgeTypes } from "@types";
import { Add, BadgeMap } from "@components";

export const User: React.FC<UserProps> = ({ badges, followingSince, profilePic, username, removeUserPopup }) => (
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
          {badges.map((badge, i) => {
            if (!(badge.text in BadgeMap)) return null;

            let BadgeComponent = BadgeMap[badge.text as keyof typeof BadgeMap];

            var dark = "#fff";
            var light = "#fff";

            function isBadgeType(type: string): type is BadgeTypes {
              return type in SubGiftBadgesColor;
            };

            if (isBadgeType(badge.type)) {
              const badgeColor = SubGiftBadgesColor[badge.type];

              dark = badgeColor.dark;
              light = badgeColor.light;
            };

            return <div className="badge" key={i}><BadgeComponent dark={dark} light={light} /></div>;

          })}
        </div>
      </div>
    </div>
  </div>
);