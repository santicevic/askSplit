import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { login } from "../../store/actions/authActions";
import "../../styles/Form.css";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      invalid: false
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = () => {
    const { email, password } = this.state;
    this.props.login(email, password);
    if (!this.props.loggedIn) {
      this.setState({ invalid: true });
    }
  };

  render() {
    const { email, password, invalid } = this.state;
    return (
      <Form className="login-registration-form">
        <FormGroup>
          <Label for="Email">Email</Label>
          <Input
            invalid={invalid && !this.props.loading}
            type="email"
            name="email"
            id="Email"
            placeholder="E-mail"
            value={email}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="Password">Password</Label>
          <Input
            invalid={invalid && !this.props.loading}
            type="password"
            name="password"
            id="Password"
            placeholder="Password"
            value={password}
            onChange={this.handleChange}
          />
        </FormGroup>
        <Button onClick={this.handleSubmit}>Submit</Button>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.authentication.loggedIn,
  loading: state.authentication.loading
});

const mapDispatchToProps = {
  login
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
