import { dataProvider } from 'util/Api'
import { LOAD_MESSAGES , FETCH_ERROR } from "../../constants/ActionTypes";


export const loadMessages = messages => ({
  type: LOAD_MESSAGES,
  messages
});


export const DeleteMessages = (params) => {
  return () => {
    return dataProvider("DELETE_MANY", "messages/delete", params)
  };
};

export const fetchMessages = (params = {
  pagination: { page: 1, perPage: 10 },
  sort: { field: 'name' , order: 'ASC' },
  filter: {},
}) => {
  return dispatch => {
    return dataProvider("GET_LIST", "messages", params).then((res)=>{
      dispatch(loadMessages(res))
    }).catch(err => {
      dispatch({type: FETCH_ERROR, payload: err.message});
      console.log("Error****:", err.message);
    });
  };
};


export const fetchOneMessage = (params) => {
  return () => {
    return dataProvider("GET_ONE", "messages", params)
  };
};

