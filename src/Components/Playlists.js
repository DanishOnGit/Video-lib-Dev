import { useVideo } from "../Contexts";
import { Link } from "react-router-dom";

export const Playlists =()=>{
  const {
    state: { playlists }
  } = useVideo();

  return (
    <>
    {playlists.length===0 && <h1 className="empty-state">No Playlists added!</h1>}
    <div className="playlists-wrapper">
      {playlists.map((playlist) => {
        return (
          <div>
            <h2 className="playlist-heading">{playlist.listName}</h2>
            <div className="playlist-items-wrapper">
              {playlist.listVideos.map((item) => {
                return (
                  <Link to={`/video/${item.id}`}>
                    <div
                      className="video-item pointer video-item-link"
                      key={item.id}
                    >
                      <img
                        className="thumbnail-img"
                        src={item.thumbnail}
                        alt="thumbnail"
                      />

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
                  </Link>
                );
              })}
            </div>
            <hr />
          </div>
        );
      })}
    </div>
    </>
  );
}
