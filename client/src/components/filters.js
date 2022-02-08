import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTemperaments,
  orderByName,
  orderByWeight,
  getDogs,
  filterTemp,
  createdOrExists,
} from "../actions";

import "./filter.css"

export default function Filters({
  setCurrentPage,
  setOrderName,
  setOrderWeight,
  setOrderCreated,
  setOrderTemperament
}) {
  const dispatch = useDispatch();
  const allTempe = useSelector((state) => state.temperaments);
  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);
  // console.log(allTempe)

  function handlerOrderByName(evt) {
    evt.preventDefault();
    dispatch(orderByName(evt.target.value));
    console.log(evt.target.value);
    setCurrentPage(1);
    setOrderName(`Sorted ${evt.target.value}`);
  }

  function handlerOrderByWeight(evt) {
    evt.preventDefault();
    dispatch(orderByWeight(evt.target.value));
    console.log(evt.target.value);
    setCurrentPage(1);
    setOrderWeight(`Sorted ${evt.target.value}`);
  }

  function handleClick(evt) {
    evt.preventDefault();
    dispatch(getDogs());
    
  }

  function handleFilterTemp(evt){
    evt.preventDefault();
    dispatch(filterTemp(evt.target.value));
    setCurrentPage(1);
    setOrderTemperament(`Sorted ${evt.target.value}`);
  }

  function handleFilterCreated(evt){
    evt.preventDefault();
    dispatch(createdOrExists(evt.target.value));
    setCurrentPage(1);
    setOrderCreated(`Sorted ${evt.target.value}`);
  }

  return (
    <div>
      <div className="container-filters">
        <label className="label-filter">Order by Name</label>
        <select onChange={(evt) => handlerOrderByName(evt)}>
          <option onChange={(evt) => handleClick(evt)} value="def">
            Default
          </option>
          <option value="abc">Ascendent(A-Z)</option>
          <option value="zyx">Descendent(Z-A)</option>
        </select>
      </div>

      <div className="container-filters">
        <label className="label-filter">Order by Weight: </label>
        <select onChange={(evt) => handlerOrderByWeight(evt)}>
          <option value="def">Default</option>
          <option value="asc">Ascendent(min-max)</option>
          <option value="des">Descendent(max-min)</option>
        </select>
      </div>

      <div className="container-filters">
        <label className="label-filter">Filter by Temperament: </label>
        <select onChange={(evt) => handleFilterTemp(evt)}>
          <option value="all">All</option>
          {allTempe.map((el) => {
            return (
              <option key={el.id + 1} value={el.name}>
                {el.name}
              </option>
            );
          })}
        </select>
      </div>

      <div className="container-filters">
        <label className="label-filter">Existing or Created: </label>
        <select onChange={(evt) => handleFilterCreated(evt)}>
          <option value="all">All</option>
          <option value="api">Existing</option>
          <option value="created">Created</option>
        </select>
      </div>
    </div>
  );
}
