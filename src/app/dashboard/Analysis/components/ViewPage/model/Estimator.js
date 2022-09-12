import React from "react";
import { Row, Col, Checkbox, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import SelectField from "../../../../../../components/SelectField/SelectField";

const Estimator = () => {
  return (
    <>
      <div className="drawer-head">
        <h3>Estimator</h3>
      </div>
      <div class="container-bar">
        <ul class="progressbar">
          <li class="active"></li>
          <li class="active"></li>
          <li class="active"></li>
          <li class="active"></li>
          <li class="active"></li>
          <li class="progress"></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div className="estimator-details">
        <SelectField label="Model type" />
        <SelectField label="Regression" />
        <SelectField label="Transformation" />
        <Row gutter={24} className="metrics">
          <Col span={11}>
            <SelectField label="Metrics" />
          </Col>
          <Col span={13}>
            <Checkbox>Enable grid search</Checkbox>
          </Col>
        </Row>
        <div className="button-save">
          <Button disabled>Save Changes</Button>
          <Button>
            <PlusOutlined /> Add another estimator
          </Button>
        </div>
      </div>
    </>
  );
};

export default Estimator;
