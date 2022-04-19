import React, { useState, useEffect } from "react";
import { Table } from "antd";

const ViolationTable = ({ postChartData }) => {
  const [violationsTable, setViolationTable] = useState([]);

  let columns = [];
  const objkeys =
    violationsTable !== undefined && violationsTable.length > 0
      ? Object.keys(violationsTable[0])
      : [];
  const uniqueArr = (value, index, self) => {
    return self.indexOf(value) === index;
  };
  const filterColumn = objkeys.filter(uniqueArr);
  filterColumn.map((item, i) => {
    columns.push({
      title: item.toUpperCase().replace("_", " "),
      dataIndex: item,
      key: `${item}-${i}`,
    });
  });

  useEffect(() => {
    const newCovArr = JSON.parse(JSON.stringify(postChartData));
    newCovArr &&
      newCovArr.data &&
      newCovArr.data.forEach((ele) => {
        if (ele.violations) {
          const violation = ele.violations;
          violation &&
            violation.forEach((ele) => {
              ele.recorded_date = new Date(
                ele.recorded_date
              ).toLocaleDateString();
            });
          setViolationTable(ele.violations);
        }
      });
  }, [postChartData]);

  return (
    <div>
      <Table
        columns={columns}
        pagination={false}
        scroll={{ y: 350 }}
        dataSource={violationsTable}
      />
    </div>
  );
};

export default ViolationTable;
