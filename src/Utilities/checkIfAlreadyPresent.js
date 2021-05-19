export const checkIfAlreadyPresent = (array, itemId) => {
  const result = array.find((item) => item.videoId._id === itemId);

  return result;
};
