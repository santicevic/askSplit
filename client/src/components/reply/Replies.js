import React, { Component } from "react";
import { Button, Collapse, Input } from "reactstrap";
import Reply from "./Reply";
import { connect } from "react-redux";
import Role from "../../utils/role";
import { showMessage } from "../../store/actions/messageActions";

class Replies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      reply: ""
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClick = event => {
    if (this.props.currentUser.role === Role.Guest) {
      this.props.showMessage(
        "You have to be logged in to leave a reply",
        "red"
      );
      return;
    }

    if (!this.state.isOpen) {
      this.setState({ isOpen: true });
      return;
    }

    if (this.state.reply.length > 0) {
      this.props.onAddReply(this.state.reply);
      this.setState({ isOpen: false, reply: "" });
    }
  };

  render() {
    return (
      <>
        {this.props.replies.map(reply => (
          <Reply
            key={reply.id}
            reloadPost={this.props.reloadPost}
            reply={reply}
          />
        ))}
        <Collapse isOpen={this.state.isOpen}>
          <Input
            type="textarea"
            value={this.state.reply}
            name="reply"
            id="Reply"
            placeholder="Reply here"
            onChange={this.handleChange}
          />
        </Collapse>
        <Button onClick={this.handleClick} className="m-2">
          <i className="fas fa-comment-dots" />
        </Button>
      </>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.authentication.user
});

const mapDispatchToProps = {
  showMessage
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Replies);
