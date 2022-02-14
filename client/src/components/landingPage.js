import React from "react";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import "./landingPage.css";
import Spiner from "./spinner";
import Varios from "../assets/variosDogs.png"
import Muchos from "../assets/muchosDos.png"


export default function LandingPage() {
  return (
    <Fragment>
      <div >
        <div className="container-landing">
          <h1 className="title">Welcome to Pawradise</h1>
          <div className="landing-enter">
            <Link to="/home">
              <button className="btn-landing">Enter</button>
            </Link>
          </div>
          <div>
            <img className="varios-landing" src={Varios} alt="" />
          </div>
          <div>
          <img className="muchos-landing" src={Muchos} alt="" />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
