import * as React from 'react';
import { createRoot, Root } from 'react-dom/client'; 
import { Notif } from '@components';

let notificationTimeouts: NodeJS.Timeout[] = [];
let currentNotificationRoots: Root[] = [];

export const showNotif = (message: string): void => {
  // Crée un div pour chaque notification
  const div = document.createElement('div');
  document.body.appendChild(div);

  // Crée un root et rend la notification
  const root = createRoot(div);
  root.render(React.createElement(Notif, { message }));
  currentNotificationRoots.push(root);

  // Supprime les timeouts précédents pour les notifications
  const timeout = setTimeout(() => {
    root.unmount(); // Démonter la notification
    document.body.removeChild(div); // Retirer le div du body
    currentNotificationRoots = currentNotificationRoots.filter(r => r !== root);
  }, 5000); // Cacher après 5 secondes

  notificationTimeouts.push(timeout);
};