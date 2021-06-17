import { useVideo } from "../Contexts";
import { Link } from "react-router-dom";
import { addOrRemoveWatchHistory } from "../Utilities";

export const WatchHistory = () => {
  const {
    state: { historyVideos },
    dispatch
  } = useVideo();

  return (
    <>
      {historyVideos.length === 0 && (
        <h1 className="empty-state">No videos seen yet!</h1>
      )}
      <div className="history-videos-wrapper">
        {historyVideos.map(({ videoId }) => {
          return (
            <div className="video-item" key={videoId._id}>
              <Link to={`/video/${videoId._id}`}>
                {" "}
                <img
                  className="thumbnail-img"
                  src={videoId.thumbnail}
                  alt="thumbnail"
                />{" "}
              </Link>
              <button
                onClick={() =>
                  addOrRemoveWatchHistory({
                    videoId: videoId._id,
                    dispatch
                  })
                }
                className="btn btn-link"
              >
                <i className="fas fa-times"></i>
              </button>
              <div className="video-description">
                <div className="avatar-wrapper-small">
                  <img
                    className="avatar-small"
                    src={videoId.avatar}
                    alt="avatar"
                  />
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
