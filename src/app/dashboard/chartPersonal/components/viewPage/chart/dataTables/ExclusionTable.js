import React, { useState, useEffect } from "react";
import { Table } from "antd";

const ExclusionTable = ({
  exclusionTable,
  setExclusionTable,
  postChartData,
}) => {
  let columns = [];
  const objkeys =
    exclusionTable !== undefined && exclusionTable.length > 0
      ? Object.keys(exclusionTable[0])
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
        if (ele.exclusions) {
          const exclusions = ele.exclusions;
          exclusions &&
            exclusions.forEach((ele) => {
              const excValue = ele.exclusion_value.batch;
              const obj = {
                exclusion_id: ele.exclusion_id,
                exclusion_value: excValue,
                exclusion_description: ele.exclusion_description,
                user: "demo",
                timestamp: new Date(ele.timestamp).toLocaleDateString(),
              };
              if (
                !exclusionTable.some(
                  (element) => element.exclusion_id === ele.exclusion_id
                )
              ) {
                setExclusionTable([...exclusionTable, obj]);
              }
            });
        }
      });
  }, [postChartData]);

  return (
    <div>
      <Table
        columns={columns}
        pagination={false}
        scroll={{ y: 350 }}
        dataSource={exclusionTable}
      />
    </div>
  );
};

export default ExclusionTable;
