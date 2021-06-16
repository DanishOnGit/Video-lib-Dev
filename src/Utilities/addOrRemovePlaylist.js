import axios from "axios";
import { APIURL } from "./apiurl";

export const addOrRemovePlaylist = async ({
  dispatch,
  playlistId,
  videoId,
  userToken
}) => {
  try {
    const {
      data: { playlist }
    } = await axios({
      method: "POST",
      url: `${APIURL}/playlists/${playlistId}/videos`,
      data: {
        videoId
      }
      // headers: {
      //   userToken: userToken
      // }
    });

    console.log("playlist is...", playlist);
    dispatch({ type: "UPDATE_PLAYLIST", payload: playlist });
  } catch (err) {
    console.log(err);
  }
};
