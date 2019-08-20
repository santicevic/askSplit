import React from "react";
import { Card, CardText } from "reactstrap";
import moment from "moment";

const ReplyComment = props => {
  const { User, body, createdAt } = props.replyComment;
  return (
    <Card>
      <div className="m-2">
        <span>{User.username}</span>
        <div>{body}</div>
      </div>
      <CardText className="text-right">{moment(createdAt).fromNow()}</CardText>
    </Card>
  );
};

export default ReplyComment;
