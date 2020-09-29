import React from "react";
import {Route, Switch} from "react-router-dom";
import Main from "./main/index";
import asyncComponent from "util/asyncComponent2";

const App = ({match}) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route path={`${match.url}main`} component={Main}/>
      <Route path={`${match.url}users`} component={asyncComponent(() => import('./users'))}/>
      <Route path={`${match.url}settings`} component={asyncComponent(() => import('./settings'))}/>
      <Route path={`${match.url}cms`} component={asyncComponent(() => import('./cms'))}/>
      <Route path={`${match.url}messages`} component={asyncComponent(() => import('./messages'))}/>
      <Route path={`${match.url}requests`} component={asyncComponent(() => import('./requests'))}/>
    </Switch>
  </div>
);

export default App;
