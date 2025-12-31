import notifSound from '@assets/songs/notif.mp3';
/**
 * play notification sound
 */
export const songNotif = (): void => {
  let audio = new Audio(notifSound);
  audio.play();
};