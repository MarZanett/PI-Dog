import React from "react";
import Huella from "../assets/huella.png"
import "./card.css"

export default function Card({image,name,temperament,life_span,height_max,weight_max}) {
  return( 
  <div className="card-home">
  
    <h1 className="card-title">{name}</h1>
    <img src={image} alt={Huella} width = "200px" height = "250px"/>
    <p>Life Expectancy: {life_span}</p>
    <p>Height: {height_max}cm</p>
    <p>Weight: {weight_max}kg</p>
    <p className="card-temp">Temperaments: {temperament}</p>
    
  </div>)
}
