import { useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { PlaylistModal } from "./PlaylistModal";
import { NotesForm } from "./NotesForm";
import { allVideos } from "../Database";
import { useAuth, useVideo } from "../Contexts";
import { checkIfAlreadyPresent } from "../Utilities";
import { useState } from "react";
import axios from "axios";

export const VideoPlayer = () => {
  const [display, setDisplay] = useState("none");

  const { videoId } = useParams();
  const {
    state: { likedVideos, watchLaterVideos, historyVideos },
    dispatch
  } = useVideo();

  const { currentUserId } = useAuth();

  function toggleColor() {
    const result = checkIfAlreadyPresent(likedVideos, videoId);
    return result?.existsInLikedVideos ? "white" : "grey";
  }
  function toggleWatchLaterColor() {
    const result = checkIfAlreadyPresent(watchLaterVideos, videoId);
    return result?.existsInWatchLaterVideos ? "white" : "grey";
  }

  const videoDetails = allVideos.find((item) => item.id === videoId);

  const addToLikedVideos = async () => {
    try {
      console.log("tryng to like video..", currentUserId);
      const res = await axios.post("http://localhost:3000/likedVideos", {
        _id: currentUserId,
        videoId: videoDetails,
        existsInLikedVideos: true
      });
      console.log("POST likedvideos,", res);
    } catch (err) {
      console.log("err liking video", err);
    }
  };

  return (
    <>
      <div className="video-player-wrapper">
        <PlaylistModal
          display={display}
          setDisplay={setDisplay}
          videoDetails={videoDetails}
        />
        <div>
          <div className="react-player-wrapper">
            <ReactPlayer
              width="100%"
              height="100%"
              onStart={() =>
                !checkIfAlreadyPresent(historyVideos, videoId)
                  ? dispatch({ type: "ADD_TO_HISTORY", payload: videoDetails })
                  : null
              }
              controls={true}
              url={`https://www.youtube.com/watch?${videoId}`}
            />
          </div>
          <div className="interactions-wrapper">
            <ul className="list-items-flex list-non-bullet spaced">
              <li>
                <i
                  // onClick={() =>
                  //   dispatch({ type: "LIKE_VIDEO", payload: videoDetails })
                  // }
                  onClick={() => addToLikedVideos()}
                  className="fas fa-thumbs-up pointer"
                  style={{ color: toggleColor() }}
                ></i>
              </li>
              <li>
                <i
                  onClick={() => setDisplay("block")}
                  className="fas fa-list pointer"
                ></i>
              </li>
              <li>
                <i
                  onClick={() =>
                    dispatch({
                      type: "ADD_TO_WATCH_LATER",
                      payload: videoDetails
                    })
                  }
                  className="fas fa-clock pointer"
                  style={{ color: toggleWatchLaterColor() }}
                ></i>
              </li>
            </ul>
          </div>
        </div>
        <NotesForm />
      </div>
    </>
  );
};
