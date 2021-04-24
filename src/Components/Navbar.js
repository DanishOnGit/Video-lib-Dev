import { NavLink } from "react-router-dom";
export const Navbar = () => {
  return (
    <div>
      <nav className="nav-wrapper-3">
        <div className="logoAndList-wrapper">
          <NavLink to="/" className="side-nav-link">
            <div className="brand">One-View</div>
          </NavLink>
        </div>
        <div>
        <ul className="list-items-flex list-non-bullet responsive-list" id="list-addon-1">
        <NavLink to="/" className="side-nav-link">
          <li className="pointer">
            <i className="fas fa-home pointer"></i>
           
          </li>
        </NavLink>

        <NavLink to="/watchHistory" className="side-nav-link">
          <li className="pointer">
            <i class="fas fa-history pointer"></i>
          </li>
        </NavLink>

        <NavLink to="/playlists" className="side-nav-link">
          <li className="pointer">
            <i class="fas fa-list pointer"></i>
          </li>
        </NavLink>

        <NavLink to="/watchLaterVideos" className="side-nav-link">
          <li className="pointer">
            <i class="fas fa-clock pointer"></i>
          </li>
        </NavLink>

        <NavLink to="/likedVideos" className="side-nav-link">
          <li className="pointer">
            <i class="fas fa-thumbs-up pointer"></i>
          </li>
        </NavLink>
      </ul>
          </div>
        
        
      </nav>
    </div>
  );
}
