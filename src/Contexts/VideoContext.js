import { createContext, useContext, useReducer } from "react";
import { checkIfAlreadyPresent } from "../Utilities";

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
        const result = checkIfAlreadyPresent(
          state.watchLaterVideos,
          action.payload.id
        );
        if (!result) {
          return {
            ...state,
            watchLaterVideos: [
              ...state.watchLaterVideos,
              { ...action.payload, existsInwatchLaterVideos: true }
            ]
          };
        } else {
          return {
            ...state,
            watchLaterVideos: state.watchLaterVideos.map((item) => {
              if (item.id === action.payload.id) {
                return {
                  ...item,
                  existsInWatchLaterVideos: !item.existsInWatchLaterVideos
                };
              }
              return item;
            })
          };
        }
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
        console.log("action payload is ", action.payload);
        const result = state.playlists.map((list) => {
          if (list.listId === action.payload.playlist.listId) {
            return {
              ...list,
              listVideos: list.listVideos.find(
                (video) => video.id === action.payload.videoDetails.id
              )
                ? list.listVideos.filter(
                    (video) => video.id !== action.payload.videoDetails.id
                  )
                : [
                    ...list.listVideos,
                    { ...action.payload.videoDetails, existsInPlaylist: true }
                  ]
            };
          }
          return list;
        });
        return { ...state, playlists: [...result] };
      }
      case "DELETE_PLAYLIST": {
        return {
          ...state,
          playlists: state.playlists.filter(
            (playlist) => playlist.listId !== action.payload
          )
        };
      }
      case "UPDATE_PLAYLIST_NAME": {
        return {
          ...state,
          playlists: state.playlists.map((playlist) => {
            if (playlist.listId === action.payload.listId) {
              return { ...playlist, listName: action.payload.listHeading };
            }
            return playlist;
          })
        };
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
