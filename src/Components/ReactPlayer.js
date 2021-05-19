import { useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { PlaylistModal } from "./PlaylistModal";
import { NotesForm } from "./NotesForm";
import { allVideos } from "../Database";
import { useAuth, useVideo } from "../Contexts";
import {
  addOrRemoveWatchHistory,
  APIURL,
  checkIfAlreadyPresent,
  toggleColor
} from "../Utilities";
import { useEffect, useState } from "react";
import axios from "axios";

export const VideoPlayer = () => {
  const [display, setDisplay] = useState("none");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const { videoId } = useParams();
  const {
    state: { likedVideos, watchLaterVideos, historyVideos },
    dispatch
  } = useVideo();

  const { currentUserId } = useAuth();

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
      console.log("tryng to like video..", currentUserId);
      const res = await axios.post(`${APIURL}/likedVideos`, {
        userId: currentUserId,
        videoId: videoId
      });
      if (res.status === 201) {
        dispatch({ type: "GET_LIKED_VIDEOS", payload: res.data.likedVideos });
      }
      console.log("POST likedvideos,", res);
    } catch (err) {
      console.log("err liking video", err);
    }
  };
  const addOrRemoveWatchLater = async () => {
    try {
      console.log("tryng to like video..", currentUserId);
      const res = await axios.post(`${APIURL}/watchLater`, {
        userId: currentUserId,
        videoId: videoId
      });
      if (res.status === 201) {
        dispatch({
          type: "GET_WATCH_LATER_VIDEOS",
          payload: res.data.watchLaterVideos
        });
      }
      console.log("POST watchlater", res);
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
                  width="100%"
                  height="100%"
                  onStart={() => {
                    if (!checkIfAlreadyPresent(historyVideos, videoId)) {
                      addOrRemoveWatchHistory({
                        videoId,
                        currentUserId,
                        dispatch
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
                      onClick={() => addOrRemoveLikedVideos()}
                      className="fas fa-thumbs-up pointer"
                      style={{ color: toggleColor(likedVideos, videoId) }}
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
                      onClick={() => addOrRemoveWatchLater()}
                      className="fas fa-clock pointer"
                      style={{ color: toggleColor(watchLaterVideos, videoId) }}
                    ></i>
                  </li>
                </ul>
              </div>
            </div>
            <NotesForm />
          </div>
        </>
      )}
    </>
  );
};
