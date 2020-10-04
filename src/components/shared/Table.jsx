import React from "react";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";
import { Table } from "react-bootstrap";
import NoData from "./NoData";

const CustomTable = ({ data }) => {
  if (!data.length) return <NoData />;
  return (
    <Table striped hover responsive>
      <TableHeader />
      <TableBody />
    </Table>
  );
};

export default CustomTable;
