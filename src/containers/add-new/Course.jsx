import React, { Component } from "react";
import { Col, Container } from "react-bootstrap";
import CourseForm from "../../components/course-form/CourseForm";
import Loading from "../../components/shared/Loading";
import { getCourse } from "../../services/courseService";
import { NOT_FOUND } from "../../utils/constant";

class Course extends Component {
  state = {
    loading: true,
  };

  async componentDidMount() {
    await this.populateCourse();
  }

  populateCourse = async () => {
    try {
      let courseId = this.props.match.params.id;
      if (courseId !== "add") {
        const { data: course } = await getCourse(courseId);
        this.setState({ course });
      }
      this.setState({ loading: false });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.push(NOT_FOUND);
    }
  };

  render() {
    if (this.state.loading) return <Loading />;
    const { course } = this.state;
    return (
      <Container className="course-container" fluid>
        <Col xs={11} sm={9} md={6} lg={5} className="mx-auto mt-5">
          <CourseForm {...this.props} course={course} />
        </Col>
      </Container>
    );
  }
}

export default Course;
