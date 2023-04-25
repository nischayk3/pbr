import { DeleteOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import React from "react";

const VariableCard = ({ id, variableName, deleteVariable, editVariable, fromWorkflowScreen }) => {

	return (
		<Tooltip title={<span>{variableName}</span>} key={id}>
			<div className="var_block_card" key={id}>
				<p>{variableName}</p>
				<Button onClick={(e) => deleteVariable(variableName)} disabled={fromWorkflowScreen} id="delete-btn">
					<DeleteOutlined className="delete" />
				</Button>
			</div>
		</Tooltip>
	);
};

export default VariableCard;
