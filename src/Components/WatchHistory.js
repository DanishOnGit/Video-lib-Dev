import { useVideo } from "../Contexts";
import { Link } from "react-router-dom";

export const WatchHistory = () => {
  const {
    state: { historyVideos }
  } = useVideo();

  const getFilteredVideos = (historyVideos) => {
    return historyVideos.filter((item) => item.existsInHistory);
  };

  const filteredHistoryVideos = getFilteredVideos(historyVideos);
  return (
    <>
    {historyVideos.length===0 && <h1 className="empty-state">No videos seen yet!</h1>}
    <div className="history-videos-wrapper">
      {filteredHistoryVideos.map((item) => {
        return (
          <div className="video-item" key={item.id}>
            <Link to={`/video/${item.id}`}>
              {" "}
              <img
                className="thumbnail-img"
                src={item.thumbnail}
                alt="thumbnail"
              />{" "}
            </Link>
            <div className="video-description">
              <div class="avatar-wrapper-small">
                <img class="avatar-small" src={item.avatar} alt="avatar" />
              </div>
              <h4>{item.videoTitle}</h4>
              <p className="small">{item.channelName}</p>
              <p>{item.level}</p>
            </div>
          </div>
        );
      })}
    </div>
    </>
  );
};
