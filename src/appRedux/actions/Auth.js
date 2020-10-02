import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  INIT_URL,
  SIGNOUT_USER_SUCCESS,
  USER_DATA,
  USER_TOKEN_SET,
  VERIFY_TOKEN_SET
} from "../../constants/ActionTypes";
import {transport} from 'util/Api'
import { push } from 'connected-react-router'
import jwtDecode from "jwt-decode";

export const setInitUrl = (url) => {
  return {
    type: INIT_URL,
    payload: url
  };
};

export const userSignUp = ({email, password, name}) => {
  console.log(email, password);
  return (dispatch) => {
    dispatch({type: FETCH_START});
    transport.post('auth/register', {
        email: email,
        password: password,
        name: name
      }
    ).then(({data}) => {
      console.log("data:", data);
      if (data.result) {
        localStorage.setItem("token", JSON.stringify(data.token.access_token));
        transport.defaults.headers.common['authorization'] = "Bearer " + data.token.access_token;
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: USER_TOKEN_SET, payload: data.token.access_token});
      } else {
        console.log("payload: data.error", data.error);
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.log("Error****:", error.message);
    });
  }
};

export const userVerifyCode = ({code , mobile}) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    transport.post('admin/users/verify', {
        code,
        mobile
      }
    ).then(({data}) => {
      if (data.result) {
        localStorage.setItem("token_verify", JSON.stringify(data.token.verify_token));
        transport.defaults.headers.common['Authorization'] = "Bearer " + data.token.verify_token;
        dispatch({type: VERIFY_TOKEN_SET, payload: data.token.verify_token});
        dispatch(push('/reset-password'))
        dispatch({type: FETCH_SUCCESS});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.error});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.response.data.message});
      console.log("Error****:", error.response.data.message);
    });
  }
};

export const userResetPassword = ({mobile, password}) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    transport.post('admin/users/reset-password', {
        mobile,
        password
      }
    ).then(({data}) => {
      if (data.result) {
        localStorage.removeItem("token_verify");
        dispatch(push('/signin'))
        dispatch({type: VERIFY_TOKEN_SET, payload: null});
        dispatch({type: FETCH_SUCCESS});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.error});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.response.data.message});
      console.log("Error****:", error.response.data.message);
    });
  }
};

export const userForgotPassword = ({mobile}) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    transport.post('admin/users/forgot-password', {
        mobile
      }
    ).then(({data}) => {
      if (data.result) {
        dispatch(push('/verify' ,{mobile}))
        dispatch({type: FETCH_SUCCESS});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.error});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.response.data.message});
      console.log("Error****:", error.response.data.message);
    });
  }
};

export const userSignIn = ({username, password}) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    transport.post('admin/login', {
        username,
        password
      }
    ).then(({data}) => {
      console.log("userSignIn: ", data);
      if (data.result) {
        localStorage.setItem("token", data.token.access_token);
        transport.defaults.headers.common['Authorization'] = "Bearer " + data.token.access_token;
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: USER_TOKEN_SET, payload: data.token.access_token});
        dispatch({type: USER_DATA, payload: jwtDecode(data.token.access_token)});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.error});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.response.data.message});
      console.log("Error****:", error.response.data.message);
    });
  }
};

export const getUser = ({id}) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    transport.post('admin/me', {
      id
    }
    ).then(({data}) => {
      console.log("userSignIn: ", data);
      if (data.result) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: USER_DATA, payload: data.user});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.error});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.log("Error****:", error.message);
    });
  }
};


export const userSignOut = () => {

  return (dispatch) => {
    dispatch({type: FETCH_START});

    transport.post('admin/logout').then(({data}) => {
      console.log("log out",data)
      if (data.result) {
        localStorage.removeItem("token");
        localStorage.removeItem("token_verify");
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SIGNOUT_USER_SUCCESS});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.error});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.log("Error****:", error.message);
    });
  }
};

