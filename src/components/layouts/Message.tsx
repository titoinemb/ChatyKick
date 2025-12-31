import React from "react";
import { MessageProps, SubGiftBadgesColor, BadgeTypes } from "@types";
import { BadgeMap, Reply } from "@components";
import { replaceEmotesAndLinks } from "@utils";

export const Message: React.FC<MessageProps> = ({ item, handleMouseEnter, handleMouseLeave, replyMode }) => {
  let html = replaceEmotesAndLinks(item.content);

  return (
    <div className="msg" onMouseEnter={() => handleMouseEnter && handleMouseEnter(item.id)} onMouseLeave={() => handleMouseLeave && handleMouseLeave(item.id)}>
      <div className="identity">
        <div className="badges">
          {item.sender.identity.badges.map((badge, i) => {
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
        <div className="username" style={{ color: item.sender.identity.color }}>{item.sender.username}<span>:</span></div>
      </div>
      <span className="content" dangerouslySetInnerHTML={{ __html: html }} />
      {item.sender.id !== Number(localStorage.getItem("channelId")) && replyMode && (
        <div className="reply" id={item.id} onClick={() => replyMode(item)}>
          <Reply />
        </div>
      )}
    </div>
  );
};