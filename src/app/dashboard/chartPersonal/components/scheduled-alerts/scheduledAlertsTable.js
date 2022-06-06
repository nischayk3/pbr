import React from "react";
import { Table } from "antd";

export default function scheduledAlertsTable() {
  const columns = [
    {
      title: "Job ID",
      key: "view_name",
      id: "view_name",
      dataIndex: "view_name",
    },
    {
      title: "Job Name",
      key: "view_disp_id",
      id: "view_disp_id",
      dataIndex: "view_disp_id",
    },
    {
      title: "Job Description",
      key: "product_num",
      id: "product_num",
      dataIndex: "product_num",
    },
    {
      title: "Schedule",
      key: "product_num",
      id: "product_num",
      dataIndex: "product_num",
    },
    {
      title: "Status",
      key: "product_num",
      id: "product_num",
      dataIndex: "product_num",
    },
    {
      title: "Creator",
      key: "product_num",
      id: "product_num",
      dataIndex: "product_num",
    },
  ];
  return (
    <Table
      bordered={false}
      columns={columns}
      dataSource={[]}
      pagination={false}
      scroll={{ y: 150 }}
    />
  );
}
