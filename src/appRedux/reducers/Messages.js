import { LOAD_MESSAGES } from "../../constants/ActionTypes";

const messages = (state = [], action) => {
  switch (action.type) {
    case LOAD_MESSAGES:
      return [...action.messages];
    default:
      return state;
  }
};


export default messages