import React from 'react';
import { SettingsProps } from "@types";
import { useSettings } from "@hooks";

export const Settings: React.FC<SettingsProps> = ({ channelId, channelName, channelMaxMessage, handleChangeMaxMessage }) => {
  let {
    tab,
    settings,
    channelIdentity,
    logOut,
    changeSettingsMenu,
    rulesUpdate,
  } = useSettings();

  console.log(channelIdentity)

  return (
    <div className="settings">
      <div className="list">
        <div className="menu">
          <div className="item" onClick={() => changeSettingsMenu("global", channelId!)} style={{ backgroundColor: tab === "global" ? "rgba(37, 37, 43, 1)" : "" }}>Global</div>
          <div className="item" onClick={() => changeSettingsMenu("channel", channelId!)} style={{ backgroundColor: tab === "channel" ? "rgba(37, 37, 43, 1)" : "" }}>{channelName}</div>
        </div>
        <div className="setting-content">
          {tab === "global" && (
            <div className="setting-content-box">
              <div className="item">
                <div className="title">Show rules channels</div>
                <input type="checkbox" name="rules" id="rules" onChange={rulesUpdate} checked={settings.rules}/>
              </div>
              <div className="item">
                <div className="title">Raimbow Color</div>
                <input type="checkbox" name="raimbowColor" id="raimbowColor" />
              </div>
              <div className="item">
                <div className="title">Max message in a channel</div>
                <input type="number" name="maxMessage" id="maxMessage" min="50" max="999" onChange={handleChangeMaxMessage} value={channelMaxMessage} />
              </div>
              <button onClick={logOut} className="logout">LogOut</button>
            </div>
          )}
          {tab === "channel" && channelIdentity &&(
            <div className="setting-content-box">
              <div className="badges">
                {channelIdentity.badges.map((badge: any) => (
                  <div key={badge.text}>
                    {badge.text}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};