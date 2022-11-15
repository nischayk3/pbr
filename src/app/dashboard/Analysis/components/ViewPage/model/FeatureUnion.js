import React, { useState, useCallback, useEffect } from "react";
import { Button, Select } from "antd";
import SelectField from "../../../../../../components/SelectField/SelectField";
import urlJson from './urls.json'
import './context.scss'

const { Option } = Select;

const FeatureUnion = ({
  onCreateClick,
  scalerList,
  scalerListSelected,
  setScalerAlgoValue,
  scalerAlgoValue,
  setSaveScalerAlgoValue,
  setScalerListSelected,
  scalerNodeList,
  finalModelJson,
  setFinalModelJson,
}) => {

  const [contextMenuVisible, setContextMenuVisible] = useState(false)
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const [url, setUrl] = useState('')
  const [algorithm, setAlgorithm] = useState('')

  const onClickSave = () => {
    const tempObj = JSON.parse(JSON.stringify(finalModelJson));
    let variableList = [];
    tempObj?.variable_mapping.forEach((sca) => {
      scalerListSelected.forEach((ele) => {
        if (sca.variable_name === ele) {
          variableList.push(sca.variable_id)
        }
      })
    })
    Object.entries(tempObj.feature_union_mapping).forEach(([key, value]) => {
      if (value.type === "Scaler") {
        value.transformation = `t_${scalerAlgoValue.toLowerCase()}`;
        value.variable_list = variableList
      }
    });
    setFinalModelJson({
      ...finalModelJson,
      feature_union_mapping: tempObj.feature_union_mapping,
    });
    setSaveScalerAlgoValue(scalerAlgoValue);
    onCreateClick();
  };


  const handleChange = (value) => {
    setScalerListSelected(value);
  };

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
    <div>
      {
        contextMenuVisible ? <div className="context-menu" style={style} >
          <span onClick={() => window.open(url)}><center>About {algorithm}</center></span>
        </div> : <></>
      }
      <div className="drawer-head">
        <h3>Feature union - New</h3>
      </div>
      <div className="drawer-details">
        <p>Parameters in this feature union</p>
        <Select
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          placeholder="Please select"
          value={scalerListSelected}
          onChange={handleChange}
        >
          {scalerNodeList &&
              scalerNodeList.map((ele) => {
                return <Option key={ele}>{ele}</Option>;
              })}
        </Select>
        <SelectField
          label="Algorithm"
          selectList={scalerList}
          selectedValue={scalerAlgoValue}
          onChangeSelect={(e) => setScalerAlgoValue(e)}
          menu={true}
          handleClick={(e) => handleClick(e)}
        />
        <Button className="custom-primary-btn" onClick={onClickSave}>
          Save changes
        </Button>
      </div>
    </div>
  );
};

export default FeatureUnion;
