import React from "react";
import moment from "moment";

const Details = props => {
  return (
    <div className="info-wrapper">
      <h4>Username: {props.details.username}</h4>
      <h4>e-mail: {props.details.email}</h4>
      <h4>
        Member since: {moment(props.details.createdAt).format("MMMM Do YYYY")}
      </h4>
    </div>
  );
};

export default Details;
