export const loginCheck = (): boolean => {
  return !!localStorage.getItem("BearerToken")
};