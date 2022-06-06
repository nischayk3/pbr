import React, { useEffect, useState } from "react";
import "./style.scss";
//antd imports
import { Collapse, Row, Col } from "antd";
//unpacking antd components
const { Panel } = Collapse;
import { initialLayout } from "./displayFunctions";

const DisplayApprover = ({ postChartData, setPostChartData }) => {
  const [layoutDataApprover, setLayoutDataApprover] = useState(initialLayout);
  useEffect(() => {
    if (postChartData.data) {
      const newArrApprover = JSON.parse(JSON.stringify(postChartData));
      const xvalueApprover = newArrApprover.data[0].layout.xaxis.title.text;
      const yvalueApprover = newArrApprover.data[0].layout.yaxis.title.text;
      const annotationsApprover = newArrApprover.data[0].layout.annotations;
      const o =
        newArrApprover.data[0].layout.legend.orientation === "v"
          ? "Vertical"
          : "Horizontal";
      setLayoutDataApprover({
        ...layoutDataApprover,
        legend: { ...layoutDataApprover.legend, orientation: o },
        xaxis: {
          ...layoutDataApprover.xaxis,
          title: { ...layoutDataApprover.xaxis.title, text: xvalueApprover },
        },
        annotations: annotationsApprover,
        yaxis: {
          ...layoutDataApprover.yaxis,
          title: { ...layoutDataApprover.yaxis.title, text: yvalueApprover },
        },
      });
    }
  }, []);

  useEffect(() => {
    if (postChartData.data) {
      const newArrApprover = [...postChartData.data];
      newArrApprover[0].layout = JSON.parse(JSON.stringify(layoutDataApprover));
      const orientation = newArrApprover[0].layout.legend.orientation;
      newArrApprover[0].layout.legend.orientation =
        orientation === "Vertical" ? "v" : "h";
      setPostChartData({ ...postChartData, data: newArrApprover });
    }
  }, [layoutDataApprover]);

  return (
    <div id="display" className="display-section p-bottom">
      <Collapse
        expandIconPosition="right"
        id="display-collapase"
        ghost
        accordion
      >
        {/* Figure */}
        <Panel
          header="Figure"
          key="1"
          style={{ background: "white !important" }}
        >
          <div className="figure-container" id="figure">
            <Row
              className="figure-inputs select-top"
              id="inputs-figure"
              gutter={16}
            >
              <Col id="col-height" span={8}>
                <label>Height </label>
              </Col>
              <Col span={16}>
                <p>: {layoutDataApprover.height || "-"}</p>
              </Col>
            </Row>
            <Row className="figure-inputs select-top" gutter={16}>
              <Col span={8}>
                <label>Width </label>
              </Col>
              <Col span={16}>
                <p>: {layoutDataApprover.width || "-"}</p>
              </Col>
            </Row>
            <Row className="figure-inputs select-top" gutter={16}>
              <Col span={8}>
                <label>Plot color </label>
              </Col>
              <Col span={16}>
                <p>: {layoutDataApprover.plot_bgcolor || "-"}</p>
              </Col>
            </Row>
            <div className="figure-inputs header">Panel Options</div>
            <Row className="figure-inputs select-top" gutter={16}>
              <Col span={8}>
                <label>Title </label>
              </Col>
              <Col span={16}>
                <p>: {layoutDataApprover.title.text || "-"}</p>
              </Col>
            </Row>
            <Row className="figure-inputs select-top" gutter={16}>
              <Col span={8}>
                <label>Font size </label>
              </Col>
              <Col span={16}>
                <p>: {layoutDataApprover.title.font.size || "-"}</p>
              </Col>
            </Row>
            <Row className="figure-inputs select-top" gutter={16}>
              <Col span={8}>
                <label>Font color </label>
              </Col>
              <Col span={16}>
                <p>: {layoutDataApprover.title.font.color || "-"}</p>
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
                <p>
                  :{" "}
                  {layoutDataApprover.showlegend === true ? "Yes" : "No" || "-"}
                </p>
              </Col>
            </Row>
            <Row className="figure-inputs" gutter={16}>
              <Col span={8}>
                <label>Title</label>
              </Col>
              <Col className="gutter-row select-top" span={16}>
                <p>: {layoutDataApprover.legend.title.text || "-"}</p>
              </Col>
            </Row>
            <Row className="figure-inputs select-top" gutter={16}>
              <Col span={8}>
                <label>Legend size</label>
              </Col>
              <Col span={16}>
                <p>: {layoutDataApprover.legend.title.font.size || "-"}</p>
              </Col>
            </Row>
            <Row className="figure-inputs select-top" gutter={16}>
              <Col span={8}>
                <label>Legend color</label>
              </Col>
              <Col span={16}>
                <p>: {layoutDataApprover.legend.title.font.color || "-"}</p>
              </Col>
            </Row>
            <Row className="figure-inputs select-top" gutter={16}>
              <Col span={8}>
                <label>Border width</label>
              </Col>
              <Col span={16}>
                <p>: {layoutDataApprover.legend.borderwidth || "-"}</p>
              </Col>
            </Row>
            <Row className="figure-inputs select-top" gutter={16}>
              <Col span={8}>
                <label>Border color</label>
              </Col>
              <Col span={16}>
                <p>: {layoutDataApprover.legend.bordercolor || "-"}</p>
              </Col>
            </Row>
            <Row className="figure-inputs select-top" gutter={16}>
              <Col span={8}>
                <label>Background color</label>
              </Col>
              <Col span={16}>
                <p>: {layoutDataApprover.legend.bgcolor || "-"}</p>
              </Col>
            </Row>
            <Row className="figure-inputs select-top" gutter={16}>
              <Col span={8}>
                <label>Orientation</label>
              </Col>
              <Col span={16}>
                <p>: {layoutDataApprover.legend.orientation || "-"}</p>
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
                  :{" "}
                  {layoutDataApprover.xaxis.visible === true
                    ? "Yes"
                    : "No" || "-"}
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
                  {layoutDataApprover.xaxis.showticklabels === true
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
                  :{" "}
                  {layoutDataApprover.xaxis.showline === true
                    ? "Yes"
                    : "No" || "-"}
                </p>
              </Col>
            </Row>
            <Row className="figure-inputs" gutter={16}>
              <Col span={8}>
                <label>Show grid</label>
              </Col>
              <Col span={16}>
                <p>
                  :{" "}
                  {layoutDataApprover.xaxis.showgrid === true
                    ? "Yes"
                    : "No" || "-"}
                </p>
              </Col>
            </Row>
            <Row className="figure-inputs" gutter={16}>
              <Col span={8}>
                <label>Title</label>
              </Col>
              <Col className="gutter-row select-top" span={16}>
                <p>: {layoutDataApprover.xaxis.title.text || "-"}</p>
              </Col>
            </Row>
            <Row className="figure-inputs select-top" gutter={16}>
              <Col span={8}>
                <label>Title size</label>
              </Col>
              <Col span={16}>
                <p>: {layoutDataApprover.xaxis.title.font.size || "-"}</p>
              </Col>
            </Row>
            <Row className="figure-inputs select-top" gutter={16}>
              <Col span={8}>
                <label>Title color</label>
              </Col>
              <Col span={16}>
                <p>: {layoutDataApprover.xaxis.title.font.color || "-"}</p>
              </Col>
            </Row>
            <Row className="figure-inputs select-top" gutter={16}>
              <Col span={8}>
                <label>Grid color</label>
              </Col>
              <Col span={16}>
                <p>: {layoutDataApprover.xaxis.gridcolor || "-"}</p>
              </Col>
            </Row>
            <div className="header">Y-Axis</div>
            <Row className="figure-inputs" gutter={16}>
              <Col span={8}>
                <label>Show</label>
              </Col>
              <Col span={16}>
                <p>
                  :{" "}
                  {layoutDataApprover.yaxis.visible === true
                    ? "Yes"
                    : "No" || "-"}
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
                  {layoutDataApprover.yaxis.showticklabels === true
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
                  :{" "}
                  {layoutDataApprover.yaxis.showline === true
                    ? "Yes"
                    : "No" || "-"}
                </p>
              </Col>
            </Row>
            <Row className="figure-inputs" gutter={16}>
              <Col span={8}>
                <label>Show grid</label>
              </Col>
              <Col span={16}>
                <p>
                  :{" "}
                  {layoutDataApprover.yaxis.showgrid === true
                    ? "Yes"
                    : "No" || "-"}
                </p>
              </Col>
            </Row>
            <Row className="figure-inputs" gutter={16}>
              <Col span={8}>
                <label>Title</label>
              </Col>
              <Col className="gutter-row select-top" span={16}>
                <p>: {layoutDataApprover.yaxis.title.text || "-"}</p>
              </Col>
            </Row>
            <Row className="figure-inputs select-top" gutter={16}>
              <Col span={8}>
                <label>Title size</label>
              </Col>
              <Col span={16}>
                <p>: {layoutDataApprover.yaxis.title.font.size || "-"}</p>
              </Col>
            </Row>
            <Row className="figure-inputs select-top" gutter={16}>
              <Col span={8}>
                <label>Title color</label>
              </Col>
              <Col span={16}>
                <p>: {layoutDataApprover.yaxis.title.font.color || "-"}</p>
              </Col>
            </Row>
            <Row className="figure-inputs select-top" gutter={16}>
              <Col span={8}>
                <label>Grid color</label>
              </Col>
              <Col span={16}>
                <p>: {layoutDataApprover.yaxis.gridcolor || "-"}</p>
              </Col>
            </Row>
          </div>
        </Panel>
      </Collapse>
    </div>
  );
};

export default DisplayApprover;
