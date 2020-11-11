import { dataProvider } from 'util/Api'
import { LOAD_PAGES , FETCH_ERROR } from "../../constants/ActionTypes";


export const loadPages = pages => ({
  type: LOAD_PAGES,
  pages
});

export const CreatePage = (params) => {
  return () => {
    return dataProvider("CREATE", "pages/create", params)
  };
};

export const UpdatePage = (params) => {
  return () => {
    return dataProvider("UPDATE", "pages/update", params)
  };
};

export const DeletePages = (params) => {
  return () => {
    return dataProvider("DELETE_MANY", "pages/delete", params)
  };
};

export const fetchPages = (params = {
  pagination: { page: 1, perPage: 10 },
  sort: { field: 'name' , order: 'ASC' },
  filter: {},
}) => {
  return dispatch => {
    return dataProvider("GET_LIST", "pages", params).then((res)=>{
      dispatch(loadPages(res))
    }).catch(err => {
      dispatch({type: FETCH_ERROR, payload: err.message});
      console.log("Error****:", err.message);
    });
  };
};


export const fetchOnePage = (params) => {
  return () => {
    return dataProvider("GET_ONE", "pages", params)
  };
};

