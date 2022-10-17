import React, { useEffect } from "react";
import { Handle } from "react-flow-renderer";

export default ({
  data,
  selected,
  addEstimator,
  setEstimatorPopupDataValues,
  estimatorPopupDataValues,
  savedEstimatorPopupDataValues,
}) => {
  useEffect(() => {
    if (selected) console.log("I've been selected!");
  }, [selected]);

  const handleClick = (event) => {
    event.stopPropagation();
    console.log(data, "dataest");
    setEstimatorPopupDataValues({
      ...estimatorPopupDataValues,
      typeListValue: savedEstimatorPopupDataValues.typeListValue
        ? savedEstimatorPopupDataValues.typeListValue
        : data?.Destination_Parameter?.type,
      regressionListvalue: savedEstimatorPopupDataValues.regressionListvalue
        ? savedEstimatorPopupDataValues.regressionListvalue
        : data?.Destination_Parameter?.Module,
      algoValue: savedEstimatorPopupDataValues.algoValue
        ? savedEstimatorPopupDataValues.algoValue
        : data?.Destination_Parameter?.submodule,
    });
    addEstimator("estimator");
  };

  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <Handle type="target" position="left" />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <button
          style={{
            fontSize: "8px",
            background: "#fff",
            border: "0.5px solid grey",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={handleClick}
        >
          {savedEstimatorPopupDataValues.algoValue ||
            data?.Destination_Parameter?.submodule}
        </button>
      </div>
      <Handle type="source" position="right" />
    </div>
  );
};
