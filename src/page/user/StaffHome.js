import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Outlet } from 'react-router-dom';  // Import Outlet
import { useLocation } from 'react-router-dom';

import './StaffHome.css';

const StaffHome = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const username = params.get('username');  // Get username from the URL

  const navigate = useNavigate(); // Use useNavigate for programmatic navigation
  
  // Navigate to StaffCollection with username as query param
  const navigateToStaffCollection = () => {
    navigate(`/user/StaffCollection?username=${username}`);
  };

  return (
    <>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-5Ql58MgsaY1Z6wl+F21OwyOtvGhmf4/H/TLO1pE7ME89czDi8UYAYsG0NPFq7TfF" crossorigin="anonymous"/>
    <div className="staff-home">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">Home</Link>
      </nav>

      <div className="sidebar">
        <ul className="nav flex-column">
          {/* Use navigateToStaffCollection function on click */}
          <li className="nav-item">
            <button className="nav-link" onClick={navigateToStaffCollection}>
              Show Collection
            </button>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to='/'>Logout</NavLink>
          </li>
        </ul>
      </div>

      <div className="content">
        <div>
          <h1>Welcome, User!</h1>
          <center><h3>Logged in as: {username}</h3></center>
        </div>
      
        <Outlet />
      </div>
    </div></>
  );
};

export default StaffHome;
