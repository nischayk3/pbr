import React, { useEffect, useState } from "react";
import "./model.scss";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Row, Col, Button, Radio, Skeleton } from "antd";
import { getViewNodeDetails } from "../../../../../../services/analyticsService";
import { useDispatch, useSelector } from "react-redux";
import ScatterPlot from "../../../../../../components/ScatterPlot/ScatterPlot";
import {
  hideLoader,
  showLoader,
} from "../../../../../../duck/actions/commonActions";

const NodeDetails = (props) => {
  const {
    addEstimator,
    selectedTargetValue,
    setSelectedTargetVariable,
    nodeInformation,
    editFinalJson,
    getNodes
  } = props;
  const dispatch = useDispatch();
  const [nodeData, setNodeData] = useState({});
  const [dataStatus, setDataStatus] = useState(true);
  const selectedViewData = useSelector(
    (State) => State.analyticsReducer.viewData
  );

  const getNodeDetails = async () => {
    const req = {
      view_disp_id: selectedViewData?.view_id,
      version: selectedViewData?.viewVersion,
      parameter_name: nodeInformation.Node,
      unapproved: selectedViewData?.data_filter?.unapproved_data === 1 ? true : false,
    };
    dispatch(showLoader());
    const apiResponse = await getViewNodeDetails(req);
    if (apiResponse?.Status === 200) {
      setDataStatus(false);
      dispatch(hideLoader());
      if (apiResponse?.data?.Boxplot) {
        apiResponse.data.Boxplot.layout.height = "100px";
        apiResponse.data.Boxplot.layout.width = "100px";
      }
      if (apiResponse?.data?.Histogram) {
        apiResponse.data.Histogram.layout.height = "100px";
        apiResponse.data.Histogram.layout.width = "100px";
      }
      setNodeData(apiResponse);
    } else {
      dispatch(hideLoader());
      setDataStatus(false);
    }
  };
  useEffect(() => {
    if (nodeInformation) {
      getNodeDetails();
      setDataStatus(true);
    }
  }, [nodeInformation]);

  return (
    <div className="node-container">
      {!dataStatus ? (
        <>
          <div className="node-details-container">
            <Row gutter={16}>
              <Col span={24}>
                <Button className="custom-primary-btn">
                  <Radio
                    checked={nodeInformation.Node === selectedTargetValue}
                    onChange={() => {
                      getNodes(nodeInformation.Node)
                      setSelectedTargetVariable(nodeInformation.Node)
                    }
                    }
                  />
                  Make target Variable
                </Button>
                <Button
                  className="custom-primary-btn"
                  onClick={() => addEstimator("transform")}
                >
                  Add transformation
                </Button>
                <Button className="custom-primary-btn">Make categorical</Button>
                <DeleteOutlined className="delete-b" /> &nbsp;
                <span>Remove connectors</span>
              </Col>
            </Row>
          </div>
          <Row gutter={24} className="details-box">
            <Col span={8}>
              <Row>
                <Col span={10}>
                  <span>N</span>
                </Col>
                <Col span={10}>
                  <span>{nodeData?.data?.Stat?.N || "-"}</span>
                </Col>
              </Row>
            </Col>
            <Col span={8}>
              <Row>
                <Col span={10}>
                  <span>Min</span>
                </Col>
                <Col span={10}>
                  <span>{nodeData?.data?.Stat?.Min || "-"}</span>
                </Col>
              </Row>
            </Col>
            <Col span={8}>
              <Row>
                <Col span={10}>
                  <span>Variance</span>
                </Col>
                <Col span={10}>
                  <span>{nodeData?.data?.Stat?.Var || "-"}</span>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row gutter={24} className="details-box">
            <Col span={8}>
              <Row>
                <Col span={10}>
                  <span>Missing</span>
                </Col>
                <Col span={10}>
                  <span>{nodeData?.data?.Stat?.Missing || "-"}</span>
                </Col>
              </Row>
            </Col>
            <Col span={8}>
              <Row>
                <Col span={10}>
                  <span>1st quartile</span>
                </Col>
                <Col span={10}>
                  <span>{nodeData?.data?.Stat?.Q1 || "-"}</span>
                </Col>
              </Row>
            </Col>
            <Col span={8}>
              <Row>
                <Col span={10}>
                  <span>Kurtosis</span>
                </Col>
                <Col span={10}>
                  <span>{nodeData?.data?.Stat?.Kurtosis || "-"}</span>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row gutter={24} className="details-box">
            <Col span={8}>
              <Row>
                <Col span={10}>
                  <span>Unique</span>
                </Col>
                <Col span={10}>
                  <span>{nodeData?.data?.Stat?.Unique || "-"}</span>
                </Col>
              </Row>
            </Col>
            <Col span={8}>
              <Row>
                <Col span={10}>
                  <span>Median</span>
                </Col>
                <Col span={10}>
                  <span>{nodeData?.data?.Stat?.Median || "-"}</span>
                </Col>
              </Row>
            </Col>
            <Col span={8}>
              <Row>
                <Col span={10}>
                  <span>Skewness</span>
                </Col>
                <Col span={10}>
                  <span>{nodeData?.data?.Stat?.Skewness || "-"}</span>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row gutter={24} className="details-box">
            <Col span={8}>
              <Row>
                <Col span={10}>
                  <span>Mean</span>
                </Col>
                <Col span={10}>
                  <span>{nodeData?.data?.Stat?.Mean || "-"}</span>
                </Col>
              </Row>
            </Col>
            <Col span={8}>
              <Row>
                <Col span={10}>
                  <span>2nd quartile</span>
                </Col>
                <Col span={10}>
                  <span>{nodeData?.data?.Stat?.Q2 || "-"}</span>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row gutter={24} className="details-box">
            <Col span={8}>
              <Row>
                <Col span={10}>
                  <span>Standard dev</span>
                </Col>
                <Col span={10}>
                  <span>{nodeData?.data?.Stat?.Std || "-"}</span>
                </Col>
              </Row>
            </Col>
            <Col span={8}>
              <Row>
                <Col span={10}>
                  <span>Max</span>
                </Col>
                <Col span={10}>
                  <span>{nodeData?.data?.Stat?.Max || "-"}</span>
                </Col>
              </Row>
            </Col>
          </Row>{" "}
        </>
      ) : (
        <Skeleton active />
      )}
      {/* <Row gutter={24}>
        {nodeData?.data?.Histogram.data && (
          <Col span={12} style={{ width: "100px", height: "100px" }}>
            <ScatterPlot
              data={nodeData?.data?.Histogram.data}
              layout={nodeData?.data?.Histogram.layout}
            />
          </Col>
        )}
        {nodeData?.data?.Boxplot.data && (
          <Col span={12}>
            <ScatterPlot
              data={nodeData?.data?.Boxplot.data}
              layout={nodeData?.data?.Boxplot.layout}
            />
          </Col>
        )}
      </Row> */}
    </div>
  );
};

export default NodeDetails;
