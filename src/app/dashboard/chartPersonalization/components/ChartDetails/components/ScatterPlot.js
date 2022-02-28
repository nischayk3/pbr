import Plot from 'react-plotly.js';
import React from 'react';

const ScatterPlot = (props) => {
  console.log('scatter plotttt', props);

  const onDotClicked = (data) => {
    let selectedNode = data.points[0].text;
    props.nodeClicked(selectedNode);
  };

  return (
    <Plot
      data={[props.data]}
      layout={props.layout}
      config={{ autosizable: true }}
      onClick={(data, e) => {
        onDotClicked(data);
      }}
    />
  );
};

export default ScatterPlot;
