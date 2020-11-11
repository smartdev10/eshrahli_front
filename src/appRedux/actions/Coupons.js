import { dataProvider } from 'util/Api'
import { LOAD_COUPONS , FETCH_ERROR } from "../../constants/ActionTypes";


export const loadCoupons = coupons => ({
  type: LOAD_COUPONS,
  coupons
});

export const CreateCoupon = (params) => {
  return () => {
    return dataProvider("CREATE", "coupons/create", params)
  };
};

export const UpdateCoupon = (params) => {
  return () => {
    return dataProvider("UPDATE", "coupons/update", params)
  };
};

export const DeleteCoupon = (params) => {
  return () => {
    return dataProvider("DELETE_MANY", "coupons/delete", params)
  };
};

export const fetchCoupons = (params = {
  pagination: { page: 1, perPage: 10 },
  sort: { field: 'name' , order: 'ASC' },
  filter: {},
}) => {
  return dispatch => {
    return dataProvider("GET_LIST", "coupons", params).then((res)=>{
      dispatch(loadCoupons(res))
    }).catch(err => {
      dispatch({type: FETCH_ERROR, payload: err.message});
      console.log("Error****:", err.message);
    });
  };
};


export const fetchOneCoupon = (params) => {
  return () => {
    return dataProvider("GET_ONE", "coupons", params)
  };
};

