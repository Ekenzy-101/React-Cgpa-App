import React from "react";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";
import PropTypes from "prop-types";
import { Table } from "react-bootstrap";
import NoData from "./NoData";

const CustomTable = ({ columns, sortColumn, onSort, data }) => {
  if (!data.length) return <NoData />;
  return (
    <Table striped hover responsive>
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody data={data} columns={columns} />
    </Table>
  );
};

CustomTable.propTypes = {
  columns: PropTypes.array.isRequired,
  sortColumn: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
};

export default CustomTable;
