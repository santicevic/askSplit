import React, { Component } from "react";
import { replyServices } from "../../services/replies";
import { connect } from "react-redux";
import moment from "moment";
import { Card, CardBody, CardText } from "reactstrap";
import { showMessage } from "../../store/actions/messageActions";

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

  handleReaction = isUp => {
    replyServices
      .postVote(this.props.reply.id, isUp)
      .then(vote => {
        this.setState({ voteIsUp: vote.isUp });
      })
      .then(() => {
        replyServices.getById(this.props.reply.id).then(reply => {
          this.setState({ reply });
        });
      })
      .catch(error => {
        this.props.showMessage("Log in to leave a reaction", "red");
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Reply);
