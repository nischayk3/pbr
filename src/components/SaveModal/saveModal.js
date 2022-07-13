import React from 'react';
import { Modal } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import './styles.scss';

function SaveModal(props) {
	const { isSave, setIsSave, id, load, setIsSaved } = props
	const handleCancel = () => {
		setIsSave(false);
		setIsSaved(true)
	};

	return (
		<div className='report-gen-save'>
			<Modal
				style={{ top: -100 }}
				visible={isSave}
				width={500}
				mask={true}
				onCancel={handleCancel}
				centered={true}
				footer={null}
			>
				<div>
					<center>
						<CheckCircleOutlined
							className='circleIcon'
							style={{ color: 'green', fontSize: '40px' }}
						/> <br />
						{id ? <b style={{ marginTop: '10px' }}>Report ID :{id}</b> : <></>}
						<br />
						<p style={{ marginTop: '7px' }}>{!load ? "New report is created successfully" : "Report updated successfully"}</p>
					</center>
				</div>

			</Modal>
		</div>
	);
}

export default SaveModal;
