import React, { Component } from "react";
import { authentication } from "../../services/authentication";

class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: ""
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    authentication.register({ ...this.state });
  };

  render() {
    const { username, email, password } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={this.handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={email}
          onChange={this.handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={this.handleChange}
        />
        <button type="submit">Register</button>
      </form>
    );
  }
}

export default Registration;
