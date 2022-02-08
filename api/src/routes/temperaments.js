const axios = require("axios");
const { Router } = require("express");
const router = Router();
const { Dog, Temperament } = require("../db");
const DogsFunctions = require("../functions/funciones");

const service = new DogsFunctions();

router.get("/", async (req, res, next) => {
    try {
        const allTemp = await service.getAlltemperaments();
        if(allTemp.length > 0) { 
        return res.status(200).json(allTemp);}
        else return res.status(404).json("Temperaments is empty")
        
    } catch (error) {
        next(error)
    }
  })


module.exports = router;