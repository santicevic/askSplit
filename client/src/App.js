import React from "react";
import { Route, Switch, Redirect } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import { connect } from "react-redux";
import Authentication from "./components/authentication";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/utilComponents/PrivateRoute";
import Role from "./utils/role";

function App(props) {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute
            path="/authentication"
            user={props.currentUser}
            roles={[Role.Guest]}
            component={Authentication}
          />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </>
  );
}

const mapStateToProps = state => ({
  currentUser: state.authentication.user
});

export default connect(mapStateToProps)(App);
