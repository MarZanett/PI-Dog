import axios from "axios";

export function getDogs() {
  return async function (dispatch) {
    try {
      const jsonDogs = await axios.get("http://localhost:3001/api/dogs", {});
      return dispatch({
        type: "GET_DOGS",
        payload: jsonDogs.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getTemperaments() {
  return async function (dispatch) {
    try {
      const jsonTemp = await axios.get(
        "http://localhost:3001/api/temperaments",
        {}
      );
      return dispatch({
        type: "GET_TEMPERAMENTS",
        payload: jsonTemp.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getByName(name) {
  return async function (dispatch){
    try {
      const jsonName = await axios.get(`http://localhost:3001/api/dogs/?name=${name}`,{});
      return dispatch({
        type:"GET_BY_NAME",
        payload : jsonName.data,
      })
    } catch (error) {
      console.log(error);
    }
  }
}

export function getDetail(id){
  return async function (dispatch) {
    try {
      const jsonDetail = await axios.get(`http://localhost:3001/api/dogs/${id}`,{});
      return dispatch({
        type : 'GET_DETAIL',
        payload : jsonDetail.data
      })
    } catch (error) {
      console.log(error);
    }
  }
}

export function createDog(payload){
  return async function (dispatch) {
    const data = await axios.post("http://localhost:3001/api/dogs",payload);
    return data
  };
}

export function orderByName(payload){
  return {
    type: "ORDER_NAME",
    payload,
  };
}

export function orderByWeight(payload){
  return{
    type: "ORDER_WEIGHT",
    payload,
  }
}

export function filterTemp(payload){
  return{
    type:"FILTER_TEMP",
    payload,
  }
}

export function createdOrExists(payload){
  return{
    type:"FILTER_CREATED",
    payload,
  }
}