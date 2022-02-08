import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs } from "../actions";
import { Link } from "react-router-dom";
import "./navBar.css"

export default function Navbar() {

  return (
    <div className="navbar-container">
    <h1>paw-radise</h1>
      <Link to="/dogs">
        <button>Create Dog</button>
      </Link>
    </div>
  );
}
