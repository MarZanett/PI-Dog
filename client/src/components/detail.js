import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail,reloadDetail } from "../actions";
import { Link, useParams } from "react-router-dom";
import "./detail.css";
import Return from "../assets/returnHome.png"

import Huella from "../assets/huella.png";

export default function Detail(props) {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetail(id))
    return ()=>{
      dispatch(reloadDetail())
    }
  },
   [dispatch, id]);
  const dogs = useSelector((state) => state.detail);

  return (
    <div>

      <div className="home-container">
      
        <Link to="/home">
          <img src={Return} alt="not img" className="detail-return" />
        </Link>
      </div>
      <div className="detail-container">
        {dogs.length > 0 ? (
          <div>
            <h1 className="detail-title">{dogs[0].name}</h1>
            <img
              src={dogs[0].image ? dogs[0].image : Huella}
              alt="not img"
              width="150px"
              height="150px"
            />
            <h3>Life Expectancy: {dogs[0].life_span}</h3>
            <h3>Height: {dogs[0].height_max}cm</h3>
            <h3>Weight: {dogs[0].weight_max}kg</h3>
            <h3 className="detail-temp">
              Temperaments:{" "}
              {!dogs[0].createdInDB
                ? dogs[0].temperament
                : dogs[0].temperaments.map((el) => el.name + "-")}
            </h3>
          </div>
        ) : (
          <p>Loading...</p>
        )}
       
      </div>
    </div>
  );
}
