import { useVideo } from "../Contexts";
import { Link } from "react-router-dom";
import axios from "axios";
import { APIURL } from "../Utilities";
export const LikedVideos = () => {
  const {
    state: { likedVideos },
    dispatch
  } = useVideo();
  const addOrRemoveLikedVideos = async (videoId) => {
    try {
      const res = await axios({
        method: "POST",
        url: `${APIURL}/likedVideos`,
        data: {
          videoId: videoId
        }
      });

      if (res.status === 201) {
        dispatch({ type: "GET_LIKED_VIDEOS", payload: res.data.likedVideos });
      }
    } catch (err) {
      console.log("error liking video", err);
    }
  };
  return (
    <>
      <h1 className="page-heading">Liked Videos</h1>
      {likedVideos.length === 0 && (
        <h1 className="empty-state">No Liked Videos yet!</h1>
      )}
      <div className="liked-videos-wrapper">
        {likedVideos.map(({ videoId }) => {
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
                onClick={() => addOrRemoveLikedVideos(videoId._id)}
                className="btn btn-link remove-btn"
              >
                <i className="fas fa-times"></i>
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
