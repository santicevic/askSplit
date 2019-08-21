import React from "react";

const ScoreRate = props => {
  return (
    <div>
      <i
        className={
          props.voteIsUp
            ? "fas fa-arrow-alt-circle-up"
            : "far fa-arrow-alt-circle-up"
        }
        style={{ cursor: "pointer" }}
        onClick={() => props.onReaction(true)}
      />
      <div>{props.score}</div>
      <i
        className={
          props.voteIsUp
            ? "far fa-arrow-alt-circle-down"
            : props.voteIsUp === false
            ? "fas fa-arrow-alt-circle-down"
            : "far fa-arrow-alt-circle-down"
        }
        style={{ cursor: "pointer" }}
        onClick={() => props.onReaction(false)}
      />
    </div>
  );
};

export default ScoreRate;
