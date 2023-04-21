/**
 * @author Dinesh
 * @Mareana - CPV Product
 * @version  2
 * @Last Modified - 11 April, 2023
 * @Last Changed By - Dinesh
 */

import { Card } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import "./variable.scss";
import VariableCard from "./variableCard";

const Variable = () => {
	const dispatch = useDispatch();

	const varData = [
		{ id: "1", variableName: "Variable 1" },
		{ id: "2", variableName: "Variable 2" },
		{ id: "3", variableName: "Variable 3" },
		{ id: "4", variableName: "Variable 4" },
		{ id: "5", variableName: "Variable 5" },
	]
	return (
		<div className="variable__card--wrapper">
			<Card
				title='Variable'
				className='custom__card'
			>
				<div className="variable__card--block">
					{varData && (
						varData.map((item, index) => {
							return (
								<VariableCard
									id={item.id}
									// item={item}
									variableName={item.variableName}
								// deleteVariable={deleteVariable}
								// editVariable={editVariable}
								// fromWorkflowScreen={fromWorkflowScreen}
								/>
							);
						})
					)}
				</div>
			</Card>
		</div >
	)
}

export default Variable;