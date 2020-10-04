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
import CustomForm from "../shared/Form";

class SignUpForm extends CustomForm {
  state = {
    data: {
      firstname: "",
      lastname: "",
      password: "",
      email: "",
    },
    errors: {
      firstname: "",
      lastname: "",
      password: "",
      email: "",
    },
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      const { headers } = await register(data);
      loginWithJwt(headers["x-auth-token"]);
      window.location = TO_HOME;
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <>
        <h3 className="text-center">Sign Up</h3>
        <Form onSubmit={this.handleSubmit}>
          {this.renderInput("firstname", "Firstname", validateName)}
          {this.renderInput("lastname", "Lastname", validateName)}
          {this.renderInput("email", "Email", validateEmail, "email")}
          {this.renderInput(
            "password",
            "Password",
            validatePassword,
            "password"
          )}
          {this.renderButton("SIGN UP")}
          <Form.Group>
            <p className="text-center">
              Have An Account Already? <Link to={TO_LOGIN}>Login</Link>
            </p>
          </Form.Group>
        </Form>
      </>
    );
  }
}

export default SignUpForm;
