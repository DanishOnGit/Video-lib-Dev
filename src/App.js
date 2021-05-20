import "./styles.css";
import {
  Navbar,
  Home,
  Signup,
  Login,
  LikedVideos,
  WatchLater,
  WatchHistory,
  Playlists,
  VideoPlayer,
  PageNotFound
} from "./Components";
import { PrivateRoute } from "./PrivateRoute";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useAuth, useVideo } from "./Contexts";
import { APIURL } from "./Utilities";

export default function App() {
  const { isLoggedIn, currentUserId } = useAuth();
  const {
    state: { playlists },
    dispatch
  } = useVideo();
  console.log("App js playlista rea...", playlists);
  useEffect(() => {
    if (isLoggedIn) {
      (async function () {
        try {
          console.log({ isLoggedIn });

          const {
            data: { likedVideos, watchLaterVideos, watchHistoryVideos },
            status
          } = await axios({
            method: "GET",
            url: `${APIURL}/users/${currentUserId}`
          });

          console.log(
            "GET whole arrays...",
            likedVideos,
            watchHistoryVideos,
            watchLaterVideos
          );
          if (status === 200) {
            dispatch({ type: "GET_LIKED_VIDEOS", payload: likedVideos });
            dispatch({
              type: "GET_WATCH_LATER_VIDEOS",
              payload: watchLaterVideos
            });
            dispatch({
              type: "GET_HISTORY_VIDEOS",
              payload: watchHistoryVideos
            });
          }
        } catch (err) {
          console.log("GET req error is", err);
        }
      })();

      (async function () {
        try {
          const {
            data: { playlists },
            status
          } = await axios.get(`${APIURL}/users/${currentUserId}/playlists`);
          if (status === 200) {
            dispatch({ type: "GET_PLAYLISTS", payload: playlists });
          }
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    (async function () {
      try {
        const {
          data: { videos }
        } = await axios.get(`${APIURL}/videos`);
        dispatch({ type: "GET_VIDEOS", payload: videos });
      } catch (err) {
        console.log("error getting videos", err);
      }
    })();
  }, []);

  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/video/:videoId" element={<VideoPlayer />} />
        <PrivateRoute path="/likedVideos" element={<LikedVideos />} />
        <PrivateRoute path="/watchLaterVideos" element={<WatchLater />} />
        <PrivateRoute path="/watchHistory" element={<WatchHistory />} />
        <PrivateRoute path="/playlists" element={<Playlists />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}
