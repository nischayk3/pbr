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
        <button
          style={{
            fontSize: "8px",
            background: "#fff",
            border: "0.5px solid grey",
            borderRadius: "4px",
          }}
          onClick={handleClick}
        >
          Select Estimator
        </button>
      </div>
      <Handle type="source" position="right" />
    </div>
  );
};
