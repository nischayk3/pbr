import Plot from 'react-plotly.js';
import React from 'react';

const ScatterPlot = (props) => {
  console.log('scatter plotttt', props);
  return (
    <Plot
      data={[props.data]}
      layout={props.layout}
      config={{ autosizable: true }}
    />
  );
};

export default ScatterPlot;
