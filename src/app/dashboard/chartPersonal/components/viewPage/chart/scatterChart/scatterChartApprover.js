import React, { useEffect, useState, useRef } from "react";
import "./ScatterStyles.scss";
//antd imports
import { Row, Col, Tabs, Empty } from "antd";
//components
import ScatterPlot from "../../../../../../../components/ScatterPlot/ScatterPlot";
import DataTable from "../dataTables/DataTable";
import ExclusionTable from "../dataTables/ExclusionTable";
import ViolationTable from "../dataTables/ViolationTable";

const { TabPane } = Tabs;

const ScatterChartApprover = ({ postChartData, setPostChartData }) => {
  const [axisValues, setAxisValues] = useState({
    xaxis: null,
    yaxis: null,
    chartType: null,
  });
  const [chartData, setChartData] = useState([]);
  const [layoutData, setLayoutData] = useState({});
  const [showChart, setShowChart] = useState(false);
  const [tableKey, setTableKey] = useState("3");
  const exclusionIdCounter = useRef(0);
  const [exclusionTable, setExclusionTable] = useState([]);

  const tabChange = (key) => {
    setTableKey(key);
  };

  const setPostData = () => {
    const postChartClone = JSON.parse(JSON.stringify(postChartData));
    postChartClone &&
      postChartClone.data &&
      postChartClone.data.forEach((ele) => {
        let obj1;
        let table1 = [];
        let count = 0;
        ele.exclusions &&
          ele.exclusions.forEach((item) => {
            exclusionIdCounter.current = count + 1;
            const excValue = item.exclusion_value.batch;
            obj1 = {
              exclusion_id: item.exclusion_id,
              exclusion_value: excValue,
              exclusion_description: item.exclusion_description,
              user: item.user,
              timestamp: new Date(item.timestamp).toLocaleDateString(),
            };
            table1.push(obj1);
          });
        setExclusionTable(table1);
        if (ele.data[0].x && ele.data[0].x.length >= 1) {
          const chart =
            ele.chart_type === "scatter" ? "Scatter Plot" : "Process Control";
          let xValue = "";
          let yValue = "";
          if (ele.chart_type === "scatter") {
            xValue = ele.chart_mapping.x.function_name;
          } else {
            xValue =
              ele.chart_mapping.x.function_name === "batch_num"
                ? "Batch"
                : "Date";
          }
          yValue = ele.chart_mapping.y.function_name
            ? ele.chart_mapping.y.function_name
            : "";
          setAxisValues({
            ...axisValues,
            chartType: chart,
            xaxis: xValue,
            yaxis: yValue,
          });
          setShowChart(true);
          setChartData(ele.data);
          setLayoutData(ele.layout);
        } else {
          setShowChart(false);
          setChartData([]);
          setLayoutData({});
          setAxisValues({
            ...axisValues,
            chartType: null,
            xaxis: null,
            yaxis: null,
          });
        }
      });
  };

  useEffect(() => {
    setPostData();
  }, [postChartData]);

  return (
    <div className="chartLayout-container">
      <Row>
        <Col span={6}>
          <Row gutter={16}>
            <Col span={8}>
              <p>Chart Type</p>
            </Col>
            <Col span={10}>
              <p>: {axisValues.chartType ? axisValues.chartType : ""}</p>
            </Col>
          </Row>
        </Col>
        <Col span={8} style={{ paddingLeft: "10px" }}>
          <Row gutter={16}>
            <Col span={6}>
              <p>X-axis</p>
            </Col>
            <Col span={18}>
              <p>: {axisValues.xaxis ? axisValues.xaxis : ""}</p>
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          <Row gutter={16}>
            <Col span={6}>
              <p>Y-axis</p>
            </Col>
            <Col span={18}>
              <p>: {axisValues.yaxis ? axisValues.yaxis : ""}</p>
            </Col>
          </Row>
        </Col>
      </Row>
      <div className="chart-table">
        <Row className="scatter-chart">
          {showChart && <ScatterPlot data={chartData} layout={layoutData} />}
        </Row>
        {showChart && (
          <Row className="tabledata" id="chart">
            <Col id="col-chart" span={24}>
              <Tabs
                id="tabs"
                defaultActiveKey="3"
                activeKey={tableKey}
                onChange={tabChange}
              >
                <TabPane id="tab-exclusion" tab="Exclusion" key="1">
                  {exclusionTable.length >= 1 ? (
                    <ExclusionTable
                      setExclusionTable={setExclusionTable}
                      exclusionTable={exclusionTable}
                      postChartData={postChartData}
                      setPostChartData={setPostChartData}
                      exclusionIdCounter={exclusionIdCounter}
                    />
                  ) : (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  )}
                </TabPane>
                <TabPane id="tab-violation" tab="Violation" key="2">
                  <ViolationTable postChartData={postChartData} />
                </TabPane>
                <TabPane id="tab-datatable" tab="Data Table" key="3">
                  <DataTable postChartData={postChartData} />
                </TabPane>
              </Tabs>
            </Col>
          </Row>
        )}
      </div>
    </div>
  );
};

export default ScatterChartApprover;
