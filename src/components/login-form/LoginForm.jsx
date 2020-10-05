import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Alert, Form } from "react-bootstrap";
import { validateEmail, validatePassword } from "../../utils/validation";
import { TO_HOME, TO_SIGNUP } from "../../utils/constant";
import { getCurrentUser, login } from "../../services/authService";
import useForm from "../shared/hooks/useForm";

const LoginForm = (props) => {
  const { renderButton, renderInput, handleSubmit, data, setErrors } = useForm(
    {
      password: "",
      email: "",
    },
    {
      password: "",
      email: "",
    }
  );
  const [error, setError] = useState("");

  const doSubmit = async () => {
    try {
      await login(data.email, data.password);

      const { state } = props.location;
      window.location = state ? state.from.pathname : TO_HOME;
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        setError(ex.response.data);
      }
    }
    setErrors({});
  };

  if (getCurrentUser()) return <Redirect to={TO_HOME} />;
  return (
    <>
      <h3 className="text-center mb-2">Welcome Back</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={(e) => handleSubmit(doSubmit, e)}>
        {renderInput("email", "Email", validateEmail, "email")}
        {renderInput("password", "Password", validatePassword, "password")}
        {renderButton("LOGIN")}
        <Form.Group>
          <p className="text-center">
            Don't Have An Account? <Link to={TO_SIGNUP}>Sign Up</Link>
          </p>
        </Form.Group>
      </Form>
    </>
  );
};
export default LoginForm;
