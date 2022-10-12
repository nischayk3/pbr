import React from "react";
import { Row, Col, Checkbox, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import SelectField from "../../../../../../components/SelectField/SelectField";

const Estimator = (props) => {
  const {
    estimatorPopupData,
    setEstimatorPopupDataValues,
    estimatorPopupDataValues,
    onCreateClick,
    savedEstimatorPopupDataValues,
    setSavedEstimatorPopupDataValues
  } = props;


  const onClickSave = () => {
    setSavedEstimatorPopupDataValues({
      ...savedEstimatorPopupDataValues,
      typeListValue: estimatorPopupDataValues.typeListValue,
      regressionListvalue: estimatorPopupDataValues.regressionListvalue,
      algoValue: estimatorPopupDataValues.algoValue
    })
    onCreateClick();
  }

  return (
    <>
      <div className="drawer-head">
        <h3>Estimator</h3>
      </div>
      {/* <div class="container-bar">
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
      </div> */}
      <div className="estimator-details">
        <SelectField
          label="Model type"
          selectList={estimatorPopupData.typeList}
          selectedValue={estimatorPopupDataValues.typeListValue}
          onChangeSelect={(e) =>
            setEstimatorPopupDataValues({
              ...estimatorPopupDataValues,
              typeListValue: e,
            })
          }
        />
        <SelectField
          label="Regression"
          selectList={estimatorPopupData.regressionList}
          selectedValue={estimatorPopupDataValues.regressionListvalue}
          onChangeSelect={(e) =>
            setEstimatorPopupDataValues({
              ...estimatorPopupDataValues,
              regressionListvalue: e,
            })
          }
        />
        <SelectField
          label="Algorithms"
          selectList={estimatorPopupData.algoList}
          selectedValue={estimatorPopupDataValues.algoValue}
          onChangeSelect={(e) =>
            setEstimatorPopupDataValues({
              ...estimatorPopupDataValues,
              algoValue: e,
            })
          }
        />
        <Row gutter={24} className="metrics">
          <Col span={11}>
            <SelectField label="Metrics" />
          </Col>
          <Col span={13}>
            <Checkbox
              checked={estimatorPopupDataValues.enableGrid}
              onChange={(e) =>
                setEstimatorPopupDataValues({
                  ...estimatorPopupDataValues,
                  enableGrid: e.target.checked,
                })
              }
            >
              Enable grid search
            </Checkbox>
          </Col>
        </Row>
        <div className="button-save">
          <Button onClick={onClickSave}>Save Changes</Button>
          <Button>
            <PlusOutlined /> Add another estimator
          </Button>
        </div>
      </div>
    </>
  );
};

export default Estimator;
