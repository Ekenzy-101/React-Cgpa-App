import React from "react";
import { Link, Redirect } from "react-router-dom";
import { Alert, Form } from "react-bootstrap";
import { validateEmail, validatePassword } from "../../utils/validation";
import CustomForm from "../shared/Form";
import { TO_HOME, TO_SIGNUP } from "../../utils/constant";
import { getCurrentUser, login } from "../../services/authService";

class LoginForm extends CustomForm {
  state = {
    data: {
      password: "",
      email: "",
    },
    errors: {
      password: "",
      email: "",
    },
    error: "",
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await login(data.email, data.password);

      const { state } = this.props.location;
      window.location = state ? state.from.pathname : TO_HOME;
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.setState({ error: ex.response.data });
      }
    }
    let errors = {};
    this.setState({ errors });
  };

  render() {
    const { error } = this.state;
    if (getCurrentUser()) return <Redirect to={TO_HOME} />;
    return (
      <>
        <h3 className="text-center mb-2">Welcome Back</h3>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email", validateEmail, "email")}
          {this.renderInput(
            "password",
            "Password",
            validatePassword,
            "password"
          )}
          {this.renderButton("LOGIN")}
          <Form.Group>
            <p className="text-center">
              Don't Have An Account? <Link to={TO_SIGNUP}>Sign Up</Link>
            </p>
          </Form.Group>
        </Form>
      </>
    );
  }
}

export default LoginForm;
