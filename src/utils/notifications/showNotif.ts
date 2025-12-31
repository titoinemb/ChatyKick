import * as React from 'react';
import { createRoot, Root } from 'react-dom/client'; 
import { Notif } from '@components';

let notificationTimeouts: NodeJS.Timeout[] = [];
let currentNotificationRoots: Root[] = [];
/**
 * function for show notification ui popup just 5sec
 * @param message error message
 */
export const showNotif = (message: string): void => {
  // create div notification
  let div = document.createElement('div');
  document.body.appendChild(div);

  // create a root and add Notification UI
  let root = createRoot(div);
  root.render(React.createElement(Notif, { message }));
  currentNotificationRoots.push(root);

  // delete notification after 5sec
  let timeout = setTimeout(() => {
    root.unmount();
    document.body.removeChild(div);
    currentNotificationRoots = currentNotificationRoots.filter(r => r !== root);
  }, 5000);

  notificationTimeouts.push(timeout);
};