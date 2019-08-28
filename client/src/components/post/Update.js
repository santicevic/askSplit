import React from "react";
import { Button, Collapse, Input } from "reactstrap";

const Update = props => {
  return (
    <>
      <Button onClick={props.onUpdate}>Update</Button>
      <Collapse isOpen={props.isOpen}>
        <Input
          type="textarea"
          value={props.value || ""}
          name="update"
          id="Update"
          placeholder="Write update!"
          onChange={props.onChange}
        />
      </Collapse>
    </>
  );
};

export default Update;
