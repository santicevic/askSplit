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
  Col
} from "reactstrap";
import { postServices } from "../../services/posts";
import moment from "moment";
import { replyServices } from "../../services/replies";

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
      vote: null
    };
  }

  loadPosts = () => {
    postServices
      .getById(this.props.match.params.id, this.props.currentUser.id)
      .then(result => {
        this.setState({
          ...result.post,
          score: result.score,
          vote: result.vote
        });
      });
  };

  componentDidMount() {
    this.loadPosts();
  }

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
      });
  };

  handleAddReply = body => {
    replyServices.add(body, this.state.id).then(() => {
      this.loadPosts();
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
              <Badge key={tag.id} color="info">
                {tag.name}
              </Badge>
            ))}
          </span>
        </CardHeader>
        <CardBody>
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
              <CardTitle>{User.username}</CardTitle>
              <CardText>
                {body}
                {update && (
                  <>
                    UPDATE: {update}
                    <br />
                  </>
                )}
              </CardText>
            </Col>
          </Row>
          <CardText className="text-right">
            {moment(createdAt).fromNow()}
          </CardText>
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

export default connect(mapStateToProps)(Post);
