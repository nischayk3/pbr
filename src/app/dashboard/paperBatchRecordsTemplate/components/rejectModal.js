import {
	ExclamationCircleOutlined
} from '@ant-design/icons';
import { Button, Col, Input, Modal, Row } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	hideLoader,
	showLoader,
	showNotification
} from '../../../../duck/actions/commonActions';
import {
	workflowTemplateReject
} from '../../../../services/pbrService';
import './styles.scss';
const { TextArea } = Input;
/* istanbul ignore next */
const App = (props) => {
	const dispatch = useDispatch();
	let { isModalOpen, setIsModalOpen, params, pageNumber, templateVersion } = props
	const [value, setValue] = useState('');
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		setIsModalOpen(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};
	const handleReject = async () => {
		try {
			dispatch(showLoader());
			let login_response = JSON.parse(sessionStorage.getItem('login_details'))
			let req = {
				message: value,
				page: pageNumber,
				status: "RJCT",
				template_id: params.temp_disp_id,
				template_version: templateVersion,
				user_id: `${login_response?.firstname} ${login_response?.lastname}`
			}
			let res = await workflowTemplateReject(req)
			if (res.Status == 202) {
				setIsModalOpen(false)
				dispatch(hideLoader());
				setValue("")
				dispatch(showNotification('success', res?.Message));
			}

		} catch (err) {
			console.log("err", err)
		}
	}
	return (
		<>
			<Modal centered={true} className='rejectModal' width={400} title={null} visible={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
				<Row>
					<Col span={2}>
						<ExclamationCircleOutlined style={{ fontSize: 24, color: "orange" }} />
					</Col>
					<Col span={20} style={{ marginLeft: 20 }}>

						<p style={{ fontSize: 16 }}>Cause of Rejection</p>
						<p style={{ fontSize: 14 }}>Please let us know why are you rejecting this page</p>
						<TextArea style={{ width: 400, height: 32 }} value={value} placeholder="Enter Comment" autoSize
							onChange={(e) => setValue(e.target.value)} />
						<Button style={{ marginTop: 20, float: 'right' }} className='custom-secondary-btn'
							onClick={() => {
								handleReject()
							}}
						>Submit</Button>
					</Col>
				</Row>

			</Modal>
		</>
	);
};
export default App;