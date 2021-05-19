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
  const { dispatch } = useVideo();

  useEffect(() => {
    (async function () {
      try {
        console.log({ isLoggedIn });

        if (isLoggedIn) {
          const {
            data: { likedVideos, watchLaterVideos, watchHistoryVideos },
            status
          } = await axios({
            method: "GET",
            url: `${APIURL}/users/${currentUserId}`
          });

          console.log("GET whole arrays...", likedVideos, watchHistoryVideos);
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
        }
      } catch (err) {
        console.log("GET req error is", err);
      }
    })();
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
        <Route path="/playlists" element={<Playlists />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}
