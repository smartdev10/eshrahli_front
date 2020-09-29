import { dataProvider } from 'util/Api'
import { LOAD_CITIES , FETCH_ERROR } from "../../constants/ActionTypes";


export const loadCities = cities => ({
  type: LOAD_CITIES,
  cities
});

export const CreateCity = (params) => {
  return dispatch => {
    return dataProvider("CREATE", "cities/create", params)
  };
};

export const UpdateCity= (params) => {
  return dispatch => {
    return dataProvider("UPDATE", "cities/update", params)
  };
};

export const DeleteCity = (params) => {
  return dispatch => {
    return dataProvider("DELETE_MANY", "cities/delete", params)
  };
};

export const fetchCities = (params = {
  pagination: { page: 1, perPage: 10 },
  sort: { field: 'name' , order: 'ASC' },
  filter: {},
}) => {
  return dispatch => {
    return dataProvider("GET_LIST", "cities", params).then((res)=>{
      dispatch(loadCities(res))
    }).catch(err => {
      dispatch({type: FETCH_ERROR, payload: err.message});
      console.log("Error****:", err.message);
    });
  };
};


export const fetchOneCity = (params) => {
  return dispatch => {
    return dataProvider("GET_ONE", "cities", params)
  };
};

