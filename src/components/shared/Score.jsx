import React from "react";
import { Badge, Form } from "react-bootstrap";
import PropTypes from "prop-types";

const Score = ({ value, label }) => {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <h2>
        <Badge className pill variant="primary">
          {value}
        </Badge>
      </h2>
    </Form.Group>
  );
};

Score.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default Score;
