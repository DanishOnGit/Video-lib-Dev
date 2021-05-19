import { useState } from "react";
import { useAuth, useVideo } from "../Contexts";
import { v4 as uuidv4 } from "uuid";
import { addOrRemovePlaylist, APIURL } from "../Utilities";
import axios from "axios";

const UserPlaylists = ({ playlist, videoDetails }) => {
  const {
    state: { playlists },
    dispatch
  } = useVideo();

  return (
    <li>
      <input
        onChange={() =>
          addOrRemovePlaylist({
            dispatch,
            playlistId: playlist._id,
            videoId: videoDetails._id
          })
        }
        id={playlist._id}
        type="checkbox"
        checked={playlist.listVideos.find(
          (video) => video.id === videoDetails.id
        )}
      />
      <label htmlFor={playlist._id}>{playlist.listName}</label>
    </li>
  );
};

export const PlaylistModal = ({ display, setDisplay, videoDetails }) => {
  const [playlistName, setPlaylistName] = useState("");
  const { currentUserId } = useAuth();
  const {
    state: { playlists },
    dispatch
  } = useVideo();
  console.log("playlists are...", playlists);
  async function createNewPlaylist(playlistName) {
    try {
      const {
        data: { playlist }
      } = await axios.post(`${APIURL}/playlists`, {
        listName: playlistName,
        userId: currentUserId
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
