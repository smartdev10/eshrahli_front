import {INIT_URL, SIGNOUT_USER_SUCCESS, USER_DATA, USER_TOKEN_SET , VERIFY_TOKEN_SET , ON_SHOW_LOADER ,ON_HIDE_LOADER} from "../../constants/ActionTypes";
import jwtDecode from "jwt-decode";

const INIT_STATE = {
  token: localStorage.getItem('token'),
  token_verify: localStorage.getItem('token_verify'),
  initURL: '',
  authUser: localStorage.getItem('token') ? jwtDecode(localStorage.getItem('token')) : null,
  alertMessage: '',
  showMessage: false,
  loader: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {


    case INIT_URL: {
      return {...state, initURL: action.payload};
    }

    case SIGNOUT_USER_SUCCESS: {
      return {
        ...state,
        token: null,
        authUser: null,
        initURL: ''
      }
    }

    case USER_DATA: {
      return {
        ...state,
        authUser: action.payload,
      };
    }

    case USER_TOKEN_SET: {
      return {
        ...state,
        token: action.payload,
      };
    }

    case VERIFY_TOKEN_SET: {
      return {
        ...state,
        token_verify: action.payload,
      };
    }

    case ON_SHOW_LOADER: {
      return {
        ...state,
        loader: true
      }
    }
    case ON_HIDE_LOADER: {
      return {
        ...state,
        loader: false
      }
    }

    default:
      return state;
  }
}
