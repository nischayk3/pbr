import React, { useEffect, useState } from "react";
import "./style.scss";
//antd imports
import { Collapse, Row, Col } from "antd";
//unpacking antd components
const { Panel } = Collapse;
import { initialLayout } from "./displayFunctions";

const DisplayApprover = ({ postChartData, setPostChartData }) => {
  const [layoutData, setLayoutData] = useState(initialLayout);
  useEffect(() => {
    if (postChartData.data) {
      const newArr = JSON.parse(JSON.stringify(postChartData));
      const xvalue = newArr.data[0].layout.xaxis.title.text;
      const yvalue = newArr.data[0].layout.yaxis.title.text;
      const annotations = newArr.data[0].layout.annotations;
      const o =
        newArr.data[0].layout.legend.orientation === "v"
          ? "Vertical"
          : "Horizontal";
      setLayoutData({
        ...layoutData,
        legend: { ...layoutData.legend, orientation: o },
        xaxis: {
          ...layoutData.xaxis,
          title: { ...layoutData.xaxis.title, text: xvalue },
        },
        annotations: annotations,
        yaxis: {
          ...layoutData.yaxis,
          title: { ...layoutData.yaxis.title, text: yvalue },
        },
      });
    }
  }, []);

  useEffect(() => {
    if (postChartData.data) {
      const newArr = [...postChartData.data];
      newArr[0].layout = JSON.parse(JSON.stringify(layoutData));
      const orientation = newArr[0].layout.legend.orientation;
      newArr[0].layout.legend.orientation =
        orientation === "Vertical" ? "v" : "h";
      setPostChartData({ ...postChartData, data: newArr });
    }
  }, [layoutData]);

  return (
    <div className="display-section p-bottom">
      <Collapse expandIconPosition="right" ghost accordion>
        {/* Figure */}
        <Panel
          header="Figure"
          key="1"
          style={{ background: "white !important" }}
        >
          <div className="figure-container">
            <Row className="figure-inputs select-top" gutter={16}>
              <Col span={8}>
                <label>Height </label>
              </Col>
              <Col span={16}>
                <p>: {layoutData.height || "-"}</p>
              </Col>
            </Row>
            <Row className="figure-inputs select-top" gutter={16}>
              <Col span={8}>
                <label>Width </label>
              </Col>
              <Col span={16}>
                <p>: {layoutData.width || "-"}</p>
              </Col>
            </Row>
            <Row className="figure-inputs select-top" gutter={16}>
              <Col span={8}>
                <label>Plot color </label>
              </Col>
              <Col span={16}>
                <p>: {layoutData.plot_bgcolor || "-"}</p>
              </Col>
            </Row>
            <div className="figure-inputs header">Panel Options</div>
            <Row className="figure-inputs select-top" gutter={16}>
              <Col span={8}>
                <label>Title </label>
              </Col>
              <Col span={16}>
                <p>: {layoutData.title.text || "-"}</p>
              </Col>
            </Row>
            <Row className="figure-inputs select-top" gutter={16}>
              <Col span={8}>
                <label>Font size </label>
              </Col>
              <Col span={16}>
                <p>: {layoutData.title.font.size || "-"}</p>
              </Col>
            </Row>
            <Row className="figure-inputs select-top" gutter={16}>
              <Col span={8}>
                <label>Font color </label>
              </Col>
              <Col span={16}>
                <p>: {layoutData.title.font.color || "-"}</p>
              </Col>
            </Row>
          </div>
        </Panel>

        {/* Legend */}
        <Panel header="Legend" key="2">
          <div className="figure-container">
            <div className="header option-header">Options</div>
            <Row className="figure-inputs" gutter={16}>
              <Col span={8}>
                <label>Show</label>
              </Col>
              <Col span={16}>
                <p>: {layoutData.showlegend === true ? "Yes" : "No" || "-"}</p>
              </Col>
            </Row>
            <Row className="figure-inputs" gutter={16}>
              <Col span={8}>
                <label>Title</label>
              </Col>
              <Col className="gutter-row select-top" span={16}>
                <p>: {layoutData.legend.title.text || "-"}</p>
              </Col>
            </Row>
            <Row className="figure-inputs select-top" gutter={16}>
              <Col span={8}>
                <label>Legend size</label>
              </Col>
              <Col span={16}>
                <p>: {layoutData.legend.title.font.size || "-"}</p>
              </Col>
            </Row>
            <Row className="figure-inputs select-top" gutter={16}>
              <Col span={8}>
                <label>Legend color</label>
              </Col>
              <Col span={16}>
                <p>: {layoutData.legend.title.font.color || "-"}</p>
              </Col>
            </Row>
            <Row className="figure-inputs select-top" gutter={16}>
              <Col span={8}>
                <label>Border width</label>
              </Col>
              <Col span={16}>
                <p>: {layoutData.legend.borderwidth || "-"}</p>
              </Col>
            </Row>
            <Row className="figure-inputs select-top" gutter={16}>
              <Col span={8}>
                <label>Border color</label>
              </Col>
              <Col span={16}>
                <p>: {layoutData.legend.bordercolor || "-"}</p>
              </Col>
            </Row>
            <Row className="figure-inputs select-top" gutter={16}>
              <Col span={8}>
                <label>Background color</label>
              </Col>
              <Col span={16}>
                <p>: {layoutData.legend.bgcolor || "-"}</p>
              </Col>
            </Row>
            <Row className="figure-inputs select-top" gutter={16}>
              <Col span={8}>
                <label>Orientation</label>
              </Col>
              <Col span={16}>
                <p>: {layoutData.legend.orientation || "-"}</p>
              </Col>
            </Row>
          </div>
        </Panel>
        {/* Axes */}
        <Panel header="Axes" key="3">
          <div className="figure-container">
            <div className="header option-header">X-Axis</div>
            <Row className="figure-inputs" gutter={16}>
              <Col span={8}>
                <label>Show</label>
              </Col>
              <Col span={16}>
                <p>
                  : {layoutData.xaxis.visible === true ? "Yes" : "No" || "-"}
                </p>
              </Col>
            </Row>
            <Row className="figure-inputs" gutter={16}>
              <Col span={8}>
                <label>Show tick labels</label>
              </Col>
              <Col span={16}>
                <p>
                  :{" "}
                  {layoutData.xaxis.showticklabels === true
                    ? "Yes"
                    : "No" || "-"}
                </p>
              </Col>
            </Row>
            <Row className="figure-inputs" gutter={16}>
              <Col span={8}>
                <label>Show line</label>
              </Col>
              <Col span={16}>
                <p>
                  : {layoutData.xaxis.showline === true ? "Yes" : "No" || "-"}
                </p>
              </Col>
            </Row>
            <Row className="figure-inputs" gutter={16}>
              <Col span={8}>
                <label>Show grid</label>
              </Col>
              <Col span={16}>
                <p>
                  : {layoutData.xaxis.showgrid === true ? "Yes" : "No" || "-"}
                </p>
              </Col>
            </Row>
            <Row className="figure-inputs" gutter={16}>
              <Col span={8}>
                <label>Title</label>
              </Col>
              <Col className="gutter-row select-top" span={16}>
                <p>: {layoutData.xaxis.title.text || "-"}</p>
              </Col>
            </Row>
            <Row className="figure-inputs select-top" gutter={16}>
              <Col span={8}>
                <label>Title size</label>
              </Col>
              <Col span={16}>
                <p>: {layoutData.xaxis.title.font.size || "-"}</p>
              </Col>
            </Row>
            <Row className="figure-inputs select-top" gutter={16}>
              <Col span={8}>
                <label>Title color</label>
              </Col>
              <Col span={16}>
                <p>: {layoutData.xaxis.title.font.color || "-"}</p>
              </Col>
            </Row>
            <Row className="figure-inputs select-top" gutter={16}>
              <Col span={8}>
                <label>Grid color</label>
              </Col>
              <Col span={16}>
                <p>: {layoutData.xaxis.gridcolor || "-"}</p>
              </Col>
            </Row>
            <div className="header">Y-Axis</div>
            <Row className="figure-inputs" gutter={16}>
              <Col span={8}>
                <label>Show</label>
              </Col>
              <Col span={16}>
                <p>
                  : {layoutData.yaxis.visible === true ? "Yes" : "No" || "-"}
                </p>
              </Col>
            </Row>
            <Row className="figure-inputs" gutter={16}>
              <Col span={8}>
                <label>Show tick labels</label>
              </Col>
              <Col span={16}>
                <p>
                  :{" "}
                  {layoutData.yaxis.showticklabels === true
                    ? "Yes"
                    : "No" || "-"}
                </p>
              </Col>
            </Row>
            <Row className="figure-inputs" gutter={16}>
              <Col span={8}>
                <label>Show line</label>
              </Col>
              <Col span={16}>
                <p>
                  : {layoutData.yaxis.showline === true ? "Yes" : "No" || "-"}
                </p>
              </Col>
            </Row>
            <Row className="figure-inputs" gutter={16}>
              <Col span={8}>
                <label>Show grid</label>
              </Col>
              <Col span={16}>
                <p>
                  : {layoutData.yaxis.showgrid === true ? "Yes" : "No" || "-"}
                </p>
              </Col>
            </Row>
            <Row className="figure-inputs" gutter={16}>
              <Col span={8}>
                <label>Title</label>
              </Col>
              <Col className="gutter-row select-top" span={16}>
                <p>: {layoutData.yaxis.title.text || "-"}</p>
              </Col>
            </Row>
            <Row className="figure-inputs select-top" gutter={16}>
              <Col span={8}>
                <label>Title size</label>
              </Col>
              <Col span={16}>
                <p>: {layoutData.yaxis.title.font.size || "-"}</p>
              </Col>
            </Row>
            <Row className="figure-inputs select-top" gutter={16}>
              <Col span={8}>
                <label>Title color</label>
              </Col>
              <Col span={16}>
                <p>: {layoutData.yaxis.title.font.color || "-"}</p>
              </Col>
            </Row>
            <Row className="figure-inputs select-top" gutter={16}>
              <Col span={8}>
                <label>Grid color</label>
              </Col>
              <Col span={16}>
                <p>: {layoutData.yaxis.gridcolor || "-"}</p>
              </Col>
            </Row>
          </div>
        </Panel>
      </Collapse>
    </div>
  );
};

export default DisplayApprover;
