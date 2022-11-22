import React, { useEffect } from "react";
import { Handle } from "react-flow-renderer";

export default ({
  data,
  selected,
  addEstimator,
  encoderData,
  setEncoderData
}) => {


  const handleClick = (event) => {
    setEncoderData({ ...encoderData, encoderId: data.id, encoderValue : data?.Destination_Parameter?.submodule})
    addEstimator("encoder");
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
            padding: "2px 10px",
            cursor: "pointer",
          }}
          onClick={handleClick}
        >
          {data?.Destination_Parameter?.submodule}
        </button>
      </div>
      <Handle type="source" position="right" />
    </div>
  );
};
