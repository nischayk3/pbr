import { Card } from "antd";
import React from "react";
import "./style.scss";

const TargetVariable = ({ }) => {
	return (
		<div className="target-wrapper">
			<Card title="< Target Variable" className="target-card">
				<Card type="inner" title="Inner Card title" >
					Inner Card content
				</Card>
			</Card>
		</div>
	)
}

export default TargetVariable