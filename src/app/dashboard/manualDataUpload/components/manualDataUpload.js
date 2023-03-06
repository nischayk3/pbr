import {
	Alert, Button, Input, Modal, Result, Select, Space, Steps, Upload
} from 'antd';
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles.scss';

import {
	ArrowLeftOutlined, ArrowRightOutlined, DoubleRightOutlined
} from '@ant-design/icons';

import BreadCrumbWrapper from '../../../../components/BreadCrumbWrapper';
import { BMS_APP_LOGIN_PASS, MDH_APP_PYTHON_SERVICE } from '../../../../constants/apiBaseUrl';
import { hideLoader, showLoader, showNotification } from '../../../../duck/actions/commonActions';
import {
	approvedData, cancelFileUpload, finalFileUpload, updateApprovedData, uploadFileApi
} from '../../../../duck/actions/fileUploadAction';
import { consumerSamlLogin, getAuthenticate, getAuthenticateWithoutAD } from '../../../../services/loginService';


const dummyRequest = ({ onSuccess }) => {
	setTimeout(() => {
		onSuccess('ok');
	}, 0);
};

const currentDate = moment().toDate();
const currentDateFormat = moment(currentDate).format('YYYY-MM-DD');
const currentTimestamp = moment(currentDate).format('h:mm:ss');
/* istanbul ignore next */
class ManualDataUpload extends Component {
	state = {
		openPopup: false,
		selectedIssueType: '',
		showLoader: false,
		feedback: '',
		toastMessage: '',
		toastVariant: '',
		toastOpen: false,
		downloadData: [],
		currentStep: 0,
		fileList: [],
		uploading: false,
		isModalVisible: false,
		isModalVisibleSignature: false,
		isModalVisibleSignature1: false,
		isModalCancelVisible: false,
		uploadFilesResponse: {},
		nextStepDisabled: false,
		selectedFile: null,
		selectedFileList: [],
		fileResponse: '',
		onChangeRes: '',
		onChangeStatus: '',
		signatureReason: '',
		signatureScreen: '',
		signatureStatus: '',
		signatureReason1: '',
		signatureScreen2: '',
		signatureStatus3: '',
		cancelFileRes: '',
		cancelFileStatus: '',
		primaryFileId: '',
		primaryFileRes: '',
		cancelReason: '',
		cancelStatus: '',
		password: '',
		duplicateRecords: '',
		updateApproveSatus: '',
		approvedDataRes: '',
		approvedDataStatus: '',
		reasonList: [
			'I am an approver',
			'I am the author',
			'Signing on behalf of another team member',
		],

		username: '',
		isAuth: false,
		loginStatus: ""
	};

	componentDidMount = () => {
		const loginDetails = JSON.parse(localStorage.getItem("login_details"));
		const loginWith = localStorage.getItem("loginwith");


		if (loginWith) {
			this.setState({
				loginStatus: loginWith,
			});
		}
		if (loginDetails) {
			this.setState({
				username: loginDetails.email_id,
			});
		}
	};


	clearData = () => {
		this.setState({
			currentStep: 0,
			nextState: {},
			onChangeRes: '',
			onChangeStatus: '',
			isModalVisibleSignature: false,
			isModalVisible: false,
			isModalCancelVisible: false,
			signatureReason: '',
			signatureScreen: '',
			signatureStatus: '',
			cancelStatus: '',
			cancelReason: '',
			selectedFileList: [],
			nextStepDisabled: false,
			isAuth: false,
			approvedDataStatus: ''
		});
	};

	onChangeField = (e, field) => {
		if (e.target.value !== null) {
			if (field === 'username') {
				this.setState({
					username: e.target.value,
				});
			}
			if (field === 'password') {
				this.setState({
					password: e.target.value,
				});
			}
		}
	};

	onChangeSelect = (e, field) => {
		if (e !== null) {
			if (field === 'reason') {
				this.setState({
					signatureReason: e,
				});
			} else if (field === 'reason1') {
				this.setState({
					signatureReason1: e,
				});
			} else if (field === 'reason_cancel') {
				this.setState({
					cancelReason: e,
				});
			}
		}
	};

