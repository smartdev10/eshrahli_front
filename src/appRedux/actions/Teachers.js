import { dataProvider } from 'util/Api'
import { LOAD_TEACHERS , FETCH_ERROR } from "../../constants/ActionTypes";


export const loadTeachers = teachers => ({
  type: LOAD_TEACHERS,
  teachers
});

export const CreateTeacher = (params) => {
  return dispatch => {
    return dataProvider("CREATE", "teachers/create", params)
  };
};

export const UpdateTeacher = (params) => {
  return dispatch => {
    return dataProvider("UPDATE", "teachers/update", params)
  };
};

export const UpdateTeacherStatus = (params) => {
  return dispatch => {
    return dataProvider("UPDATE", "teachers/status", params)
  };
};

export const DeleteTeachers = (params) => {
  return dispatch => {
    return dataProvider("DELETE_MANY", "teachers/delete", params)
  };
};

export const fetchTeachers = (params = {
  pagination: { page: 1, perPage: 10 },
  sort: { field: 'name' , order: 'ASC' },
  filter: {},
}) => {
  return dispatch => {
    return dataProvider("GET_LIST", "teachers", params).then((res)=>{
      dispatch(loadTeachers(res))
    }).catch(err => {
      dispatch({type: FETCH_ERROR, payload: err.message});
      console.log("Error****:", err.message);
    });
  };
};


export const fetchOneTeacher = (params) => {
  return dispatch => {
    return dataProvider("GET_ONE", "teachers", params)
  };
};

