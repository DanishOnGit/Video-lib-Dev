export const videoDataReducer = (state, action) => {
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
    case "GET_WATCH_HISTORY_VIDEOS": {
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

    default:
      return state;
  }
};
