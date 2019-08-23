import React from "react";
import { Alert } from "reactstrap";
import moment from "moment";

const Notification = props => {
  if (props.notification.type === "post") {
    return (
      <a
        href={`/posts/${props.notification.postId}`}
        style={{ cursor: "pointer" }}
      >
        <Alert>
          The user <b>{props.notification.User.username}</b> has replied to your
          post <b>{props.notification.Post.header}</b>
          <div>{moment(props.notification.createdAt).fromNow()}</div>
        </Alert>
      </a>
    );
  }

  return (
    <a
      href={`/posts/${props.notification.Reply.postId}`}
      style={{ cursor: "pointer" }}
    >
      <Alert color="primary">
        The user <b>{props.notification.User.username}</b> has commented your
        reply <b>{props.notification.Reply.body}</b> on the post{" "}
        <b>{props.notification.Reply.Post.header}</b>
        <div>{moment(props.notification.createdAt).fromNow()}</div>
      </Alert>
    </a>
  );
};

export default Notification;
