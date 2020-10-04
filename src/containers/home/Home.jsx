import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import TabGroup from "../../components/TabGroup";
import FilterGroup from "../../components/FilterGroup";
import { TO_NEW_COURSE } from "../../utils/constant";

const Home = () => {
  return (
    <Container fluid className="home-container pt-5">
      <FilterGroup />
      <TabGroup />
      <Link
        to={TO_NEW_COURSE}
        className="btn btn-primary btn-new rounded-circle btn-lg"
      >
        <i className="fas fa-plus"></i>
      </Link>
    </Container>
  );
};

export default Home;
