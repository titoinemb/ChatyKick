import React from 'react';
import { EmotesListProps } from "@types";
import { World } from "@components";

export const EmotesList: React.FC<EmotesListProps> = ({ emotesList, handleChangeInput, showEmotesList, inputRef, message }) => (
  <div className="emotes" id="emotesList">
    {emotesList?.map((info, index) => (
      <div className="section" key={index}>
        <div className="description">
          {info.user ? (
            <>
              <img src={info.user.profile_pic} alt="Icon" />
              {info.user.username}
            </>
          ) : (
            <>
              <World />
              {info.name}
            </>
          )}
        </div>
        <div className="list">
          {info.emotes?.map((emote: any, index: number) => (
            <img
              onClick={() => {
                handleChangeInput(message + `[emote:${emote.id}:${emote.name}]`);
                showEmotesList();
                inputRef.current?.focus();
              }}
              src={`https://files.kick.com/emotes/${emote.id}/fullsize`}
              alt={emote.name}
              key={index}
            />
          ))}
        </div>
      </div>
    ))}
  </div>
);