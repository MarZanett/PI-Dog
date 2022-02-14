import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getTemperaments, createDog } from "../actions";
import "./dogCreated.css"
import Tag from "../assets/dog-tag-green.png"
import Return from "../assets/returnHome.png"

function handleValidate(input) {
  let error = {};
  if (!input.name) {
    error.name = "Name required";
  } else if (!input.life_span) {
    error.life_span = "Life Expectancy required";
  } else if (!input.height_min) {
    error.height_min = "Height Min required";
  } else if (!input.height_max) {
    error.height_max = "Height Max required";
  } else if (!input.weight_min) {
    error.weight_min = "Weight Min required";
  } else if (!input.weight_max) {
    error.weight_max = "Weight Max required";
  }
  return error;
}

export default function DogCreate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allTempe = useSelector((state) => state.temperaments);
  const [error, setError] = useState({});
  const [input, setInput] = useState({
    name: "",
    life_span: "",
    height_min: "",
    height_max: "",
    weight_min: "",
    weight_max: "",
    image: "",
    temperament: [],
  });

  useEffect(() => {
    dispatch(getTemperaments());
  }, []);

  function handleChange(evt) {
    evt.preventDefault();
    setInput({
      ...input,
      [evt.target.name]: evt.target.value,
    });
    setError(
      handleValidate({
        ...input,
        [evt.target.name]: evt.target.value,
      })
    );
  }

  function handleSelect(evt) {
    setInput({
      ...input,
      temperament: [...input.temperament, evt.target.value], //Se agrega en un arreglo todo lo seleccionado
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (
      input.name &&
      input.life_span &&
      input.height_min &&
      input.height_max &&
      input.weight_min &&
      input.weight_max &&
      input.temperament.length >= 1 
    ) {
      dispatch(createDog(input));
      alert("¡Dog created!");
      setInput({
        name: "",
        life_span: "",
        height_min: "",
        height_max: "",
        weight_min: "",
        weight_max: "",
        image: "",
        temperament: [],
      });
      navigate("/home");
    } else alert("Please complete the form");
  }

  function handleDelete(el) {
    setInput({
      ...input,
      temperament: input.temperament.filter((tem) => tem !== el),
    });
  }

  return (
    <div className="div-container">

    <div className="home-container">

    <Link to="/home">
          <img src={Return} alt="not img" className="return-button" />
        </Link>
    </div>
    <div className="container-created">

      <h1 className="title-created">Create your best Friend</h1>
      <form>
        <div>
          <label className="label-created">Name: </label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(evt) => handleChange(evt)}
          />
          {error.name && <p className="error">{error.name}</p>}
        </div>

        <div>
          <label className="label-created">Life Expectancy: </label>
          <input
            type="text"
            value={input.life_span}
            name="life_span"
            onChange={(evt) => handleChange(evt)}
          />
          {error.life_span && <p className="error">{error.life_span}</p>}
        </div>

        <div>
          <label className="label-created">Height Min: </label>
          <input
            type="text"
            value={input.height_min}
            name="height_min"
            onChange={(evt) => handleChange(evt)}
          />
          {error.height_min && <p className="error">{error.height_min}</p>}
        </div>

        <div>
          <label className="label-created">Height Max: </label>
          <input
            type="text"
            value={input.height_max}
            name="height_max"
            onChange={(evt) => handleChange(evt)}
          />
          {error.height_max && <p className="error">{error.height_max}</p>}
        </div>

        <div>
          <label className="label-created">Weight Min: </label>
          <input
            type="text"
            value={input.weight_min}
            name="weight_min"
            onChange={(evt) => handleChange(evt)}
          />
          {error.weight_min && <p className="error">{error.weight_min}</p>}
        </div>

        <div>
          <label className="label-created">Weight Max: </label>
          <input
            type="text"
            value={input.weight_max}
            name="weight_max"
            onChange={(evt) => handleChange(evt)}
          />
          {error.weight_max && <p className="error">{error.weight_max}</p>}
        </div>

        <div>
          <label className="label-created">Image: </label>
          <input
            type="text"
            value={input.image}
            name="image"
            onChange={(evt) => handleChange(evt)}
          />
        </div>

        <div>
          <label className="label-created">Temperaments: </label>
          <select onChange={(evt) => handleSelect(evt)}>
            {allTempe.map((el) => {
              return (
                <option key={el.id + 1} value={el.name}>
                  {el.name}
                </option>
              );
            })}
          </select>
            {input.temperament.length <= 0 ? (
              <p>Select at least one temperament</p>
            ) : null}

          <br />
        </div>
      </form>
      {input.temperament.map((el) => (
        <div key={el.id}>
          <button className="temp-button" onClick={() => handleDelete(el)}>
            {el + " X"}
          </button>
        </div>
      ))}

    </div>
      <div className="end-container">
        <img type="submit"
          className="create-button"
          onClick={(evt) => handleSubmit(evt)} src={Tag} alt="not img" width="135px" height="105px" />
      </div>
    </div>
  );
}
