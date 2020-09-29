import {LOAD_LEVELS} from "../../constants/ActionTypes";

const levels = (state = [], action) => {
  switch (action.type) {
    case LOAD_LEVELS:
      return [...action.levels];
    default:
      return state;
  }
};


export default levels