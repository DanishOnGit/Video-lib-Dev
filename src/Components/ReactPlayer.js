import { useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { PlaylistModal } from "./PlaylistModal";
import { NotesForm } from "./NotesForm";
import { allVideos } from "../Database";
import { useVideo } from "../Contexts";
import { checkIfAlreadyPresent } from "../Utilities";
import { useState } from "react";

export const VideoPlayer = () => {
  const [display, setDisplay] = useState("none");

  const { videoId } = useParams();
  const {
    state: { likedVideos, watchLaterVideos, historyVideos },
    dispatch
  } = useVideo();

  function toggleColor() {
    const result = checkIfAlreadyPresent(likedVideos, videoId);
    return result?.existsInLikedVideos ? "white" : "grey";
  }

  const videoDetails = allVideos.find((item) => item.id === videoId);

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
                  onClick={() =>
                    dispatch({ type: "LIKE_VIDEO", payload: videoDetails })
                  }
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
                    !checkIfAlreadyPresent(watchLaterVideos, videoId)
                      ? dispatch({
                          type: "ADD_TO_WATCH_LATER",
                          payload: videoDetails
                        })
                      : null
                  }
                  className="fas fa-clock pointer"
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
