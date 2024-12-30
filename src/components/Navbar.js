import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Navbar(props) {
  // Get the current location
  const location = useLocation();
  const navigate=useNavigate();

  // Helper function to check if the link is active
  const isActive = (path) => {
    return location.pathname === path ? 'nav-link active text-white' : 'nav-link text-white';
  };

  const handleLogout=()=>{
    localStorage.removeItem('token');
    navigate('/login');
    props.showAlert("Logged out Successfully","success");
    }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top" style={{ backgroundColor: '#388e3c' }}>
      <div className="container-fluid">
        {/* Fixed the incorrect string interpolation */}
        <Link className={`navbar-brand text-white ${isActive("/")}`} to="/" style={{ padding: '10px 15px' }}>
          iNotebook
        </Link>
        <button className="navbar-toggler text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex align-items-center">
            {/* Add links here if needed */}
          </ul>
          {!localStorage.getItem('token')?<div className="d-flex">
            <Link to="/signup">
              <button className="btn mx-3" style={{ backgroundColor: '#4caf50', color: 'white' }}>Sign Up</button>
            </Link>
            <Link to="/login">
              <button className="btn" style={{ backgroundColor: '#4caf50', color: 'white' }}>Login</button>
            </Link>
          </div>:<Link>
              <button onClick={handleLogout} className="btn" style={{ backgroundColor: '#4caf50', color: 'white' }}>Logout</button>
            </Link>}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
