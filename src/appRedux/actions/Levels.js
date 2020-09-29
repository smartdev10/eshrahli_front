import { dataProvider } from 'util/Api'
import { LOAD_LEVELS , FETCH_ERROR } from "../../constants/ActionTypes";


export const loadLevels = levels => ({
  type: LOAD_LEVELS,
  levels
});

export const CreateLevel = (params) => {
  console.log(params)
  return dispatch => {
    return dataProvider("CREATE", "levels/create", params)
  };
};

export const UpdateLevel = (params) => {
  return dispatch => {
    return dataProvider("UPDATE", "levels/update", params)
  };
};

export const DeleteLevel = (params) => {
  return dispatch => {
    return dataProvider("DELETE_MANY", "levels/delete", params)
  };
};

export const fetchLevels = (params = {
  pagination: { page: 1, perPage: 10 },
  sort: { field: 'name' , order: 'ASC' },
  filter: {},
}) => {
  return dispatch => {
    return dataProvider("GET_LIST", "levels", params).then((res)=>{
      dispatch(loadLevels(res))
    }).catch(err => {
      dispatch({type: FETCH_ERROR, payload: err.message});
      console.log("Error****:", err.message);
    });
  };
};


export const fetchOneLevel = (params) => {
  return dispatch => {
    return dataProvider("GET_ONE", "levels", params)
  };
};

