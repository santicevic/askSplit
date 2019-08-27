import React from "react";
import {
  Collapse,
  Navbar as NavbarElement,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu
} from "reactstrap";
import "../styles/Navbar.css";
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
    const { role, userImage } = this.props.currentUser;
    return (
      <div>
        <NavbarElement color="dark" dark expand="md">
          <LinkContainer to="/">
            <NavbarBrand>askSplit</NavbarBrand>
          </LinkContainer>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {role === Role.Guest ? (
                <>
                  <LinkContainer to="/authentication/login">
                    <NavLink>Log in</NavLink>
                  </LinkContainer>
                  <LinkContainer to="/authentication/registration">
                    <NavLink>Register</NavLink>
                  </LinkContainer>
                </>
              ) : (
                <>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      <img
                        src={`http://localhost:8000/${userImage}`}
                        alt="Avatar"
                        className="avatar-navbar pointer"
                      />
                    </DropdownToggle>
                    <DropdownMenu right>
                      <LinkContainer
                        to={`/users/${this.props.currentUser.username}`}
                      >
                        <DropdownItem>My profile</DropdownItem>
                      </LinkContainer>
                      <LinkContainer to="/posts">
                        <DropdownItem>Add post</DropdownItem>
                      </LinkContainer>
                      {role === Role.Admin && (
                        <LinkContainer to="/admin/tag">
                          <DropdownItem>Add tag</DropdownItem>
                        </LinkContainer>
                      )}
                      <DropdownItem divider />
                      <LinkContainer to="/logout" onClick={this.props.logout}>
                        <DropdownItem>Log out</DropdownItem>
                      </LinkContainer>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </>
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
