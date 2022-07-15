import React from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";

const VariableCard = ({ id, variableName, deleteVariable, editVariable, fromWorkflowScreen }) => {

	return (
		<Tooltip title={<span>{variableName}</span>} key={id}>
			<div className="var_block_card" key={id}>
				<p>{variableName}</p>
				<div className="var-btn">
					<Button disabled={fromWorkflowScreen} id="edit-btn">
						<EditOutlined
							className="edit"
							onClick={() => editVariable(variableName)}
						/>
					</Button>
					<Button onClick={(e) => deleteVariable(variableName)} disabled={fromWorkflowScreen} id="delete-btn">
						<DeleteOutlined className="delete" />
					</Button>
				</div>
			</div>
		</Tooltip>
	);
};

export default VariableCard;
