import React from 'react';
import { NotifProps } from "@types";
import { Info } from "@components";
import "@styles/layouts/notif.scss";

export const Notif: React.FC<NotifProps> = ({ message }) => (
  <div className='notif'>
    <Info />{message}
  </div>
);