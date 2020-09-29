import { dataProvider } from 'util/Api'
import { LOAD_REQUESTS , FETCH_ERROR } from "../../constants/ActionTypes";


export const loadRequests = requests => ({
  type: LOAD_REQUESTS,
  requests
});

export const UpdateRequest= (params) => {
  return dispatch => {
    return dataProvider("UPDATE", "requests/update", params)
  };
};

export const DeleteRequests = (params) => {
  return dispatch => {
    return dataProvider("DELETE_MANY", "requests/delete", params)
  };
};

export const fetchRequests = (params = {
  pagination: { page: 1, perPage: 10 },
  sort: { field: 'name' , order: 'ASC' },
  filter: {},
}) => {
  return dispatch => {
    return dataProvider("GET_LIST", "requests", params).then((res)=>{
      dispatch(loadRequests(res))
    }).catch(err => {
      dispatch({type: FETCH_ERROR, payload: err.message});
      console.log("Error****:", err.message);
    });
  };
};


export const fetchOneRequet = (params) => {
  return dispatch => {
    return dataProvider("GET_ONE", "requests", params)
  };
};

