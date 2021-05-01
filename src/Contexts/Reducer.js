import ReactPlayer from 'react-player/youtube'

import {Routes,Route} from "react-router-dom";
export const reducer=(state,action)=>{
  switch(action.type){
    case "SHOW_VIDEO":{
      return <Route to="/video/:videoId" element={<ReactPlayer controls={true}  url='https://www.youtube.com/watch?v=ysz5S6PUM-U' />} />
      
    }
    default:
        return state
  }
} 