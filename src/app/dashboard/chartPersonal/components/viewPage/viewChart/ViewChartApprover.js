import React, { useEffect, useState } from "react";
import "./viewChartStyles.scss";
import { useParams } from "react-router-dom";
//antd imports
import { Row, Col, Divider, Tag, Tooltip, Table, Empty } from "antd";
import EmptyImg from "../../../../../../assets/icons/empty.svg";
//components
import SelectField from "../../../../../../components/SelectField/SelectField";
import StatusWrong from "../../../../../../assets/statusWrong.svg";
import StatusCorrect from "../../../../../../assets/statusCorrect.svg";

const ViewChartApprover = ({ postChartData, setPostChartData }) => {
  //redux variables
  const { id } = useParams();
  //state variables
  const [coverageTableData, setCoverageTableData] = useState([]);
  const [viewData, setViewData] = useState({
    viewName: "",
    status: "",
    viewDispId: " ",
    searchValue: "",
    chartVersion: 0,
  });

  const columns = [
    {
      title: "Status",
      key: "param",
      dataIndex: "param",
      render: (text, record, index) => (
        <>
          {record.coverage_metric_percent === "100.0%" ||
          record.coverage_metric_percent === "100%" ? (
            <span>
              <img src={StatusCorrect} />
            </span>
          ) : (
            <span>
              <img src={StatusWrong} />
            </span>
          )}
        </>
      ),
    },
    {
      title: "Parameter",
      key: "function_name",
      dataIndex: "function_name",
      render: (function_name) => (
        <Tooltip title={function_name}>
          <Tag color="geekblue" className="parameter-tag">
            {function_name}
          </Tag>
        </Tooltip>
      ),
    },
    {
      title: "Batch Coverage",
      key: "coverage_metric" + "coverage_metric_percent",
      dataIndex: "coverage_metric_percent",
      align: "right",
      render: (text, record) => (
        <span>
          {record.batchstats}({record.coverage_metric_percent})
        </span>
      ),
    },
  ];

  useEffect(() => {
    postChartData.data &&
      postChartData.data.forEach((ele) => {
        setViewData({
          ...viewData,
          viewName: ele.view_name,
          viewDispId: ele.view_id,
          status: ele.view_status,
          searchValue: ele.view_id,
          chartVersion: ele.view_version,
        });
        setCoverageTableData(ele.extras.coverage);
      });
  }, [postChartData]);

  return (
    <div className="view-container">
      <Row className="view-details">
        <Col span={16}>
          <Row>
            <Col span={8}>
              <label>View ID</label>
            </Col>
            <Col span={14}>
              <p>: {viewData.viewDispId || "-"}</p>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <label>View name</label>
            </Col>
            <Col span={14}>
              <p>: {viewData.viewName || "-"}</p>
            </Col>
          </Row>
        </Col>
        <Col span={8} className="pb">
          <Row>
            <Col span={14}>
              <p>Version</p>
            </Col>
            <Col span={10}>
              <p>: {viewData.chartVersion || "-"}</p>
            </Col>
          </Row>
          <Row>
            <Col span={14}>
              <p>Status</p>
            </Col>
            <Col span={10}>
              <p>: {viewData.status || "-"}</p>
            </Col>
          </Row>
        </Col>
      </Row>
      <Divider />
      {postChartData && postChartData.data && postChartData.data[0].view_id ? (
        <>
          <Row className="table-cont">
            <Col span={24}>
              <Table
                pagination={false}
                columns={columns}
                dataSource={coverageTableData}
                rowKey={(record) => record.function_name}
              />
            </Col>
          </Row>
        </>
      ) : (
        <Empty
          className="empty-chart"
          image={EmptyImg}
          description={<span>Please select View ID to see this data</span>}
        />
      )}
    </div>
  );
};

export default ViewChartApprover;
