import React from "react";
import "./preprocess.scss";
import { Row, Col, Button, Table, Select } from "antd";

const Preprocess = () => {
  const tableColumns = [
    {
      title: "Column 1",
      id: "chart_name",
      dataIndex: "chart",
      align: "center",
    },
    {
      title: "Column 2",
      dataIndex: "event",
      id: "event",
      align: "center",
    },
    {
      title: "Column 3",
      id: "parameter_id",
      dataIndex: "id",
      align: "center",
    },
    {
      title: "Column 4",
      dataIndex: "date",
      id: "date",
      align: "center",
    },
    {
      title: "Column 5",
      id: "creator",
      dataIndex: "creator",
      align: "center",
    },
    {
      title: "Column 6",
      id: "creator",
      dataIndex: "creator",
      align: "center",
    },
  ];
  return (
    <div className="preprocess-container">
      <Row className="col-bottom save-button">
        <Col>
          <Button disabled>Save</Button>
        </Col>
      </Row>
      <Row className="col-bottom">
        <Col span={6} className="filter">
          <Select
            mode="multiple"
            allowClear
            style={{
              width: "100%",
            }}
            placeholder="Filter by batch"
          >
            {/* {children} */}
          </Select>
          <Button className="custom-primary-btn">Go</Button>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table
            columns={tableColumns}
            pagination={{ position: ["topLeft", "bottomRight"] }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Preprocess;
