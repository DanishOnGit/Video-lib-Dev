// function checkIfPresentInPlaylist(playlistsArray, playlist, videoDetails) {
//   let selectedPlaylist = playlistsArray.find(
//     (item) => item.listId === playlist.listId
//   );

import axios from "axios";
import { APIURL } from "./apiurl";

//   const videoObject = selectedPlaylist?.listVideos.find(
//     (video) => video.id === videoDetails.id
//   );

//   return videoObject;
// }

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
    dispatch({ type: "UPDATE_PLAYLIST", payload: playlist });
  } catch (err) {
    console.log(err);
  }
};
