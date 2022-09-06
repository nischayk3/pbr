import React, { useEffect, useState } from "react";
import "./style.scss";
//antd imports
import { Collapse, Row, Col } from "antd";
//unpacking antd components
const { Panel } = Collapse;
import { initialLayout } from "./displayFunctions";

/* istanbul ignore next */
const DisplayApprover = ({ postChartData, setPostChartData }) => {
  const [layoutDataApprover, setLayoutDataApprover] = useState(initialLayout);
  const [sigmaLines, setSigmaLines] = useState(false);
  const [chartDataMarkersApprover, setChartDataMarkersApprover] = useState({
    markerSize: 15,
    markerShape: "",
    markerColor: "",
    violationMarkerColor: null,
    violationMarkerSize: null,
    violationMarkerShape: null,
  });
  useEffect(() => {
    if (postChartData.data) {
      const newArrApprover = JSON.parse(JSON.stringify(postChartData));
      const o =
        newArrApprover.data[0].layout.legend.orientation === "v"
          ? "Vertical"
          : "Horizontal";
      const layout = JSON.parse(JSON.stringify(postChartData?.data[0]?.layout));
      setSigmaLines(newArrApprover?.data[0]?.plot_std);
      layout.legend.orientation = o;
      setLayoutDataApprover(layout);
      newArrApprover.data[0] &&
        newArrApprover.data[0].data &&
        newArrApprover.data[0].data.forEach((ele) => {
          if (ele.name === "Normal" && ele.mode === "markers") {
            setChartDataMarkersApprover((prevState) => ({
              ...prevState,
              markerSize: ele.marker.size,
              markerShape: ele.marker.symbol ? ele.marker.symbol : "circle",
              markerColor: ele.marker.color,
            }));
          } else if (ele.name === "Violations" && ele.mode === "markers") {
            setChartDataMarkersApprover((prevState) => ({
              ...prevState,
              violationMarkerSize: ele.marker.size,
              violationMarkerShape: ele.marker.symbol
                ? ele.marker.symbol
                : "circle",
              violationMarkerColor: ele.marker.color,
            }));
          }
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
            <Row className="figure-inputs select-top" gutter={16}>
              <Col span={8}>
                <label>Sigma lines </label>
              </Col>
              <Col span={16}>
                <p>: {sigmaLines ? "Yes" : "No"}</p>
              </Col>
            </Row>
            <div className="figure-inputs header">Marker</div>
            <Row className="figure-inputs select-top" gutter={16}>
              <Col span={8}>
                <label>Shape</label>
              </Col>
              <Col span={16}>
                <p>{chartDataMarkersApprover.markerShape}</p>
              </Col>
            </Row>
            <Row className="figure-inputs select-top" gutter={16}>
              <Col span={8}>
                <label>Color</label>
              </Col>
              <Col span={16}>
                <p>{chartDataMarkersApprover.markerColor || "-"}</p>
              </Col>
            </Row>
            <Row className="figure-inputs select-top" gutter={16}>
              <Col span={8}>
                <label>Size</label>
              </Col>
              <Col span={16}>
                <p>{chartDataMarkersApprover.markerSize}</p>
              </Col>
            </Row>
            {postChartData &&
              postChartData.data[0] &&
              postChartData.data[0].violations &&
              postChartData.data[0].violations.length > 1 && (
                <>
                  <div className="figure-inputs header">Violations</div>
                  <Row className="figure-inputs select-top" gutter={16}>
                    <Col span={8}>
                      <label>Shape</label>
                    </Col>
                    <Col span={16}>
                      <p>{chartDataMarkersApprover.violationMarkerShape}</p>
                    </Col>
                  </Row>
                  <Row className="figure-inputs select-top" gutter={16}>
                    <Col span={8}>
                      <label>Color</label>
                    </Col>
                    <Col span={16}>
                      <p>{chartDataMarkersApprover.violationMarkerColor}</p>
                    </Col>
                  </Row>
                  <Row className="figure-inputs select-top" gutter={16}>
                    <Col span={8}>
                      <label>Size</label>
                    </Col>
                    <Col span={16}>
                      <p>{chartDataMarkersApprover.violationMarkerSize}</p>
                    </Col>
                  </Row>
                </>
              )}
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
                  :
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
