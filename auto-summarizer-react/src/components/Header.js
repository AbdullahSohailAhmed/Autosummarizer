import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1>AutoSummarizer</h1>
      </div>
      <div className="navbar-right">
        <Link to="/">Home</Link>
      </div>
    </nav>
  );
};

export default Header;
