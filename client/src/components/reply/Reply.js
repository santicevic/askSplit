import React, { Component } from "react";
import { replyServices } from "../../services/replies";
import { connect } from "react-redux";
import moment from "moment";
import { Card, CardBody, CardText, CardFooter } from "reactstrap";
import { showMessage } from "../../store/actions/messageActions";
import ReplyComments from "../replyComment";
import Role from "../../utils/role";
import { withRouter } from "react-router-dom";
import { replyCommentServices } from "../../services/replyComments";

class Reply extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    const currentUserVote = this.props.reply.ReplyVotes.find(
      vote => vote.userId === this.props.currentUser.id
    );

    const voteIsUp = currentUserVote ? currentUserVote.isUp : null;
    this.setState({ voteIsUp, reply: this.props.reply, loading: false });
  }

  loadReply = () => {
    replyServices.getById(this.props.reply.id).then(reply => {
      const currentUserVote = reply.ReplyVotes.find(
        vote => vote.userId === this.props.currentUser.id
      );

      const voteIsUp = currentUserVote ? currentUserVote.isUp : null;

      this.setState({ reply, voteIsUp });
    });
  };

  handleReaction = isUp => {
    replyServices
      .postVote(this.props.reply.id, isUp)
      .then(() => {
        this.loadReply();
      })
      .catch(error => {
        this.props.showMessage("Log in to leave a reaction", "red");
      });
  };

  handleCommentPost = (comment, replyId) => {
    replyCommentServices.post(comment, replyId).then(() => {
      this.loadReply();
    });
  };

  handleCommentRemove = commentId => {
    replyCommentServices.remove(commentId).then(() => {
      this.props.showMessage("Comment removed!");
      this.props.history.push("/");
    });
  };

  handleRemove = () => {
    replyServices.remove(this.state.reply.id).then(() => {
      this.props.showMessage("Reply removed!");
      this.props.history.push("/");
    });
  };

  render() {
    if (this.state.loading) {
      return <></>;
    }

    const { voteIsUp, reply } = this.state;
    return (
      <Card className="m-2 p-2">
        <h5>{reply.User.username}</h5>
        {this.props.currentUser.role === Role.Admin && (
          <i
            className="far fa-trash-alt text-right"
            style={{ cursor: "pointer" }}
            onClick={this.handleRemove}
          />
        )}
        <CardBody className="d-flex">
          <div>
            <i
              className={
                voteIsUp
                  ? "fas fa-arrow-alt-circle-up"
                  : "far fa-arrow-alt-circle-up"
              }
              style={{ cursor: "pointer" }}
              onClick={() => this.handleReaction(true)}
            />
            <div>{reply.score}</div>
            <i
              className={
                voteIsUp
                  ? "far fa-arrow-alt-circle-down"
                  : voteIsUp === false
                  ? "fas fa-arrow-alt-circle-down"
                  : "far fa-arrow-alt-circle-down"
              }
              style={{ cursor: "pointer" }}
              onClick={() => this.handleReaction(false)}
            />
          </div>
          <div className="flex-grow-1 m-3">{reply.body}</div>
        </CardBody>
        <CardText className="text-right">
          {moment(reply.createdAt).fromNow()}
        </CardText>
        <CardFooter>
          <ReplyComments
            onCommentPost={comment => this.handleCommentPost(comment, reply.id)}
            onCommentRemove={this.handleCommentRemove}
            replyComments={reply.ReplyComments}
          />
        </CardFooter>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.authentication.user
});

const mapDispatchToProps = {
  showMessage
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Reply)
);
