import { useVideo } from "../Contexts";
import { Link } from "react-router-dom";

export const WatchLater = () => {
  const {
    state: { watchLaterVideos }
  } = useVideo();

  return (
    <>
      {watchLaterVideos.length === 0 && (
        <h1 className="empty-state">All caught up!</h1>
      )}
      <div className="watch-later-videos-wrapper">
        {watchLaterVideos.map(({ videoId }) => {
          return (
            <div className="video-videoId" key={videoId._id}>
              <Link to={`/video/${videoId._id}`}>
                {" "}
                <img
                  className="thumbnail-img"
                  src={videoId.thumbnail}
                  alt="thumbnail"
                />{" "}
              </Link>
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
