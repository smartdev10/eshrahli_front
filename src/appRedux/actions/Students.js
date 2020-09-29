import { dataProvider } from 'util/Api'
import { LOAD_STUDENTS , FETCH_ERROR } from "../../constants/ActionTypes";


export const loadStudents = students => ({
  type: LOAD_STUDENTS,
  students
});

export const CreateStudent = (params) => {
  return dispatch => {
    return dataProvider("CREATE", "students/create", params)
  };
};

export const UpdateStudent = (params) => {
  return dispatch => {
    return dataProvider("UPDATE", "students/update", params)
  };
};

export const DeleteStudents = (params) => {
  return dispatch => {
    return dataProvider("DELETE_MANY", "students/delete", params)
  };
};

export const fetchStudents = (params = {
  pagination: { page: 1, perPage: 10 },
  sort: { field: 'name' , order: 'ASC' },
  filter: {},
}) => {
  return dispatch => {
    return dataProvider("GET_LIST", "students", params).then((res)=>{
      dispatch(loadStudents(res))
    }).catch(err => {
      console.log(err)
      dispatch({type: FETCH_ERROR, payload: err.message});
      console.log("Error****:", err.message);
    });
  };
};


export const fetchOneStudent = (params) => {
  return dispatch => {
    return dataProvider("GET_ONE", "students", params)
  };
};

