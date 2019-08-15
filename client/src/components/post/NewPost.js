import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Badge,
  FormText
} from "reactstrap";
import { showMessage } from "../../store/actions/messageActions";
import { tagServices } from "../../services/tags";
import { postServices } from "../../services/posts";
import { connect } from "react-redux";

class NewPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      header: "",
      body: "",
      error: "",
      selectedTags: [],
      tags: []
    };
  }

  componentDidMount() {
    tagServices.getAll().then(tags => {
      this.setState({ tags });
    });
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleTag = tag => {
    if (this.state.selectedTags.includes(tag)) {
      this.setState({
        selectedTags: this.state.selectedTags.filter(tagItem => tagItem !== tag)
      });
    } else {
      this.setState(state => ({ selectedTags: [...state.selectedTags, tag] }));
    }
  };

  handleSubmit = () => {
    const { header, body, selectedTags } = this.state;
    if (header.length < 1 && body.length < 1) {
      this.setState({ error: "All fields are required" });
      return;
    }
    if (selectedTags.length < 1) {
      this.setState({ error: "Select at least one tag!" });
      return;
    }

    postServices.add({ header, body, tags: selectedTags }).then(post => {
      this.props.showMessage("Question posted successfuly");
      this.props.history.push("/");
    });
  };

  render() {
    const { header, body, tags, selectedTags, error } = this.state;
    return (
      <Form style={{ maxWidth: "500px", margin: "20px auto" }}>
        <FormGroup>
          <Label for="Header">Title</Label>
          <Input
            type="text"
            name="header"
            id="Header"
            placeholder="Tile"
            value={header}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="Body">Question</Label>
          <Input
            type="textarea"
            name="body"
            id="Body"
            placeholder="Ask your qestion here"
            value={body}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="AllTags">Add a tag</Label>
          <div>
            {tags.map(tag => (
              <Badge
                key={tag.id}
                className="mr-2"
                style={{ cursor: "pointer" }}
                color={selectedTags.includes(tag) ? "success" : "info"}
                onClick={() => this.handleTag(tag)}
              >
                {tag.name}
              </Badge>
            ))}
          </div>
          <FormText color="warning">{error}</FormText>
        </FormGroup>
        <Button onClick={this.handleSubmit}>Submit</Button>
      </Form>
    );
  }
}

const mapDispatchToProps = {
  showMessage
};

export default connect(
  null,
  mapDispatchToProps
)(NewPost);
