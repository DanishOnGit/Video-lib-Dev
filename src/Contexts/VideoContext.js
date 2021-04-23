import { createContext, useContext, useReducer } from "react";
import {addToPlaylistHandler} from "../Utilities";
// import {reducer} from "./Contexts";

const VideoContext=createContext();

export const VideoProvider= ({children})=> {

  const reducer=(state,action)=>{
    switch(action.type){
      case "LIKE_VIDEO":{
       return {...state,likedVideos:[...state.likedVideos,{...action.payload,existsInLikedVideos:true}]}
      }
      case "ADD_TO_WATCH_LATER":{
        return {...state,watchLaterVideos:[...state.watchLaterVideos,{...action.payload,existsInWatchLaterVideos:true}]}
       }
      
       case "ADD_TO_HISTORY":{
         return {...state,historyVideos:[...state.historyVideos,{...action.payload,existsInHistory:true}]}
        }
        case "ADD_TO_PLAYLISTS":{
                     console.log("action payload is ",action.payload)
          // const returnedValue= addToPlaylistHandler(state.playlists,action.payload);
          // if(!returnedValue){}

            // map thru paylist Array. Then find the playlist which matches input checbox Id

              const result = state.playlists.map(list=>{
                 if(list.listId===action.payload.playlist.listId){
                   return {...list,listVideos:[...list.listVideos,{...action.payload.videoDetails}]}
                 }
                 return list;
              })
              return {...state,playlists:[...result]}
          
            // return {...state,playlists:[...state.playlists,{...action.payload,existsInPlaylist:true}]}
          
          // return {...state,playlists:[...state.playlists,{...action.payload,existsInPlaylist:false}]}
          
        }
      default:
          return state
    }
  } 
  const initialState={likedVideos:[],
  watchLaterVideos:[],
historyVideos:[],
playlists:[]
}

const [state,dispatch]=useReducer(reducer,initialState)
return (<VideoContext.Provider value={{state,dispatch}}>
  {children}
  </VideoContext.Provider>)
}

export const useVideo=()=>{
  return useContext(VideoContext)
}