import { useState } from "react";
import { useAuth, useVideo } from "../Contexts";
import {
  addOrRemovePlaylist,
  APIURL,
  checkIfAlreadyPresent
} from "../Utilities";
import axios from "axios";

const UserPlaylists = ({ playlist, videoDetails }) => {
  const { dispatch } = useVideo();
  const { userToken } = useAuth();
  return (
    <li>
      <input
        onChange={() =>
          addOrRemovePlaylist({
            dispatch,
            playlistId: playlist._id,
            videoId: videoDetails._id,
            userToken: userToken
          })
        }
        id={playlist._id}
        type="checkbox"
        checked={checkIfAlreadyPresent(playlist.listVideos, videoDetails._id)}
      />
      <label htmlFor={playlist._id}>{playlist.listName}</label>
    </li>
  );
};

export const PlaylistModal = ({ display, setDisplay, videoDetails }) => {
  const [playlistName, setPlaylistName] = useState("");

  const {
    state: { playlists },
    dispatch
  } = useVideo();

  async function createNewPlaylist(playlistName) {
    try {
      const {
        data: { playlist }
      } = await axios({
        method: "POST",
        url: `${APIURL}/playlists`,
        data: { listName: playlistName }
      });

      dispatch({ type: "CREATE_PLAYLIST", payload: playlist });
      setPlaylistName("");
    } catch (err) {
      console.log(err);
    }
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
                key={playlist._id}
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
};
