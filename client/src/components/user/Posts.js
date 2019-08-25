import React from "react";
import moment from "moment";
import { LinkContainer } from "react-router-bootstrap";

const Posts = props => {
  return (
    <div className="posts-wrapper">
      {props.posts.map(post => (
        <div className="post-item" key={post.id}>
          <LinkContainer to={`/posts/${post.id}`}>
            <h1 className="pointer">{post.header}</h1>
          </LinkContainer>
          <span className="float-right">
            {moment(post.createdAt).fromNow()}
          </span>
          <h5>Score: {post.score}</h5>
          <p className="user-text">{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default Posts;
