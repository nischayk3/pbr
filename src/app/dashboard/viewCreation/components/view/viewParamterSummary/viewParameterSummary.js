/**
 * @author Dinesh
 * @Mareana - CPV Product
 * @version  2
 * @Last Modified - 20 April, 2023
 * @Last Changed By - Dinesh
 */

import { PlusOutlined } from '@ant-design/icons';
import { Card, Empty } from "antd";
import React, { useState } from "react";
import CustomButton from "../../../../../../components/CustomButton/CustomButton";
import LabelTag from "../../../../../../components/LabelTag";
import ParameterTable from "./parameterTable/parameterTable";
import "./viewParameterSummary.scss";

const ViewParamterSummary = () => {
	const [cardTitle, setCardTitle] = useState("Create Variable");
	const [createNameModal, setCreateNameModal] = useState(false);

	const addVariable = () => {
		setCardTitle("Select parameters");
		setRowDisable(true);
		setIscheckBox(true);
	};

	const addVariableName = () => {
		setVariableName("");
		setCreateNameModal(!createNameModal);
	};

	return (
		<div className="view-summary__center">
			<Card title='View Summary' className='custom__card '>
				<div className="view-summary_lable"  >
					<LabelTag lableName="View Id" lableValue="" />
					<LabelTag lableName="View Name" lableValue="" />
					<LabelTag lableName="Status" lableValue="" />
					<LabelTag lableName="Version" lableValue="" />
				</div>
				<Empty className="empty--layout" description="You will see the created fucntions here" imageStyle={{
					height: 120,
				}} image={Empty.PRESENTED_IMAGE_SIMPLE} />
			</Card>
			<Card title='Parameter' className='custom__card'>
				<div className="variable-wrapper">
					<CustomButton className="add-var_block add-var_block_bg" icon={<PlusOutlined />} type="dashed" >Create variable</CustomButton>
					<CustomButton className="custom__btn--dashed" icon={<PlusOutlined />} type="dashed" >Create function</CustomButton>


					{/* {varData && (
							varData.map((item, index) => {
								return (
									<VariableCard
										id={item.id}
										// item={item}
										variableName={item.variableName}
										deleteVariable={deleteVariable}
										editVariable={editVariable}
										fromWorkflowScreen={fromWorkflowScreen}
									/>
								);
							})
						)} */}

				</div>
				<ParameterTable />
			</Card>
		</div>
	)
}

export default ViewParamterSummary;