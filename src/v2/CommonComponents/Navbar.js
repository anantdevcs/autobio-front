import React from 'react';
import './Navbar.css';

const Navbar = () => {
  const ppicUrl = localStorage.getItem("photoUrl");
  const hasHomeInUrl = window.location.href.includes("home");

  return (
    <nav className="navbar">
      <div className="left">
        <span>Autobio</span>
      </div>
      <div className="center">
        {hasHomeInUrl ? (
          <div>
            <b><span>Home</span></b>
            <span>Write</span>
          </div>
        ) : (
          <div>
            <span>Home</span>
            <b><span>Write</span></b>
          </div>
        )}
      </div>
      <div className="right">
        <img src={ppicUrl} alt="Profile Icon" />
      </div>
    </nav>
  );
};

export default Navbar;
