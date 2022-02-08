import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs } from "../actions";
import { Link } from "react-router-dom";
import DogCreated from "./dogCreated";

export default function Reload(){
    const dispatch = useDispatch();

    function handleClick(evt){
        evt.preventDefault();
        dispatch(getDogs());
    }
  
    return (
  
      <div>
        <button onClick={(evt =>{handleClick(evt)})}>Reload Dogs</button>
        
      </div>
    );
}