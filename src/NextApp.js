import React from "react";
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import {Route, Switch} from "react-router-dom";
import jwtDecode from "jwt-decode";
import "assets/vendors/style";
import "styles/wieldy.less";
import configureStore, { history } from './appRedux/store';
import App from "./containers/App/index";
import {setTokenHeader} from "./util/Api";
import {USER_TOKEN_SET,USER_DATA} from "./constants/ActionTypes";

const store = configureStore({});

if (localStorage.token) {
  setTokenHeader(localStorage.token);
  // prevent someone from manually tampering with the key of jwtToken in localStorage
  try {
    store.dispatch({type: USER_TOKEN_SET, payload: localStorage.token});
    store.dispatch({type: USER_DATA, payload: jwtDecode(localStorage.token)});
  } catch (e) {
    store.dispatch({type: USER_TOKEN_SET, payload:null});
    store.dispatch({type: USER_DATA, payload: null});
  }
}

const NextApp = () =>
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" component={App}/>
      </Switch>
    </ConnectedRouter>
  </Provider>;


export default NextApp;
