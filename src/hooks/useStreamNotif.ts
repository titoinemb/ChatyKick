import { showNotif, songNotif } from "@utils";
import { authSocket } from "@services";
import { useEffect } from "react";
import { isPermissionGranted, requestPermission, sendNotification } from '@tauri-apps/plugin-notification';

export const useStreamNotif = () => {
  /**
   * function for send notification in the os
   * @returns send notification
   */
  const sendOsNotif = async (): Promise<void> => {
    let permissionGranted = await isPermissionGranted();

    if (!permissionGranted) {
      const permission = await requestPermission();
      permissionGranted = permission === 'granted';
    }

    if (permissionGranted) {
      sendNotification({
        title: 'Notification Tauri',
        body: 'Ça fonctionne 🎉',
      });
    };
  };
  /**
   * setup the websocket for get in real time stream notification
   * @returns void
   */
  const notifSocket = (): void => {
    let socket = new WebSocket("wss://ws-us2.pusher.com/app/32cbd69e4b950bf97679?protocol=7&client=js&version=8.4.0&flash=false");

    let subscribe = (channel: string, auth: string | false): void => {
      if(auth === false) return;

      socket.send(JSON.stringify({
        event: "pusher:subscribe",
        data: {
          auth,
          channel
        },
      }));
    };

    socket.addEventListener("open", async () => {
      setInterval(() => {
        socket.send(JSON.stringify({
          event: "pusher:ping",
          data: {}
        }));
      }, 60000);
    });

    socket.addEventListener("message", async (e) => {
      let data = JSON.parse(e.data);
      // send events for follow events for get stream notifications in real time
      if (data.event === "pusher:connection_established") {
        let socketId = JSON.parse(data.data).socket_id;

        let channel1 = `private-userfeed.${localStorage.getItem("channelId")}`;
        let channel2 = `private-${localStorage.getItem("channelId")}`;

        subscribe(
          channel1,
          await authSocket(channel1, socketId),
        );
        subscribe(
          channel2,
          await authSocket(channel2, socketId),
        );
      };

      if (data.event === "NotifyFollowersStreamHasStarted") {
        let notifData = JSON.parse(data.data);
        let notifTitle = notifData.title
          .replace("<strong>", "") // delete '<strong>'
          .replace("</strong>", ""); // delete '</strong>'

        showNotif(notifTitle);
        songNotif();
      };
    });

    socket.addEventListener("error", () => showNotif("Error with chat"));
  };
  /**
   * start websocket for send notification in lunching
   */
  let exec = 0;
  useEffect(() => {
    if (exec >= 1) return;
    notifSocket();
    setTimeout(() => {
      sendOsNotif();
    }, 1500)
    exec++;
  }, []);

  return {};
};