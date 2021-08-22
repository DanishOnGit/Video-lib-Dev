import { useVideo } from "../Contexts";
import { Link } from "react-router-dom";
import { APIURL } from "../Utilities";
import axios from "axios";

export const WatchLater = () => {
  const {
    state: { watchLaterVideos },
    dispatch
  } = useVideo();

  const addOrRemoveWatchLater = async (videoId) => {
    try {
      const res = await axios({
        method: "POST",
        url: `${APIURL}/watchLater`,
        data: {
          videoId: videoId
        }
      });

      if (res.status === 201) {
        dispatch({
          type: "GET_WATCH_LATER_VIDEOS",
          payload: res.data.watchLaterVideos
        });
      }
    } catch (err) {
      console.log("error updating watch later videos", err);
    }
  };

  return (
    <>
      <h1 className="page-heading">Watch Later</h1>
      {watchLaterVideos.length === 0 && (
        <h1 className="empty-state">All caught up!</h1>
      )}
      <div className="watch-later-videos-wrapper">
        {watchLaterVideos.map(({ videoId }) => {
          return (
            <div className="video-videoId pos-rel" key={videoId._id}>
              <Link to={`/video/${videoId._id}`}>
                {" "}
                <img
                  className="thumbnail-img"
                  src={videoId.thumbnail}
                  alt="thumbnail"
                />{" "}
              </Link>
              <button
                onClick={() => addOrRemoveWatchLater(videoId._id)}
                className="btn btn-secondary remove-btn"
              >
                {" "}
                <i className="fas fa-times "></i>
              </button>
              <div className="video-description">
                <div class="avatar-wrapper-small">
                  <img class="avatar-small" src={videoId.avatar} alt="avatar" />
                </div>
                <h4>{videoId.videoTitle}</h4>
                <p className="small">{videoId.channelName}</p>
                <p>{videoId.level}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
