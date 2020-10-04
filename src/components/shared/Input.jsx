import React from "react";
import { Form } from "react-bootstrap";
import cx from "classnames";
import PropTypes from "prop-types";

const Input = ({ name, label, error, validate, onChange, onBlur, ...rest }) => {
  return (
    <Form.Group className="mt-3">
      <Form.Label htmlFor={name}>{label}</Form.Label>
      <Form.Control
        {...rest}
        id={name}
        name={name}
        className={cx(
          { "is-valid": error === undefined },
          { "is-invalid": error }
        )}
        onChange={(e) => onChange(validate, e)}
        onBlur={(e) => onBlur(validate, e)}
      />
      {error && (
        <small className="invalid-feedback d-block w-100">{error}</small>
      )}
    </Form.Group>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  validate: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

export default Input;
