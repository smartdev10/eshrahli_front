import React from "react";
import {Route, Switch} from "react-router-dom";
import Metrics from "./Metrics";
import PropTypes from "prop-types";

const Main = ({match}) => (
  <Switch>
    <Route path={`${match.url}/metrics`} component={Metrics}/>
  </Switch>
);

export default Main;

Main.propTypes = {
  match: PropTypes.object,
};
