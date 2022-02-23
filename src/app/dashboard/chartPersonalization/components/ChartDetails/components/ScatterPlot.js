import React from 'react';
import Plot from 'react-plotly.js';

const ScatterPlot = (props) => {
  return <Plot data={[props.data]} layout={props.layout} />;
};

export default ScatterPlot;
