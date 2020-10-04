import React from "react";
import CustomForm from "../shared/Form";
import { saveCourse } from "../../services/courseService";
import {
  validateCode,
  validateScore,
  validateTitle,
} from "../../utils/validation";
import { Form } from "react-bootstrap";
import { TO_HOME } from "../../utils/constant";
import { toast } from "react-toastify";

class CourseForm extends CustomForm {
  state = {
    data: {
      level: "100",
      score: "",
      semester: "First",
      code: "",
      title: "",
      unit: "1",
    },
    errors: {
      score: "",
      code: "",
      title: "",
    },
  };

  componentDidMount() {
    const { course } = this.props;

    if (course) {
      this.setState({ data: course, errors: {} });
    }
  }

  doSubmit = async () => {
    try {
      let course = this.mapToViewModel(this.state.data);
      await saveCourse(course);
      window.location = TO_HOME;
    } catch (ex) {
      toast.error("An Unexpected Error Occured");
    }
  };

  mapToViewModel = ({ _id, level, score, semester, code, title, unit }) => {
    return {
      _id,
      title,
      code,
      level,
      semester,
      unit: parseInt(unit),
      score: parseInt(score),
    };
  };

  render() {
    const { units, levels, semesters } = this.props;
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Course Title", validateTitle)}
          {this.renderInput("code", "Course Code", validateCode)}
          {this.renderInput("score", "Score", validateScore)}
          {this.renderSelect("unit", "Unit", units)}
          {this.renderSelect("level", "Level", levels)}
          {this.renderSelect("semester", "Semester", semesters)}
          {this.renderButton("SAVE")}
        </Form>
      </>
    );
  }
}

export default CourseForm;
