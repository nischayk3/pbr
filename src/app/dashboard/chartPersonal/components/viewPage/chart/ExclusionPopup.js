import React, { useRef } from "react";
//antd imports
import { Row, Col, Checkbox, Button, Input } from "antd";
//components
import InputField from "../../../../../../components/InputField/InputField";
//redux
import { useDispatch } from "react-redux";
import {
  showLoader,
  hideLoader,
} from "../../../../../../duck/actions/commonActions";
//services
import { postChartPlotData } from "../../../../../../services/chartPersonalizationService";

const { TextArea } = Input;
//main component
const ExclusionPopup = ({
  exclusionValues,
  setIsModalVisible,
  setExclusionValues,
  postChartData,
  setPostChartData,
}) => {
  const dispatch = useDispatch();
  const counter = useRef(0);
  const handleOk = async () => {
    if (exclusionValues.excludeRecord) {
      counter.current = counter.current + 1;
      const obj = {
        exclusion_id: counter.current,
        exclusion_value: { batch: exclusionValues.batchId },
        exclusion_description: exclusionValues.notes,
        user: "demo",
        timestamp: new Date().toISOString(),
      };
      const newArr = [...postChartData.data];
      newArr[0].exclusions.push(obj);
      setPostChartData({ ...postChartData, data: newArr });
      try {
        setIsModalVisible(false);
        dispatch(showLoader());
        const viewRes = await postChartPlotData(postChartData);
        let newdataArr = [...postChartData.data];
        newdataArr[0].data = viewRes.data[0].data;
        newdataArr[0].exclusions = viewRes.data[0].exclusions;
        setPostChartData({ ...postChartData, data: newdataArr });
        dispatch(hideLoader());
      } catch (error) {
        dispatch(hideLoader());
      }
    } else {
      setIsModalVisible(false);
    }
  };

  const handleNoteChange = (e) => {
    setExclusionValues({ ...exclusionValues, notes: e.target.value });
  };

  const handleExcludeChange = (e) => {
    setExclusionValues({ ...exclusionValues, excludeRecord: e.target.checked });
  };

  return (
    <div className="exclusion-modal">
      <Row gutter={24}>
        <Col className="gutter-row" span={12}>
          <div>
            <InputField
              label="Product Code"
              value={exclusionValues.productCode}
              disabled
            />
          </div>
        </Col>
        <Col className="gutter-row" span={12}>
          <div>
            <InputField
              label="Batch Number"
              value={exclusionValues.batchId}
              disabled
            />
          </div>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col className="gutter-row" span={12}>
          <div>
            <InputField
              label="Parameter Name"
              value={exclusionValues.parameterName}
              disabled
            />
          </div>
        </Col>
        <Col className="gutter-row" span={12}>
          <div>
            <InputField
              label="Parameter Value"
              value={exclusionValues.parameterValue}
              disabled
            />
          </div>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col className="gutter-row" span={12}>
          <div>
            <InputField label="Unit" value={exclusionValues.unit} disabled />
          </div>
        </Col>
        <Col className="gutter-row" span={12}>
          <div>
            <InputField
              label="Test Date"
              value={exclusionValues.testDate}
              disabled
            />
          </div>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col className="gutter-row" span={12}>
          <div>
            <InputField
              label="NC Number"
              value={exclusionValues.ncNumber}
              disabled
            />
          </div>
        </Col>
        <Col className="gutter-row" span={12}>
          <Checkbox
            checked={exclusionValues.excludeRecord}
            onChange={handleExcludeChange}
          >
            Exclude Record
          </Checkbox>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col className="gutter-row" span={24}>
          <div>
            <label>Notes</label>
            <TextArea
              rows={2}
              placeholder="Reason for excluding Record."
              value={exclusionValues.notes}
              onChange={handleNoteChange}
            />
          </div>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col className="gutter-row btn-three" span={24}>
          <Button
            // onClick={handleCloseModal}
            className="custom-primary-btn"
            key="cancel"
          >
            Create NC
          </Button>
          <div className="last-btn">
            <Button
              //   onClick={handleCloseModal}
              className="custom-primary-btn"
              key="cancel"
            >
              Genealogy
            </Button>
            <Button
              onClick={handleOk}
              className="custom-secondary-btn"
              key="link"
              type="primary"
            >
              Submit
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ExclusionPopup;
