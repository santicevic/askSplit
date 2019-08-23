import "./styles/Alert.css";
import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Home from "./components/Home/index";
import { connect } from "react-redux";
import { Alert } from "reactstrap";
import Authentication from "./components/authentication";
import AdminSide from "./components/adminSide";
import Navbar from "./components/Navbar";
import Posts from "./components/post";
import PrivateRoute from "./components/utilComponents/PrivateRoute";
import Role from "./utils/role";
import { getNotifications } from "./store/actions/notificationActions";

class App extends Component {
  componentDidMount() {
    this.props.getNotifications();
    this.timer = setInterval(() => this.props.getNotifications(), 30000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  }

  render() {
    return (
      <BrowserRouter>
        {this.props.message.show && (
          <Alert
            in={true}
            className="alert-div"
            style={{ background: this.props.message.color }}
          >
            {this.props.message.msg}
          </Alert>
        )}
        <Navbar />
        <div className="pl-5 pr-5 pt-3 pb-3">
          <Switch>
            <Route exact path="/" component={Home} />
            <PrivateRoute
              path="/authentication"
              user={this.props.currentUser}
              roles={[Role.Guest]}
              component={Authentication}
            />
            <Route path="/posts" component={Posts} />
            <PrivateRoute
              path="/admin"
              user={this.props.currentUser}
              roles={[Role.Admin]}
              component={AdminSide}
            />
            <Redirect to="/" />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.authentication.user,
  message: state.message
});

const mapDispatchToProps = {
  getNotifications
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
