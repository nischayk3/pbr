import React, { useEffect, useState } from "react";
import "./styles.scss";
import { Row, Col, Button } from "antd";
import SelectField from "../../../../../../components/SelectField/SelectField";
import InputField from "../../../../../../components/InputField/InputField";
import { useDispatch } from "react-redux";
import {
  showLoader,
  hideLoader,
  showNotification,
} from "../../../../../../duck/actions/commonActions";
import queryString from "query-string";
import { postChartPlotData } from "../../../../../../services/chartPersonalizationService";

const Threshold = ({ postChartData, setPostChartData }) => {
  const dispatch = useDispatch();
  const mathList = [
    "Lesser than",
    "Greater than",
    "Lesser than or equal to",
    "Greater than or equal to",
    "Equal to",
  ];
  const [parameterList, setParameterList] = useState([]);
  const [thresValues, setThresvalues] = useState({
    parameter: null,
    math: null,
    valueNum: null,
  });
  const params = queryString.parse(location.search);
  const onReset = async () => {
    setThresvalues({
      parameter: null,
      math: null,
      valueNum: null,
    });
    const newArr = JSON.parse(JSON.stringify(postChartData));
    newArr.data[0].thresholds = [];
    try {
      dispatch(showLoader());
      const viewRes = await postChartPlotData(newArr);
      let postChartClone = [...postChartData.data];
      postChartClone[0].thresholds = viewRes.data[0].thresholds;
      postChartClone[0].violations = viewRes.data[0].violations;
      postChartClone[0].data = viewRes.data[0].data;
      setPostChartData({ ...postChartData, data: postChartClone });
      dispatch(hideLoader());
    } catch (error) {
      dispatch(hideLoader());
      dispatch(showNotification("error", "Unable to calculate threshold"));
    }
  };

  const onApply = async () => {
    let operator = "";
    if (thresValues.math === "Lesser than") {
      operator = "<";
    }
    if (thresValues.math === "Greater than") {
      operator = ">";
    }
    if (thresValues.math === "Lesser than or equal to") {
      operator = "<=";
    }
    if (thresValues.math === "Greater than or equal to") {
      operator = ">=";
    }
    if (thresValues.math === "Equal to") {
      operator = "=";
    }
    const newArr = [...postChartData.data];
    let functionId;
    newArr[0].extras.coverage.forEach((ele) => {
      if (ele.function_name === thresValues.parameter) {
        functionId = ele.function_id;
      }
    });
    const obj = {
      window: "1D",
      parameter: Number(functionId),
      operator: operator,
      threshold: thresValues.valueNum,
    };
    newArr[0].thresholds = [];
    newArr[0].thresholds.push(obj);
    setPostChartData({ ...postChartData, data: newArr });
    try {
      dispatch(showLoader());
      const viewRes = await postChartPlotData(postChartData);
      let newdataArr = [...postChartData.data];
      newdataArr[0].thresholds = viewRes.data[0].thresholds;
      newdataArr[0].violations = viewRes.data[0].violations;
      newdataArr[0].data = viewRes.data[0].data;
      setPostChartData({ ...postChartData, data: newdataArr });
      dispatch(hideLoader());
    } catch (error) {
      dispatch(hideLoader());
      dispatch(showNotification("error", "Unable to calculate threshold"));
    }
  };

  useEffect(() => {
    const newCovArr = JSON.parse(JSON.stringify(postChartData));
    const list = [];
    newCovArr &&
      newCovArr.data &&
      newCovArr.data.forEach((ele) => {
        if (ele.chart_type === "scatter") {
          list.push(ele.chart_mapping.x.function_name);
          list.push(ele.chart_mapping.y.function_name);
        } else {
          list.push(ele.chart_mapping.y.function_name);
        }
        ele.thresholds &&
          ele.thresholds.forEach((thres) => {
            let parameterValue;
            let operator;
            ele.extras.coverage.forEach((extra) => {
              if (thres.parameter === Number(extra.function_id)) {
                parameterValue = extra.function_name;
              }
            });
            if (thres.operator === "<") {
              operator = "Lesser than";
            }
            if (thres.operator === ">") {
              operator = "Greater than";
            }
            if (thres.operator === "<=") {
              operator = "Lesser than or equal to";
            }
            if (thres.operator === ">=") {
              operator = "Greater than or equal to";
            }
            if (thres.operator === "=") {
              operator = "Equal to";
            }
            setThresvalues({
              ...thresValues,
              math: operator,
              valueNum: thres.threshold,
              parameter: parameterValue,
            });
          });
      });
    setParameterList(list);
  }, [postChartData]);

  return (
    <div className="tresh-container">
      {Object.keys(params).length > 0 && params.fromScreen !== "Workspace" ? (
        <Row className="view-details">
          <Col span={24}>
            <Row gutter={16}>
              <Col span={8}>
                <label>Parameter</label>
              </Col>
              <Col span={14}>
                <p>: {thresValues.parameter || "-"}</p>
              </Col>
            </Row>
            <Row gutter={16} className="mt">
              <Col span={8}>
                <p>Math Symbol</p>
              </Col>
              <Col span={8}>
                <p>: {thresValues.math || "-"}</p>
              </Col>
            </Row>
            <Row gutter={16} className="mt">
              <Col span={8}>
                <p>Value</p>
              </Col>
              <Col span={8}>
                <p>: {thresValues.valueNum || "-"}</p>
              </Col>
            </Row>
          </Col>
        </Row>
      ) : (
        <>
          <Row>
            <Col span={24}>
              <p>Parameter</p>
              <SelectField
                placeholder="Select"
                selectedValue={thresValues.parameter}
                onChangeSelect={(e) =>
                  setThresvalues({ ...thresValues, parameter: e })
                }
                selectList={parameterList}
              />
            </Col>
          </Row>
          <Row className="mt">
            <Col span={24}>
              <p>Math Symbols</p>
              <SelectField
                placeholder="Select"
                selectedValue={thresValues.math}
                onChangeSelect={(e) =>
                  setThresvalues({ ...thresValues, math: e })
                }
                selectList={mathList}
              />
            </Col>
          </Row>
          <Row className="mt">
            <Col span={24}>
              <p>Value</p>
              <InputField
                placeholder="Enter Number"
                value={thresValues.valueNum}
                onChangeInput={(e) =>
                  setThresvalues({ ...thresValues, valueNum: e.target.value })
                }
              />
            </Col>
          </Row>
          <div className="apply-cont">
            <p onClick={onReset}>Reset</p>
            <Button className="custom-primary-btn" onClick={onApply}>
              Apply
            </Button>
          </div>{" "}
        </>
      )}
    </div>
  );
};

export default Threshold;
