import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { TO_HOME, TO_LOGOUT, TO_NEW_COURSE } from "../../utils/constant";

const NavBar = ({ user }) => {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      sticky="top"
      variant="light"
      bg="light"
    >
      <Link to={TO_HOME} className="navbar-brand mr-5">
        CGPA APP
      </Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto d-flex w-50 justify-content-between ">
          <Link to={TO_NEW_COURSE} className="nav-link">
            NEW COURSE
          </Link>
          <Link to={TO_LOGOUT} className="nav-link mr-5">
            LOGOUT
          </Link>
          <Nav.Link className="nav-link text-dark">
            Welcome {user.firstname}
          </Nav.Link>
        </Nav>
        <Nav></Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
