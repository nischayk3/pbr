/**
 * @author Dinesh
 * @Mareana - CPV Product
 * @version  1
 * @Last Modified - 09 Aug, 2022
 * @Last Changed By - Dinesh
 */

import { EditOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Avatar, Button, Input, Select, Switch, Tabs, Upload } from 'antd';
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import BreadCrumbWrapper from "../../../../components/BreadCrumbWrapper";
import InputField from '../../../../components/InputField/InputField';
import SelectSearchField from "../../../../components/SelectSearchField/SelectSearchField";
import { hideLoader, showLoader, showNotification } from '../../../../duck/actions/commonActions';
import { getUploadProfile } from "../../../../duck/actions/loginAction";
import { getUserProfile, passwordChange, sendUserProfile, userProfileUpload } from "../../../../services/loginService";
import "./style.scss";


const { TabPane } = Tabs;
const Profile = () => {
	const loginDetails = JSON.parse(localStorage.getItem("login_details"))
	const loginWith = localStorage.getItem("loginwith")

	const dispatch = useDispatch();
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("")
	const [errorMsg, setErrorMsg] = useState("");
	const [dateFormatValue, setDateFormatValue] = useState("");
	const [timeZoneValue, setTimeZoneValue] = useState("");
	const [languageValue, setLanguageValue] = useState("");
	const [imgRes, setImgRes] = useState("");
	const [imagePrev, setImagePrev] = useState(false);
	const [isUserIcon, setIsUserIcon] = useState(<UserOutlined />);
	const [activeTab, setActiveTab] = useState("1");
	const [approverCheck, setApproverCheck] = useState(false);
	const [statusCheck, setStatusCheck] = useState(false);
	const [fileList, setFileList] = useState([]);
	const [favAppOptions, setFavAppOptions] = useState([]);
	const [favApp, setFavApp] = useState("");


	useEffect(() => {
		getProfile();
		getPreference();
	}, [])

	const dateFormat = ["MM:DD:YYYY"]
	const timeZone = ["Asia/Kolkata"]
	const language = ["English (UK)"]

	const uploadButton = (
		<span className="edit-icon">
			<EditOutlined />
		</span>
	);

	const handlePassChange = async () => {
		dispatch(showLoader());
		const userId = localStorage.getItem("user")
		/* istanbul ignore next */
		if (currentPassword === "" || newPassword === "" || confirmPassword === "") {
			dispatch(hideLoader());
			setErrorMsg("Please enter all fields")
		} else if (newPassword === confirmPassword) {
			const _req = {
				"current_password": currentPassword,
				"new_password": confirmPassword,
				"user_id": userId
			}
			/* istanbul ignore next */
			const res = await passwordChange(_req);
			dispatch(hideLoader());
			if (res?.statuscode === 200) {
				dispatch(showNotification('success', "Password updated successfully"));
			} else if (res?.statuscode === 400) {
				setErrorMsg(res.message)
			}
		} else if (newPassword !== confirmPassword) {
			dispatch(hideLoader());
			setErrorMsg("Password doesn’t match")
		} else {
			console.log("error")
		}
	}
	/* istanbul ignore next */
	const changeTab = (activeKey) => {
		setActiveTab(activeKey);
	};

	const optionsDateFormat = dateFormat.map((item, index) => (
		<Select.Option key={index} value={item}>
			{item}
		</Select.Option>
	));

	const optionsTimeZone = timeZone.map((item, index) => (
		<Select.Option key={index} value={item}>
			{item}
		</Select.Option>
	));

	const optionsLanguage = language.map((item, index) => (
		<Select.Option key={index} value={item}>
			{item}
		</Select.Option>
	));
	const optionsFavApp = favAppOptions.map((item, index) => (
		<Select.Option key={index} value={item}>
			{item}
		</Select.Option>
	));
	/* istanbul ignore next */
	const onChange = (value, field) => {
		/* istanbul ignore next */
		if (value != null) {
			/* istanbul ignore next */
			if (field === 'dateFormat') {
				setDateFormatValue(value)
			} else if (field === 'timeZone') {
				setTimeZoneValue(value)
			} else if (field === 'language') {
				setLanguageValue(value)
			} else if (field === 'favApp') {
				setFavApp(value)			
			}
		}
	}

	/* istanbul ignore next */
	const clearSearch = (e, field) => {
		if (field === 'dateFormat') {
			setDateFormatValue("")
		} else if (field === 'timeZone') {
			setTimeZoneValue("")
		} else if (field === 'language') {
			setLanguageValue("")
		} else if (field === 'favApp') {
			setFavApp("")			
		}
	}

	/* istanbul ignore next */
	const savePreference = async () => {
		try {
			dispatch(showLoader());
			const formData = new FormData();
			formData.append("approver_notification", approverCheck);
			formData.append("status_notification", statusCheck);
			formData.append("date_format", dateFormatValue);
			formData.append("email_address", loginDetails && loginDetails.email_id);
			formData.append("first_name", loginDetails && loginDetails.firstname);
			formData.append("last_name", loginDetails && loginDetails.lastname);
			formData.append("language", languageValue);
			formData.append("timezone", timeZoneValue);
			formData.append("fav_application", favApp ? favApp : 'DEFAULT');
			const saveRes = await sendUserProfile(formData);

			if (saveRes?.statuscode === 200) {
				dispatch(hideLoader());
				dispatch(showNotification('success', "Updated Successfully"));
			} else if (saveRes?.statuscode === 400) {
				dispatch(hideLoader());
				dispatch(showNotification('error', saveRes.message));
			} else {
				dispatch(hideLoader());
				dispatch(showNotification('error', "error"));
			}
		} catch (error) {
			dispatch(hideLoader());
			/* istanbul ignore next */
			dispatch(showNotification('error', error));
		}
	}

	/* istanbul ignore next */
	const userProfile = async (formData) => {
		try {
			const saveRes = await userProfileUpload(formData);
			if (saveRes?.statuscode === 200) {
				dispatch(showNotification('success', "Updated Successfully"));
				dispatch(getUploadProfile(true));
				getProfile();
			} else if (saveRes?.statuscode === 400) {
				dispatch(showNotification('error', saveRes.message));
			} else {
				dispatch(showNotification('error', "image upload error"));
			}
		} catch (error) {
			/* istanbul ignore next */
			dispatch(showNotification('error', error));
		}
	}


	const handleChange = (info) => {
		const nextState = {};
		if (info.file.status === "uploading") {
			setFileList(info.fileList)
			nextState.fileList = [info.file];
			/* istanbul ignore next */
		} else if (info.file.status === "done") {
			/* istanbul ignore next */
			const formData = new FormData();
			formData.append('file', info.file.originFileObj);
			formData.append("email_address", loginDetails && loginDetails.email_id);
			setImagePrev(true);
			setIsUserIcon("");
			userProfile(formData)
			setFileList(info.fileList)
			nextState.fileList = [info.file];
			/* istanbul ignore next */
		} else if (info.file.status === "removed") {
			/* istanbul ignore next */
			nextState.fileList = []
			setFileList([])
		}
		// var formData = new FormData();
		// formData.append('file', newFileList[0].originFileObj);
		// formData.append("email_address", loginDetails && loginDetails.email_id);
		// setImagePrev(true);
		// setIsUserIcon("");
		// userProfile(formData)
	};


	const getProfile = async () => {
		try {
			const _getReq = {
				email_address: loginDetails && loginDetails.email_id,
				image: true
			}
			const getRes = await getUserProfile(_getReq)

			if (getRes?.statuscode === 200) {
				/* istanbul ignore next */
				setImagePrev(true)
				setImgRes(`${'data:image/png;base64,' + getRes.message}`)
			} else {
				setImagePrev(false)
			}
		} catch (error) {

			/* istanbul ignore next */
			dispatch(showNotification('error', error));
		}
	}

	const getPreference = async () => {
		try {
			dispatch(showLoader());
			const _getReq = {
				email_address: loginDetails && loginDetails.email_id,
				image: false
			}
			const getRes = await getUserProfile(_getReq)
			dispatch(hideLoader())
			if (getRes?.statuscode === 200) {
				setTimeZoneValue(getRes.message[0].time_zone);
				setDateFormatValue(getRes.message[0].date_format);
				setLanguageValue(getRes.message[0].language)
				setApproverCheck(getRes.message[0].approver_notification)
				setStatusCheck(getRes.message[0].status_notification)
				setFavAppOptions(getRes.message[1]?.fav_appplication_dropdown)
				if(getRes.message[0]?.fav_application !== 'DEFAULT') {
					setFavApp(getRes.message[0]?.fav_application)
				}
			} else {
				/* istanbul ignore next */
				console.log("getRes", getRes);
			}
		} catch (error) {
			/* istanbul ignore next */
			dispatch(hideLoader());
			/* istanbul ignore next */
			dispatch(showNotification('error', error));
		}
	}
	/* istanbul ignore next */
	const onClose = (e) => {
		console.log(e, 'I was closed.');
	};

	/* istanbul ignore next */
	const onSwitch = (checked, type) => {
		if (type === 'approver') {
			setApproverCheck(checked)
		} else {
			setStatusCheck(checked)
		}
	};

	const dummyRequest = ({ file, onSuccess }) => {
		setTimeout(() => {
			onSuccess("ok");
		}, 0);
	};

	return (
		<div className="custom-wrapper">
			<BreadCrumbWrapper />
			<div className='custom-content-layout'>
				<div className='layout-center'>
					<div className='layout-jumbo-header'>
						<div className='profile-section'>
							<p className="heading-1">Profile</p>
							<p className='heading-2'>Manage your personal information, and control which information other people see and apps may access.</p>
							<div>
								{imagePrev ? (
									<>
										<div className="profile-avatar">
											<img src={imgRes} alt="dummy" width="300" height="300" />
											<Upload
												listType="picture"
												customRequest={dummyRequest}
												onChange={handleChange}
												fileList={fileList}
												maxCount={1}
											>
												{uploadButton}
											</Upload>
										</div>
									</>
								) : (
									<>
										<div className="profile-avatar">
											<Avatar
												id="display-image"
												size={137}
												style={{
													padding: "10px 0",
													margin: "10px 0"
												}}
												icon={isUserIcon} />

											<Upload
												listType="picture"
												customRequest={dummyRequest}
												onChange={handleChange}
												fileList={fileList}
												maxCount={1}
											>
												{uploadButton}
											</Upload>
											{/* <input type="file" id="image-input" accept="image/jpeg, image/png, image/jpg" /> */}
										</div>
									</>
								)}
							</div>
						</div>
						<div className="edit-form">
							<p className="heading">Basic Information</p>
							<div className="split-form">
								<div>
									<InputField
										id="firstname"
										label="First name"
										value={loginDetails && loginDetails.firstname}
										disabled
									/>
									<InputField
										id="email"
										label="Email"
										value={loginDetails && loginDetails.email_id}
										disabled
									/>
								</div>
								<div>
									<InputField
										id="lasdtname"
										label="Last name"
										value={loginDetails && loginDetails.lastname}
										disabled
									/>

								</div>
							</div>
						</div>
					</div>
					<div className='layout-section-wrapper'>
						<div className='layout-section'>
							<p className="heading">Preferences</p>
							<Tabs
								className="workflow-tabs"
								activeKey={activeTab}
								onChange={changeTab}
							>
								<TabPane id='general' tab="General" key="1">
									<p className="sub-heading">Changes to your language and time format will be reflected across all applications in BMS.</p>
									<div className="split-form">
										<div className="select-field">
											<SelectSearchField
												showSearch
												id='date_format'
												label='Date format'
												placeholder='Select'
												onChangeSelect={value => onChange(value, 'dateFormat')}
												//onSearchSelect={type => onSearch(type, 'dateFormat')}
												options={optionsDateFormat}
												handleClearSearch={e => clearSearch(e, 'dateFormat')}
												selectedValue={dateFormatValue}
											/>
											<SelectSearchField
												id='time_zone'
												showSearch
												label='Time zone'
												placeholder='Select'
												onChangeSelect={value => onChange(value, 'timeZone')}
												//onSearchSelect={type => onSearch(type, 'timeZone')}
												options={optionsTimeZone}
												handleClearSearch={e => clearSearch(e, 'timeZone')}
												selectedValue={timeZoneValue}
											/>
											<SelectSearchField
												id='language'
												showSearch
												label='Language'
												placeholder='Select'
												onChangeSelect={value => onChange(value, 'language')}
												//onSearchSelect={type => onSearch(type, 'language')}
												options={optionsLanguage}
												handleClearSearch={e => clearSearch(e, 'language')}
												selectedValue={languageValue}
											/>
											{/* <Checkbox className='app-check' onChange={handleChangeApprover}>Approver notification</Checkbox> */}
										</div>
										<Button
											className="custom-secondary-btn "
											type="primary"
											style={{ marginTop: "25px" }}
											onClick={savePreference}
										>
											Save Changes
										</Button>
									</div>
								</TabPane>
								<TabPane id='notifications' tab="Notifications" key="2">
									<div className='notify'>
										<span>
											<p className='notify-text'>Notify me of my jobs to review, awaiting my approval</p>
											<Switch onChange={(e) => onSwitch(e, 'approver')} checked={approverCheck} />
										</span>

										<span>
											<p className='notify-text'>Notify me when the status of my work changes</p>
											<Switch onChange={(e) => onSwitch(e, 'status')} checked={statusCheck} />
										</span>
									</div>
									<Button
										className="custom-secondary-btn "
										type="primary"
										style={{ marginTop: "25px" }}
										onClick={savePreference}
									>
										Save Changes
									</Button>
								</TabPane>
									<TabPane id='preferences' tab="Favourite application" key='3'>
								<p className="sub-heading">Land directly in your favourite application when you log in next time.</p>
									<div className="split-form">
										<div className="select-field">
											<SelectSearchField
												showSearch
												id='favApplication'
												label='Select favourite application'
												placeholder='Select'
												onChangeSelect={value => onChange(value, 'favApp')}
												options={optionsFavApp}
												handleClearSearch={e => clearSearch(e, 'favApp')}
												selectedValue={favApp}
											/>
										</div>
										<Button
											className="custom-secondary-btn "
											type="primary"
											style={{ marginTop: "25px" }}
											onClick={savePreference}
										>
											Save Changes
										</Button>
									</div>
								</TabPane>
							</Tabs>

						</div>
						<div className='layout-section'>
							<p className="heading">Password</p>
							{loginWith === "WITH_AD" || loginWith === "WITH_LDAP" ? (
								<Alert
									message="Your account is managed"
									description="You can’t change the password because it's owned and managed by an organisation. Contact your organisation's admin for assistance."
									type="warning"
									showIcon
								/>
							) : (<div className="split-form">
								<div>
									<div className="input-pass">
										<p>Current password</p>
										<Input.Password
											autoComplete="new-password"
											placeholder="input password"
											value={currentPassword}
											onChange={(e) => {
												setCurrentPassword(e.target.value);
												setErrorMsg("");
											}} />
									</div>
									<div className="input-pass">
										<p>New password</p>
										<Input.Password
											autoComplete="new-password"
											placeholder="input password"
											value={newPassword}
											onChange={(e) => {
												setNewPassword(e.target.value);
												setErrorMsg("");
											}} />
									</div>
									<div className="input-pass">
										<p>Confirm new password</p>
										<Input.Password
											autoComplete="new-password"
											placeholder="input password"
											value={confirmPassword}
											onChange={(e) => {
												setConfirmPassword(e.target.value);
												setErrorMsg("");
											}} />
										{errorMsg !== "" && (
											<Alert
												className="pass-error"
												message="Error"
												description={errorMsg}
												type="error"
												closable
												onClose={onClose}
											/>

										)}
									</div>

								</div>
								<Button
									className="custom-secondary-btn "
									type="primary"
									style={{ marginTop: "7px" }}
									onClick={handlePassChange}
								>
									Save Changes
								</Button>
							</div>)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Profile;