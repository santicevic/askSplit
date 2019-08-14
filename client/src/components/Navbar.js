import React from "react";
import {
  Collapse,
  Navbar as NavbarElement,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink
} from "reactstrap";
import { LinkContainer } from "react-router-bootstrap";
import { connect } from "react-redux";
import Role from "../utils/role";
import { logout } from "../store/actions/authActions";

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <NavbarElement color="dark" dark expand="md">
          <LinkContainer to="/">
            <NavbarBrand>askSplit</NavbarBrand>
          </LinkContainer>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {this.props.currentUser.role === Role.Guest ? (
                <>
                  <LinkContainer to="/authentication/login">
                    <NavLink>Log in</NavLink>
                  </LinkContainer>
                  <LinkContainer to="/authentication/registration">
                    <NavLink>Register</NavLink>
                  </LinkContainer>
                </>
              ) : (
                <LinkContainer to="/" onClick={this.props.logout}>
                  <NavLink>Log out</NavLink>
                </LinkContainer>
              )}
            </Nav>
          </Collapse>
        </NavbarElement>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.authentication.user
});

const mapDispatchToProps = {
  logout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
