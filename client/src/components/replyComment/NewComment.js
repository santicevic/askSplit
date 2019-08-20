import React, { Component } from "react";
import { Collapse, Input, Button } from "reactstrap";

class NewComment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      comment: ""
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClick = event => {
    if (!this.state.isOpen || !this.state.comment) {
      this.setState({ isOpen: true });
      return;
    }

    this.props.onCommentPost(this.state.comment);
    this.setState({ isOpen: false, comment: "" });
  };

  render() {
    return (
      <>
        <Collapse isOpen={this.state.isOpen}>
          <Input
            type="textarea"
            value={this.state.comment}
            name="comment"
            id="Comment"
            placeholder="Comment here"
            onChange={this.handleChange}
          />
        </Collapse>
        <Button onClick={this.handleClick} className="m-2">
          <i className="far fa-comment-dots" />
        </Button>
      </>
    );
  }
}

export default NewComment;
