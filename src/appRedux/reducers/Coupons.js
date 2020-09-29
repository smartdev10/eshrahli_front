import {LOAD_COUPONS} from "../../constants/ActionTypes";

const coupons = (state = [], action) => {
  switch (action.type) {
    case LOAD_COUPONS:
      return [...action.coupons];
    default:
      return state;
  }
};


export default coupons