import React from "react";
import { KickLogo } from "@components";
import { useLogin } from "@hooks";
import "@styles/components/login.scss";

export const Login: React.FC = ({}) => {
  let { setBearerToken, BearerToken, toChat } = useLogin();

  // if bearertoken is defined go to chat page
  if(BearerToken) toChat();

  return (
    <div className="app">
      <KickLogo />
      <div className="loginForm">
        {/*<div className="inputName">Pseudo/Email</div>
        <input type="text" id="email" />
        <div className="inputName">Password</div>
        <input type="text" id="pseudo" />
        <div className="inputName">2FA code (optionnel)</div>
        <input type="text" id="code2fa" />*/}
        <div className="inputName">Bearer Token</div>
        <input type="text" id="token" />
      </div>
      <button 
        onClick={() => {
          setBearerToken((document.getElementById("token") as HTMLInputElement).value)
        }}>
          Login
      </button>
    </div>
  );
};