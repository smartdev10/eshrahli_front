import { LOAD_NATIONALITIES } from "../../constants/ActionTypes";

const nationalities = (state = [], action) => {
  switch (action.type) {
    case LOAD_NATIONALITIES:
      return [...action.nationalities];
    default:
      return state;
  }
};

export default nationalities

