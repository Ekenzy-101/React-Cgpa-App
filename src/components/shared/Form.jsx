import React, { Component } from "react";
import Input from "./Input";
// import Select from "./Select";
import { Button, Form } from "react-bootstrap";
import Select from "./Select";

class CustomForm extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    let errors = Object.values(this.state.errors);

    if (!errors.length) return false;
    return true;
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    await this.doSubmit();
  };

  handleChange = (validate, { currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const error = validate(input.value);
    if (error) errors[input.name] = error;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  handleSelect = ({ target: { name, value } }) => {
    const data = { ...this.state.data };
    data[name] = value;
    this.setState({ data });
  };

  handleBlur = (validate, { currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const error = validate(input.value);
    if (error) errors[input.name] = error;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  renderButton = (label) => {
    return (
      <Form.Group className="mt-5">
        <Button block onClick={this.handleSubmit} disabled={this.validate()}>
          {label}
        </Button>
      </Form.Group>
    );
  };

  renderInput = (name, label, validate, type = "text") => {
    const { data, errors } = this.state;

    return (
      <Input
        name={name}
        type={type}
        value={data[name]}
        validate={validate}
        label={label}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        error={errors[name]}
      />
    );
  };

  renderSelect = (name, label, options) => {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        options={options}
        value={data[name]}
        label={label}
        onChange={this.handleSelect}
        error={errors[name]}
      />
    );
  };
}

export default CustomForm;
