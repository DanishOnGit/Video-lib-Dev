import { useVideo } from "../Contexts"
import {Link} from "react-router-dom";

export const LikedVideos=()=>{

  const {state:{likedVideos}}=useVideo();

const getFilteredVideos=(likedVideos)=>{
return likedVideos.filter(item=>item.existsInLikedVideos)
}

  const filterLikedVideos=getFilteredVideos(likedVideos)
 
  return (
    <div className="liked-videos-wrapper">
      {filterLikedVideos.map(item=>{
         return <div  className="video-item" key={item.id}>
         <Link to={`/video/${item.id}`}> <img style={{width:"100%",height:"50%"}} src={item.thumbnail} alt="thumbnail"/> </Link>
          <div className="video-description">
          <div class="avatar-wrapper-small">
      <img
        class="avatar-small"
        src={item.avatar}
        alt="avatar"
      />
    </div>
            <h4>{item.videoTitle}</h4>
<p className="small">{item.channelName}</p>
<p>{item.level}</p>
          </div>
    </div>
      })}
      
    </div>
  )
}