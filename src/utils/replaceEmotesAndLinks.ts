const replaceEmotes = (text: string): string => text.replace(/\[emote:(\d+)(?::[^\]]*)?\]/g, (_, id) => `<img src="https://files.kick.com/emotes/${id}/fullsize" class="emoji" alt="emote ${id}" />`);
const replaceLinks = (text: string): string => text.replace(/(https?:\/\/[^\s]+)/g, (url) => `<a class="link" href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`);

export const replaceEmotesAndLinks = (text: string): string => (replaceEmotes(replaceLinks(text)));