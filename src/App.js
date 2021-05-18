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

export default function App() {
  const { isLoggedIn, currentUserId } = useAuth();
  const { dispatch } = useVideo();

  useEffect(() => {
    (async function () {
      try {
        console.log({ isLoggedIn });
        if (isLoggedIn) {
          const res = await axios.get("http://localhost:3000/likedVideos");
          console.log("GET likedVideos...", res);
          dispatch({ type: "GET_LIKED_VIDEOS", payload: res });
        }
      } catch (err) {
        console.log("GET req eror is", err);
      }
    })();
  }, [isLoggedIn]);

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
