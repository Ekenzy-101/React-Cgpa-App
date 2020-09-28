import React from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

const Select = ({ name, value, label, options, ...rest }) => {
  return (
    <Form.Group>
      <Form.Label htmlFor={name}>{label}</Form.Label>
      <Form.Control
        as="select"
        {...rest}
        id={name}
        name={name}
        value={value}
        className="mb-2"
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
};

Select.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Select;
