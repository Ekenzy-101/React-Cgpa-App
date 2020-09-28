import React from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

const SearchBox = ({ onChange, ...rest }) => {
  return (
    <Form.Group>
      <Form.Label>Search</Form.Label>
      <Form.Control
        placeholder="Search By Title..."
        {...rest}
        onChange={(e) => onChange(e)}
      />
    </Form.Group>
  );
};

SearchBox.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default SearchBox;
