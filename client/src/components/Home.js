import React, { Component } from "react";
import "../styles/Home.css";
import moment from "moment";
import {
  Badge,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText
} from "reactstrap";
import { postServices } from "../services/posts";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    postServices.getAll().then(posts => {
      this.setState({ posts });
    });
  }

  render() {
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
                  <h4>User: {post.User.username}</h4>
                  <div className="text-right">
                    {post.Tags.map(tag => (
                      <Badge className="m-2" key={tag.id} color="info">
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                </CardTitle>
                <CardText>{post.body}</CardText>
                <span>{moment(post.createdAt).fromNow()}</span>
              </CardBody>
            </Card>
          ))}
        </div>
      </>
    );
  }
}

export default Home;
