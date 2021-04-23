import { NavLink } from "react-router-dom";
export function Navbar() {
  return (
    <div>
      <nav className="nav-wrapper-3">
        <div className="logoAndList-wrapper">
          <NavLink to="/" className="side-nav-link">
            <div className="brand">One-View</div>
          </NavLink>
        </div>
        
        
      </nav>
    </div>
  );
}
