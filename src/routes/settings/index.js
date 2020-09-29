import React from "react";
import {Route, Switch} from "react-router-dom";

import Cities from "./Cities";
import Subjects from "./Subjects";
import Coupons from "./Coupons";
import Nationalities from "./Nationalities";
import Levels from "./Levels";


const Settings = ({match}) => (
  <Switch>
    <Route path={`${match.url}/cities`} component={Cities}/>
    <Route path={`${match.url}/levels`} component={Levels}/>
    <Route path={`${match.url}/subjects`} component={Subjects}/>
    <Route path={`${match.url}/coupons`} component={Coupons}/>
    <Route path={`${match.url}/nationalities`} component={Nationalities}/>
  </Switch>
);

export default Settings;
