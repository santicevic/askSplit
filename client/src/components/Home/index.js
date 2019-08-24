import React, { Component } from "react";
import "../../styles/Home.css";
import { Spinner, Button } from "reactstrap";
import { postServices } from "../../services/posts";
import TagSelect from "./TagSelect";
import Post from "./Post";

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
            <Post post={post} key={post.id} />
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
