import { useAuth } from "../Contexts";
import { NavLink } from "react-router-dom";
import { Searchbar } from "./SearchBar";
import logo from "../images/logo-white.svg";
export const Navbar = ({ searchText, setSearchText }) => {
  const { userToken, logoutHandler } = useAuth();
  return (
    <div>
      <nav className="nav-wrapper-3">
        <div className="logoAndList-wrapper">
          <NavLink to="/" className="side-nav-link">
            <div className="brand">
              <img src={logo} alt="logo" height="80px" width="80px" />
            </div>
          </NavLink>
        </div>
        <div>
          <ul
            className="list-items-flex list-non-bullet responsive-list"
            id="list-addon-1"
          >
            <li className="pointer">
              <Searchbar
                searchText={searchText}
                setSearchText={setSearchText}
              />
            </li>
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
                  className="btn btn-primary padded"
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
