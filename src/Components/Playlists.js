import { useVideo } from "../Contexts";
import { Link } from "react-router-dom";
import { addOrRemovePlaylist, APIURL } from "../Utilities";
import { useState } from "react";
import axios from "axios";

const PlaylistCard = ({ playlist }) => {
  const [listHeading, setListHeading] = useState(playlist.listName);
  const [editMode, setEditMode] = useState(false);
  const { dispatch } = useVideo();
  const deletePlaylist = async () => {
    try {
      const {
        data: { playlist: playlistFromResponse }
      } = await axios({
        method: "DELETE",
        url: `${APIURL}/playlists/${playlist._id}`
      });

      dispatch({ type: "DELETE_PLAYLIST", payload: playlistFromResponse._id });
    } catch (err) {
      console.log(err);
    }
  };

  const updatePlaylistName = async () => {
    try {
      const {
        data: { playlist: playlistFromResponse }
      } = await axios({
        method: "POST",
        url: `${APIURL}/playlists/${playlist._id}`,
        data: {
          listName: listHeading
        }
        // headers: {
        //   userToken: userToken
        // }
      });

      dispatch({ type: "UPDATE_PLAYLIST", payload: playlistFromResponse });

      setEditMode(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div style={{ textAlign: "left" }}>
      {!editMode ? (
        <>
          <h2 className="playlist-heading">{playlist.listName}</h2>{" "}
          <button
            className="btn-icon btn-icon-hover mg-1"
            onClick={() => setEditMode(true)}
          >
            {" "}
            <i className="far fa-edit"></i>
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            value={listHeading}
            onChange={(e) => setListHeading(e.target.value)}
          />
          <button
            className="btn-icon btn-icon-hover mg-1"
            onClick={() => updatePlaylistName()}
          >
            <i className="fas fa-check"></i>
          </button>
        </>
      )}
      <button
        className="btn-icon btn-icon-hover mg-1"
        onClick={() => deletePlaylist()}
      >
        <i className="far fa-trash-alt"></i>
      </button>
      <div className="playlist-items-wrapper">
        {playlist.listVideos.map(({ videoId }) => {
          return (
            <div
              className="video-item pointer video-item-link pos-rel"
              key={videoId._id}
            >
              <Link to={`/video/${videoId._id}`}>
                <img
                  className="thumbnail-img"
                  src={videoId.thumbnail}
                  alt="thumbnail"
                />
              </Link>
              <button
                onClick={() =>
                  addOrRemovePlaylist({
                    dispatch,
                    playlistId: playlist._id,
                    videoId: videoId._id
                  })
                }
                className="btn btn-secondary remove-btn"
              >
                {" "}
                <i className="fas fa-times "></i>
              </button>

              <Link to={`/video/${videoId._id}`} className="styled">
                {" "}
                <div className="video-description">
                  <div class="avatar-wrapper-small">
                    <img
                      class="avatar-small"
                      src={videoId.avatar}
                      alt="avatar"
                    />
                  </div>
                  <h4>{videoId.videoTitle}</h4>
                  <p className="small">{videoId.channelName}</p>
                  <p>{videoId.level}</p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};
export const Playlists = () => {
  const {
    state: { playlists }
  } = useVideo();
  return (
    <>
      {playlists.length === 0 && (
        <h1 className="empty-state">No Playlists added!</h1>
      )}
      <div className="playlists-wrapper">
        {playlists.map((playlist) => {
          return <PlaylistCard playlist={playlist} />;
        })}
      </div>
    </>
  );
};
