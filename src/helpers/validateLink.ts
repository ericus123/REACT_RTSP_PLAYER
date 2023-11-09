const wsUrlRegex =
  /^wss?:\/\/((\w+:?\w*)?@)?([a-zA-Z\d.-]+)(:\d+)?(\/([^\s]*))?$/;
export const isValidWsUrl = (url: string): boolean => {
  return wsUrlRegex.test(url);
};
