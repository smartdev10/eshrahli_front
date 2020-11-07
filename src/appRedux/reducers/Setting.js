import {LOAD_SETTINGS} from "../../constants/ActionTypes";


const settings = (state = [], action) => {
  switch (action.type) {
    case LOAD_SETTINGS:
      return [...action.settings];
    default:
      return state;
  }
};

export default settings
