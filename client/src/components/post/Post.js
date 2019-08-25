import React, { Component } from "react";
import { connect } from "react-redux";
import RepliesComponent from "../reply/Replies";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  Badge,
  Button,
  Collapse,
  Input,
  Spinner
} from "reactstrap";
import { postServices } from "../../services/posts";
import moment from "moment";
import { replyServices } from "../../services/replies";
import { showMessage } from "../../store/actions/messageActions";
import Role from "../../utils/role";
import ScoreRate from "../utilComponents/ScoreRate";
import { LinkContainer } from "react-router-bootstrap";

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      isUpdateOpen: false
    };
  }

  loadPosts = () => {
    postServices.getById(this.props.match.params.id).then(post => {
      if (!post) {
        this.props.history.push("/404");
        return;
      }

      const currentUserVote = post.PostVotes.find(
        vote => vote.userId === this.props.currentUser.id
      );

      const voteIsUp = currentUserVote ? currentUserVote.isUp : null;
      this.setState({
        ...post,
        loading: false,
        voteIsUp
      });
    });
  };

  componentDidMount() {
    this.loadPosts();
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleReaction = isUp => {
    postServices
      .postVote(this.props.match.params.id, isUp)
      .then(vote => {
        this.setState({ voteIsUp: vote.isUp });
      })
      .then(() => {
        this.loadPosts();
      })
      .catch(error => {
        this.props.showMessage("Log in to leave a reaction", "red");
      });
  };

  handleAddReply = body => {
    replyServices.post(body, this.state.id).then(() => {
      this.loadPosts();
    });
  };

  handleUpdate = () => {
    if (!this.state.isUpdateOpen || !this.state.update) {
      this.setState({ isUpdateOpen: true });
      return;
    }

    postServices
      .update({ ...this.state, id: this.props.match.params.id })
      .then(response => {
        this.setState({ update: response.update, isUpdateOpen: false });
        this.props.showMessage("Update successful");
      });
  };

  handleRemove = () => {
    postServices.remove(this.state.id).then(() => {
      this.props.showMessage("Post removed!");
      this.props.history.push("/");
    });
  };

  render() {
    const {
      Tags,
      User,
      Replies,
      body,
      header,
      update,
      createdAt,
      score,
      voteIsUp,
      loading
    } = this.state;
    if (loading) {
      return (
        <div className="text-center">
          <Spinner />
        </div>
      );
    }

    return (
      <Card>
        <CardHeader>
          {header}
          <span className="float-right">
            {Tags.map(tag => (
              <Badge key={tag.id} className="ml-1" color="info">
                {tag.name}
              </Badge>
            ))}
          </span>
        </CardHeader>
        <CardBody>
          <CardTitle>
            <LinkContainer to={`/users/${User.username}`}>
              <img
                src={`http://localhost:8000/${User.userImage}`}
                alt="Avatar"
                className="avatar-post pointer"
              />
            </LinkContainer>
            <h5>{User.username}</h5>
            {this.props.currentUser.role === Role.Admin && (
              <i
                className="far fa-trash-alt float-right"
                style={{ cursor: "pointer" }}
                onClick={this.handleRemove}
              />
            )}
          </CardTitle>
          <div className="d-flex">
            <ScoreRate
              onReaction={this.handleReaction}
              score={score}
              voteIsUp={voteIsUp}
            />
            <CardText className="flex-grow-1 m-3">{body}</CardText>
          </div>
          <CardText className="text-right">
            {moment(createdAt).fromNow()}
          </CardText>
          <div className="text-right">
            <CardText className="float-left">
              {update && !this.state.isUpdateOpen && <>UPDATE: {update}</>}
            </CardText>
            {User.id === this.props.currentUser.id && (
              <>
                <Button onClick={this.handleUpdate}>Update</Button>
                <Collapse isOpen={this.state.isUpdateOpen}>
                  <Input
                    type="textarea"
                    value={this.state.update || ""}
                    name="update"
                    id="Update"
                    placeholder="Write update!"
                    onChange={this.handleChange}
                  />
                </Collapse>
              </>
            )}
          </div>
        </CardBody>
        <div>
          <RepliesComponent
            replies={Replies.sort((a, b) =>
              a.score > b.score ? -1 : a.score < b.score ? 1 : 0
            )}
            onAddReply={this.handleAddReply}
            reloadPost={this.loadPosts}
          />
        </div>
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
)(Post);
