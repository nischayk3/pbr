import React from "react";
import "./viewPage.scss";

const ModelData = ({ modelData }) => {
  return <iframe srcdoc={modelData}></iframe>;
};

export default ModelData;
