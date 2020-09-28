import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import PropTypes from "prop-types";
import CustomTable from "./shared/Table";

const TabGroup = ({ onSemesterSelect, semesters, ...rest }) => {
  return (
    <div className="tab-container">
      <Tabs
        defaultActiveKey="First"
        id="uncontrolled-tab-example"
        onSelect={(key) => onSemesterSelect(key)}
      >
        {semesters.map((value) => (
          <Tab key={value} eventKey={value} title={`${value} Semester`}>
            <div>
              <CustomTable {...rest} />
            </div>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};

TabGroup.propTypes = {
  onSemesterSelect: PropTypes.func.isRequired,
  semesters: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  sortColumn: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
};

export default TabGroup;
