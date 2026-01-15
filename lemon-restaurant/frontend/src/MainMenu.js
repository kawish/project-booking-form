import React from "react";
import { Link } from "react-router-dom";
import "./MainMenu.css";

const MainMenu = () => {
  return (
    <nav className="main-nav">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/menu">Menu</Link></li>
        <li><Link to="/book">Book</Link></li>
      </ul>
    </nav>
  );
};

export default MainMenu;