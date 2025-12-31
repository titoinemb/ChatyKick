import React from "react";
import { MessageProps, SubGiftBadgesColor, BadgeTypes } from "@types";
import { BadgeMap, Reply, User } from "@components";
import { replaceEmotesAndLinks } from "@utils";
import { useUser } from "@hooks";

export const Message: React.FC<MessageProps> = ({ item, handleMouseEnter, handleMouseLeave, replyMode, channelName }) => {
  let html = replaceEmotesAndLinks(item.content);

  const {
    getUserInfo,
    removeUserPopup,
    visible,
    badges,
    followingSince,
    profilePic,
    username
  } = useUser();

  return (
    <>
      {visible && (
        <User badges={badges!} followingSince={followingSince!} profilePic={profilePic!} username={username!} removeUserPopup={removeUserPopup} />
      )}
      <div className="msg"
        onMouseEnter={() => {
          if (handleMouseEnter) {
            handleMouseEnter(item.id)
          }
        }}
        onMouseLeave={() => {
          if (handleMouseLeave) {
            handleMouseLeave(item.id)
          }
        }}
      >
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
          <div className="username"
            onClick={() => {
              getUserInfo(channelName, item.sender.username)
            }}
            style={{ color: item.sender.identity.color }}
          >
            {item.sender.username}
            <span>:</span>
          </div>
        </div>
        <span className="content" dangerouslySetInnerHTML={{ __html: html }} />
        {item.sender.id !== Number(localStorage.getItem("channelId")) && replyMode && (
          <div className="reply" id={item.id} onClick={() => replyMode(item)}>
            <Reply />
          </div>
        )}
      </div>
    </>
  );
};