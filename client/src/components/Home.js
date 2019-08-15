import React, { Component } from "react";
import "../styles/Home.css";
import moment from "moment";
import { Container, Row, Col } from "reactstrap";
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
            <Row>
              <Col className="Home-post_header">
                <h3>{post.header}</h3>
              </Col>
            </Row>
            <Row className="pt-2 pb-2">
              <Col xs="10">User: {post.User.username}</Col>
              <Col sm="2">{moment(post.createdAt).fromNow()}</Col>
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
