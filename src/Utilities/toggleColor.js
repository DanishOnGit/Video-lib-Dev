import { checkIfAlreadyPresent } from "./checkIfAlreadyPresent";

export const toggleColor = (array, videoId) => {
  const result = checkIfAlreadyPresent(array, videoId);
  return result ? "white" : "grey";
};
