import { dataProvider } from 'util/Api'
import { LOAD_NATIONALITIES , FETCH_ERROR } from "../../constants/ActionTypes";


export const loadNationalities = nationalities => ({
  type: LOAD_NATIONALITIES,
  nationalities
});

export const CreateNationality = (params) => {
  return () => {
    return dataProvider("CREATE", "nationalities/create", params)
  };
};

export const UpdateNationality = (params) => {
  return () => {
    return dataProvider("UPDATE", "nationalities/update", params)
  };
};

export const DeleteNationalities = (params) => {
  return () => {
    return dataProvider("DELETE_MANY", "nationalities/delete", params)
  };
};

export const fetchNationalities = (params = {
  pagination: { page: 1, perPage: 10 },
  sort: { field: 'name' , order: 'ASC' },
  filter: {},
}) => {
  return dispatch => {
    return dataProvider("GET_LIST", "nationalities", params).then((res)=>{
      dispatch(loadNationalities(res))
    }).catch(err => {
      dispatch({type: FETCH_ERROR, payload: err.message});
      console.log("Error****:", err.message);
    });
  };
};


export const fetchOneNationality = (params) => {
  return () => {
    return dataProvider("GET_ONE", "nationalities", params)
  };
};

