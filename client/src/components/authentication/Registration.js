import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback
} from "reactstrap";
import { authentication } from "../../services/authentication";
import { showMessage } from "../../store/actions/messageActions";
import "../../styles/Form.css";

class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
      usernameValid: true,
      emailValid: true,
      passwordValid: true,
      passwordConfirmValid: true
    };
  }

  handleChange = async event => {
    await this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    Promise.all([
      this.handleEmail(),
      this.handlePassword(),
      this.handlePasswordConfirm(),
      this.handleUsername()
    ]).then(() => {
      const {
        usernameValid,
        emailValid,
        passwordValid,
        passwordConfirmValid,
        username,
        email,
        password
      } = this.state;

      if (
        usernameValid &&
        emailValid &&
        passwordValid &&
        passwordConfirmValid
      ) {
        authentication.register({ username, email, password }).then(() => {
          this.props.showMessage(
            "Registration successful, you can log in now!"
          );
          this.props.history.push("/authentication/login");
        });
      }
    });
  };

  handleUsername = async event => {
    if (!this.state.username) {
      this.setState({ usernameValid: false });
      return;
    }

    await authentication
      .usernameExists(this.state.username)
      .then(usernameExists => {
        if (usernameExists.result) {
          this.setState({ usernameValid: false });
        } else {
          this.setState({ usernameValid: true });
        }
      });
  };

  handleEmail = async event => {
    if (!this.state.email) {
      this.setState({ emailValid: false });
      return;
    }

    await authentication.emailExists(this.state.email).then(emailExists => {
      if (emailExists.result) {
        this.setState({ emailValid: false });
      } else {
        this.setState({ emailValid: true });
      }
    });
  };

  handlePassword = async event => {
    if (this.state.password.length < 7) {
      await this.setState({ passwordValid: false });
    } else {
      await this.setState({ passwordValid: true });
    }
  };

  handlePasswordConfirm = async event => {
    if (this.state.password === this.state.passwordConfirm) {
      await this.setState({ passwordConfirmValid: true });
    } else {
      await this.setState({ passwordConfirmValid: false });
    }
  };

  render() {
    const {
      username,
      email,
      password,
      passwordConfirm,
      usernameValid,
      emailValid,
      passwordValid,
      passwordConfirmValid
    } = this.state;

    return (
      <Form className="login-registration-form">
        <FormGroup>
          <Label for="Username">Username</Label>
          <Input
            type="text"
            name="username"
            id="Username"
            invalid={!usernameValid}
            placeholder="Username"
            value={username}
            onChange={this.handleChange}
            onBlur={this.handleUsername}
          />
          <FormFeedback>Username taken</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="Username">E-mail</Label>
          <Input
            type="email"
            name="email"
            id="Email"
            invalid={!emailValid}
            placeholder="E-mail"
            value={email}
            onChange={this.handleChange}
            onBlur={this.handleEmail}
          />
          <FormFeedback>E-mail taken</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="Password">Password</Label>
          <Input
            type="password"
            name="password"
            id="Password"
            invalid={!passwordValid}
            placeholder="Password"
            value={password}
            onChange={this.handleChange}
            onBlur={this.handlePassword}
          />
          <FormFeedback>
            Password has to be longer than 6 characters
          </FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="PasswordConfirm">Confirm password</Label>
          <Input
            type="password"
            name="passwordConfirm"
            id="PasswordConfirm"
            invalid={!passwordConfirmValid}
            placeholder="Confirm password"
            value={passwordConfirm}
            onChange={event => {
              this.handleChange(event).then(() =>
                this.handlePasswordConfirm(event)
              );
            }}
          />
          <FormFeedback>Passwords do not match</FormFeedback>
        </FormGroup>
        <Button onClick={this.handleSubmit}>Submit</Button>
      </Form>
    );
  }
}

const mapDispatchToProps = {
  showMessage
};

export default connect(
  null,
  mapDispatchToProps
)(Registration);
