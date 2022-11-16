/**
 * @author Siddesh
 * @Last Modified - 15-11-2022
 * @Last Changed By - Siddesh
 */
import {
	Button, Col, Modal,
	Row
} from 'antd';
import React, { useState } from 'react';
import Banner from '../../../../../assets/images/Popup-Side.svg';
import InputField from '../../../../../components/InputField/InputField';
import SelectField from '../../../../../components/SelectField/SelectField';
import "./eLogbookForm.scss";

function ElogForm(props) {

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [hierarchyName, setHierarchyName] = useState('')
	const handleCancel = () => {
		setIsModalVisible(false);
	};

	return (

		<Modal
			className="landing-modal"
			title="Basic details - New template [Draft]"
			visible={false}
			onCancel={handleCancel}
			centered
			footer={[
				<Row>
					<Col span={4} offset={16} >
						<Button
							className="custom-primary-btn "
							type="primary"
						// onClick={() =>  handleBack()}
						>
							Back
						</Button>
					</Col>
					<Col span={4} style={{ textAlign: "end" }}>
						<Button
							className="custom-secondary-btn"
							type="primary"
						// onClick={() =>  handleNext()}
						>
							Lets Go!
						</Button>
					</Col>
				</Row>
			]}
		>
			<Row>
				<Col span={12}>
					<img src={Banner} style={{ paddingTop: "22px" }} alt="Ebookpng" />
				</Col>
				<Col span={12}>
					<div>
						<InputField
							label="Template name"
							type="text"
							name="Tname"
							placeholder="Enter name of new template"
						//  value={props.value}
						// onChange={handleChange}
						/>
					</div>
					<br />
					<div>
						<SelectField
							label="What product is this template for?"
							placeholder="Select product"
							name="Pname"
							// value={props.selectedValue}
							// onChange={handleChange}
							style={{ width: "100%", margin: "0px" }}
						/>
					</div>
				</Col>

			</Row>
		</Modal>

	)
}


export default ElogForm
