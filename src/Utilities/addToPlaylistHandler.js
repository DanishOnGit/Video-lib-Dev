function checkIfPresentInPlaylist(playlistsArray, playlist, videoDetails) {
  let selectedPlaylist = playlistsArray.find(
    (item) => item.listId === playlist.listId
  );

  const videoObject = selectedPlaylist?.listVideos.find(
    (video) => video.id === videoDetails.id
  );

  return videoObject;
}

export function addToPlaylistHandler(
  playlists,
  dispatch,
  playlist,
  videoDetails
) {
  const result = checkIfPresentInPlaylist(playlists, playlist, videoDetails);
  if (!result) {
    dispatch({ type: "ADD_TO_PLAYLISTS", payload: { videoDetails, playlist } });
  }
}
