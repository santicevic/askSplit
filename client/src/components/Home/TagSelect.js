import React, { Component } from "react";
import { tagServices } from "../../services/tags";
import { FormGroup, Label, Input } from "reactstrap";

class TagSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: []
    };
  }

  componentDidMount() {
    tagServices.getAll().then(tags => {
      this.setState({ tags });
    });
  }

  handleChange = event => {
    event.persist();
    this.props.onTagFilterChange(event.target.value);
  };

  render() {
    return (
      <FormGroup>
        <Label for="tagSelect">Filter by tag</Label>
        <Input
          onChange={this.handleChange}
          type="select"
          name="tagSelect"
          id="tagSelect"
        >
          <option value="None">None</option>
          {this.state.tags.map(tag => (
            <option value={tag.name} key={tag.id}>
              {tag.name}
            </option>
          ))}
        </Input>
      </FormGroup>
    );
  }
}

export default TagSelect;
