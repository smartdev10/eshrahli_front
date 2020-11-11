import { dataProvider } from 'util/Api'
import { LOAD_SUBJECTS , FETCH_ERROR } from "../../constants/ActionTypes";


export const loadSubjects = subjects => ({
  type: LOAD_SUBJECTS,
  subjects
});

export const CreateSubject = (params) => {
  return () => {
    return dataProvider("CREATE", "subjects/create", params)
  };
};

export const UpdateSubject = (params) => {
  return () => {
    return dataProvider("UPDATE", "subjects/update", params)
  };
};

export const DeleteSubject = (params) => {
  return () => {
    return dataProvider("DELETE_MANY", "subjects/delete", params)
  };
};

export const fetchSubjects = (params = {
  pagination: { page: 1, perPage: 10 },
  sort: { field: 'name' , order: 'ASC' },
  filter: {},
}) => {
  return dispatch => {
    return dataProvider("GET_LIST", "subjects", params).then((res)=>{
      dispatch(loadSubjects(res))
    }).catch(err => {
      dispatch({type: FETCH_ERROR, payload: err.message});
      console.log("Error****:", err.message);
    });
  };
};


export const fetchOneSubject = (params) => {
  return () => {
    return dataProvider("GET_ONE", "subjects", params)
  };
};

