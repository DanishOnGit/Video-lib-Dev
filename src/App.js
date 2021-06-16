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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth, useVideo } from "./Contexts";
import { APIURL } from "./Utilities";

export default function App() {
  const { userToken } = useAuth();
  const { dispatch } = useVideo();
  useEffect(() => {
    if (userToken) {
      (async function () {
        try {
          const {
            data: { likedVideos },
            status
          } = await axios({
            method: "GET",
            url: `${APIURL}/likedVideos`
          });

          if (status === 200) {
            dispatch({ type: "GET_LIKED_VIDEOS", payload: likedVideos });
          }
        } catch (error) {
          console.log("GET req error is", error);
        }
      })();
      (async function () {
        try {
          const {
            data: { watchLaterVideos },
            status
          } = await axios({
            method: "GET",
            url: `${APIURL}/watchLater`
          });

          if (status === 200) {
            dispatch({
              type: "GET_WATCH_LATER_VIDEOS",
              payload: watchLaterVideos
            });
          }
        } catch (error) {
          console.log("GET req error is", error);
        }
      })();
      (async function () {
        try {
          const {
            data: { watchHistoryVideos },
            status
          } = await axios({
            method: "GET",
            url: `${APIURL}/watchHistory`
          });

          if (status === 200) {
            dispatch({
              type: "GET_WATCH_HISTORY_VIDEOS",
              payload: watchHistoryVideos
            });
          }
        } catch (error) {
          console.log("GET req error is", error);
        }
      })();

      (async function () {
        try {
          const {
            data: { playlists },
            status
          } = await axios.get(`${APIURL}/playlists`);
          if (status === 200) {
            dispatch({ type: "GET_PLAYLISTS", payload: playlists });
          }
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [userToken]);

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
      <ToastContainer />
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
