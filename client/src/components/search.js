import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, getByName } from "../actions";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(evt) {
    evt.preventDefault();
    setName(evt.target.value);
  }

  function handleSubmit(evt) {
    if (name === "") {
      evt.preventDefault();
      alert("Enter name please");
    } else {
      evt.preventDefault();
      dispatch(getByName(name.toLowerCase()));
      setName("");
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search by Name"
        value={name}
        onChange={(evt) => handleInputChange(evt)}
      />
      <button type="submit" onClick={(evt) => handleSubmit(evt)}>
        Send
      </button>
    </div>
  );
}
