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
  const [axisValuesApprover, setAxisValuesApprover] = useState({
    xaxis: null,
    yaxis: null,
    chartType: null,
    zaxis: null,
  });
  const [chartDataApprover, setChartDataApprover] = useState([]);
  const [layoutDataApprover, setLayoutDataApprover] = useState({});
  const [showChartApprover, setShowChartApprover] = useState(false);
  const [tableKey, setTableKey] = useState("3");
  const exclusionIdCounter = useRef(0);
  const [exclusionTable, setExclusionTable] = useState([]);
  const [zAxis, setZAxis] = useState(false);

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
        if (
          (ele.data[0].x && ele.data[0].x.length >= 1) ||
          ele?.data[0]?.type === "pie"
        ) {
          const chartApproverType = ele.chart_type;
          let xValueApprover = "";
          let yValueApprover = "";
          let zValueApprover = "";
          if (ele.chart_type !== "process control") {
            xValueApprover = ele.chart_mapping.x.function_name;
          } else {
            xValueApprover =
              ele.chart_mapping.x.function_name === "batch_num"
                ? "Batch"
                : "Date";
          }
          yValueApprover = ele.chart_mapping.y.function_name
            ? ele.chart_mapping.y.function_name
            : "";
          zValueApprover = ele.chart_mapping?.z?.function_name
            ? ele.chart_mapping?.z?.function_name
            : "";
          if (zValueApprover) {
            setZAxis(true);
          } else {
            setZAxis(false);
          }
          setAxisValuesApprover({
            ...axisValuesApprover,
            chartType: chartApproverType,
            xaxis: xValueApprover,
            yaxis: yValueApprover,
            zaxis: zValueApprover,
          });
          setShowChartApprover(true);
          setChartDataApprover(ele.data);
          setLayoutDataApprover(ele.layout);
        } else {
          setShowChartApprover(false);
          setChartDataApprover([]);
          setLayoutDataApprover({});
          setAxisValuesApprover({
            ...axisValuesApprover,
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
            <Col span={9}>
              <p>Chart Type</p>
            </Col>
            <Col span={10}>
              <p>
                :{" "}
                {axisValuesApprover.chartType
                  ? axisValuesApprover.chartType
                  : ""}
              </p>
            </Col>
          </Row>
        </Col>
        <Col span={8} style={{ paddingLeft: "10px" }}>
          <Row gutter={16}>
            <Col span={6}>
              <p>X-axis</p>
            </Col>
            <Col span={18}>
              <p>
                : {axisValuesApprover.xaxis ? axisValuesApprover.xaxis : ""}
              </p>
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          <Row gutter={16}>
            <Col span={6}>
              <p>Y-axis</p>
            </Col>
            <Col span={18}>
              <p>
                : {axisValuesApprover.yaxis ? axisValuesApprover.yaxis : ""}
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
      {zAxis && (
        <Row>
          <Col span={7}>
            <Row gutter={16}>
              <Col span={7}>
                <p>Z-axis</p>
              </Col>
              <Col span={17}>
                <p>
                  &nbsp;&nbsp;&nbsp;:{" "}
                  {axisValuesApprover.zaxis ? axisValuesApprover.zaxis : ""}
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
      <div className="chart-table">
        <Row className="scatter-chart">
          {showChartApprover && (
            <ScatterPlot data={chartDataApprover} layout={layoutDataApprover} />
          )}
        </Row>
        {showChartApprover && (
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
