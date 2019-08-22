import React, { Component } from "react";
import "../../styles/Home.css";
import moment from "moment";
import {
  Badge,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  Spinner,
  Button
} from "reactstrap";
import { postServices } from "../../services/posts";
import TagSelect from "./TagSelect";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      tagFilter: "None"
    };
  }

  componentDidMount() {
    postServices.get(0).then(posts => {
      this.setState({ posts, loading: false });
    });
  }

  handleGetMore = () => {
    postServices
      .get(this.state.posts.length, this.state.tagFilter)
      .then(posts => {
        this.setState(state => ({ posts: [...state.posts, ...posts] }));
      });
  };

  handleTagFilterChange = tagName => {
    postServices.get(0, tagName).then(posts => {
      this.setState({ posts, tagFilter: tagName });
    });
  };

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
        <TagSelect onTagFilterChange={this.handleTagFilterChange} />
        <div className="home-post_container">
          {this.state.posts.map(post => (
            <Card key={post.id} className="home-post_header">
              <CardHeader
                onClick={() => this.props.history.push(`/posts/${post.id}`)}
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
                <i className="far fa-star float-right" />
                <span className="float-right">{post.score}</span>
              </CardBody>
            </Card>
          ))}
        </div>
        <Button className="w-100" onClick={this.handleGetMore}>
          Get 4 more
        </Button>
      </>
    );
  }
}

export default Home;
