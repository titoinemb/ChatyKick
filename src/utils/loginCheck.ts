/**
 * check if BearerToken in localStorage is defined or not
 * @returns boolen
 */
export const loginCheck = (): boolean => {
  return !!localStorage.getItem("BearerToken")
};