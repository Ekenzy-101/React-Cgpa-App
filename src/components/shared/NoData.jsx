import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { TO_NEW_COURSE } from "../../utils/constant";

const NoData = () => {
  return (
    <Container fluid>
      <i className="fas fa-file fa-4x d-block text-center text-primary mx-auto mt-5"></i>
      <h3 className="text-center my-3">This table has no data</h3>
      <p className="text-center my-3">
        It only takes a few seconds to create a new course
      </p>
      <Link
        to={TO_NEW_COURSE}
        style={{
          width: "fit-content",
        }}
        className="btn btn-primary btn-lg d-block mx-auto mb-4"
      >
        Create Course
      </Link>
    </Container>
  );
};

export default NoData;
