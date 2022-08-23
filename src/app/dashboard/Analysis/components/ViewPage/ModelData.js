import React from "react";

const ModelData = ({ modelData }) => {
  return <div dangerouslySetInnerHTML={{ __html: modelData }} />;
};

export default ModelData;
