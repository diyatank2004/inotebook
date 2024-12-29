import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  // Get the current location
  const location = useLocation();

  // Helper function to check if the link is active
  const isActive = (path) => {
    return location.pathname === path ? 'nav-link active text-white' : 'nav-link text-white';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top" style={{ backgroundColor: '#388e3c' }}>
      <div className="container-fluid">
        <Link className="navbar-brand text-white" to="/">iNotebook</Link>
        <button className="navbar-toggler text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex align-items-center">
            <li className="nav-item">
              <Link className={isActive("/")} to="/" style={{ padding: '10px 15px' }}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={isActive("/about")} to="/about" style={{ padding: '10px 15px' }}>
                About
              </Link>
            </li>
          </ul>
          <div className="d-flex">
            <Link to="/signup">
              <button className="btn mx-3" style={{ backgroundColor: '#4caf50', color: 'white' }}>Sign Up</button>
            </Link>
            <Link to="/login">
              <button className="btn" style={{ backgroundColor: '#388e3c', color: 'white' }}>Login</button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
