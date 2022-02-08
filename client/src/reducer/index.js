const initialState = {
  dogs: [],
  allDogs: [],
  temperaments: [],
  detail: [],
  filteredDogs: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_DOGS":
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
        filteredDogs: action.payload,
      };

    case "GET_TEMPERAMENTS":
      return {
        ...state,
        temperaments: action.payload,
        filteredDogs: action.payload,
      };

    case "GET_BY_NAME":
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
        filteredDogs: action.payload,
      };

    case "GET_DETAIL":
      return {
        ...state,
        detail: action.payload,
      };

    case "ORDER_NAME":
      let sorterdArr;
      if (action.payload === "abc") {
        sorterdArr = state.allDogs.sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          } else if (b.name > a.name) {
            return -1;
          } else return 0;
        });
      }
      if (action.payload === "zyx") {
        sorterdArr = state.allDogs.sort((a, b) => {
          if (a.name > b.name) {
            return -1;
          }
          if (b.name > a.name) {
            return 1;
          }
          return 0;
        });
      }
      if (action.payload === "def") {
        sorterdArr = state.filteredDogs;
      }

      return {
        ...state,
        dogs: sorterdArr,
        filteredDogs: sorterdArr,
      };

    case "ORDER_WEIGHT":
      let sorterdWeight;
      if (action.payload === "asc") {
        sorterdWeight = state.allDogs.sort((a, b) => {
          if (Number(a.weight_max) > Number(b.weight_max)) {
            return 1;
          } else if (Number(b.weight_max) > Number(a.weight_max)) {
            return -1;
          } else return 0;
        });
      }
      if (action.payload === "des") {
        sorterdWeight = state.allDogs.sort((a, b) => {
          if (Number(a.weight_max) > Number(b.weight_max)) {
            return -1;
          }
          if (Number(b.weight_max) > Number(a.weight_max)) {
            return 1;
          }
          return 0;
        });
      }
      if (action.payload === "def") {
        sorterdWeight = state.allDogs;
      }

      return {
        ...state,
        dogs: sorterdWeight,
        filteredDogs: sorterdWeight,
      };

    case "FILTER_TEMP":
      const allDogs = state.allDogs;

      const tempFiltered =
        action.payload === "all"
          ? allDogs
          : allDogs.filter(
              (el) =>
                el.temperament &&
                el.temperament.split(", ").find((e) => e === action.payload)
            );

      return {
        ...state,
        dogs: tempFiltered,
        filteredDogs: tempFiltered,
      };

    case "FILTER_CREATED":
      const allDogsDB = state.allDogs;
      let filteredDogs = action.payload === "created"
      ? allDogsDB.filter((el) => el.createdInDB)
      : allDogsDB.filter((el) => !el.createdInDB);

      return {
        ...state,
        dogs: action.payload === "all" ? allDogsDB : filteredDogs,
        filteredDogs: action.payload === "all" ? allDogsDB : filteredDogs,
      };
    
    default:
      return state;
  }
}
