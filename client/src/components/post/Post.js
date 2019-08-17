import React, { Component } from "react";
import { connect } from "react-redux";
import RepliesComponent from "../reply/Replies";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardFooter,
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

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      isUpdateOpen: false
    };
  }

  loadPosts = () => {
    Promise.all([
      postServices.getById(this.props.match.params.id),
      postServices.getScore(this.props.match.params.id)
    ]).then(result => {
      this.setState({ ...result[0], score: result[1], loading: false });
      if (this.props.currentUser.role !== Role.Guest) {
        postServices.getVote(this.props.match.params.id).then(vote => {
          this.setState({ vote });
        });
      }
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
      .reaction(this.props.match.params.id, isUp)
      .then(vote => {
        this.setState({ vote });
      })
      .then(() => {
        postServices.getScore(this.props.match.params.id).then(score => {
          this.setState({ score });
        });
      })
      .catch(error => {
        this.props.showMessage("Log in to leave a reaction", "red");
      });
  };

  handleAddReply = body => {
    replyServices.add(body, this.state.id).then(() => {
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
      vote,
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
          <span style={{ float: "right" }}>
            {Tags.map(tag => (
              <Badge key={tag.id} className="ml-1" color="info">
                {tag.name}
              </Badge>
            ))}
          </span>
        </CardHeader>
        <CardBody>
          <CardTitle>
            <h5>{User.username}</h5>
          </CardTitle>
          <div className="d-flex">
            <div>
              <i
                className={
                  !vote
                    ? "far fa-arrow-alt-circle-up"
                    : vote.isUp
                    ? "fas fa-arrow-alt-circle-up"
                    : "far fa-arrow-alt-circle-up"
                }
                style={{ cursor: "pointer" }}
                onClick={() => this.handleReaction(true)}
              />
              <div>{score.upVote - score.downVote}</div>
              <i
                className={
                  !vote
                    ? "far fa-arrow-alt-circle-down"
                    : vote.isUp
                    ? "far fa-arrow-alt-circle-down"
                    : "fas fa-arrow-alt-circle-down"
                }
                style={{ cursor: "pointer" }}
                onClick={() => this.handleReaction(false)}
              />
            </div>
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
        <CardFooter>
          <RepliesComponent
            replies={Replies}
            onAddReply={this.handleAddReply}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
