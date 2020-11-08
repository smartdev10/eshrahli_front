import { dataProvider } from 'util/Api'
import { LOAD_SETTINGS , FETCH_ERROR } from "../../constants/ActionTypes";


export const loadSettings = settings => ({
  type: LOAD_SETTINGS,
  settings
});

export const CreateSetting = (params) => {
  return dispatch => {
    return dataProvider("CREATE", "settings/create", params)
  };
};

export const UpdateSetting = (params) => {
  return dispatch => {
    return dataProvider("UPDATE", "settings/update", params)
  };
};

export const DeleteSetting  = (params) => {
  return dispatch => {
    return dataProvider("DELETE_MANY", "settings/delete", params)
  };
};

export const fetchSettings = (params = {
  pagination: { page: 1, perPage: 10 },
  sort: { field: 'name' , order: 'ASC' },
  filter: {},
}) => {
  return dispatch => {
    return dataProvider("GET_LIST", "settings", params)
  }
}


export const fetchOneSetting = (params) => {
  return dispatch => {
    return dataProvider("GET_ONE", "settings", params)
  };
};