	onChange = info => {
		this.setState({
			showLoader: true,
			onChangeRes: '',
			onChangeStatus: '',
			signatureReason: '',
			signatureScreen: '',
			signatureStatus: '',
			signatureReason1: '',
			signatureScreen2: '',
			signatureStatus3: '',
			cancelFileRes: '',
			cancelFileStatus: '',
			primaryFileId: '',
			primaryFileRes: '',
			cancelReason: '',
			cancelStatus: '',
			password: '',
			duplicateRecords: '',
			updateApproveSatus: '',
		});
		const nextState = {};
		if (info.file.type === 'application/pdf') {
			this.setState({
				toastOpen: true,
				showLoader: false,
				toastMessage: `${info.file.name} is not excel or csv file`,
				toastVariant: 'error',
				nextStepDisabled: true,
			});
			this.props.showNotification(
				'error',
				`${info.file.name} is not excel or csv file`
			);
		} else {
			if (info.file.status === 'uploading') {
				nextState.selectedFileList = [info.file];
			} else if (info.file.status === 'done') {
				this.props.showLoader()
				nextState.selectedFileList = [info.file];
				var formData = new FormData();
				formData.append('file', info.file.originFileObj);
				formData.append('sourcename', 'fileupload/UIupdate/pbr');
				formData.append(
					'username',
					JSON.parse(localStorage.getItem('login_details')).email_id
				);
				uploadFileApi(formData).then(res => {
					if (res.data && res.data?.statuscode === 400) {
						this.setState({
							toastOpen: false,
							showLoader: false,
							onChangeRes: res.data && res.data.message,
							onChangeStatus: res.data && res.data?.statuscode,
							toastVariant: 'error',
							nextStepDisabled: true,
						});
						this.props.hideLoader()
					} else if (res.data && res.data.status === 300) {
						this.setState({
							toastOpen: false,
							showLoader: false,
							onChangeRes: res.data.message,
							onChangeStatus: res.data.status,
							duplicateRecords: res.data.num_of_duplicate_rows,
							primaryFileId: res.data.file_pointer,
							uploadFilesResponse: res,
							toastVariant: 'error',
							nextStepDisabled: true,
						});
						this.props.hideLoader()
					} else if (res && res?.statuscode === 200) {
						this.setState({
							toastOpen: false,
							showLoader: false,
							onChangeRes: res.message,
							onChangeStatus: res?.statuscode,
							toastVariant: 'success',
							uploadFilesResponse: res,
							nextStepDisabled: false,
							primaryFileId: res.file_pointer,
						});
						this.props.hideLoader()
					} else if (res.data && res.data?.statuscode === 201) {
						this.setState({
							toastOpen: false,
							showLoader: false,
							onChangeRes: res.data.message,
							toastVariant: 'success',
							uploadFilesResponse: res,
							onChangeStatus: res.data?.statuscode,
							primaryFileId: res.data.file_pointer,
							nextStepDisabled: false,
						});
						this.props.hideLoader()
					}/* istanbul ignore next */
					else {
						this.setState({
							toastOpen: true,
							showLoader: false,
							toastMessage: res,
							toastVariant: 'error',
							nextStepDisabled: true,
						});
						this.props.hideLoader()
						this.props.showNotification('error', res);
					}
				});
			} else {
				// error or removed
				nextState.selectedFile = null;
				nextState.selectedFileList = [];
			}
		}

		this.setState(() => nextState);
	};

	cancelFileUploadService = () => {
		let reqCancelParam = {
			user_id: JSON.parse(localStorage.getItem('login_details')).email_id,
			file_upload_id: this.state.primaryFileId,
			reason: this.state.cancelReason,
			status: 'approved',
			sourcename: 'file_upload',
		};
		cancelFileUpload(reqCancelParam).then(response => {
			if (response && response?.statuscode === 200) {
				this.setState(
					{
						cancelFileRes: response.message,
						cancelFileStatus: response?.statuscode,
						toastMessage: response.message,
						nextStepDisabled: false,
						currentStep: 0,
						cancelReason: '',
						cancelStatus: '',
						toastOpen: true,
						toastVariant: 'success',
						onChangeStatus: '',
						onChangeRes: '',
						signatureStatus: '',
						signatureReason: '',
						signatureScreen: '',
						nextState: {},
						selectedFileList: [],
					},

					() => {
						console.log('nextStepDisabled', this.state.nextStepDisabled);
					}
				);
				this.props.showNotification('success', response.message);
			} else {
				this.setState({
					toastOpen: true,
					showLoader: false,
					toastMessage: response,
					toastVariant: 'error',
					nextStepDisabled: true,
				});
				this.props.showNotification('error', response);
			}
		});
		this.setState({
			isModalVisible: false,
			isModalCancelVisible: false,
		});
	};

	updateFileApproveData = () => {
		this.props.showLoader()
		let reqUpdateData = {
			date: currentDateFormat,
			timestamp: currentTimestamp.toString(),
			user_id: this.state.username,
			file_upload_id: this.state.primaryFileId.toString(),
			reason: this.state.signatureReason,
			status: 'approved',
			screen: 'upload',
			first_name: JSON.parse(localStorage.getItem('login_details')).firstname,
			last_name: JSON.parse(localStorage.getItem('login_details')).lastname,
		};

		updateApprovedData(reqUpdateData).then(response => {
			if (response && response?.statuscode === 200) {
				this.setState(
					{
						toastOpen: false,
						showLoader: false,
						toastMessage: response.message,
						toastVariant: 'success',
						isModalVisible: false,
						nextStepDisabled: false,
						primaryFileId: response.primary_id,
						updateApproveSatus: response?.statuscode,
						primaryFileRes: response.message,
						onChangeStatus: '',
						signatureStatus: '',
						signatureReason: '',
						signatureScreen: '',
						isAuth: false,
					},
					() => {
						console.log('state update', this.state);
					}
				);
				this.props.hideLoader()
			}
			else {
				this.setState(
					{
						toastOpen: true,
						showLoader: false,
						toastMessage: response.message,
						toastVariant: 'error',
						isModalVisible: false,
						nextStepDisabled: true,
					}
				);
				this.props.hideLoader()
				this.props.showNotification('error', response.message);
			}
		});
	};

