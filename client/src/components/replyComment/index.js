import React from "react";
import ReplyComment from "./ReplyComment";
import NewComment from "./NewComment";

const ReplyComments = props => {
  const { replyComments } = props;

  return (
    <>
      {replyComments.map(replyComment => (
        <ReplyComment key={replyComment.id} replyComment={replyComment} />
      ))}
      <NewComment onCommentPost={props.onCommentPost} />
    </>
  );
};

export default ReplyComments;
