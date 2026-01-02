import React from "react";
import "./Navbar.css";
import logo from "../../assets/logo.jpg";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo-wrapper">
          <img src={logo} alt="Company Logo" className="navbar-logo" />
        </div>

        <ul className="navbar-menu">
            <li className="navbar-item"><Link to="/">Home</Link></li>
            <li className="navbar-item"><Link to="/cart">Cart</Link></li>
            <li className="navbar-item"><Link to="/orders">Check-out</Link></li>
        </ul>

       
      </div>
    </nav>
  );
}

export default Navbar;