import React, { useEffect, useState } from "react";
import "./styles.scss";
//antd imports
import { Row, Col, Divider, Empty } from "antd";
//components
import EmptyImg from "../../../../../../assets/icons/empty.svg";
import ScatterChartApprover from "./scatterChart/scatterChartApprover";

//main component
const ChartApprover = ({ postChartData, setPostChartData }) => {
  const [chartValuesApprover, setChartValuesApprover] = useState({
    chartNameApprover: "",
    chartdescApprover: "",
    chartIdApprover: "",
    chartVersionApprover: "",
    chartStatusApprover: "",
  });

  const setDataFromPostChart = () => {
    postChartData &&
      postChartData.data &&
      postChartData.data.forEach((ele) => {
        if (ele.chart_id) {
          setChartValuesApprover({
            ...chartValuesApprover,
            chartIdApprover: ele.chart_id,
            chartVersionApprover: ele.chart_version,
            chartStatusApprover: ele.chart_status,
            chartNameApprover: ele.chart_name,
            chartdescApprover: ele.chart_description,
          });
        }
      });
  };

  useEffect(() => {
    setDataFromPostChart();
  }, [postChartData]);

  return (
    <div className="chart-containerApprover">
      <Row id="chart-row">
        <Col span={24} className="headerApprover">
          <h3>Chart</h3>
        </Col>
      </Row>
      {postChartData && postChartData.data && postChartData.data[0].view_id ? (
        <>
          <Row gutter={24} className="details-containerApprover">
            <Col id="chart-id-main-col" span={6}>
              <Row id="chart-id-row" gutter={16}>
                <Col id="chart-id-main-col" span={8}>
                  <p>Chart ID</p>
                </Col>
                <Col id="chart-idvalue-main-col" span={10}>
                  <p>
                    :{" "}
                    {chartValuesApprover.chartIdApprover
                      ? chartValuesApprover.chartIdApprover
                      : "Unassigned"}
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
                    :{" "}
                    {chartValuesApprover.chartVersionApprover
                      ? chartValuesApprover.chartVersionApprover
                      : ""}
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
                    :{" "}
                    {chartValuesApprover.chartStatusApprover
                      ? chartValuesApprover.chartStatusApprover
                      : ""}
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
                  <p>
                    :{" "}
                    {chartValuesApprover.chartNameApprover
                      ? chartValuesApprover.chartNameApprover
                      : ""}
                  </p>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={6}>
                  <p>Chart description</p>
                </Col>
                <Col span={8}>
                  <p>
                    :{" "}
                    {chartValuesApprover.chartdescApprover
                      ? chartValuesApprover.chartdescApprover
                      : ""}
                  </p>
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
