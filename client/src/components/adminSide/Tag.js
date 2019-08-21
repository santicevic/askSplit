import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Badge } from "reactstrap";
import { showMessage } from "../../store/actions/messageActions";
import { tagServices } from "../../services/tags";
import { connect } from "react-redux";

class Tag extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: [],
      name: ""
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

  handleSubmit = () => {
    if (!this.state.name) {
      this.props.showMessage("Tag can not be empty", "red");
      return;
    }

    if (
      this.state.tags.filter(tag => tag.name === this.state.name).length > 0
    ) {
      this.props.showMessage("Tag with same name exists!", "red");
      return;
    }

    tagServices.post(this.state.name).then(() => {
      tagServices.getAll().then(tags => {
        this.setState({ tags });
      });
    });
  };

  render() {
    return (
      <Form style={{ maxWidth: "500px", margin: "20px auto" }}>
        <FormGroup>
          <Label for="Name">Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Tag name"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="AllTags">Existing tags</Label>
          <div>
            {this.state.tags.map(tag => (
              <Badge
                key={tag.id}
                className="mr-2"
                style={{ cursor: "pointer" }}
              >
                {tag.name}
              </Badge>
            ))}
          </div>
        </FormGroup>
        <Button onClick={this.handleSubmit}>Add tag</Button>
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
)(Tag);
