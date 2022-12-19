import React, { useEffect } from "react";
import { Handle } from "react-flow-renderer";

export default (props) => {
	const {
		data,
		selected,
		transformationFinal,
		setTransformationsFinal,
		addEstimator,
		setImputerType,
		setSelectedImputeValue,
		saveTransformationValues,
	} = props;

	const handleClick = (event) => {
		event.stopPropagation();
		setImputerType(
			saveTransformationValues.imputerType
				? saveTransformationValues.imputerType
				: data?.Destination_Parameter?.Module
		);
		setTransformationsFinal(
			saveTransformationValues.transformationFinal
				? saveTransformationValues.transformationFinal
				: data?.Destination_Parameter.submodule
		);
		setSelectedImputeValue(data?.Node);
		addEstimator("transform");
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
					{saveTransformationValues.transformationFinal ||
						data?.Destination_Parameter?.submodule}
				</button>
			</div>
			<Handle type="source" position="right" />
		</div>
	);
};