	approveDataFile = () => {
		this.props.showLoader()
		let reqUpdateData = {
			userid: JSON.parse(localStorage.getItem('login_details')).email_id,
			fileid: this.state.primaryFileId,
		};

		approvedData(reqUpdateData).then(response => {
			if (response.data?.statuscode === 200) {
				this.setState({
					toastOpen: false,
					showLoader: false,
					toastMessage: response.data.message,
					toastVariant: 'success',
					approvedDataRes: response.data.message,
					approvedDataStatus: response.data?.statuscode,
					onChangeStatus: '',
				});
				this.props.hideLoader()
			} else if (response.data?.statuscode === 206) {
				this.setState({
					toastOpen: false,
					showLoader: false,
					toastMessage: response.data.message,
					toastVariant: 'success',
					approvedDataRes: response.data.message,
					approvedDataStatus: response.data?.statuscode,
					onChangeStatus: '',
				});
				this.props.hideLoader()
			} else if (response.data?.statuscode === 400) {
				this.setState({
					toastOpen: true,
					showLoader: false,
					toastMessage: response.data.message,
					toastVariant: 'error',
				});
				this.props.hideLoader()
				this.props.showNotification('error', response.data.message);
			}
		});
	};

	finalFileUploadData = () => {
		this.props.showLoader();
		let reqFile = {
			date: currentDateFormat,
			timestamp: currentTimestamp.toString(),
			file_upload_id: parseInt(this.state.primaryFileId),
			reason: this.state.signatureReason1,
			status: 'signed',
			screen: 'upload',
			user_id: this.state.username,
			first_name: JSON.parse(localStorage.getItem('login_details')).firstname,
			last_name: JSON.parse(localStorage.getItem('login_details')).lastname,
		};

		finalFileUpload(reqFile).then(response => {
			if (response.data?.statuscode === 200) {
				this.setState(
					{
						toastOpen: true,
						showLoader: false,
						toastMessage: response.data.message,
						toastVariant: 'success',
						isModalVisibleSignature1: false,
						isAuth: false,
						signatureReason1: '',
						signatureScreen2: '',
						signatureStatus3: '',
						nextStepDisabled: false,
						currentStep: this.state.currentStep + 1,
					},
					() => {
						console.log('update', this.state);
					}
				);
				this.props.hideLoader()
				this.props.showNotification('success', response.data.message);
			} else if (response.data?.statuscode === 400) {
				this.setState(
					{
						toastOpen: true,
						showLoader: false,
						toastMessage: response.data.message,
						toastVariant: 'error',
						isModalVisibleSignature1: false,
						nextStepDisabled: true,
					},
					() => {
						console.log('update', this.state);
					}
				);
				this.props.hideLoader()
				this.props.showNotification('error', response.data.message);
			}
		});
	};

	cancelAlert = () => {
		this.setState({
			currentStep: 0,
			cancelReason: '',
			cancelStatus: '',
			onChangeStatus: '',
			onChangeRes: '',
			signatureStatus: '',
			signatureReason: '',
			signatureScreen: '',
			selectedFileList: [],
			nextStepDisabled: false
		});
	};

	closeModel = () => {
		this.setState({
			isModalVisibleSignature: false,
			isModalVisible: false,
			isModalCancelVisible: false,
			signatureReason: '',
			signatureScreen: '',
			signatureStatus: '',
			nextState: {},
			selectedFileList: [],
			isAuth: false,
		});
	};

	closeModelCancel = () => {
		this.setState({
			cancelStatus: '',
			cancelReason: '',
			isModalCancelVisible: false,
			nextState: {},
			selectedFileList: [],
		});
	};

	closeModelSignature1 = () => {
		this.setState({
			signatureReason1: '',
			signatureScreen2: '',
			signatureStatus3: '',
			isModalVisibleSignature1: false,
			nextState: {},
			selectedFileList: [],
			isAuth: false,
		});
	};

	duplicatRecordPopup = () => {
		this.setState({
			isModalDuplicateRecord: true,
		});
	};

	showDigitalSignaturePopup = () => {
		this.setState({
			isModalVisible: true,
		});
	};

	showDigitalSignaturePopup1 = () => {
		this.setState({
			isModalVisibleSignature: true,
		});
	};

	showDigitalSignaturePopup2 = () => {
		this.setState({
			isModalVisibleSignature1: true,
		});
	};

	showCancelModel = () => {
		this.setState({
			isModalCancelVisible: true,
		});
	};

