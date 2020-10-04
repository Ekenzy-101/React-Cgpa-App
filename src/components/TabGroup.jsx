import React, { useContext } from "react";
import { Tab, Tabs } from "react-bootstrap";
import CustomTable from "./shared/Table";
import { CourseContext } from "../context";

const TabGroup = () => {
  const { onSemesterSelect, semesters, data } = useContext(CourseContext);
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
              <CustomTable data={data} />
            </div>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};

export default TabGroup;
