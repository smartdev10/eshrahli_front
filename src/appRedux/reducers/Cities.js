import {LOAD_CITIES} from "../../constants/ActionTypes";


const cities = (state = [], action) => {
  switch (action.type) {
    case LOAD_CITIES:
      return [...action.cities];
    default:
      return state;
  }
};

export default cities
