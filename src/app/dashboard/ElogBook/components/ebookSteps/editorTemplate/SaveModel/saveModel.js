import { Button, Input, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateformtemplate } from "../../../../../../../../src/services/eLogBookService";
import {
	hideLoader, showLoader, showNotification
} from "../../../../../../../duck/actions/commonActions";
import './saveModel.scss';

function SaveModel({ saveModel, layout }) {
	const [isModalOpen, setIsModalOpen] = useState(saveModel);
	const [templateName, setTemplateName] = useState({ formName: '' });
	const dispatch = useDispatch();

	const updatetemplateformdata = async (data) => {
		dispatch(showLoader());
		try {
			const templateDataupdate = await updateformtemplate(data);
			dispatch(hideLoader());
			if (templateDataupdate?.Status === 200) {
				setIsModalOpen(false);
				dispatch(showNotification('success', "updated succesfully"));
			} else {
				dispatch(showNotification('error', "Error"));
			}
		} catch (error) {
			dispatch(hideLoader());
			dispatch(showNotification('error', error));
		}
	}

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	useEffect(() => {
		setIsModalOpen(saveModel)
	}, [saveModel])

	const handleSave = () => {

		showLoader();
		let req = {

			"form_name": templateName.formName,
			"layout": {
				"forms": layout
			},
			"username": localStorage.getItem("user"),
			"version": 1

		}
		updatetemplateformdata(req);
	}

	return (
		<Modal
			className="save-modal"
			title="Save Template"
			visible={isModalOpen}
			onCancel={handleCancel}
			width={500}
			centered
			footer={null}
			style={{ height: 'calc(100vh - 200px)' }}
			bodyStyle={{ overflowY: 'scroll' }}
		>
			<div>
				<form className='modelsaveform' >
					<div className='modelsavefields'>
						<div className='labeldiv'>
							<label className='textlabels'>Enter template name</label>
						</div>
						<Input type="text" name="textlabel" value={templateName.formName} onChange={(e) => setTemplateName({ ...templateName, formName: e.target.value })} />
					</div>
					<Button className='textlabels' onClick={handleSave}>Save Form</Button>
				</form>
			</div>
		</Modal >

	)
}

export default SaveModel
