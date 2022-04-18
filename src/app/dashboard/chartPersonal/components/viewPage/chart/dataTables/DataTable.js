import React, { useState, useEffect } from "react";
import { Table } from "antd";

const DataTable = ({ postChartData }) => {
  const [dataTable, setDataTable] = useState([]);

  let columns = [];
  const objkeys =
    dataTable !== undefined && dataTable.length > 0
      ? Object.keys(dataTable[0])
      : [];
  const uniqueArr = (value, index, self) => {
    return self.indexOf(value) === index;
  };
  const filterColumn = objkeys.filter(uniqueArr);
  filterColumn.map((item, i) => {
    if (item === "batch_num") {
      columns.push({
        title: item.toUpperCase().replace("_", " "),
        dataIndex: item,
        key: `${item}-${i}`,
      });
    } else {
      columns.push({
        title: item.toUpperCase().replace("_", " "),
        dataIndex: item,
        key: `${item}-${i}`,
      });
    }
  });

  useEffect(() => {
    const newCovArr = JSON.parse(JSON.stringify(postChartData));
    newCovArr &&
      newCovArr.data &&
      newCovArr.data.forEach((ele) => {
        if (ele.extras && ele.extras.data_table) {
          setDataTable(ele.extras.data_table);
        }
      });
  }, [postChartData]);

  return (
    <div>
      <Table
        columns={columns}
        pagination={false}
        scroll={{ y: 350 }}
        dataSource={dataTable}
      />
    </div>
  );
};

export default DataTable;
