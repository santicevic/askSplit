import React from "react";
import { Card, CardTitle, CardBody, CardText } from "reactstrap";
import moment from "moment";

const PostReply = props => (
  <>
    {props.replies.map(reply => (
      <Card key={reply.id}>
        <CardTitle>{reply.User.username}</CardTitle>
        <CardBody>{reply.body}</CardBody>
        <CardText className="text-right">
          {moment(reply.createdAt).fromNow()}
        </CardText>
      </Card>
    ))}
  </>
);

export default PostReply;
