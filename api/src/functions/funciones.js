const axios = require("axios");
const { Dog, Temperament, conn } = require("../db");
const { API_KEY } = process.env;

const getApiDogs = async () => {
  try {
    const apiInfo = await axios.get("https://api.thedogapi.com/v1/breeds", {
      headers: { "x-api-key": `${API_KEY}` },
    });

    const allDogs = await apiInfo.data.map((el) => {
      return {
        id: el.id,
        name: el.name.toLowerCase(),
        life_span: el.life_span,
        temperament: el.temperament,
        image: el.image.url,
        height_min: el.height.metric
          ? el.height.metric.split(" - ")[0] || el.height.metric.split(" - ")[1]
          : "Not data",
        height_max: el.height.metric
          ? el.height.metric.split(" - ")[1] || el.height.metric.split(" - ")[0]
          : "Not data",
        weight_min: el.weight.metric
          ? el.weight.metric.split(" - ")[0] || el.weight.metric.split(" - ")[1]
          : "Not data",
        weight_max: el.weight.metric
          ? el.weight.metric.split(" - ")[1] || el.weight.metric.split(" - ")[0]
          : "Not data",
      };
    });
    return allDogs;
  } catch (err) {
    console.log(err);
  }
};

const getDbDogs = async () => {
  return await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};


class DogsFunctions {

  async getAllDogs() {
    const apiDogs = await getApiDogs();
    const dbDogs = await getDbDogs();
    const result = [...apiDogs, ...dbDogs];
    return result;
  }

  async getAlltemperaments() {
    try {
      const apiInfo = await axios.get("https://api.thedogapi.com/v1/breeds", {
        headers: { "x-api-key": `${API_KEY}` },
      });

      const allTemp = await apiInfo.data.map((el) => el.temperament);
      const arrOrdenado = allTemp
        .toString()
        .trim()
        .split(/\s*,\s*/)
        .filter((el) => el.length > 0);

      const filteredArray = arrOrdenado.filter(function (ele, pos) {
        return arrOrdenado.indexOf(ele) == pos;
      });

      filteredArray.forEach((el) =>
        Temperament.findOrCreate({ where: { name: el } })
      );

      const allTemperaments = await Temperament.findAll();
      return allTemperaments;
      // console.log(filteredArray)
    } catch (err) {
      console.log(err);
    }
  }

  async findById(arr, id) {
    try {
      const dogId = arr.filter((dog) => dog.id == id);
      //console.log(dogId)
      return dogId;
    } catch (error) {
      console.log(error);
    }
  }

}

module.exports = DogsFunctions;
