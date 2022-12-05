import React, { useEffect } from "react";
import { Handle } from "react-flow-renderer";
/* istanbul ignore next */
export default ({
	data,
	selected,
	addEstimator,
	scalerAlgoValue,
	saveScalerAlgoValue,
	setScalerAlgoValue,
}) => {
	useEffect(() => {
		if (selected) console.log("I've been selected!");
	}, [selected]);

	const handleClick = (event) => {
		event.stopPropagation();
		setScalerAlgoValue(
			saveScalerAlgoValue
				? saveScalerAlgoValue
				: data?.Destination_Parameter?.submodule
		);
		addEstimator("featureUnion");
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
					{saveScalerAlgoValue || data?.Destination_Parameter?.submodule}
				</button>
			</div>
			<Handle type="source" position="right" />
		</div>
	);
};
