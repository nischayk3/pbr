/**
 * @author Dinesh
 * @Mareana - CPV Product
 * @version  2
 * @Last Modified - 11 April, 2023
 * @Last Changed By - Dinesh
 */

import { Card } from "antd";
import React from "react";
import "./variable.scss";
import VariableCard from "./variableCard";

const Variable = ({ viewDataJson, setViewDataJson }) => {
	const jsonData = { ...viewDataJson }
	const obj = jsonData && jsonData?.data[0]?.variables
	const variableObj = Object.entries(obj);

	return (
		<div className="variable__card--wrapper">
			<Card
				title='Variable'
				className='custom__card'
			>
				<div className="variable__card--block">
					{variableObj && (
						variableObj.map(([key, value]) => {
							return (
								<VariableCard
									// id={index}
									// item={item}
									variableName={key}
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