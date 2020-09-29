import {LOAD_REQUESTS} from "../../constants/ActionTypes";


const requests = (state = [], action) => {
  switch (action.type) {
    case LOAD_REQUESTS:
      return [...action.requests];
    default:
      return state;
  }
};

export default requests