	nextStep = (e, step) => {
		if (step === 0) {
			this.setState({
				nextStepDisabled: true,
				currentStep: this.state.currentStep + 1,
			});
			/* istanbul ignore next */
		} else if (step === 1) {
			if (this.state.onChangeStatus === 300) {
				// const fileUploadId = localStorage.setItem('file_upload_id', this.state.uploadFilesResponse.data.file_pointer)
				this.setState({
					nextStepDisabled: false,
					currentStep: this.state.currentStep + 1,
				});
				/* istanbul ignore next */
			} else if (this.state.approvedDataStatus === 200) {
				this.setState({
					nextStepDisabled: true,
					currentStep: this.state.currentStep + 1,
				});
				/* istanbul ignore next */
			} else if (this.state.approvedDataStatus === 206) {
				this.setState({
					currentStep: this.state.currentStep + 2,
					nextStepDisabled: true,
				});
				/* istanbul ignore next */
			} else if (this.state.onChangeStatus === 201) {
				this.setState({
					currentStep: this.state.currentStep + 1,
					nextStepDisabled: true,
				});
				/* istanbul ignore next */
			} else if (this.state.onChangeStatus === 200) {
				this.setState({
					nextStepDisabled: true,
					currentStep: this.state.currentStep + 2,
				});
			} /* istanbul ignore next */
			else {
				this.setState({
					currentStep: this.state.currentStep + 1,
				});
			}
			/* istanbul ignore next */
		} else if (step === 2 || step === 3) {
			this.setState({
				nextStepDisabled: true,
				currentStep: this.state.currentStep + 1,
			});
		}
	};

	prevStep = () => {
		this.setState({
			nextStepDisabled: false,
			currentStep: this.state.currentStep - 1,
		});
	};

	onAuthenticate = async () => {
		let req = {};
		let header = {
			username: this.state.username,
			password: this.state.password,
		};
		const res = await getAuthenticate(req, header);
		if (res.Status != 200) {
			this.props.showNotification('error', res.Message);
			this.closeModel();
			this.closeModelSignature1();
		} else {
			this.setState({ isAuth: true });
		}
	};

	onAuthenticateWithoutAD = async () => {
		let req = {};
		let header = {
			username: this.state.username,
			password: this.state.password,
		};
		const res = await getAuthenticateWithoutAD(req, header);
		if (res.Status != 200) {
			this.props.showNotification('error', res.Message);
			this.closeModel();
			this.closeModelSignature1();
		} else {
			this.setState({ isAuth: true });
		}
	}

	samlRedirect = async () => {
		const url = `${MDH_APP_PYTHON_SERVICE}/#/dashboard/saml-redirect`
		const encoded = encodeURI(url);

		const _reqSaml = {
			SignedInfoData: {
				Reason: this.state.signatureReason,
			},
			redirect_url: decodeURI(encoded)
		}

		const samlLogin = await consumerSamlLogin(_reqSaml);
		if (samlLogin.Status == 200) {
			window.open(`${window.location.origin}${BMS_APP_LOGIN_PASS}/saml-login-redirect`, '_self')
		}
	}


