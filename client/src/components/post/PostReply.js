import React, { Component } from "react";
import {
  Card,
  CardTitle,
  CardBody,
  CardText,
  Button,
  Collapse,
  Input
} from "reactstrap";
import moment from "moment";

class PostReply extends Component {
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
    if (!this.state.isOpen) {
      this.setState({ isOpen: true });
      return;
    }

    if (this.state.reply.length > 0) {
      this.props.onAddReply(this.state.reply);
    }
  };

  render() {
    return (
      <>
        {this.props.replies.map(reply => (
          <Card key={reply.id} className="m-2">
            <CardTitle>{reply.User.username}</CardTitle>
            <CardBody>{reply.body}</CardBody>
            <CardText className="text-right">
              {moment(reply.createdAt).fromNow()}
            </CardText>
          </Card>
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
          Reply
        </Button>
      </>
    );
  }
}

export default PostReply;
