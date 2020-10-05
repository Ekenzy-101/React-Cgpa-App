import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Select from "../Select";
import Input from "../Input";

const useForm = (initialData, initialErrors) => {
  const [formData, setData] = useState(initialData);
  const [formErrors, setErrors] = useState(initialErrors);

  const validate = () => {
    let errors = Object.values(formErrors);

    if (!errors.length) return false;
    return true;
  };

  const handleSubmit = async (doSubmit, e) => {
    e.preventDefault();
    await doSubmit();
  };

  const handleChange = (validate, { currentTarget: input }) => {
    const errors = { ...formErrors };
    const error = validate(input.value);
    if (error) errors[input.name] = error;
    else delete errors[input.name];

    const data = { ...formData };
    data[input.name] = input.value;
    setData(data);
    setErrors(errors);
  };

  const handleSelect = ({ target: { name, value } }) => {
    const data = { ...formData };
    data[name] = value;
    setData(data);
  };

  const handleBlur = (validate, { currentTarget: input }) => {
    const errors = { ...formErrors };
    const error = validate(input.value);
    if (error) errors[input.name] = error;
    else delete errors[input.name];

    const data = { ...formData };
    data[input.name] = input.value;
    setData(data);
    setErrors(errors);
  };

  const renderButton = (label) => {
    return (
      <Form.Group className="mt-5">
        <Button block type="submit" disabled={validate()}>
          {label}
        </Button>
      </Form.Group>
    );
  };

  const renderInput = (name, label, validate, type = "text") => {
    return (
      <Input
        name={name}
        type={type}
        value={formData[name]}
        validate={validate}
        label={label}
        onChange={handleChange}
        onBlur={handleBlur}
        error={formErrors[name]}
      />
    );
  };

  const renderSelect = (name, label, options) => {
    return (
      <Select
        name={name}
        options={options}
        value={formData[name]}
        label={label}
        onChange={handleSelect}
        error={formErrors[name]}
      />
    );
  };

  return {
    renderInput,
    renderSelect,
    renderButton,
    handleSubmit,
    data: formData,
    errors: formErrors,
    setErrors,
    setData,
  };
};

export default useForm;
