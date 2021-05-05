import { createContext, useContext, useReducer } from "react";
import { addToPlaylistHandler, checkIfAlreadyPresent } from "../Utilities";

const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "LIKE_VIDEO": {
        const result = checkIfAlreadyPresent(
          state.likedVideos,
          action.payload.id
        );
        if (!result) {
          return {
            ...state,
            likedVideos: [
              ...state.likedVideos,
              { ...action.payload, existsInLikedVideos: true }
            ]
          };
        } else {
          return {
            ...state,
            likedVideos: state.likedVideos.map((item) => {
              if (item.id === action.payload.id) {
                return {
                  ...item,
                  existsInLikedVideos: !item.existsInLikedVideos
                };
              }
              return item;
            })
          };
        }
      }

      case "ADD_TO_WATCH_LATER": {
        return {
          ...state,
          watchLaterVideos: [
            ...state.watchLaterVideos,
            { ...action.payload, existsInWatchLaterVideos: true }
          ]
        };
      }

      case "ADD_TO_HISTORY": {
        return {
          ...state,
          historyVideos: [
            ...state.historyVideos,
            { ...action.payload, existsInHistory: true }
          ]
        };
      }
      case "ADD_TO_PLAYLISTS": {
        const result = state.playlists.map((list) => {
          if (list.listId === action.payload.playlist.listId) {
            return {
              ...list,
              listVideos: [
                ...list.listVideos,
                { ...action.payload.videoDetails }
              ]
            };
          }
          return list;
        });
        return { ...state, playlists: [...result] };
      }
      default:
        return state;
    }
  };
  const initialState = {
    likedVideos: [],
    watchLaterVideos: [],
    historyVideos: [],
    playlists: []
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <VideoContext.Provider value={{ state, dispatch }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = () => {
  return useContext(VideoContext);
};
