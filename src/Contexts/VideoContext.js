import { createContext, useContext, useReducer } from "react";

const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "GET_VIDEOS": {
        return {
          ...state,
          videos: action.payload
        };
      }
      case "GET_LIKED_VIDEOS": {
        return {
          ...state,
          likedVideos: action.payload
        };
      }
      case "GET_WATCH_LATER_VIDEOS": {
        return {
          ...state,
          watchLaterVideos: action.payload
        };
      }
      case "GET_HISTORY_VIDEOS": {
        return {
          ...state,
          historyVideos: action.payload
        };
      }
      case "GET_PLAYLISTS": {
        return {
          ...state,
          playlists: action.payload
        };
      }
      case "CREATE_PLAYLIST": {
        return {
          ...state,
          playlists: [...state.playlists, action.payload]
        };
      }
      case "UPDATE_PLAYLIST": {
        return {
          ...state,
          playlists: state.playlists.map((playlist) => {
            if (playlist._id !== action.payload._id) {
              return playlist;
            }
            return action.payload;
          })
        };
      }
      case "DELETE_PLAYLIST": {
        return {
          ...state,
          playlists: state.playlists.filter(
            (playlist) => playlist._id !== action.payload
          )
        };
      }
      case "RESET_STATES": {
        return {
          ...state,
          likedVideos: [],
          watchLaterVideos: [],
          historyVideos: [],
          playlists: []
        };
      }

      // case "ADD_TO_PLAYLISTS": {
      //   console.log("action payload is ", action.payload);
      //   const result = state.playlists.map((list) => {
      //     if (list.listId === action.payload.playlist.listId) {
      //       return {
      //         ...list,
      //         listVideos: list.listVideos.find(
      //           (video) => video.id === action.payload.videoDetails.id
      //         )
      //           ? list.listVideos.filter(
      //               (video) => video.id !== action.payload.videoDetails.id
      //             )
      //           : [
      //               ...list.listVideos,
      //               { ...action.payload.videoDetails, existsInPlaylist: true }
      //             ]
      //       };
      //     }
      //     return list;
      //   });
      //   return { ...state, playlists: [...result] };
      // }
      // case "DELETE_PLAYLIST": {
      //   return {
      //     ...state,
      //     playlists: state.playlists.filter(
      //       (playlist) => playlist.listId !== action.payload
      //     )
      //   };
      // }
      // case "UPDATE_PLAYLIST_NAME": {
      //   return {
      //     ...state,
      //     playlists: state.playlists.map((playlist) => {
      //       if (playlist.listId === action.payload.listId) {
      //         return { ...playlist, listName: action.payload.listHeading };
      //       }
      //       return playlist;
      //     })
      //   };
      // }
      default:
        return state;
    }
  };
  const initialState = {
    videos: [],
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
