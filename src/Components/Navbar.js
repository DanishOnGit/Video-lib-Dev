import { useAuth } from "../Contexts";
import { NavLink } from "react-router-dom";
export const Navbar = () => {
  const { userToken, logoutHandler } = useAuth();
  return (
    <div>
      <nav className="nav-wrapper-3">
        <div className="logoAndList-wrapper">
          <NavLink to="/" className="side-nav-link">
            <div className="brand">One-View</div>
          </NavLink>
        </div>
        <div>
          <ul
            className="list-items-flex list-non-bullet responsive-list"
            id="list-addon-1"
          >
            <NavLink to="/" className="side-nav-link">
              <li className="pointer">
                <i className="fas fa-home pointer"></i>
              </li>
            </NavLink>

            <NavLink to="/watchHistory" className="side-nav-link">
              <li className="pointer">
                <i className="fas fa-history pointer"></i>
              </li>
            </NavLink>

            <NavLink to="/playlists" className="side-nav-link">
              <li className="pointer">
                <i className="fas fa-list pointer"></i>
              </li>
            </NavLink>

            <NavLink to="/watchLaterVideos" className="side-nav-link">
              <li className="pointer">
                <i className="fas fa-clock pointer"></i>
              </li>
            </NavLink>

            <NavLink to={`/likedVideos`} className="side-nav-link">
              <li className="pointer">
                <i className="fas fa-thumbs-up pointer"></i>
              </li>
            </NavLink>

            <NavLink to="/login" className="side-nav-link">
              <li className="pointer">
                <button
                  onClick={() => logoutHandler()}
                  className="btn btn-outline-primary"
                >
                  {userToken ? "Logout" : "Login"}
                </button>
              </li>
            </NavLink>
          </ul>
        </div>
      </nav>
    </div>
  );
};
