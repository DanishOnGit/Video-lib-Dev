import { NavLink, Link } from "react-router-dom";
import { useVideo } from "../Contexts";
import { allVideos } from "../Database";

export const Home = () => {
  const {
    state: { videos }
  } = useVideo();
  return (
    <div className="home-wrapper">
      <aside className="home-wrapper__aside">
        <ul className="home-wrapper__aside__list">
          <NavLink to="/" className="side-nav-link">
            <li className="pointer">
              <i className="fas fa-home pointer"></i>
              <span className="list-item-title">Home</span>
            </li>
          </NavLink>

          <NavLink to="/watchHistory" className="side-nav-link">
            <li className="pointer">
              <i class="fas fa-history pointer"></i>
              <span className="list-item-title">History</span>
            </li>
          </NavLink>

          <NavLink to="/playlists" className="side-nav-link">
            <li className="pointer">
              <i class="fas fa-list pointer"></i>
              <span className="list-item-title">Playlists</span>
            </li>
          </NavLink>

          <NavLink to="/watchLaterVideos" className="side-nav-link">
            <li className="pointer">
              <i class="fas fa-clock pointer"></i>
              <span className="list-item-title">Watch later</span>
            </li>
          </NavLink>

          <NavLink to="/likedVideos" className="side-nav-link">
            <li className="pointer">
              <i class="fas fa-thumbs-up pointer"></i>
              <span className="list-item-title">Liked videos</span>
            </li>
          </NavLink>
        </ul>
      </aside>
      <main className="home-wrapper__main">
        {videos.map((item) => {
          return (
            <Link to={`/video/${item._id}`} className="video-item-link pointer">
              <div className="video-item" key={item._id}>
                <img
                  className="thumbnail-img"
                  src={item.thumbnail}
                  alt="thumbnail"
                />

                <div className="video-description">
                  {/* <div class="avatar-wrapper-small">
                  <img class="avatar-small" src={item.avatar} alt="avatar" />
                </div> */}
                  <h4 className="video-title">{item.videoTitle}</h4>
                  <p className="small description">{item.channelName}</p>
                  <p className="small description">{item.level}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </main>
    </div>
  );
};
