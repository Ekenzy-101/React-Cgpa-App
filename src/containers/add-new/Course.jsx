import React, { useContext, useEffect, useState } from "react";
import { Col, Container } from "react-bootstrap";
import CourseForm from "../../components/course-form/CourseForm";
import Loading from "../../components/shared/Loading";
import { CourseContext } from "../../context";
import { fetchCourse } from "../../services/courseService";
import { NOT_FOUND } from "../../utils/constant";

const Course = (props) => {
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState(null);
  const { semesters, levels, units } = useContext(CourseContext);

  const populateCourse = async () => {
    try {
      let courseId = props.match.params.id;
      if (courseId !== "add") {
        const { data: course } = await fetchCourse(courseId);
        setCourse(course);
      }
      setLoading(false);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        props.history.replace(NOT_FOUND);
    }
  };

  useEffect(() => {
    const getCourse = async () => {
      await populateCourse();
    };

    getCourse();
  }, []);

  if (loading) return <Loading />;
  return (
    <Container className="course-container" fluid>
      <Col xs={11} sm={9} md={6} lg={5} className="mx-auto mt-5">
        <CourseForm
          semesters={semesters}
          levels={levels}
          units={units}
          course={course}
        />
      </Col>
    </Container>
  );
};

export default Course;
