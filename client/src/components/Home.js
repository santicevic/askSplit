import React, { Component } from "react";
import "../styles/Home.css";
import moment from "moment";
import {
  Badge,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  Spinner
} from "reactstrap";
import { postServices } from "../services/posts";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    postServices.getAll().then(posts => {
      this.setState({ posts, loading: false });
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="text-center">
          <Spinner />
        </div>
      );
    }

    return (
      <>
        <div className="home-post_container">
          {this.state.posts.map(post => (
            <Card key={post.id} className="home-post_header">
              <CardHeader
                onClick={() => this.props.history.push(`/posts/${post.id}`)}
                style={{ cursor: "pointer" }}
              >
                {post.header}
              </CardHeader>
              <CardBody>
                <CardTitle>
                  <h4 className="d-inline">User: {post.User.username}</h4>
                  {post.Tags.map(tag => (
                    <Badge
                      className="ml-1 float-right"
                      key={tag.id}
                      color="info"
                    >
                      {tag.name}
                    </Badge>
                  ))}
                </CardTitle>
                <CardText>{post.body}</CardText>
                <span>{moment(post.createdAt).fromNow()}</span>
                <span className="float-right">{post.score}</span>
              </CardBody>
            </Card>
          ))}
        </div>
      </>
    );
  }
}

export default Home;
