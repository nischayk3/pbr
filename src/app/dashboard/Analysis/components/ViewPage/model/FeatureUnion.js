import React from "react";
import { Button } from "antd";
import SelectField from "../../../../../../components/SelectField/SelectField";

const FeatureUnion = ({ onCreateClick }) => {
  return (
    <>
      <div className="drawer-head">
        <h3>Feature union - New</h3>
      </div>
      <div className="drawer-details">
        <SelectField label="Parameters in this feature union" />
        <SelectField label="Algorithm" />
        <Button className="custom-primary-btn" onClick={onCreateClick}>
          Save changes
        </Button>
      </div>
    </>
  );
};

export default FeatureUnion;
