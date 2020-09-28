import React, { Component } from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import _ from "lodash";
import Loading from "../../components/shared/Loading";
import TabGroup from "../../components/TabGroup";
import FilterGroup from "../../components/FilterGroup";
import { deleteCourse, getCourses } from "../../services/courseService";
import { TO_COURSE, TO_NEW_COURSE } from "../../utils/constant";

class Home extends Component {
  state = {
    loading: true,
    courses: [],
    level: "100",
    semester: "First",
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" },
  };

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
    const { data: courses } = await getCourses();
    this.setState({ courses, loading: false });
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
    const { level, sortColumn, searchQuery } = this.state;
    const { levels, semesters } = this.props;
    const { courses, sgpa, cgpa } = this.getPagedData();
    return (
      <Container fluid className="home-container pt-5">
        <FilterGroup
          levels={levels}
          level={level}
          onChange={this.handleChange}
          sgpa={sgpa}
          cgpa={cgpa}
          searchQuery={searchQuery}
        />
        <TabGroup
          data={courses}
          semesters={semesters}
          sortColumn={sortColumn}
          onSemesterSelect={this.handleSemesterSelect}
          columns={this.columns}
          onSort={this.handleSort}
        />
        <Link
          to={TO_NEW_COURSE}
          className="btn btn-primary btn-new rounded-circle btn-lg"
        >
          <i className="fas fa-plus"></i>
        </Link>
      </Container>
    );
  }
}

export default Home;
