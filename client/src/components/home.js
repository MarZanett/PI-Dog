import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs } from "../actions";
import { Link } from "react-router-dom";
import Navbar from "./navBar";
import Filters from "./filters";
import Card from "./card";
import Paginado from "./paginado";
import Search from "./search";
import "./home.css";
import Reload from "./reload";

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs); // Con useSelector me traigo desde el reducer todo lo que está en el estado dogs.

  const [orderName, setOrderName] = useState("");
  const [orderWeight, setOrderWeight] = useState("");
  const [orderCreated, setOrderCreated] = useState("");
  const [orderTemperament, setOrderTemperament] = useState("");

  //Paginado
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage, setdogsPerPage] = useState(9);
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog); // Con slice tomo la porcion del array que está entre ambos indices.

  //console.log(allDogs)
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Me traigo los perros del estado cuando el componente se monta.
  useEffect(() => {
    dispatch(getDogs());
  }, []);

  return (
    <div className="container-home">
      <div className="nav-home">
        <Navbar />
      </div>

      <div className="body-home">
        <div className="filter-home">
          <Search />
          <Filters
            setCurrentPage={setCurrentPage}
            setOrderName={setOrderName}
            setOrderWeight={setOrderWeight}
            setOrderCreated={setOrderCreated}
            setOrderTemperament={setOrderTemperament}
          />
          <Reload />
        </div>

        <div className="cards-home">
          {currentDogs.map((el) => {
            if (el.createdInDB) {
              return (
                <div key={el.id}>
                  <Link to={"/home/" + el.id} className="link-home">
                    <Card 
                      name={el.name}
                      image={el.image}
                      life_span={el.life_span}
                      height_min={el.height_min}
                      height_max={el.height_max}
                      weight_min={el.weight_min}
                      weight_max={el.weight_max}
                      temperament={el.temperaments
                        .map((e) => e.name)
                        .join(" - ")}
                    />
                  </Link>
                </div>
              );
            } else
              return (
                <div key={el.id}>
                  <Link to={"/home/" + el.id} className="card-home">
                    <Card
                      name={el.name}
                      image={el.image}
                      life_span={el.life_span}
                      height_min={el.height_min}
                      height_max={el.height_max}
                      weight_min={el.weight_min}
                      weight_max={el.weight_max}
                      temperament={el.temperament}
                    />
                  </Link>
                </div>
              );
          })}
        </div>
      </div>

      <div className="paginado-home">
        <Paginado
          key={allDogs.length}
          dogsPerPage={dogsPerPage}
          allDogs={allDogs.length}
          paginado={paginado}
        />
      </div>
    </div> //container-home
  );
}
