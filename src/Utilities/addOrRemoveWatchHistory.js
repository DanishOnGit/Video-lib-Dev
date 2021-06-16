import axios from "axios";
import { APIURL } from "./apiurl";

export const addOrRemoveWatchHistory = async ({ videoId, dispatch }) => {
  try {
    const {
      data: { watchHistoryVideos }
    } = await axios({
      method: "POST",
      url: `${APIURL}/watchHistory`,
      data: {
        videoId: videoId
      }
      // headers: {
      //   userToken: userToken
      // }
    });

    dispatch({ type: "GET_HISTORY_VIDEOS", payload: watchHistoryVideos });
  } catch (err) {
    console.log("err adding to watch history...", err);
  }
};
