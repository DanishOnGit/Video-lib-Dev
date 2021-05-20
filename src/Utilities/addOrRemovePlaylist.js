import axios from "axios";
import { APIURL } from "./apiurl";

export const addOrRemovePlaylist = async ({
  dispatch,
  playlistId,
  videoId
}) => {
  try {
    const {
      data: { playlist }
    } = await axios.post(`${APIURL}/playlists/${playlistId}/videos`, {
      videoId
    });
    console.log("playlist is...", playlist);
    dispatch({ type: "UPDATE_PLAYLIST", payload: playlist });
  } catch (err) {
    console.log(err);
  }
};
