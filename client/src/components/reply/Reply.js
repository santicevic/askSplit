import React, { Component } from "react";
import { replyServices } from "../../services/replies";
import { connect } from "react-redux";
import moment from "moment";
import { Card, CardBody, CardText } from "reactstrap";
import Role from "../../utils/role";

class Reply extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    replyServices.getScore(this.props.reply.id).then(score => {
      this.setState({ score });
      if (this.props.currentUser.role !== Role.Guest) {
        replyServices.getVote(this.props.reply.id).then(vote => {
          this.setState({ vote });
        });
      }
    });
  }

  render() {
    const { reply } = this.props;
    return (
      <Card className="m-2 p-2">
        <h5>{reply.User.username}</h5>
        <CardBody>{reply.body}</CardBody>
        <CardText className="text-right">
          {moment(reply.createdAt).fromNow()}
        </CardText>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.authentication.user
});

export default connect(mapStateToProps)(Reply);
