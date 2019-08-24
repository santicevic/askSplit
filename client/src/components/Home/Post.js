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

const Post = props => {
  const { post } = props;

  return (
    <Card className="home-post_header">
      <CardHeader onClick={() => props.history.push(`/posts/${post.id}`)}>
        {post.header}
      </CardHeader>
      <CardBody>
        <CardTitle>
          <h4 className="d-inline">User: {post.User.username}</h4>
          {post.Tags.map(tag => (
            <Badge className="ml-1 float-right" key={tag.id} color="info">
              {tag.name}
            </Badge>
          ))}
        </CardTitle>
        <CardText>{post.body}</CardText>
        <span>{moment(post.createdAt).fromNow()}</span>
        <i className="far fa-star float-right" />
        <span className="float-right">{post.score}</span>
      </CardBody>
    </Card>
  );
};

export default withRouter(Post);
