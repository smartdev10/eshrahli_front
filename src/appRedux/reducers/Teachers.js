import { LOAD_TEACHERS } from "../../constants/ActionTypes";

const teachers = (state = [], action) => {
  switch (action.type) {
    case LOAD_TEACHERS:
      return [...action.teachers];
    default:
      return state;
  }
};

export default teachers
