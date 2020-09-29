import React from "react";
import {Route, Switch} from "react-router-dom";
import Metrics from "./Metrics";


const Main = ({match}) => (
  <Switch>
    <Route path={`${match.url}/metrics`} component={Metrics}/>
  </Switch>
);

export default Main;
