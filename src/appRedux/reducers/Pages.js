import { LOAD_PAGES } from "../../constants/ActionTypes";

const pages = (state = [], action) => {
  switch (action.type) {
    case LOAD_PAGES:
      return [...action.pages];
    default:
      return state;
  }
};
export default pages

