import React, { Component } from "react";
import { Col, Container } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import LoginForm from "../../components/login-form/LoginForm";
import Loading from "../../components/shared/Loading";
import { getCurrentUser } from "../../services/authService";
import { TO_HOME } from "../../utils/constant";

class Login extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) return <Loading />;
    if (getCurrentUser()) return <Redirect to={TO_HOME} />;

    return (
      <Container className="login-container px-0" fluid>
        <Col xs={11} sm={9} md={6} lg={5} className="mx-auto mt-5">
          <LoginForm {...this.props} />
        </Col>
      </Container>
    );
  }
}

export default Login;
