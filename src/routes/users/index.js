import React from "react";
import {Route, Switch} from "react-router-dom";
import Teachers from "./Teachers";
import Students from "./Students";
import Members from "./Members";
import PropTypes from "prop-types";


const Users = ({match}) => (
  <Switch>
    <Route path={`${match.url}/teachers`} component={Teachers}/>
    <Route path={`${match.url}/students`} component={Students}/>
    <Route path={`${match.url}/members`} component={Members}/>
  </Switch>
);

export default Users;

Users.propTypes = {
  match: PropTypes.object,
};
