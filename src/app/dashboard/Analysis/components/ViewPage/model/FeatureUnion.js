import React from "react";
import { Button, Select } from "antd";
import SelectField from "../../../../../../components/SelectField/SelectField";

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

  return (
    <>
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
        />
        <Button className="custom-primary-btn" onClick={onClickSave}>
          Save changes
        </Button>
      </div>
    </>
  );
};

export default FeatureUnion;
