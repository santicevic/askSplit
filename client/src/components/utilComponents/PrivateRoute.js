import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, roles, user, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (roles && roles.indexOf(user.role) === -1) {
          return <Redirect to="/" />;
        }

        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
