import React from "react";
import "./model.scss";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Row, Col, Button, Radio } from "antd";

const NodeDetails = (props) => {
  const {
    addEstimator,
    selectedTargetValue,
    setSelectedTargetVariable,
    nodeInformation,
  } = props;
  return (
    <div className="node-container">
      <div className="node-details-container">
        <Row gutter={16}>
          <Col span={24}>
            <Button className="custom-primary-btn">
              <Radio
                checked={nodeInformation.Node === selectedTargetValue}
                onChange={() => setSelectedTargetVariable(nodeInformation.Node)}
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
              <span>50.00</span>
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          <Row>
            <Col span={10}>
              <span>Min</span>
            </Col>
            <Col span={10}>
              <span>23.674</span>
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          <Row>
            <Col span={10}>
              <span>Variance</span>
            </Col>
            <Col span={10}>
              <span>1.00</span>
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
              <span>23.678</span>
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          <Row>
            <Col span={10}>
              <span>1st quartile</span>
            </Col>
            <Col span={10}>
              <span>1.00</span>
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          <Row>
            <Col span={10}>
              <span>Kurtosis</span>
            </Col>
            <Col span={10}>
              <span>50.00</span>
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
              <span>50.00</span>
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          <Row>
            <Col span={10}>
              <span>Median</span>
            </Col>
            <Col span={10}>
              <span>10.00</span>
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          <Row>
            <Col span={10}>
              <span>Skewness</span>
            </Col>
            <Col span={10}>
              <span>50.00</span>
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
              <span>50.00</span>
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          <Row>
            <Col span={10}>
              <span>2nd quartile</span>
            </Col>
            <Col span={10}>
              <span>150.00</span>
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
              <span>23.64</span>
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          <Row>
            <Col span={10}>
              <span>Max</span>
            </Col>
            <Col span={10}>
              <span>150.00</span>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default NodeDetails;
