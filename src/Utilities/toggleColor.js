import { checkIfAlreadyPresent } from "./checkIfAlreadyPresent";

export const toggleColor = (array, videoId) => {
  const result = checkIfAlreadyPresent(array, videoId);
  console.log("color change...", result);
  return result ? "white" : "grey";
};
