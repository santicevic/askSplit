import React from "react";
import { Route, Switch, Redirect } from "react-router";
import NewPost from "./NewPost";
import Post from "./Post";
import PrivateRoute from "../utilComponents/PrivateRoute";
import Role from "../../utils/role";
import { connect } from "react-redux";

const Posts = props => {
  const { path } = props.match;
  return (
    <Switch>
      <PrivateRoute
        exact
        path={path}
        user={props.currentUser}
        roles={[Role.User, Role.Admin]}
        component={NewPost}
      />
      <Route path={path + "/:id"} component={Post} />
      <Redirect to="/" />
    </Switch>
  );
};

const mapStateToProps = state => ({
  currentUser: state.authentication.user
});

export default connect(mapStateToProps)(Posts);
