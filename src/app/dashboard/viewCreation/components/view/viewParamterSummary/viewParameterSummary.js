/**
 * @author Dinesh
 * @Mareana - CPV Product
 * @version  2
 * @Last Modified - 20 April, 2023
 * @Last Changed By - Dinesh
 */

import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Empty, Modal } from "antd";
import React, { useState } from "react";
import CustomButton from "../../../../../../components/CustomButton/CustomButton";
import InputField from "../../../../../../components/InputField/InputField";
import LabelTag from "../../../../../../components/LabelTag";
import ParameterTable from "./parameterTable/parameterTable";
import "./viewParameterSummary.scss";

const ViewParamterSummary = () => {
	const [cardTitle, setCardTitle] = useState("Create Variable");
	const [variableName, setVariableName] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);

	const addVariableName = () => {
		console.log("clicked");
		setVariableName("");
		setIsModalOpen(!isModalOpen);
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
					<CustomButton className="add-var_block add-var_block_bg" icon={<PlusOutlined />} type="dashed" onClick={addVariableName} >Create variable</CustomButton>
					<CustomButton className="custom__btn--dashed" icon={<PlusOutlined />} type="dashed" >Create function</CustomButton>
				</div>
				<ParameterTable />

			</Card>
			<Modal
				visible={isModalOpen}
				width={400}
				title="Create Variable"
				footer={null}
				onCancel={addVariableName}
			// handleCancel={addVariableName}
			// closable={false}
			>
				<div className="variable__input--block">
					<InputField
						label="Variable name"
						placeholder="Enter Variable name"
						value={variableName}
						onChangeInput={(e) => setVariableName(e.target.value)}
					/>
				</div>
				<div className="variable__input--button">
					<Button className='custom-primary-btn'>Cancel</Button>
					<Button className="custom-secondary-btn" >
						Create
					</Button>
				</div>
			</Modal>
		</div >
	)
}

export default ViewParamterSummary;