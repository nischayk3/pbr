import React from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";

const VariableCard = (props) => {

	return (
		<Tooltip title={<span>{props.variableName}</span>} key={props.id}>
			<div className="var_block_card" key={props.id}>
				<p>{props.variableName}</p>
				<div className="var-btn">
					<Button>
						<EditOutlined
							className="edit"
							onClick={() => props.editVariable(props.variableName)}
						/>
					</Button>
					<Button onClick={(e) => props.deleteVariable(props.variableName)}>
						<DeleteOutlined className="delete" />
					</Button>
				</div>
			</div>
		</Tooltip>
	);
};

export default VariableCard;
