import React, { useEffect, useState, useRef } from "react";
import "./styles.scss";
import { Row, Col, Button, Collapse, Popconfirm } from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  FormOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import ColorPicker from "../../../../../../components/ColorPicker/ColorPicker";
import SelectField from "../../../../../../components/SelectField/SelectField";
import InputField from "../../../../../../components/InputField/InputField";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { v4 as uuidv4 } from "uuid";
import {
  showLoader,
  hideLoader,
  showNotification,
} from "../../../../../../duck/actions/commonActions";
import queryString from "query-string";
import { postChartPlotData } from "../../../../../../services/chartPersonalizationService";
const { Panel } = Collapse;

const Threshold = ({ postChartData, setPostChartData }) => {
  const dispatch = useDispatch();
  const text = "Are you sure to delete this?";
  const mathList = [
    "Lesser than",
    "Greater than",
    "Lesser than or equal to",
    "Greater than or equal to",
    "Equal to",
  ];
  const symbolList = [
    "circle",
    "square",
    "diamond",
    "cross",
    "triangle-up",
    "triangle-down",
    "pentagon",
    "hexagon",
    "octagon",
  ];
  const [thresholdList, setThresholdList] = useState([]);
  const [parameterList, setParameterList] = useState([]);
  const [activeKey, setKeyActive] = useState();
  const [editInput, setEditInput] = useState(false);
  const location = useLocation();
  const ref = useRef(null);
  const params = queryString.parse(location.search);

  const onAddThresh = () => {
    const tempObj = {
      key: uuidv4(),
      parameter: "",
      math: "",
      valueNum: "",
      shape: "circle",
      size: 15,
      color: "#d20000",
      completed: false,
      name: `Threshold ${thresholdList.length + 1}`,
    };
    const tempArr = [...thresholdList];
    tempArr.push(tempObj);
    setThresholdList(tempArr);
  };

  const deleteThresh = async (key) => {
    const tempArr = thresholdList.filter((ele) => ele.key !== key);
    let newArr = JSON.parse(JSON.stringify(postChartData));
    newArr.data[0].thresholds = newArr.data[0]?.thresholds.filter(
      (ele) => ele.key !== key
    );
    setThresholdList(tempArr);
    if (newArr.data[0].thresholds.length) {
      await postThreshHold(newArr);
    }
  };

  const handleChange = (index, event, name) => {
    const rowsInput = [...thresholdList];
    if (name === "name") {
      event.stopPropagation();
      rowsInput[index][name] = event.target.value;
    } else {
      rowsInput[index][name] = event;
    }
    setThresholdList(rowsInput);
  };

  const onClickSave = async (key) => {
    const newArr = JSON.parse(JSON.stringify(postChartData));
    const tempList = [];
    thresholdList.forEach((element, index) => {
      let operator = "";
      if (element.math === "Lesser than") {
        operator = "<";
      }
      if (element.math === "Greater than") {
        operator = ">";
      }
      if (element.math === "Lesser than or equal to") {
        operator = "<=";
      }
      if (element.math === "Greater than or equal to") {
        operator = ">=";
      }
      if (element.math === "Equal to") {
        operator = "=";
      }
      let functionId;
      newArr.data[0].extras.coverage.forEach((ele) => {
        if (ele.function_name === element.parameter) {
          functionId = ele.function_id;
        }
      });
      const obj = {
        window: "1D",
        parameter: functionId,
        operator: operator,
        threshold: element.valueNum,
        key: element.key,
        marker: {
          color: element.color,
          size: Number(element.size),
          symbol: element.shape,
        },
        mode: "markers",
        name: `Threshold-${element.name}`,
      };
      tempList.push(obj);
    });
    newArr.data[0].thresholds = JSON.parse(JSON.stringify(tempList));
    await postThreshHold(newArr);
  };

  const postThreshHold = async (newArr) => {
    let errorMsg = "";
    try {
      dispatch(showLoader());
      const viewRes = await postChartPlotData(newArr);
      errorMsg = viewRes?.message;
      let newdataArr = [...postChartData.data];
      newdataArr[0].thresholds = viewRes.data[0].thresholds;
      newdataArr[0].violations = viewRes.data[0].violations;
      newdataArr[0].data = viewRes.data[0].data;
      setPostChartData({ ...postChartData, data: newdataArr });
      dispatch(hideLoader());
    } catch (error) {
      /* istanbul ignore next */
      dispatch(hideLoader());
      if (errorMsg) {
        dispatch(showNotification("error", errorMsg));
      }
    }
  };

  const genExtra = (key, index) => (
    <div className="extra-coll">
      {activeKey === key && (
        <Button
          className="custom-primary-btn"
          onClick={() => onClickSave(key, index)}
        >
          Save
        </Button>
      )}
      <Popconfirm
        placement="top"
        title={text}
        onConfirm={(event) => {
          event.stopPropagation();
          deleteThresh(key);
        }}
        okText="Yes"
        cancelText="No"
      >
        <DeleteOutlined
          style={{ color: "red" }}
          className="delete"
          onClick={(e) => e.stopPropagation()}
        />
      </Popconfirm>
    </div>
  );

  const editKey = (event, key) => {
    event.stopPropagation();
    setEditInput(true);
    setKeyActive(key);
  };

  useEffect(() => {
    const newCovArr = JSON.parse(JSON.stringify(postChartData));
    const list = [];
    const tempthresholdList = [];
    newCovArr &&
      newCovArr.data &&
      newCovArr.data.forEach((ele) => {
        if (ele.chart_mapping.x.function_name !== "recorded_date") {
          if (ele.chart_mapping.x.function_name !== "batch_num") {
            list.push(ele.chart_mapping.x.function_name);
          }
        }
        ele.thresholds &&
          ele.thresholds.forEach((thres) => {
            let parameterValue;
            let operator;
            ele.extras.coverage.forEach((extra) => {
              if (Number(thres.parameter) === Number(extra.function_id)) {
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
            const tempObj = {
              key: thres?.key,
              parameter: parameterValue,
              math: operator,
              valueNum: thres?.threshold,
              shape: thres?.marker?.symbol,
              size: thres?.marker?.size,
              color: thres?.marker?.color,
              name: thres?.name.replace("Threshold-", ""),
            };
            tempthresholdList.push(tempObj);
          });
        list.push(ele.chart_mapping.y.function_name);
      });
    setParameterList(list);
    setThresholdList(tempthresholdList);
  }, [postChartData]);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setEditInput(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div className="tresh-container">
      <>
        {Object.keys(params).length > 0 && params.fromScreen !== "Workspace" ? (
          <div />
        ) : (
          <Row className="mt">
            <Col span={24}>
              <Button className="button-add" onClick={onAddThresh}>
                <PlusOutlined /> Add a threshold
              </Button>
            </Col>
          </Row>
        )}
        <div className="mt">
          <Collapse
            accordion
            expandIconPosition="left"
            style={{ textTransform: "capitalize" }}
            ghost
            className="collapse-rule-tresh"
            // key={ele.key}
            onChange={(key) => setKeyActive(key)}
          >
            {thresholdList &&
              thresholdList.map((ele, index) => {
                return (
                  <Panel
                    header={
                      <div className="header-input">
                        {activeKey === ele.key && editInput ? (
                          <input
                            ref={ref}
                            value={ele.name}
                            name="name"
                            onBlur={() => setEditInput(false)}
                            onChange={(e) => handleChange(index, e, "name")}
                            onClick={(e) => e.stopPropagation()}
                          />
                        ) : (
                          ele.name
                        )}{" "}
                        &ensp;&ensp;
                        {Object.keys(params).length > 0 &&
                        params.fromScreen !== "Workspace" ? (
                          ""
                        ) : (
                          <FormOutlined onClick={(e) => editKey(e, ele.key)} />
                        )}
                      </div>
                    }
                    key={ele.key}
                    extra={
                      Object.keys(params).length > 0 &&
                      params.fromScreen !== "Workspace"
                        ? ""
                        : genExtra(ele.key, index)
                    }
                    className="panel-rule-thresh"
                  >
                    <>
                      <Row className="mt">
                        <Col span={24}>
                          <p>Parameter</p>
                          {Object.keys(params).length > 0 &&
                          params.fromScreen !== "Workspace" ? (
                            <label>{ele.parameter}</label>
                          ) : (
                            <SelectField
                              placeholder="Select"
                              disabled={
                                Object.keys(params).length > 0 &&
                                params.fromScreen !== "Workspace"
                              }
                              selectedValue={ele.parameter}
                              onChangeSelect={(e) =>
                                handleChange(index, e, "parameter")
                              }
                              name="parameter"
                              selectList={parameterList}
                            />
                          )}
                        </Col>
                      </Row>
                      <Row gutter={16} className="mt">
                        <Col span={12}>
                          <p>Math Symbols</p>
                          {Object.keys(params).length > 0 &&
                          params.fromScreen !== "Workspace" ? (
                            <label>{ele.math}</label>
                          ) : (
                            <SelectField
                              placeholder="Select"
                              disabled={
                                Object.keys(params).length > 0 &&
                                params.fromScreen !== "Workspace"
                              }
                              name="math"
                              selectedValue={ele.math}
                              onChangeSelect={(e) =>
                                handleChange(index, e, "math")
                              }
                              selectList={mathList}
                            />
                          )}
                        </Col>
                        <Col span={12}>
                          <p>Value</p>
                          {Object.keys(params).length > 0 &&
                          params.fromScreen !== "Workspace" ? (
                            <label>{ele.valueNum}</label>
                          ) : (
                            <InputField
                              placeholder="Enter Number"
                              value={ele.valueNum}
                              id="threshold_value"
                              name="valueNum"
                              onChangeInput={(e) =>
                                handleChange(index, e.target.value, "valueNum")
                              }
                            />
                          )}
                        </Col>
                      </Row>
                      <h4 className="mt">Customize Marker</h4>
                      <Row gutter={16} className="mt">
                        <Col span={12}>
                          <p>Shape</p>
                          {Object.keys(params).length > 0 &&
                          params.fromScreen !== "Workspace" ? (
                            <label>{ele.shape}</label>
                          ) : (
                            <SelectField
                              selectList={symbolList}
                              onChangeSelect={(e) =>
                                handleChange(index, e, "shape")
                              }
                              selectedValue={ele.shape}
                              name="shape"
                            />
                          )}
                        </Col>
                        <Col span={12}>
                          <p>Size</p>
                          {Object.keys(params).length > 0 &&
                          params.fromScreen !== "Workspace" ? (
                            <label>{ele.size}</label>
                          ) : (
                            <InputField
                              value={ele.size}
                              name="size"
                              onChangeInput={(e) =>
                                handleChange(index, e.target.value, "size")
                              }
                            />
                          )}
                        </Col>
                      </Row>
                      <Row className="mt">
                        <Col span={24}>
                          <p>Color</p>
                          {Object.keys(params).length > 0 &&
                          params.fromScreen !== "Workspace" ? (
                            <label>{ele.color}</label>
                          ) : (
                            <ColorPicker
                              value={ele.color}
                              onChange={(e) =>
                                handleChange(index, e.target.value, "color")
                              }
                              name="color"
                            />
                          )}
                        </Col>
                      </Row>
                    </>
                  </Panel>
                );
              })}
          </Collapse>
        </div>
      </>
    </div>
  );
};

export default Threshold;
