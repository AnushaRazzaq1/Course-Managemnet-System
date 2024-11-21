import React from "react";
import { Table } from "antd";
import PropTypes from "prop-types";
import "./CustomTable.scss";

const CustomTable = ({
  columns,
  dataSource,
  rowKey = "id",
  pagination = true,
  className = "",
  ...rest
}) => {
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      rowKey={rowKey}
      pagination={pagination}
      className={`custom-table ${className}`}
      {...rest}
    />
  );
};

CustomTable.propTypes = {
  columns: PropTypes.array.isRequired,
  dataSource: PropTypes.array.isRequired,
  rowKey: PropTypes.string,
  pagination: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  className: PropTypes.string,
};

export default React.memo(CustomTable);
