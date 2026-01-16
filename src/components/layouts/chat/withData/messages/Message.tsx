import React from "react";
import { MessageProps } from "@types";
import { Reply, User, Badges, Party } from "@components";
import { replaceEmotesAndLinks } from "@utils";
import { useUser } from "@hooks";

export const Message: React.FC<MessageProps> = ({ item, handleMouseEnter, handleMouseLeave, replyMode, channelName }) => {
  let html = replaceEmotesAndLinks(item.content);
  let metadata: any = item.metadata;
  let {
    getUserInfo,
    removeUserPopup,
    visible,
    followingSince,
    profilePic,
    username
  } = useUser();

  if (typeof item.metadata === "string") metadata = JSON.parse(item.metadata);

  return (
    <>
      {visible && (
        <User badges={item.sender.identity.badges} followingSince={followingSince!} profilePic={profilePic!} username={username!} removeUserPopup={removeUserPopup} />
      )}
      {metadata?.celebration
        ? /** show celebration message (sub) */
        (
          <div className="celebration">
            <div className="color" />
            <div className="content">
              <div className="left">
                <Party />
              </div>
              <div className="right">
                <div className="top">
                  <div className="username">{item.sender.username}</div>
                  <div className="description">Celebrates their subscription {item.metadata.celebration.total_months} for months !</div>
                </div>
                <div className="bottom">
                  <div className="identity">
                    <div className="badges"><Badges badges={item.sender.identity.badges} /></div>
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
                </div>
              </div>
            </div>
          </div>
        )
        : /** show normal message (reply/message) */
        (
          <div className="msg"
            onMouseEnter={
              () => {
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
            {metadata && metadata.original_sender && (
              <div className="replyMetadata">
                Replying to {metadata.original_sender.username!}:
                <span className="content" dangerouslySetInnerHTML={{ __html: replaceEmotesAndLinks(metadata.original_message.content!) }} />
              </div>
            )}

            <div className="identity">
              <div className="badges"><Badges badges={item.sender.identity.badges} /></div>
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
          </div >
        )}
    </>
  );
};