import React, { Component } from "react";
import { userServices } from "../../services/users";
import Details from "./Details";
import Posts from "./Posts";
import "../../styles/User.css";

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      user: {}
    };
  }

  componentDidMount() {
    userServices
      .getByUsername(this.props.match.params.username)
      .then(user => {
        this.setState({ loading: false, user });
      })
      .catch(() => this.props.history.push("/404"));
  }

  render() {
    if (this.state.loading) {
      return <></>;
    }
    const { username, userImage, email, createdAt } = this.state.user;
    return (
      <div className="user-wrapper">
        <img
          src={`http://localhost:8000/${userImage}`}
          alt="User"
          className="user-picture"
        />
        <Details details={{ username, email, createdAt }} />
        <Posts posts={this.state.user.Posts} />
      </div>
    );
  }
}

export default User;
