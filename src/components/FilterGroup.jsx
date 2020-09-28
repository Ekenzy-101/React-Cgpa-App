import React from "react";
import PropTypes from "prop-types";
import Score from "./shared/Score";
import SearchBox from "./shared/SearchBox";
import Select from "./shared/Select";

const FilterGroup = ({ levels, level, onChange, searchQuery, sgpa, cgpa }) => {
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

FilterGroup.propTypes = {
  levels: PropTypes.array.isRequired,
  level: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  sgpa: PropTypes.string.isRequired,
  cgpa: PropTypes.string.isRequired,
};

export default FilterGroup;
