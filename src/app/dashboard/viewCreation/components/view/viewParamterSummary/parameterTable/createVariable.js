import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";

const CreateVariable = ({ addVariable, title, createVar, className, fromWorkflowScreen }) => {
	return (
		<div className={className} style={{ pointerEvents: fromWorkflowScreen ? "none" : "auto" }}>
			{
				title === "Create Variable" && (
					<div onClick={addVariable} >
						<PlusOutlined />
						<p id="create-variable">Create Variable</p>
					</div>
				)
			}
			{
				title === "Select parameters" && (
					<>
						<PlusOutlined />
						<p id="select-parameters">Select parameters</p>
					</>
				)
			}
			{
				title === "Done" && (
					<Button
						id="done"
						type="text"
						onClick={createVar}
						className="custom-primary-btn "
					>
						Done
					</Button>
				)
			}
		</div >
	);
};

export default CreateVariable;
