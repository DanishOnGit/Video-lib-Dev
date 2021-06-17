import { useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { PlaylistModal } from "./PlaylistModal";
import { NotesForm } from "./NotesForm";
import { useAuth, useVideo } from "../Contexts";
import {
  addOrRemoveWatchHistory,
  APIURL,
  checkIfAlreadyPresent,
  toggleColor
} from "../Utilities";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

export const VideoPlayer = () => {
  const [display, setDisplay] = useState("none");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const videoRef = useRef(null);
  const { videoId } = useParams();
  const {
    state: { likedVideos, watchLaterVideos, historyVideos },
    dispatch
  } = useVideo();

  const { userToken } = useAuth();

  useEffect(() => {
    (async function () {
      try {
        const {
          data: { video }
        } = await axios.get(`${APIURL}/videos/${videoId}`);

        setSelectedVideo(video);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const addOrRemoveLikedVideos = async () => {
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
      console.log("err liking video", err);
    }
  };
  const addOrRemoveWatchLater = async () => {
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
      console.log("err liking video", err);
    }
  };

  return (
    <>
      {selectedVideo && (
        <>
          {" "}
          <div className="video-player-wrapper">
            <PlaylistModal
              display={display}
              setDisplay={setDisplay}
              videoDetails={selectedVideo}
            />
            <div>
              <div className="react-player-wrapper">
                <ReactPlayer
                  ref={videoRef}
                  width="100%"
                  height="100%"
                  onStart={() => {
                    if (!checkIfAlreadyPresent(historyVideos, videoId)) {
                      addOrRemoveWatchHistory({
                        videoId,
                        dispatch,
                        userToken
                      });
                    }
                  }}
                  controls={true}
                  url={`https://www.youtube.com/watch?${videoId}`}
                />
              </div>
              <div className="interactions-wrapper">
                <ul className="list-items-flex list-non-bullet spaced">
                  <li>
                    <i
                      onClick={() =>
                        userToken
                          ? addOrRemoveLikedVideos()
                          : toast.error("Log in to perform this action", {
                              position: "top-right",
                              autoClose: 2000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: false,
                              draggable: true,
                              progress: undefined
                            })
                      }
                      className="fas fa-thumbs-up pointer"
                      style={{ color: toggleColor(likedVideos, videoId) }}
                    ></i>
                  </li>
                  <li>
                    <i
                      onClick={() =>
                        userToken
                          ? setDisplay("block")
                          : toast.error("Log in to perform this action", {
                              position: "top-right",
                              autoClose: 2000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: false,
                              draggable: true,
                              progress: undefined
                            })
                      }
                      className="fas fa-list pointer"
                    ></i>
                  </li>
                  <li>
                    <i
                      onClick={() =>
                        userToken
                          ? addOrRemoveWatchLater()
                          : toast.error("Log in to perform this action", {
                              position: "top-right",
                              autoClose: 2000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: false,
                              draggable: true,
                              progress: undefined
                            })
                      }
                      className="fas fa-clock pointer"
                      style={{ color: toggleColor(watchLaterVideos, videoId) }}
                    ></i>
                  </li>
                </ul>
              </div>
            </div>
            <NotesForm videoRef={videoRef} />
          </div>
        </>
      )}
    </>
  );
};
