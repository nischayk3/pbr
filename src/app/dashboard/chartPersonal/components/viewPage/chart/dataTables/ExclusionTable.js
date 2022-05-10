import React, { useState, useEffect } from "react";
import { message, Table, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import {
  showLoader,
  hideLoader,
} from "../../../../../../../duck/actions/commonActions";
import { postChartPlotData } from "../../../../../../../services/chartPersonalizationService";

const ExclusionTable = ({
  exclusionTable,
  setExclusionTable,
  postChartData,
  setPostChartData,
  exclusionIdCounter,
}) => {
  const dispatch = useDispatch();

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

  const handleChange = async (id) => {
    const newArr = [...postChartData.data];
    newArr[0].exclusions = newArr[0].exclusions.filter(
      (ele) => Number(ele.exclusion_id) !== Number(id)
    );
    const exclusionData = exclusionTable.filter(
      (ele) => Number(ele.exclusion_id) !== Number(id)
    );
    setExclusionTable(exclusionData);
    exclusionIdCounter.current = exclusionIdCounter.current - 1;
    setPostChartData({ ...postChartData, data: newArr });
    try {
      dispatch(showLoader());
      const viewRes = await postChartPlotData(postChartData);
      setPostChartData({ ...postChartData, data: viewRes.data });
      dispatch(hideLoader());
    } catch (err) {
      dispatch(hideLoader());
      message.error("unable to exclude data");
    }
  };

  const deleteColumn = {
    title: "",
    dataIndex: "delete",
    render: (text, record) => (
      <DeleteOutlined onClick={() => handleChange(record.exclusion_id)} />
    ),
    width: 50,
  };

  columns.push(deleteColumn);

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
