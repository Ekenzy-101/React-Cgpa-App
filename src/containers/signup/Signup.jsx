import React, { useEffect, useState } from "react";
import { Col, Container } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import Loading from "../../components/shared/Loading";
import SignUpForm from "../../components/signup-form/SignUpForm";
import { getCurrentUser } from "../../services/authService";
import { TO_HOME } from "../../utils/constant";

const Signup = (props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (getCurrentUser()) return <Redirect to={TO_HOME} />;
  if (loading) return <Loading />;

  return (
    <Container className="signup-container px-0" fluid>
      <Col xs={11} sm={9} md={6} lg={5} className="mx-auto mt-5">
        <SignUpForm {...props} />
      </Col>
    </Container>
  );
};

export default Signup;
