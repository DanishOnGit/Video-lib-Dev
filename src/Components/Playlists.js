import { useVideo } from "../Contexts";
import { Link } from "react-router-dom";
import { addToPlaylistHandler } from "../Utilities";
import { useState } from "react";

const PlaylistCard = ({ playlist }) => {
  const [listHeading, setListHeading] = useState(playlist.listName);
  const [editMode, setEditMode] = useState(false);
  const { dispatch } = useVideo();

  return (
    <div>
      {!editMode ? (
        <>
          <h2 className="playlist-heading">{playlist.listName}</h2>{" "}
          <button onClick={() => setEditMode(true)}>Edit</button>
        </>
      ) : (
        <>
          <input
            type="text"
            value={listHeading}
            onChange={(e) => setListHeading(e.target.value)}
          />
          <button
            onClick={() => {
              setEditMode(false);
              dispatch({
                type: "UPDATE_PLAYLIST_NAME",
                payload: { listHeading, listId: playlist.listId }
              });
            }}
          >
            Save
          </button>
        </>
      )}
      <button
        onClick={() =>
          dispatch({
            type: "DELETE_PLAYLIST",
            payload: playlist.listId
          })
        }
      >
        Delete
      </button>
      <div className="playlist-items-wrapper">
        {playlist.listVideos.map((item) => {
          return (
            <Link to={`/video/${item.id}`}>
              <div className="video-item pointer video-item-link" key={item.id}>
                <img
                  className="thumbnail-img"
                  src={item.thumbnail}
                  alt="thumbnail"
                />
                <button
                  onClick={() => addToPlaylistHandler(dispatch, playlist, item)}
                  className="btn btn-secondary remove-btn"
                >
                  {" "}
                  <i className="fas fa-times "></i>
                </button>

                <div className="video-description">
                  <div class="avatar-wrapper-small">
                    <img class="avatar-small" src={item.avatar} alt="avatar" />
                  </div>
                  <h4>{item.videoTitle}</h4>
                  <p className="small">{item.channelName}</p>
                  <p>{item.level}</p>
                </div>
              </div>
            </Link>
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
