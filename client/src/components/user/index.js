import React, { Component } from "react";
import { userServices } from "../../services/users";
import Details from "./Details";
import Posts from "./Posts";
import "../../styles/User.css";
import { connect } from "react-redux";
import { Input, FormText } from "reactstrap";
import { changePicture } from "../../store/actions/authActions";

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      user: {}
    };
  }

  loadUser = () => {
    userServices
      .getByUsername(this.props.match.params.username)
      .then(user => {
        this.setState({ loading: false, user });
      })
      .catch(() => this.props.history.push("/404"));
  };

  componentDidMount() {
    this.loadUser();
  }

  handleUpload = event => {
    userServices.uploadImage(event.target.files[0]).then(user => {
      this.props.changePicture(user.userImage);
      this.loadUser();
    });
  };

  render() {
    if (this.state.loading) {
      return <></>;
    }
    const { username, userImage, email, createdAt } = this.state.user;
    return (
      <div className="user-wrapper">
        <img src={`/${userImage}`} alt="User" className="user-picture" />
        <Details details={{ username, email, createdAt }} />
        {username === this.props.currentUser.username && (
          <>
            <Input type="file" onChange={this.handleUpload} />
            <FormText color="muted">Change profile picture</FormText>
          </>
        )}

        <Posts posts={this.state.user.Posts} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.authentication.user
});

const mapDispatchToProps = {
  changePicture
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);
