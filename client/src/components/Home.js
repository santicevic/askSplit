import React, { Component } from "react";
import "../styles/Home.css";
import moment from "moment";
import { Container, Row, Col, Badge } from "reactstrap";
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
        {this.state.posts.map(post => (
          <Container key={post.id} className="Home-post_container mb-3">
            <Row
              className="Home-post_header"
              style={{ cursor: "pointer" }}
              onClick={() => this.props.history.push(`/posts/${post.id}`)}
            >
              <Col xs="6">
                <h3>{post.header}</h3>
              </Col>
              <Col sm="6" className="text-right" style={{ cursor: "pointer" }}>
                {post.Tags.map(tag => (
                  <Badge className="m-2" key={tag.id} color="info">
                    {tag.name}
                  </Badge>
                ))}
              </Col>
            </Row>
            <Row className="pt-2 pb-2">
              <Col xs="9">User: {post.User.username}</Col>
              <Col sm="3" className="text-right">
                {moment(post.createdAt).fromNow()}
              </Col>
            </Row>
            <Row>
              <Col>
                <p>{post.body}</p>
              </Col>
            </Row>
          </Container>
        ))}
      </>
    );
  }
}

export default Home;
