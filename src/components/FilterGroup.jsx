import React, { useContext } from "react";
import Score from "./shared/Score";
import SearchBox from "./shared/SearchBox";
import Select from "./shared/Select";
import { CourseContext } from "../context";

const FilterGroup = () => {
  const { levels, level, onChange, searchQuery, sgpa, cgpa } = useContext(
    CourseContext
  );

  return (
    <div className="filter-container px-3">
      <Select
        options={levels}
        label="Choose Level"
        name="level"
        value={level}
        onChange={onChange}
      />
      <SearchBox
        label="Search"
        name="searchQuery"
        value={searchQuery}
        onChange={onChange}
      />
      <div className="d-flex justify-content-between">
        <Score value={sgpa} label={"SGPA"} />
        <Score value={cgpa} label={"CGPA"} />
      </div>
    </div>
  );
};

export default FilterGroup;
