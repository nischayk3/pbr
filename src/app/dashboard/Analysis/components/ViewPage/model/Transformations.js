import React from "react";
import { Button } from "antd";
import SelectField from "../../../../../../components/SelectField/SelectField";

const Transformation = ({
  onCreateClick,
  imputerList,
  imputerTypeList,
  imputerType,
  setImputerType,
  transformationFinal,
  setTransformationsFinal,
  selectedImputeValue,
  saveTransformationValues,
  setSaveTransformationValues,
  finalModelJson,
  setFinalModelJson,
}) => {
  const onClick = () => {
    setSaveTransformationValues({
      ...saveTransformationValues,
      imputerType: imputerType,
      transformationFinal: transformationFinal,
    });
    const tempObj = JSON.parse(JSON.stringify(finalModelJson));
    Object.entries(tempObj.feature_union_mapping).forEach(([key, value]) => {
      if (value.type === "Imputer") {
        value.transformation = `t_${transformationFinal.toLowerCase()}`;
      }
    });
    setFinalModelJson({
      ...finalModelJson,
      feature_union_mapping: tempObj.feature_union_mapping,
    });
    onCreateClick();
  };

  return (
    <>
      <div className="drawer-head">
        <h3>Transformation - New</h3>
      </div>
      <div className="drawer-details">
        <p>{`You are applying transformations for ${selectedImputeValue}`}</p>
        <SelectField
          label="Transformation"
          selectList={imputerTypeList}
          selectedValue={imputerType}
          onChangeSelect={(e) => setImputerType(e)}
        />
        <SelectField
          label="Algorithm"
          selectList={imputerList}
          selectedValue={transformationFinal}
          onChangeSelect={(e) => setTransformationsFinal(e)}
        />
        <Button className="custom-primary-btn" onClick={onClick}>
          Save
        </Button>
      </div>
    </>
  );
};

export default Transformation;
