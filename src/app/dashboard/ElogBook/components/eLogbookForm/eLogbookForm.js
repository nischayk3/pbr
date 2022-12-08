/**
 * @author Siddesh
 * @Last Modified - 15-11-2022
 * @Last Changed By - Siddesh
 */
import {
	Button, Modal
} from 'antd';
import React, { useState, useEffect } from 'react';
import { useHistory, useRouteMatch } from "react-router-dom";
import Banner from '../../../../../assets/images/Popup-Side.svg';
import InputField from '../../../../../components/InputField/InputField';
import SelectFields from '../../../../../components/SelectField/SelectField';
import "./eLogbookForm.scss";

function ElogForm({ isTemplateModal }) {
	
	const history = useHistory();
	const match = useRouteMatch();

	const [isModalVisible, setIsModalVisible] = useState(isTemplateModal);

	const [formData, setFormData] = useState({
		Tname: '',
		Pname: ''
	});

	useEffect(() => {
		setIsModalVisible(isTemplateModal)
	},[isTemplateModal])

	
	const handleCancel = () => {
		setIsModalVisible(false);
	};
	console.log(isTemplateModal, isModalVisible);
	const handleNext = () => {
		history.push({
			pathname: `${match.url}/new-template`,
		});
	}

	const handleBack = () => {
		setIsModalVisible(false);
	}

	const data = ["Hour", "Minutes", "Seconds"];


	return (

		<Modal
			className="landing-modal"
			title="Basic details - New template [Draft]"
			visible={isModalVisible}
			onCancel={handleCancel}
			width={787}
			centered
			footer={[
				<div className="footer-btn">
					<Button
						className="custom-primary-btn "
						type="primary"
						onClick={() => handleBack()}
					>
						Back
					</Button>
					<Button
						className="custom-secondary-btn"
						type="primary"
						onClick={() => handleNext()}
					>
						Lets Go!
					</Button>
				</div>
			]}
		>
			<div className="modal-wrapper">
				<div className="modal-left">
					<img src={Banner} style={{ paddingTop: "22px" }} alt="Ebookpng" />
				</div>

				<div className="modal-right">
					<InputField
						label="Template name"
						type="text"
						name="Tname"
						placeholder="Enter name of new template"
						value={formData.Tname}
						onChangeInput={(e) => setFormData({ ...formData, Tname: e.target.value })}
					/>

					<SelectFields
						label="What product are you creating this template for?"
						placeholder="Select product"
						name="Pname"
						selectList={data}
						// selectedValue={formData.Pname}
						onChangeSelect={(e) =>
							setFormData({ ...formData, Pname: e })
						}
						// style={{ width: "100%", margin: "0px" }}
						className="model-select"
					/>
				</div>
			</div>
		</Modal >

	)
}


export default ElogForm
