
function checkIfPresentInPlaylist(playlistsArray,playlist,videoDetails){
 let selectedPlaylist = playlistsArray.find(item=>item.listId===playlist.listId)
 
console.log("logging listVideos array...",selectedPlaylist)
const videoObject= selectedPlaylist?.listVideos.find(video=>video.id===videoDetails.id)
console.log({videoObject});
 return videoObject;
}


export function addToPlaylistHandler(playlists,dispatch,playlist,videoDetails){
  
  const result = checkIfPresentInPlaylist(playlists,playlist,videoDetails);
  if(!result){
    
    dispatch({type:"ADD_TO_PLAYLISTS",payload:{videoDetails,playlist}})
    // dispatch({type:"ADD_TO_PLAYLISTS",payload:playlist})

  }
  
}



// [
//   {
//     listName: "My playlist",
//     listId: uuidv4(),
//     listVideos: [
//       {
//         id: "v=MsHMCZlcrXM",
//         videoTitle: "Basic badminton for beginners - PART 1 OF 3",
//         channelName: "Shuttle Life",
//         level: "Beginner",
//         thumbnail:
//           "https://i.postimg.cc/KvwSPfLg/salman-hossain-saif-24z-MNig-Ma5-A-unsplash.jpg",
//         avatar:
//           "https://i.postimg.cc/hhr25Svj/salman-hossain-saif-n-Lerr-P856-o-unsplash.jpg"
//       }
//     ]
//   }
// ];