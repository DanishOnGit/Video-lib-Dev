import { checkIfAlreadyPresent } from "./checkIfAlreadyPresent";
import axios from "axios";
import { APIURL } from "./apiurl";

export const addOrRemoveWatchHistory = async ({
  videoId,
  currentUserId,
  dispatch
}) => {
  try {
    const {
      data: { watchHistoryVideos }
    } = await axios.post(`${APIURL}/watchHistory`, {
      userId: currentUserId,
      videoId: videoId
    });
    dispatch({ type: "GET_HISTORY_VIDEOS", payload: watchHistoryVideos });
    console.log("POST watchHistory", watchHistoryVideos);
  } catch (err) {
    console.log("err adding to watch history...", err);
  }
};
