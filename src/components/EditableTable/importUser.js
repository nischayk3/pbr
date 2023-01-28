import { DownloadOutlined, FileExcelFilled, UploadOutlined } from "@ant-design/icons";
import { Alert, Button, Modal, Progress, Upload } from "antd";
import React, { useState } from 'react';
import exelPng from '../../assets/exelPng.png';
import VectorError from '../../assets/VectorError.png';
import VectorSuccess from '../../assets/VectorSuccess.png';
import { uploadUsers } from '../../services/userRolesAndAccessService';
import Esign from './eSign';
import './importUser.scss';

function ImportUser(prop) {
	let { openUserModal, handleUserCancle } = prop
	const [fileList, setFileList] = useState([]);
	const [showProgress, setShowProgress] = useState(false);
	const [progressPercent, setProgressPercent] = useState(30);
	const [showStatus, setShowStatus] = useState(false);
	const [showErrorStatus, setShowErrorStatus] = useState(false);
	const [showEsign, setShowEsign] = useState(false);
	const [userType, setUserType] = useState('');
	const [fileID, setFileID] = useState('');

	const handleInternalChange = async (info) => {
		setShowProgress(true)
		setFileList(info.fileList)
		setProgressPercent(80)
		setUserType('system_user')
		var formData = new FormData();
		formData.append('file_name', info?.fileList[0]?.originFileObj);
		formData.append('flag', 'system_user');
		let res = await uploadUsers(formData)
		if (res.statuscode === 200) {
			setProgressPercent(100)
			setShowStatus(true)
			setFileID(res?.file_id)
		} else {
			setShowErrorStatus(true)
		}
	}

	const handleExternalChange = async (info) => {
		setShowProgress(true)
		setFileList(info.fileList)
		setProgressPercent(80)
		setUserType('ext_user')
		var formData = new FormData();
		formData.append('file_name', info?.fileList[0]?.originFileObj);
		formData.append('flag', 'ext_user');
		let res = await uploadUsers(formData)
		console.log("first", res)
		if (res.statuscode === 200) {
			setProgressPercent(100)
			setShowStatus(true)
			setFileID(res?.file_id)
		} else {
			setProgressPercent(100)
			setShowStatus(true)
			// setFileID(res?.file_id)
			// setShowErrorStatus(true)
		}
	}

	const handleCancel = () => {
		handleUserCancle()
		setShowProgress(false)
		setFileList([])
		setShowStatus(false)
		setShowErrorStatus(false)
		setUserType('')
		setFileID('')
	}

	const handleEsignCancle = () => {
		setShowEsign(false)
	}

	return (
		<div>
			<Modal className='userModal' title={<div><FileExcelFilled style={{ marginRight: 5 }} />Import Users</div>}
				footer={null}
				visible={openUserModal}
				onCancel={() => handleCancel()}
				width={964}
				style={{ height: 400 }}
			>
				<div style={{ display: showProgress ? "none" : "" }}>
					<div><h3>Download Template to import user</h3></div>
					<div className='mainDiv'>
						<div className='internalUser'>
							<p className='pstyle'>Internal Users</p>
							<p style={{ margin: 0 }} >
								Import users within your organization.
							</p>
							<p>
								Download the template below,fill details and upload it back.
							</p>
							<div style={{ marginTop: 25 }}>
								<Button
									// type="dashed"
									className='custom-secondary-btn'
									icon={<DownloadOutlined className='iconSize' />}
									style={{ marginBottom: 16, marginRight: 10, width: 187 }}
									id="editable-table-button-add-new-user"
								>
									<a
										href={require('../../assets/xlsx/UserCreation.xlsx')}
										style={{ color: "white", marginLeft: 5 }}
										download='UserCreation.xlsx'>
										Download
									</a>
								</Button>
								<Upload
									name="file"
									fileList={fileList}
									accept=".xls, .xlsx"
									beforeUpload={() => false}
									onChange={handleInternalChange} >
									<Button
										// type="dashed"
										className='custom-primary-btn'
										icon={<UploadOutlined className='iconSize' />}
										style={{ marginBottom: 16, width: 187 }}
										id="editable-table-button-add-new-user"
									>
										Upload filled CSV
									</Button>
								</Upload>

							</div>
						</div>
						<div className='internalUser'>
							<p className='pstyle'>External Users</p>
							<p style={{ margin: 0 }} >
								Import external users like from LDAP,AD etc.
							</p>
							<p>
								Download the template below,fill details and upload it back.
							</p>
							<div style={{ marginTop: 25 }}>
								<Button
									// type="dashed"
									className='custom-secondary-btn'
									icon={<DownloadOutlined className='iconSize' />}
									style={{ marginBottom: 16, marginRight: 10, width: 187 }}
									id="editable-table-button-add-new-user"
								>
									<a
										href={require('../../assets/xlsx/UserCreation.xlsx')}
										style={{ color: "white", marginLeft: 5 }}
										download='UserCreation.xlsx'>
										Download
									</a>
								</Button>
								<Upload
									name="file"
									fileList={fileList}
									accept=".xls, .xlsx"
									beforeUpload={() => false}
									onChange={handleExternalChange} >
									<Button
										// type="dashed"
										className='custom-primary-btn'
										icon={<UploadOutlined className='iconSize' />}
										style={{ marginBottom: 16, width: 187 }}
										id="editable-table-button-add-new-user"
									>
										Upload filled CSV
									</Button>
								</Upload>
							</div>
						</div>
					</div>
				</div >
				<div style={{ display: showProgress ? "" : "none" }}>
					<div style={{ display: !showStatus && !showErrorStatus ? "" : "none" }}>
						<div><h3>Upload in Progress</h3></div>
						<div className='elcelDiv'>
							<img src={exelPng} />
							<div className='progress'>
								<h4>{fileList[0]?.name}</h4>
								<Progress percent={progressPercent} />
							</div>

						</div>
					</div>
					<div style={{ display: showStatus ? "" : "none" }}>
						<div><h3>File Upload Status</h3></div>
						<div className='errorUpload'>
							<img src={VectorSuccess} style={{ marginBottom: 10, marginLeft: 136, width: 100 }} />
							<Alert
								style={{ width: 460 }}
								message="Upload Complete"
								showIcon
								description="Please confirm your action by e-signing."
								type="success"
								action={
									<Button className='custom-secondary-btn' size="small"
										onClick={() => setShowEsign(true)}
									>
										Complete e-sign
									</Button>
								}
							/>
						</div>
					</div>
					<div style={{ display: showErrorStatus ? "" : "none" }}>
						<div><h3>File Upload Status</h3></div>
						<div className='errorUpload'>
							<img src={VectorError} style={{ marginBottom: 10, marginLeft: 100 }} />
							<Alert
								message="Upload Failed"
								showIcon
								description="The uploaded file seems to have invalid data.   Please rectify and upload again."
								type="error"
							/>
						</div>
					</div>
				</div>
			</Modal>
			<Esign
				showEsign={showEsign}
				userType={userType}
				fileID={fileID}
				handleEsignCancle={handleEsignCancle}
				handlePopUpClose={handleCancel}
				screenName="CONFIGURATION"
				appType="CONFIGURATION"
			/>
		</div>
	)
}

export default ImportUser