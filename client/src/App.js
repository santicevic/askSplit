import "./styles/Alert.css";
import "./styles/Main.css";
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
import NotFound from "./components/utilComponents/NotFound";

class App extends Component {
  componentDidMount() {
    this.props.getNotifications();
    this.timer = setInterval(() => this.props.getNotifications(), 5000);
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
        <div className="main-content">
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
            <Route path="/404" component={NotFound} />
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
