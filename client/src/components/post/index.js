import React from "react";
import { Route, Switch, Redirect } from "react-router";
import NewPost from "./NewPost";
import Post from "./Post";

const Posts = props => {
  const { path } = props.match;
  return (
    <Switch>
      <Route exact path={path} component={NewPost} />
      <Route path={path + "/:id"} component={Post} />
      <Redirect to="/" />
    </Switch>
  );
};

export default Posts;
