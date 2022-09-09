import React, { useEffect } from "react";
import { Handle } from "react-flow-renderer";

export default ({ data, selected }) => {
  useEffect(() => {
    if (selected) console.log("I've been selected!");
  }, [selected]);

  const handleClick = (event) => {
    console.log("Button clicked.");
    event.stopPropagation();
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
        <button style={{ padding: "0", fontSize: "8px" }} onClick={handleClick}>
          Select Estimator
        </button>
      </div>
      <Handle type="source" position="right" />
    </div>
  );
};
