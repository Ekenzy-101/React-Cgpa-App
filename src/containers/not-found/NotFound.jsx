import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { TO_HOME } from "../../utils/constant";

const NotFound = () => {
  return (
    <Container className="notfound-container" fluid>
      <div className="w-50 h-50 mx-auto bg-light">
        <h2 className="text-center ">404</h2>
        <h4 className="my-3 text-center ">Page Not Found</h4>
        <Link
          to={TO_HOME}
          style={{
            width: "fit-content",
          }}
          className="btn btn-primary btn-lg d-block mx-auto mb-4"
        >
          BACK TO HOME
        </Link>
      </div>
    </Container>
  );
};

export default NotFound;
