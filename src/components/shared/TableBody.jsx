import React, { useContext } from "react";
import _ from "lodash";
import { CourseContext } from "../../context";

const TableBody = () => {
  const { data, columns } = useContext(CourseContext);

  const renderCell = (item, column) => {
    if (column.content) return column.content(item);
    if (column.label === "S/N") {
      const index = data.findIndex((el) => el._id === item._id);
      return index + 1;
    }
    return _.get(item, column.path);
  };

  const createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  return (
    <tbody>
      {data.map((item) => (
        <tr key={item._id}>
          {columns.map((column) => (
            <td key={createKey(item, column)}>{renderCell(item, column)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
