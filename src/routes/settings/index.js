import React from "react";
import {Route, Switch} from "react-router-dom";
import PropTypes from "prop-types";
import Cities from "./Cities";
import Subjects from "./Subjects";
import Coupons from "./Coupons";
import SSettings from "./Settings";
import Nationalities from "./Nationalities";
import Levels from "./Levels";


const Settings = ({match}) => (
  <Switch>
    <Route path={`${match.url}/cities`} component={Cities}/>
    <Route path={`${match.url}/levels`} component={Levels}/>
    <Route path={`${match.url}/subjects`} component={Subjects}/>
    <Route path={`${match.url}/coupons`} component={Coupons}/>
    <Route path={`${match.url}/general`} component={SSettings}/>
    <Route path={`${match.url}/nationalities`} component={Nationalities}/>
  </Switch>
);

export default Settings;

Settings.propTypes = {
  match: PropTypes.object,
};