import { dataProvider } from 'util/Api'
import { LOAD_USERS , FETCH_ERROR } from "../../constants/ActionTypes";


export const loadUsers = users => ({
  type: LOAD_USERS,
  users
});

export const CreateUser = (params) => {
  return () => {
    return dataProvider("CREATE", "admin/register", params)
  };
};

export const UpdateUser = (params) => {
  return () => {
    return dataProvider("UPDATE", "admin/users/update", params)
  };
};

export const DeleteUsers = (params) => {
  return () => {
    return dataProvider("DELETE_MANY", "admin/users/delete", params)
  };
};

export const fetchUsers = (params = {
  pagination: { page: 1, perPage: 10 },
  sort: { field: 'name' , order: 'ASC' },
  filter: {},
}) => {
  return dispatch => {
    return dataProvider("GET_LIST", "admin/users", params).then((res)=>{
      dispatch(loadUsers(res))
    }).catch(err => {
      dispatch({type: FETCH_ERROR, payload: err.message});
      console.log("Error****:", err.message);
    });
  };
};


export const fetchOneUser = (params) => {
  return () => {
    return dataProvider("GET_ONE", "admin/users", params)
  };
};

