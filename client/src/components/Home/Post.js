import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Badge,
  CardText
} from "reactstrap";
import { withRouter } from "react-router";
import moment from "moment";
import { LinkContainer } from "react-router-bootstrap";

const Post = props => {
  const { post } = props;

  return (
    <Card className="home-post_header">
      <CardHeader
        className="pointer"
        onClick={() => props.history.push(`/posts/${post.id}`)}
      >
        {post.header}
      </CardHeader>
      <CardBody>
        <CardTitle>
          <LinkContainer to={`/users/${post.User.username}`}>
            <img
              src={`http://localhost:8000/${post.User.userImage}`}
              alt="Avatar"
              className="avatar-home pointer"
            />
          </LinkContainer>
          <h4 className="d-inline">{post.User.username}</h4>
          {post.Tags.map(tag => (
            <Badge className="ml-1 float-right" key={tag.id} color="info">
              {tag.name}
            </Badge>
          ))}
        </CardTitle>
        <CardText>{post.body}</CardText>
        <div className="home-post_info">
          <span>{moment(post.createdAt).fromNow()}</span>
          <span className="float-right">{post.score}</span>
          <i className="far fa-star float-right" />
        </div>
      </CardBody>
    </Card>
  );
};

export default withRouter(Post);
