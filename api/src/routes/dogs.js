const axios = require("axios");
const { Router } = require("express");
const router = Router();
const { Dog, Temperament } = require("../db");
const DogsFunctions = require("../functions/funciones");
const alert= require ('alert')

const service = new DogsFunctions();

router.get("/", async (req, res, next) => {
  try {
    const name = req.query.name;
    const allDogs = await service.getAllDogs();
    if (name) {
      const dogName = await allDogs.filter((el) =>
        el.name.toLowerCase().includes(name.toLowerCase())
      );
      dogName.length
        ? res.status(200).json(dogName)
        : alert("Dog not found") 
    } else {
      res.status(200).send(allDogs);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const allDogs = await service.getAllDogs();
    const dogId = await service.findById(allDogs, id);
    //console.log(dogId);
    if (dogId) {
      return res.status(200).json(dogId);
    } else {
      return res.status(200).json("Dog not found");
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const {
      name,
      life_span,
      temperament,
      image,
      height_min,
      height_max,
      weight_min,
      weight_max,
      createdInDB,
    } = req.body;

    let newDog = await Dog.create({
      name: name.toLowerCase(),
      life_span,
      image,
      height_min,
      height_max,
      weight_min,
      weight_max,
      createdInDB,
    });

    let temperamentDB

    temperament.map(async e => {
       temperamentDB = await Temperament.findAll({
          where: {
              name : e
          },
          include: [Dog]
        })

        console.log(temperamentDB)

        newDog.addTemperament(temperamentDB)})


    res.status(200).send("dog creado");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
