import React from "react";
import { Route, Switch, Redirect } from "react-router";
import Login from "./Login";
import Registration from "./Registration";

const Authentication = props => {
  const { path } = props.match;
  return (
    <Switch>
      <Route path={path + "/login"} component={Login} />
      <Route path={path + "/registration"} component={Registration} />
      <Redirect to={path + "/registration"} />
    </Switch>
  );
};

export default Authentication;
