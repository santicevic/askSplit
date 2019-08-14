import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../../store/actions/authActions";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.login(email, password);
  };

  render() {
    const { email, password } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
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
        <button type="submit">Log in</button>
      </form>
    );
  }
}

const mapDispatchToProps = {
  login
};

export default connect(
  null,
  mapDispatchToProps
)(Login);
