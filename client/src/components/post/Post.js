import React, { Component } from "react";
import { connect } from "react-redux";
import PostReply from "./PostReply";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardFooter,
  Badge,
  Row,
  Col,
  Button,
  Collapse,
  Input
} from "reactstrap";
import { postServices } from "../../services/posts";
import moment from "moment";
import { replyServices } from "../../services/replies";
import { showMessage } from "../../store/actions/messageActions";

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Tags: [],
      User: { username: "" },
      Replies: [],
      body: "",
      createdAt: new Date(),
      header: "",
      update: "",
      score: { upVote: 0, downVote: 0 },
      vote: null,
      isUpdateOpen: false
    };
  }

  loadPosts = () => {
    Promise.all([
      postServices.getById(this.props.match.params.id),
      postServices.getScore(this.props.match.params.id),
      postServices.getVote(this.props.match.params.id)
    ]).then(result => {
      this.setState({ ...result[0], score: result[1], vote: result[2] });
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
        if (vote) {
          this.setState({ vote });
        } else {
          this.setState({ vote: null });
        }
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
      vote
    } = this.state;

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
          <Row>
            <Col xs="1">
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
            </Col>
            <Col xs="11">
              <CardText>{body}</CardText>
            </Col>
          </Row>
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
          <PostReply replies={Replies} onAddReply={this.handleAddReply} />
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
