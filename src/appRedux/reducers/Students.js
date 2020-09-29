import { LOAD_STUDENTS } from "../../constants/ActionTypes";

const students = (state = [], action) => {
  switch (action.type) {
    case LOAD_STUDENTS:
      return [...action.students];
    default:
      return state;
  }
};

export default students
