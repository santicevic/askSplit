import React from "react";
import { Card, CardText } from "reactstrap";
import moment from "moment";
import Role from "../../utils/role";
import { connect } from "react-redux";

const ReplyComment = props => {
  const { User, body, createdAt, id } = props.replyComment;
  return (
    <Card className="m-1 p-1">
      <div className="m-2">
        <img
          src={`http://localhost:8000/${User.userImage}`}
          alt="Avatar"
          className="avatar-comment"
        />
        <span>{User.username}</span>
        {props.currentUser.role === Role.Admin && (
          <i
            className="far fa-trash-alt float-right"
            style={{ cursor: "pointer" }}
            onClick={() => props.onCommentRemove(id)}
          />
        )}
        <div>{body}</div>
      </div>
      <CardText className="text-right">{moment(createdAt).fromNow()}</CardText>
    </Card>
  );
};

const mapStateToProps = state => ({
  currentUser: state.authentication.user
});

export default connect(mapStateToProps)(ReplyComment);
