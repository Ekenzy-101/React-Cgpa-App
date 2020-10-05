import React, { useEffect } from "react";
import { saveCourse } from "../../services/courseService";
import {
  validateCode,
  validateScore,
  validateTitle,
} from "../../utils/validation";
import { Form } from "react-bootstrap";
import { TO_HOME } from "../../utils/constant";
import { toast } from "react-toastify";
import useForm from "../shared/hooks/useForm";

const CourseForm = (props) => {
  const {
    renderButton,
    renderInput,
    renderSelect,
    handleSubmit,
    data,
    setData,
    setErrors,
  } = useForm(
    {
      level: "100",
      score: "",
      semester: "First",
      code: "",
      title: "",
      unit: "1",
    },
    {
      score: "",
      code: "",
      title: "",
    }
  );
  const { units, levels, semesters, course } = props;

  useEffect(() => {
    if (course) {
      setData(course);
      setErrors({});
    }
  }, []);

  const mapToViewModel = ({
    _id,
    level,
    score,
    semester,
    code,
    title,
    unit,
  }) => ({
    _id,
    title,
    code,
    level,
    semester,
    unit: parseInt(unit),
    score: parseInt(score),
  });

  const doSubmit = async () => {
    try {
      let course = mapToViewModel(data);
      await saveCourse(course);
      window.location = TO_HOME;
    } catch (ex) {
      toast.error("An Unexpected Error Occured");
    }
  };

  return (
    <>
      <Form onSubmit={(e) => handleSubmit(doSubmit, e)}>
        {renderInput("title", "Course Title", validateTitle)}
        {renderInput("code", "Course Code", validateCode)}
        {renderInput("score", "Score", validateScore)}
        {renderSelect("unit", "Unit", units)}
        {renderSelect("level", "Level", levels)}
        {renderSelect("semester", "Semester", semesters)}
        {renderButton("SAVE")}
      </Form>
    </>
  );
};

export default CourseForm;
