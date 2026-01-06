import React from "react";
import { BadgesProps, SubGiftBadgesColor, BadgeTypes, Badge } from "@types";
import { BadgeMap } from "@components";

export const Badges: React.FC<BadgesProps> = ({ item }) => {
  return (
    <>
      {item.sender.identity.badges.map((badge: Badge, i: number) => {
        if (!(badge.text in BadgeMap)) return null;

        const BadgeComponent = BadgeMap[badge.text as keyof typeof BadgeMap];

        let dark = "#fff";
        let light = "#fff";

        const isBadgeType = (type: string): type is BadgeTypes => {
          return type in SubGiftBadgesColor;
        };

        if (isBadgeType(badge.type)) {
          const badgeColor = SubGiftBadgesColor[badge.type];
          dark = badgeColor.dark;
          light = badgeColor.light;
        }

        return (
          <div className="badge" key={i}>
            <BadgeComponent dark={dark} light={light} />
          </div>
        );
      })}
    </>
  );
};