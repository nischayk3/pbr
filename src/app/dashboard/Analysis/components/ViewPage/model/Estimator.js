import React, { useEffect, useState, useCallback } from "react";
import { Row, Col, Checkbox, Button, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import SelectField from "../../../../../../components/SelectField/SelectField";
import urlJson from './urls.json'


const { Option } = Select;
const Estimator = (props) => {
  const {
    estimatorPopupData,
    setEstimatorPopupDataValues,
    estimatorPopupDataValues,
    onCreateClick,
    savedEstimatorPopupDataValues,
    setSavedEstimatorPopupDataValues,
    finalModelJson,
    setFinalModelJson,
    target_category
  } = props;


  const [contextMenuVisible, setContextMenuVisible] = useState(false)
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const [url, setUrl] = useState('')
  const [algorithm, setAlgorithm] = useState('')
  const [algosListData, setAlgosListData] = useState([]);
  const [metricListData, setMetricListData] = useState([]);

  const onClickSave = () => {
    const tempObj = JSON.parse(JSON.stringify(finalModelJson));
    Object.entries(tempObj.estimator).forEach(([key, value]) => {
      value.estimator_type = estimatorPopupDataValues.typeListValue
      value.model_name = `e_${estimatorPopupDataValues.algoValue.toLowerCase()}`;
    });
    const metricsTemp = {
      metric_name: estimatorPopupDataValues.regressionListvalue
    }
    setFinalModelJson({ ...finalModelJson, estimator: tempObj.estimator, metrics: metricsTemp });
    setSavedEstimatorPopupDataValues({
      ...savedEstimatorPopupDataValues,
      typeListValue: estimatorPopupDataValues.typeListValue,
      regressionListvalue: estimatorPopupDataValues.regressionListvalue,
      algoValue: estimatorPopupDataValues.algoValue,
    });
    onCreateClick();
  };

  const onTypeChange = (e) => {
    setEstimatorPopupDataValues({
      ...estimatorPopupDataValues,
      typeListValue: e,
      algoValue: '',
      regressionListvalue: ''
    })
  }
  const getAlgoList = (e) => {
    const tempList = JSON.parse(JSON.stringify(estimatorPopupData?.algoList));
    tempList.forEach((ele) => {
      if (ele.estimator_type === e) {
        ele.disabled = false;
      } else {
        ele.disabled = true;
      }
    })
    setAlgosListData(tempList)
  }

  const getMetricList = (e) => {
    let resArr = [];
    estimatorPopupData?.regressionList.filter(function (item) {
      let i = resArr.findIndex((x) => x.display_name === item.display_name);
      if (i === -1) {
        resArr.push(item);
      }
      return null;
    });
    let target = '';
    if (target_category === "numerical") {
      target = 'regression';
    } else {
      target = 'classification';
    }
    resArr.forEach((ele) => {
      if (ele.type === e || (ele.type === 'regression' && e === 'cross_decomposition') || (e === 'decomposition' && ele.type === target)) {
        ele.disabled = false;
      } else {
        ele.disabled = true;
      }
    })
    setMetricListData(resArr)
  }

  useEffect(() => {
    getAlgoList(estimatorPopupDataValues.typeListValue)
    getMetricList(estimatorPopupDataValues.typeListValue)
  }, [estimatorPopupDataValues.typeListValue])

  const handleClose = useCallback(() => (contextMenuVisible ? setContextMenuVisible(false) : null), [contextMenuVisible]);

  useEffect(() => {
    document.addEventListener("click", handleClose);
    return () => {
      document.removeEventListener("click", handleClose);
    };
  });


  const handleClick = (event) => {
    event.preventDefault();
    setX(event.pageX)
    setY(event.pageY)
    setAlgorithm(event.target.innerText)
    setUrl(urlJson[event.target.innerText])
    setContextMenuVisible(true)
  };

  const style = {
    top: y + 10,
    left: x + 10,
  }

  return (
    <>
      {
        contextMenuVisible ? <div className="context-menu" style={style} >
          <span onClick={() => window.open(url)}><center>About {algorithm}</center></span>
        </div> : <></>
      }
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
            onTypeChange(e)
          }
        />
        <p style={{ marginBottom: '0px' }}>Algorithms</p>
        <Select value={estimatorPopupDataValues.algoValue} disabled={!estimatorPopupDataValues.typeListValue} onChange={(e) => {
          setEstimatorPopupDataValues({
            ...estimatorPopupDataValues,
            algoValue: e,
          })
        }} style={{ width: "100%" }}>
          {algosListData?.length && algosListData?.map((ele) => {
            return <Option value={ele.submodule} disabled={ele.disabled} onContextMenu={handleClick}>{ele.display_name}</Option>
          })}
        </Select>
        <Row gutter={24} className="metrics">
          <Col span={11}>
            <p style={{ marginBottom: '0px' }}>Metrics</p>
            <Select value={estimatorPopupDataValues.regressionListvalue} onContextMenu={handleClick} disabled={!estimatorPopupDataValues.algoValue} onChange={(e) => {
              setEstimatorPopupDataValues({
                ...estimatorPopupDataValues,
                regressionListvalue: e,
              })
            }} style={{ width: "100%" }}>
              {metricListData.length && metricListData.map((ele) => {
                return <Option value={ele.metric_name} disabled={ele.disabled}>{ele.display_name}</Option>
              })}
            </Select>
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
