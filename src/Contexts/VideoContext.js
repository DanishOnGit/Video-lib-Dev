import { createContext, useContext, useReducer } from "react";
import { videoDataReducer } from "./Reducer";

const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const initialState = {
    videos: [],
    likedVideos: [],
    watchLaterVideos: [],
    historyVideos: [],
    playlists: []
  };

  const [state, dispatch] = useReducer(videoDataReducer, initialState);
  return (
    <VideoContext.Provider value={{ state, dispatch }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = () => {
  return useContext(VideoContext);
};
