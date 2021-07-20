import { useAuth } from "../Contexts";
import { NavLink } from "react-router-dom";
import { Searchbar } from "./SearchBar";
import logo from "../images/logo-white.svg";
import { SearchBarModal } from "./SearchBarModal";
import { useState } from "react";
export const Navbar = ({ searchText, setSearchText }) => {
  const [searchModal, setSearchModal] = useState("none");
  const { userToken, logoutHandler } = useAuth();

  return (
    <div>
      <nav className="nav-wrapper-3">
        <div className="logoAndList-wrapper">
          <NavLink to="/" className="side-nav-link">
            <div className="brand">
              <img src={logo} alt="logo" height="50px" width="80px" />
            </div>
          </NavLink>
        </div>
        <div className="search-modal-icon">
          <SearchBarModal
            searchModal={searchModal}
            setSearchModal={setSearchModal}
            searchText={searchText}
            setSearchText={setSearchText}
          />
          <i
            className="fas fa-search"
            onClick={() => setSearchModal("block")}
          ></i>
        </div>

        <div className="nav-listItems-wrapper">
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
        <NavLink to="/login" className="side-nav-link mobile-view-login-btn">
          <button
            onClick={() => logoutHandler()}
            className="btn btn-primary padded"
          >
            {userToken ? "Logout" : "Login"}
          </button>
        </NavLink>
      </nav>
    </div>
  );
};
