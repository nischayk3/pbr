import React from "react";
import Plot from "react-plotly.js";

const ScatterPlot = (props) => {
	const onDotClicked = (data) => {
		let selectedNode = data.points[0];
		props.nodeClicked(selectedNode);
	};
	return (
		<Plot
			data={props.data}
			layout={props.layout}
			config={{ autosizable: true }}
			onClick={(data, e) => {
				onDotClicked(data);
			}}
		/>
	);
};

export default ScatterPlot;
