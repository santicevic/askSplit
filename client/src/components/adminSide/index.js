import React from "react";
import { Route, Switch, Redirect } from "react-router";
import Tag from "./Tag";

const AdminSide = props => {
  const { path } = props.match;
  return (
    <Switch>
      <Route path={path + "/tag"} component={Tag} />
      <Redirect to={"/"} />
    </Switch>
  );
};

export default AdminSide;
