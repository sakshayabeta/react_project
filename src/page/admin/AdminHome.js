import React from "react";
import { Link, NavLink } from "react-router-dom";
//import { useNavigate } from 'react-router-dom'; 
import { Outlet } from "react-router-dom"; // Use navigate hook for redirection
import './AdminHome.css';
//import { useLocation } from "react-router-dom";

const AdminHome = () => {
  //const navigate = useNavigate();  // Initialize the navigate hook for redirecting after logout
  //const location = useLocation();
  //const params = new URLSearchParams(location.search);
  //const username = params.get('username');
  // Logout function that calls the backend logout API
 /* const userlogout = () => {
    fetch(`http://localhost/ticket_collection/userlogout.php?username=${username}`, {
      method: 'POST',
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === "success") {
          // Redirect to login page after successful logout
          alert(data.message);  // Show the logout success message
          navigate('/');  // Navigate to the login page
        } else {
          alert(data.message);  // Show error message if any
        }
      })
      .catch(error => {
        console.error('Logout error:', error);
        alert('An error occurred. Please try again.');
      });
  };*/

  return (
    <>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-5Ql58MgsaY1Z6wl+F21OwyOtvGhmf4/H/TLO1pE7ME89czDi8UYAYsG0NPFq7TfF" crossorigin="anonymous"/>

    <div className="admin-home">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">Home</Link>
      </nav>

      <div className="sidebar">
        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLink className="nav-link" to='/admin/getallStaff'>Add Staff</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to='/admin/AddCollection'>Show Collection</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link " to='/'>Logout</NavLink> {/* Logout Button */}
          </li>
        </ul>
      </div>

      <div className="content">
        {/* This will render the nested routes */}
        <Outlet />
      </div>
    </div></>
  );
};

export default AdminHome;
