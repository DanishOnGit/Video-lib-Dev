import { useState } from "react";
import { useVideo } from "../Contexts";
import { v4 as uuidv4 } from "uuid";
import { addToPlaylistHandler } from "../Utilities";


const UserPlaylists = ({ playlist, videoDetails }) => {
  const {
    state: { playlists },
    dispatch
  } = useVideo();

  return (
    <li>
      <input
        onChange={() =>
          addToPlaylistHandler(playlists, dispatch, playlist, videoDetails)
        }
        id={playlist.listId}
        type="checkbox"
      />
      <label htmlFor={playlist.listId}>{playlist.listName}</label>
    </li>
  );
}

export const PlaylistModal = ({ display, setDisplay, videoDetails }) => {
  const [playlistName, setPlaylistName] = useState("");

  const {
    state: { playlists }
  } = useVideo();

  function createNewPlaylist(playlistName) {
    playlists.push({
      listName: playlistName,
      listId: uuidv4(),
      listVideos: []
    });
    setPlaylistName("");
  }

  return (
    <div
      className="modal-wrapper "
      style={{ width: "25rem", height: "auto", display: display }}
    >
      <div className="modal-header">
        <h2>Add to Playlist</h2>
      </div>
      <div className="modal-body">
        <ul className="list-non-bullet">
          {playlists.map((playlist) => {
            return (
              <UserPlaylists
                playlist={playlist}
                videoDetails={videoDetails}
                key={playlist.listId}
              />
            );
          })}
        </ul>
        <div>
          <input
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            type="text"
            placeholder="Add new playlist"
          />
          <button
            disabled={playlistName === ""}
            onClick={() => createNewPlaylist(playlistName)}
            className="btn btn-primary"
          >
            <i className="fas fa-plus"></i>
          </button>
        </div>
      </div>
      <div className="modal-footer">
        <button
          onClick={() => setDisplay("none")}
          className="btn btn-outline-secondary"
          id="closeMe"
        >
          Close
        </button>
      </div>
    </div>
  );
}
