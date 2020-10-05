import React from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { loginWithJwt } from "../../services/authService";
import { register } from "../../services/userService";
import { TO_HOME, TO_LOGIN } from "../../utils/constant";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../../utils/validation";
import useForm from "../shared/hooks/useForm";

const SignUpForm = (props) => {
  const {
    renderButton,
    renderInput,
    handleSubmit,
    data,
    errors,
    setErrors,
  } = useForm(
    {
      password: "",
      email: "",
      firstname: "",
      lastname: "",
    },
    {
      password: "",
      email: "",
      firstname: "",
      lastname: "",
    }
  );

  const doSubmit = async () => {
    try {
      const { headers } = await register(data);
      loginWithJwt(headers["x-auth-token"]);
      window.location = TO_HOME;
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        setErrors({ ...errors, email: ex.response.data });
    }
  };

  return (
    <>
      <h3 className="text-center">Sign Up</h3>
      <Form onSubmit={(e) => handleSubmit(doSubmit, e)}>
        {renderInput("firstname", "Firstname", validateName)}
        {renderInput("lastname", "Lastname", validateName)}
        {renderInput("email", "Email", validateEmail, "email")}
        {renderInput("password", "Password", validatePassword, "password")}
        {renderButton("SIGN UP")}
        <Form.Group>
          <p className="text-center">
            Have An Account Already? <Link to={TO_LOGIN}>Login</Link>
          </p>
        </Form.Group>
      </Form>
    </>
  );
};

export default SignUpForm;
