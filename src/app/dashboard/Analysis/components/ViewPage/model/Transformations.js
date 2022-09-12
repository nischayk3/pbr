import React from "react";
import { Button } from "antd";
import SelectField from "../../../../../../components/SelectField/SelectField";

const Transformation = ({ onCreateClick }) => {
  return (
    <>
      <div className="drawer-head">
        <h3>Transformation - New</h3>
      </div>
      <div className="drawer-details">
        <p>You are applying transformations for L0_S0_0</p>
        <SelectField label="Transformation" />
        <SelectField label="Algorithm" />
        <Button className="custom-primary-btn" onClick={onCreateClick}>
          Create
        </Button>
      </div>
    </>
  );
};

export default Transformation;
