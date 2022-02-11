import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs } from "../actions";
import { Link } from "react-router-dom";
import "./navBar.css"
import Logo from "../assets/pataIcono.png"

export default function Navbar() {

  return (
    <div>

    <div className="navbar-container">
    <h1 className="navbar-title">Pawradise</h1>
    <div>
      <Link to="/dogs">
    <img className="navbar-logo" src={Logo} alt="Logo"  />
      <p className="navbar-p">
        Create Dog
      </p> 
      </Link>
    </div>
    </div>
    </div>
  );
}
