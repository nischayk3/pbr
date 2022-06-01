import React, { useEffect, useState } from "react";
import "./styles.scss";
//antd imports
import { Row, Col, Divider, Empty } from "antd";
//components
import EmptyImg from "../../../../../../assets/icons/empty.svg";
import ScatterChartApprover from "./scatterChart/scatterChartApprover";

//main component
const ChartApprover = ({ postChartData, setPostChartData }) => {
  const [chartValues, setChartValues] = useState({
    chartName: "",
    chartdesc: "",
    chartId: "",
    chartVersion: "",
    chartStatus: "",
  });

  useEffect(() => {
    postChartData &&
      postChartData.data &&
      postChartData.data.forEach((ele) => {
        if (ele.chart_id) {
          setChartValues({
            ...chartValues,
            chartId: ele.chart_id,
            chartVersion: ele.chart_version,
            chartStatus: ele.chart_status,
            chartName: ele.chart_name,
            chartdesc: ele.chart_description,
          });
        }
      });
  }, [postChartData]);

  return (
    <div className="chart-container">
      <Row>
        <Col span={24} className="header">
          <h3>Chart</h3>
        </Col>
      </Row>
      {postChartData && postChartData.data && postChartData.data[0].view_id ? (
        <>
          <Row gutter={24} className="details-container">
            <Col span={6}>
              <Row gutter={16}>
                <Col span={8}>
                  <p>Chart ID</p>
                </Col>
                <Col span={10}>
                  <p>
                    : {chartValues.chartId ? chartValues.chartId : "Unassigned"}
                  </p>
                </Col>
                <Col span={6} />
              </Row>
              <Row gutter={16}>
                <Col span={8}>
                  <p>Version</p>
                </Col>
                <Col span={8}>
                  <p>
                    : {chartValues.chartVersion ? chartValues.chartVersion : ""}
                  </p>
                </Col>
                <Col span={6} />
              </Row>
              <Row gutter={16}>
                <Col span={8}>
                  <p>Status</p>
                </Col>
                <Col span={8}>
                  <p>
                    : {chartValues.chartStatus ? chartValues.chartStatus : ""}
                  </p>
                </Col>
                <Col span={6} />
              </Row>
            </Col>
            <Col span={18}>
              <Row gutter={16}>
                <Col span={6}>
                  <p>Chart name</p>
                </Col>
                <Col span={8}>
                  <p>: {chartValues.chartName ? chartValues.chartName : ""}</p>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={6}>
                  <p>Chart description</p>
                </Col>
                <Col span={8}>
                  <p>: {chartValues.chartdesc ? chartValues.chartdesc : ""}</p>
                </Col>
              </Row>
            </Col>
          </Row>
          <Divider />
          <ScatterChartApprover
            postChartData={postChartData}
            setPostChartData={setPostChartData}
          />
        </>
      ) : (
        <Empty
          className="empty-chart"
          image={EmptyImg}
          description={
            <span>
              Select a '<i>View</i>' to start personalizing your chart.
            </span>
          }
        />
      )}
    </div>
  );
};

export default ChartApprover;
