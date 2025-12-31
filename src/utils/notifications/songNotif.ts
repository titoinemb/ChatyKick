import notifSound from '@assets/songs/notif.mp3';

export const songNotif = () => {
  let audio = new Audio(notifSound);
  audio.play();
};