import React from 'react';
import { SettingsProps } from "@types";
import { useSettings } from "@hooks";

export const Settings: React.FC<SettingsProps> = ({ channelName, channelMaxMessage, handleChangeMaxMessage }) => {
  let { logOut, tab, changeSettingsMenu, channelIdentity } = useSettings();

  return (
    <div className="settings">
      <div className="list">
        <div className="menu">
          <div className="item" onClick={() => changeSettingsMenu("global")} style={{ backgroundColor: tab === "global" ? "rgba(37, 37, 43, 1)" : "" }}>Global</div>
          <div className="item" onClick={() => changeSettingsMenu("channel")} style={{ backgroundColor: tab === "channel" ? "rgba(37, 37, 43, 1)" : "" }}>{channelName}</div>
        </div>
        <div className="setting-content">
          {tab === "global" && (
            <div className="setting-content-box">
              <div className="item">
                <div className="title">Show rules channels</div>
                <input type="checkbox" name="rules" id="rules" />
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
          {tab === "channel" && (
            <div className="setting-content-box">{channelIdentity}</div>
          )}
        </div>
      </div>
    </div>
  );
};