/**
 * function transform image text to balise img
 * @param text content message
 * @returns the content message with img balise
 */
let replaceEmotes = (text: string): string => {
  return text.replace(/\[emote:(\d+)(?::[^\]]*)?\]/g, (_, id) => {
    return `<img src="https://files.kick.com/emotes/${id}/fullsize" class="emoji" alt="emote ${id}" />`
  });
};
/**
 * function for transform url to clickable URL
 * @param text content message
 * @returns the content message with url balise
 */
let replaceLinks = (text: string): string => {
  return text.replace(/(https?:\/\/[^\s]+)/g, (url) => {
    return `<a class="link" href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`
  });
};
/**
 * function for use replaceEmotes and Links
 * @param text content message
 * @returns the content message with emotes and URLs
 */
export const replaceEmotesAndLinks = (text: string): string => {
  return replaceEmotes(replaceLinks(text))
};