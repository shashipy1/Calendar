import React from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import './navbar.css';


function Navbar() {

  return (
    <header className="header">
      <nav>
        <Link to="/"></Link>
        <Link to="/login"></Link>
        <Link to="/signup"></Link>
        <Link to="/calemdar"></Link>
        <Button variant="contained">Logout</Button>
      </nav>
    </header>
  );
}

export default Navbar;