	render() {
		const {
			approvedDataRes,
			approvedDataStatus,
			updateApproveSatus,
			duplicateRecords,
			username,
			password,
			reasonList,
			cancelReason,
			signatureReason1,
			primaryFileRes,
			cancelFileStatus,
			cancelFileRes,
			signatureReason,
			onChangeStatus,
			onChangeRes,
			isAuth,
			loginStatus
		} = this.state;

		const { Step } = Steps;

		const steps = [
			{
				title: 'Getting Start',
				content: 'First-content',
			},
			{
				title: 'Upload',
				content: 'Second-content',
			},
			{
				title: 'Validation & Review',
				content: 'third-content',
			},
			{
				title: 'Load',
				content: 'fourth-content',
			},
			{
				title: 'Finish',
				content: 'fifth-content',
			},
		];

		const uploadFileProps = {
			progress: {
				strokeColor: {
					'0%': '#108ee9',
					'100%': '#87d068',
				},
				strokeWidth: 3,
				format: percent => `${parseFloat(percent.toFixed(2))}%`,
			},
		};



		return (
			<div className='custom-wrapper'>
				<BreadCrumbWrapper />

				<div className='custom-content-layout'>
					<div className='custom-overview-block'>
						<Steps
							type='navigation'
							size='small'
							className='site-navigation-steps custom-steps'
							current={this.state.currentStep}>
							{steps.map(item => (
								<Step key={item.title} title={item.title} />
							))}
						</Steps>
						<div className='steps-content'>
							{steps[this.state.currentStep].content == 'First-content' && (
								<div className='step-content'>
									<p className='step-head-1'>
										{' '}
										The data load wizard will allow you to select template,
										validate and load into the system. Please select a
										template to proceed
									</p>
									<p className='step-head-2'>
										Download relevant template format
									</p>
									<div className='temp_link'>
										<div className='temp_block'>
											<p className='temp_label'>
												<span>
													<DoubleRightOutlined
														style={{
															fontSize: '20px',
															fontWeight: 800,
														}}
													/>
												</span>
												Parameters
											</p>
											<Button className='temp_btn'>
												{' '}
												<a
													href={require('../../../../assets/xlsx/data_template.xlsx')}
													download='data_template.xlsx'>
													Download
												</a>
											</Button>
										</div>
									</div>
								</div>
							)}
							{steps[this.state.currentStep].content ==
								'Second-content' && (
									<div className='step-content'>
										<p className='step-head-1'>
											Please select the filled out template in the section
											below to upload, only excel and csv formats.{' '}
										</p>
										<p className='step-head-1'>
											Ensure cells formats are correct e.g. "012" will get
											loaded as 12 if cell type is numerical. Only one sheet
											can be uploaded at a time
										</p>
										{onChangeStatus && onChangeStatus === 400 && (
											<Alert
												message={onChangeRes}
												description='Can you please check and try again.'
												type='error'
												showIcon
												closable
											/>
										)}
										{onChangeStatus && onChangeStatus === 401 && (
											<Alert
												message={onChangeRes}
												type='error'
												description='User not aurhtorised for site, Can you please check and try again.'
												showIcon
												closable
											/>
										)}
										{onChangeStatus && onChangeStatus === 200 && (
											<Alert
												message={onChangeRes}
												description='Please click on Next for Digital Signature'
												type='success'
												showIcon
											/>
										)}
										{onChangeStatus && onChangeStatus === 201 && (
											<Alert
												message={onChangeRes}
												description='Please click on Next for Digital Signature'
												type='success'
												showIcon
											/>
										)}
										{approvedDataStatus && approvedDataStatus === 200 && (
											<Alert
												message={approvedDataRes}
												description='Please click on Next for Digital Signature'
												type='success'
												showIcon
											/>
										)}
										{approvedDataStatus && approvedDataStatus === 206 && (
											<Alert
												message={approvedDataRes}
												description='Please click on Next for Digital Signature'
												type='success'
												showIcon
											/>
										)}


										{onChangeStatus && onChangeStatus === 300 && (
											<Alert
												message={`${duplicateRecords} Duplicate Record found !!`}
												type='error'
												description='Do you want to continue or cancel? '
												showIcon
												action={
													<Space direction='horizontal'>
														<Button
															type='primary'
															onClick={() => { this.approveDataFile(); this.setState({ nextStepDisabled: false }) }}>
															Continue
														</Button>
														<Button
															type='ghost'
															onClick={() => this.cancelAlert()}>
															Cancel
														</Button>
													</Space>
												}
											/>
										)}

										<div className='plan-sections download-template'>
											<div className='fileuploader-input'>
												<div className='fileuploader-input-inner'>
													{/* <i className="material-icons button-icons upload-icon">
                                cloud_upload
                              </i> */}
													<h5 className='fileuploader-input-caption'>
														<span>Upload your file here</span>
													</h5>
													<p>in EXCEL or CSV.</p>
													<Upload
														{...uploadFileProps}
														maxCount={1}
														fileList={this.state.selectedFileList}
														customRequest={dummyRequest}
														onChange={this.onChange}>
														<Button className='upload_button'>
															Choose File
														</Button>
													</Upload>
												</div>
											</div>
										</div>
									</div>
								)}
							{steps[this.state.currentStep].content == 'third-content' && (
								<div>
									<div className='step-content'>
										{approvedDataStatus && approvedDataStatus === 200 && (
											<Alert
												message={approvedDataRes}
												type='success'
												description='Please provide a Digital Signature to further process or cancel. '
												showIcon
												action={
													<Space direction='horizontal'>
														<Button
															id='digital-signature'
															type='primary'
															onClick={() =>
																this.showDigitalSignaturePopup()
															}>
															Digital Signature
														</Button>
														<Button
															type='ghost'
															onClick={() => this.showCancelModel()}>
															Cancel
														</Button>
													</Space>
												}
											/>
										)}
										{approvedDataStatus && approvedDataStatus === 206 && (
											<Alert
												message={approvedDataRes}
												type='success'
												description='Please provide a Digital Signature to further process or cancel. '
												showIcon
												action={
													<Space direction='horizontal'>
														<Button
															id='digital-signature-popup'
															type='primary'
															onClick={() =>
																this.showDigitalSignaturePopup()
															}>
															Digital Signature
														</Button>
														<Button
															type='ghost'
															onClick={() => this.showCancelModel()}>
															Cancel
														</Button>
													</Space>
												}
											/>
										)}
										{onChangeStatus && onChangeStatus === 201 && (
											<Alert
												message={onChangeRes}
												type='success'
												description='Please provide a Digital Signature to further process or cancel. '
												showIcon
												action={
													<Space direction='horizontal'>
														<Button
															id='digital-sign'
															type='primary'
															onClick={() =>
																this.showDigitalSignaturePopup()
															}>
															Digital Signature
														</Button>
														<Button
															type='ghost'
															onClick={() => this.showCancelModel()}>
															Cancel
														</Button>
													</Space>
												}
											/>
										)}

										{onChangeStatus && onChangeStatus === 200 && (
											<Alert
												message={onChangeRes}
												type='success'
												description='Please provide a Digital Signature to further process or cancel. '
												showIcon
												action={
													<Space direction='horizontal'>
														<Button
															id='digital-sign-popup'
															type='primary'
															onClick={() =>
																this.showDigitalSignaturePopup1()
															}>
															Digital Signature
														</Button>
														<Button
															type='ghost'
															onClick={() => this.showCancelModel()}>
															Cancel
														</Button>
													</Space>
												}
											/>
										)}

										{cancelFileStatus && cancelFileStatus === 200 && (
											<Alert
												message={cancelFileRes}
												type='success'
												description='Please click on Next'
												showIcon
												closable
											/>
										)}

										{updateApproveSatus && updateApproveSatus === 200 && (
											<Alert
												message={primaryFileRes}
												type='success'
												description='Please click on Next'
												showIcon
												closable
											/>
										)}
										<Modal
											className='modal_digitalSignature'
											title='Digital Signature'
											visible={this.state.isModalVisible}
											footer={null}
											onCancel={e => {
												e.stopPropagation();
												this.closeModel();
											}}>
											{loginStatus !== "WITH_SAML" ? (
												<>
													<div className='sign-form1'>
														<div className='sign-cols1'>
															<div>
																<p>Username</p>
																<Input
																	disabled
																	placeholder='Username'
																	value={username}
																	onChange={value =>
																		this.onChangeField(value, 'username')
																	}
																/>
															</div>
															<div>
																<p>Password</p>
																<Input
																	placeholder='Password'
																	autocomplete='new-password'
																	type='password'
																	value={password}
																	onChange={value =>
																		this.onChangeField(value, 'password')
																	}
																/>
															</div>
														</div>
														{isAuth && (
															<div>
																<p>Signing</p>
																<Select
																	placeholder='Select a reason'
																	value={signatureReason}
																	onChange={value =>
																		this.onChangeSelect(value, 'reason')
																	}
																	style={{
																		width: '100%',
																		margin: '0px',
																	}}>
																	{reasonList.map(item => (
																		<Select.Option key={item} value={item}>
																			{item}
																		</Select.Option>
																	))}
																</Select>
															</div>
														)}
													</div>
													<div className='signature-modal'>
														{isAuth ? (
															<>
																<Button
																	type='primary'
																	style={{
																		backgroundColor: '#093185',
																	}}
																	onClick={() => this.updateFileApproveData()}>
																	Confirm
																</Button>
																<Button
																	className='custom-primary-btn'
																	onClick={() => this.closeModel()}>
																	Cancel
																</Button>
															</>
														) : (
															<>
																{
																	loginStatus == 'WITH_AD' ? (
																		<Button
																			type='primary'
																			id="auth_with_ad"
																			style={{
																				backgroundColor: '#093185',
																			}}
																			disabled={username == '' || password == ''}
																			onClick={() => this.onAuthenticate()}>
																			Authenticate with AD
																		</Button>
																	) : loginStatus == "WITHOUT_AD" ? (
																		<Button
																			type='primary'
																			id="auth_without_ad"
																			style={{
																				backgroundColor: '#093185',
																			}}
																			disabled={username == '' || password == ''}
																			onClick={() => this.onAuthenticateWithoutAD()}>
																			Authenticate without AD
																		</Button>
																	) : loginStatus == "WITH_SAML" ? (
																		<Button
																			className="custom-secondary-btn"
																			key="3"
																			disabled={username == "" || password == ""}
																			onClick={() => authenticateWithLdap()}
																		>
																			Authenticate with SAML
																		</Button>
																	) : null
																}
															</>
														)}
													</div>
												</>
											) : (
												<div className='sign-form1'>
													<div>
														<p>Signing</p>
														<Select
															placeholder='Select a reason'
															value={signatureReason}
															onChange={value =>
																this.onChangeSelect(value, 'reason')
															}
															style={{
																width: '100%',
																margin: '0px',
															}}>
															{reasonList.map(item => (
																<Select.Option key={item} value={item}>
																	{item}
																</Select.Option>
															))}
														</Select>
													</div>
													<div className='signature-modal'>
														<Button
															type='primary'
															style={{
																backgroundColor: '#093185',
															}}
															onClick={() => this.samlRedirect()}>
															Confirm
														</Button>
														<Button
															className='custom-primary-btn'
															onClick={() => this.closeModelSignature1()}>
															Cancel
														</Button>
													</div>
												</div>
											)}
										</Modal>
										<Modal
											className='modal_digitalSignature'
											title='Digital Signature'
											visible={this.state.isModalVisibleSignature}
											footer={null}
											onCancel={e => {
												e.stopPropagation();
												this.closeModel();
											}}>
											{loginStatus !== "WITH_SAML" ? (
												<>
													<div className='sign-form1'>
														<div className='sign-cols1'>
															<div>
																<p>Username</p>
																<Input
																	disabled
																	placeholder='Username'
																	value={username}
																	onChange={value =>
																		this.onChangeField(value, 'username')
																	}
																/>
															</div>
															<div>
																<p>Password</p>
																<Input

																	placeholder='Password'
																	autocomplete='new-password'
																	type='password'
																	value={password}
																	onChange={value =>
																		this.onChangeField(value, 'password')
																	}
																/>
															</div>
														</div>
														{isAuth && (
															<div>
																<p>Signing</p>
																<Select
																	placeholder='Select a reason'
																	value={signatureReason}
																	onChange={value =>
																		this.onChangeSelect(value, 'reason')
																	}
																	style={{
																		width: '100%',
																		margin: '0px',
																	}}>
																	{reasonList.map(item => (
																		<Select.Option key={item} value={item}>
																			{item}
																		</Select.Option>
																	))}
																</Select>
															</div>
														)}
													</div>
													<div className='signature-modal'>
														{isAuth ? (
															<>
																<Button
																	type='primary'
																	style={{
																		backgroundColor: '#093185',
																	}}
																	onClick={() => this.approveDataFile()}>
																	Confirm
																</Button>
																<Button
																	className='custom-primary-btn'
																	onClick={() => this.closeModel()}>
																	Cancel
																</Button>
															</>
														) : (
															<>	{
																loginStatus == 'WITH_AD' ? (
																	<Button
																		type='primary'
																		id="auth_with_ad"
																		style={{
																			backgroundColor: '#093185',
																		}}
																		disabled={username == '' || password == ''}
																		onClick={() => this.onAuthenticate()}>
																		Authenticate with AD
																	</Button>
																) : loginStatus == "WITHOUT_AD" ? (
																	<Button
																		type='primary'
																		id="auth_without_ad"
																		style={{
																			backgroundColor: '#093185',
																		}}
																		disabled={username == '' || password == ''}
																		onClick={() => this.onAuthenticateWithoutAD()}>
																		Authenticate without AD
																	</Button>
																) : loginStatus == "WITH_SAML" ? (
																	<Button
																		className="custom-secondary-btn"
																		key="3"
																		disabled={username == "" || password == ""}
																		onClick={() => authenticateWithLdap()}
																	>
																		Authenticate with SAML
																	</Button>
																) : null
															}
															</>
														)}
													</div>
												</>
											) : (
												<div className='sign-form1'>
													<div>
														<p>Signing</p>
														<Select
															placeholder='Select a reason'
															value={signatureReason}
															onChange={value =>
																this.onChangeSelect(value, 'reason')
															}
															style={{
																width: '100%',
																margin: '0px',
															}}>
															{reasonList.map(item => (
																<Select.Option key={item} value={item}>
																	{item}
																</Select.Option>
															))}
														</Select>
													</div>
													<div className='signature-modal'>
														<Button
															type='primary'
															style={{
																backgroundColor: '#093185',
															}}
															onClick={() => this.samlRedirect()}>
															Confirm
														</Button>
														<Button
															className='custom-primary-btn'
															onClick={() => this.closeModelSignature1()}>
															Cancel
														</Button>
													</div>
												</div>
											)}
										</Modal>
										<Modal
											className='modal_digitalSignature'
											title='Do you want to cancel?'
											visible={this.state.isModalCancelVisible}
											footer={null}
											onCancel={e => {
												e.stopPropagation();
												this.closeModelCancel();
											}}>
											<div className='sign-form'>
												<div>
													<p>Reason</p>
													<Select
														placeholder='Select a reason'
														value={cancelReason}
														onChange={value =>
															this.onChangeSelect(value, 'reason_cancel')
														}
														style={{
															width: '100%',
															margin: '0px',
														}}>
														{reasonList.map(item => (
															<Select.Option key={item} value={item}>
																{item}
															</Select.Option>
														))}
													</Select>
												</div>

											</div>
											<div className='signature-modal'>
												<Button
													type='primary'
													onClick={() => this.cancelFileUploadService()}>
													Ok
												</Button>
												<Button onClick={() => this.closeModelCancel()}>
													Cancel
												</Button>
											</div>
										</Modal>
									</div>
								</div>
							)}

							{steps[this.state.currentStep].content ==
								'fourth-content' && (
									<div>
										<div className='step-content'>
											<Alert
												message='Final Digital Signature'
												description='Please provide a final digital signature to revalidate the Excel/CSV file.'
												type='info'
												action={
													<Space direction='horizontal'>
														<Button
															id='signature-popup'
															type='primary'
															onClick={() =>
																this.showDigitalSignaturePopup2()
															}>
															Digital Signature
														</Button>
														<Button
															type='ghost'
															onClick={() => this.showCancelModel()}>
															Cancel
														</Button>
													</Space>
												}
											/>
											<Modal
												className='modal_digitalSignature'
												title='Digital Signature'
												visible={this.state.isModalVisibleSignature1}
												footer={null}
												onCancel={e => {
													e.stopPropagation();
													this.closeModelSignature1();
												}}>
												{loginStatus !== "WITH_SAML" ? (
													<>
														<div className='sign-form1'>
															<div className='sign-cols1'>
																<div>
																	<p>Username</p>
																	<Input
																		disabled
																		placeholder='Username'
																		value={username}
																		onChange={value =>
																			this.onChangeField(value, 'username')
																		}

																	/>
																</div>
																<div>
																	<p>Password</p>
																	<Input
																		placeholder='Password'
																		autocomplete='new-password'
																		type='password'
																		value={password}
																		onChange={value =>
																			this.onChangeField(value, 'password')
																		}
																	/>
																</div>
															</div>
															{isAuth && (
																<div>
																	<p>Signing</p>
																	<Select
																		placeholder='Select a reason'
																		value={signatureReason1}
																		onChange={value =>
																			this.onChangeSelect(value, 'reason1')
																		}
																		style={{
																			width: '100%',
																			margin: '0px',
																		}}>
																		{reasonList.map(item => (
																			<Select.Option key={item} value={item}>
																				{item}
																			</Select.Option>
																		))}
																	</Select>
																</div>
															)}
														</div>
														<div className='signature-modal'>
															{isAuth ? (
																<>
																	<Button
																		type='primary'
																		style={{
																			backgroundColor: '#093185',
																		}}
																		onClick={() => this.finalFileUploadData()}>
																		Confirm
																	</Button>
																	<Button
																		className='custom-primary-btn'
																		onClick={() => this.closeModelSignature1()}>
																		Cancel
																	</Button>
																</>
															) : (
																<>
																	{
																		loginStatus == 'WITH_AD' ? (
																			<Button
																				type='primary'
																				id="auth_with_ad"
																				style={{
																					backgroundColor: '#093185',
																				}}
																				disabled={username == '' || password == ''}
																				onClick={() => this.onAuthenticate()}>
																				Authenticate with AD
																			</Button>
																		) : loginStatus == "WITHOUT_AD" ? (
																			<Button
																				type='primary'
																				id="auth_without_ad"
																				style={{
																					backgroundColor: '#093185',
																				}}
																				disabled={username == '' || password == ''}
																				onClick={() => this.onAuthenticateWithoutAD()}>
																				Authenticate without AD
																			</Button>
																		) : loginStatus == "WITH_SAML" ? (
																			<Button
																				className="custom-secondary-btn"
																				key="3"
																				disabled={username == "" || password == ""}
																				onClick={() => authenticateWithLdap()}
																			>
																				Authenticate with SAML
																			</Button>
																		) : null
																	}
																</>
															)}
														</div>
													</>
												) : (
													<div className='sign-form1'>
														<div>
															<p>Signing</p>
															<Select
																placeholder='Select a reason'
																value={signatureReason}
																onChange={value =>
																	this.onChangeSelect(value, 'reason')
																}
																style={{
																	width: '100%',
																	margin: '0px',
																}}>
																{reasonList.map(item => (
																	<Select.Option key={item} value={item}>
																		{item}
																	</Select.Option>
																))}
															</Select>
														</div>
														<div className='signature-modal'>
															<Button
																type='primary'
																style={{
																	backgroundColor: '#093185',
																}}
																onClick={() => this.samlRedirect()}>
																Confirm
															</Button>
															<Button
																className='custom-primary-btn'
																onClick={() => this.closeModelSignature1()}>
																Cancel
															</Button>
														</div>
													</div>
												)}
											</Modal>
											<Modal
												className='modal_digitalSignature'
												title='Do you want to cancel?'
												visible={this.state.isModalCancelVisible}
												footer={null}
												onCancel={e => {
													e.stopPropagation();
													this.closeModelCancel();
												}}>
												<div className='sign-form'>
													<div>
														<p>Reason</p>
														<Select
															placeholder='Select a reason'
															value={cancelReason}
															onChange={value =>
																this.onChangeSelect(value, 'reason_cancel')
															}
															style={{
																width: '100%',
																margin: '0px',
															}}>
															{reasonList.map(item => (
																<Select.Option key={item} value={item}>
																	{item}
																</Select.Option>
															))}
														</Select>
													</div>

												</div>
												<div className='signature-modal'>
													<Button
														type='primary'
														onClick={() => this.cancelFileUploadService()}>
														Ok
													</Button>
													<Button onClick={() => this.closeModelCancel()}>
														Cancel
													</Button>
												</div>
											</Modal>
										</div>
									</div>
								)}

							{steps[this.state.currentStep].content == 'fifth-content' && (
								<div>
									<div className='step-content'>
										<Result
											status='success'
											title='The file is succesfully uploaded !!!'
										/>
										,
									</div>
								</div>
							)}
						</div>
						<div className='steps-action'>
							{this.state.currentStep > 0 && (
								<Button
									style={{
										margin: '0 8px',
										float: 'left',
									}}
									id="previousButton"
									type='primary'
									onClick={() => this.prevStep()}>
									<ArrowLeftOutlined /> Previous
								</Button>
							)}

							{this.state.currentStep < steps.length - 1 && (
								<Button
									disabled={this.state.nextStepDisabled}
									style={{
										margin: '0 8px',
										float: 'right',
									}}
									type='primary'
									id="nextButton"
									onClick={e => this.nextStep(e, this.state.currentStep)}>
									Next <ArrowRightOutlined />
								</Button>
							)}
							<Button
								id="cancel-next"
								style={{
									margin: '0 8px',
									float: 'right',
								}}
								onClick={() => this.clearData()}>
								Cancel
							</Button>

						</div>
					</div>
				</div>
			</div>
		);
	}
}


const mapDispatchToProps = {
	showNotification,
	hideLoader,
	showLoader
};

const mapStateToProps = (state) => {
	return {
		samlLoginData: state.commonReducer.samlLogin
	}
}

ManualDataUpload = connect(mapStateToProps, mapDispatchToProps)(ManualDataUpload);

export default ManualDataUpload;
