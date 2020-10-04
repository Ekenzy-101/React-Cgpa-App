import React, { Component, createContext } from "react";
import { toast } from "react-toastify";
import _ from "lodash";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Loading from "./components/shared/Loading";
import { deleteCourse, fetchCourses } from "./services/courseService";
import { TO_COURSE } from "./utils/constant";
import { getCurrentUser } from "./services/authService";
const CourseContext = createContext();

class CourseProvider extends Component {
  state = {
    user: null,
    courses: [],
    loading: true,
    level: "100",
    semester: "First",
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" },
  };

  semesters = ["First", "Second"];
  levels = ["100", "200", "300", "400", "500", "600", "700"];
  units = ["1", "2", "3", "4", "5", "6"];
  columns = [
    { key: "no", label: "S/N" },
    { path: "title", label: "Title" },
    { path: "code", label: "Code" },
    { path: "score", label: "Score" },
    { path: "grade", label: "Grade" },
    { path: "unit", label: "Unit" },
    { path: "weightedScore", label: "W.S." },
    {
      key: "update",
      content: (course) => (
        <Link to={`${TO_COURSE}${course._id}`} className="btn btn-primary">
          <i className="fas fa-pencil-alt"></i>
        </Link>
      ),
    },
    {
      key: "delete",
      content: (course) => (
        <Button variant="danger" onClick={() => this.handleDelete(course)}>
          <i className="fas fa-trash"></i>
        </Button>
      ),
    },
  ];

  async componentDidMount() {
    const user = await getCurrentUser();
    if (user) {
      const { data: courses } = await fetchCourses();
      this.setState({ courses, loading: false, user });
    }
    this.setState({ loading: false });
  }

  getPagedData = () => {
    const { courses, level, semester, sortColumn, searchQuery } = this.state;

    let filtered = courses;
    // Filter Then Sort
    if (searchQuery)
      filtered = filtered.filter((course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    filtered = filtered.filter(
      (course) => course.level === level && course.semester === semester
    );
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    // Calculate SGPA and CGPA
    const cgpa = this.calcuteGPA(courses);
    const sgpa = this.calcuteGPA(sorted);

    return { courses: sorted, cgpa, sgpa };
  };

  calcuteGPA = (courses) => {
    let totalUnits = 0;
    let totalWeightedScore = 0;
    for (let course of courses) {
      totalUnits += course.unit;
      totalWeightedScore += course.weightedScore;
    }
    let result = totalWeightedScore / totalUnits;
    if (!result) result = 0;
    let gpa = ((result * 100) / 100).toFixed(2);
    return gpa;
  };

  handleSemesterSelect = (semester) => {
    this.setState({ semester });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleDelete = (course) => {
    this.setState({ loading: true });
    let courses = [...this.state.courses];
    let filtered = courses.filter((c) => c._id !== course._id);
    this.setState({ courses: filtered });
    deleteCourse(course)
      .then(() => {
        toast.success("Deleted Successfully");
      })
      .catch((err) => {
        this.setState({ courses });
        toast.error("Could Not Delete Course");
      });
    this.setState({ loading: false });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  render() {
    if (this.state.loading) return <Loading />;
    const {
      handleChange,
      handleDelete,
      handleSemesterSelect,
      handleSort,
      semesters,
      levels,
      columns,
      units,
    } = this;
    const { courses, sgpa, cgpa } = this.getPagedData();
    return (
      <CourseContext.Provider
        value={{
          ...this.state,
          semesters,
          levels,
          units,
          columns,
          data: courses,
          sgpa,
          cgpa,
          onChange: handleChange,
          onDelete: handleDelete,
          onSemesterSelect: handleSemesterSelect,
          onSort: handleSort,
        }}
      >
        {this.props.children}
      </CourseContext.Provider>
    );
  }
}

const CourseConsumer = CourseContext.Consumer;

export function withRoomConsumer(Component) {
  return (props) => {
    return (
      <CourseConsumer>
        {(value) => <Component {...props} context={value} />}
      </CourseConsumer>
    );
  };
}

export { CourseProvider, CourseConsumer, CourseContext };
