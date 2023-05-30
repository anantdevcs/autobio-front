import React from 'react';
import './Navbar.css'

const Navbar = () => {
  const ppicUrl =  localStorage.getItem("photoUrl");

  return (
    <nav>
      <div className="left">
        <span>Autobio</span>
      </div>
      <div className="center">
        <span>Home</span>
        <span>Write</span>
      </div>
      <div className="right">
        <img src={ppicUrl} alt="Profile Icon" />
      </div>
    </nav>
  );
};

export default Navbar;
