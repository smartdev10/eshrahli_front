import { LOAD_SUBJECTS } from "../../constants/ActionTypes";

const subjects = (state = [], action) => {
  switch (action.type) {
    case LOAD_SUBJECTS:
      return [...action.subjects];
    default:
      return state;
  }
};

export default subjects
