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
import { useHistory } from "react-router-dom";
import Banner from '../../../../../assets/images/Popup-Side.svg';
import InputField from '../../../../../components/InputField/InputField';
import SelectField from '../../../../../components/SelectField/SelectField';
import "./eLogbookForm.scss";

function ElogForm() {
	const history = useHistory();
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [formData, setFormData] = useState({
		Tname: '',
		Pname: ''
	});
	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const handleNext = () => {
		// history.push({
		//   pathname: `${match.url}/${apiResponse?.pipeline_disp_id}`,
		//   state: req,
		// });
	}

	const handleBack = () => {
		console.log("Back")
	}

	const data = ["Hour", "Minutes", "Seconds"];

	console.log(formData);
	return (

		<Modal
			className="landing-modal"
			title="Basic details - New template [Draft]"
			visible={true}
			onCancel={handleCancel}
			centered
			footer={[
				<Row>
					<Col span={4} offset={16} >
						<Button
							className="custom-primary-btn "
							type="primary"
							onClick={() => handleBack()}
						>
							Back
						</Button>
					</Col>
					<Col span={4} style={{ textAlign: "end" }}>
						<Button
							className="custom-secondary-btn"
							type="primary"
							onClick={() => handleNext()}
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
					<form>
						<div>
							<InputField
								label="Template name"
								type="text"
								name="Tname"
								placeholder="Enter name of new template"
								value={formData.Tname}
								onChangeInput={(e) => setFormData({ ...formData, Tname: e.target.value })}
							/>
						</div>
						<br />
						<div>
							<SelectField
								label="What product is this template for?"
								placeholder="Select product"
								name="Pname"
								selectList={data}
								selectedValue={formData.Pname}
								onChangeSelect={(e) =>
									setFormData({ ...formData, Pname: e })
								}
								style={{ width: "100%", margin: "0px" }}
							/>
						</div>
					</form>
				</Col>

			</Row>
		</Modal>

	)
}


export default ElogForm
