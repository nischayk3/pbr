/**
 * @author Dinesh
 * @Mareana - CPV Product
 * @version  1
 * @Last Modified - 09 Aug, 2022
 * @Last Changed By - Dinesh
 */

import { EditOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Avatar, Button, Input, Select } from 'antd';
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import BreadCrumbWrapper from "../../../../components/BreadCrumbWrapper";
import InputField from '../../../../components/InputField/InputField';
import SelectSearchField from "../../../../components/SelectSearchField/SelectSearchField";
import { hideLoader, showLoader } from '../../../../duck/actions/commonActions';
import { getUserProfile, passwordChange, sendUserProfile } from "../../../../services/loginService";
import "./style.scss";

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
	const [image, setImage] = useState("");
	const [imgRes, setImgRes] = useState("");
	const [imagePrev, setImagePrev] = useState(false);
	const [isUserIcon, setIsUserIcon] = useState(<UserOutlined />);




	useEffect(() => {
		getProfile();
		getPreference();
	}, [])

	const dateFormat = ["MM:DD:YYYY"]
	const timeZone = ["Asia/Kolkata"]
	const language = ["English (UK)"]

	const handlePassChange = async () => {
		const userId = localStorage.getItem("user")
		/* istanbul ignore next */
		if (newPassword === confirmPassword) {
			const _req = {
				"current_password": currentPassword,
				"new_password": confirmPassword,
				"user_id": userId
			}
			/* istanbul ignore next */
			const res = await passwordChange(_req);
		} else {
			setErrorMsg("Password does not match")
		}
	}

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

	const onChange = (value, field) => {
		if (value != null) {
			if (field === 'dateFormat') {
				setDateFormatValue(value)
			} else if (field === 'timeZone') {
				setTimeZoneValue(value)
			} else if (field === 'language') {
				setLanguageValue(value)
			}
		}
	}

	/* istanbul ignore next */
	const savePreference = async () => {
		try {
			dispatch(showLoader());
			const formData = new FormData();

			formData.append("file", image);
			formData.append("date_format", dateFormatValue);
			formData.append("email_address", loginDetails && loginDetails.email_id);
			formData.append("first_name", loginDetails && loginDetails.firstname);
			formData.append("last_name", loginDetails && loginDetails.lastname);
			formData.append("language", languageValue);
			formData.append("timezone", timeZoneValue);
			const saveRes = await sendUserProfile(formData);
			if (saveRes.statuscode === 200) {
				dispatch(hideLoader());
				dispatch(showNotification('success', "Updated Successfully"));
			} else {
				dispatch(hideLoader());
				dispatch(showNotification('error', saveRes.Message));
			}
		} catch (error) {
			dispatch(hideLoader());
			/* istanbul ignore next */
			dispatch(showNotification('error', error));
		}
	}

	const image_input = document.querySelector("#image-input");
	if (image_input !== null) {
		image_input.addEventListener("change", function () {
			const reader = new FileReader();
			reader.addEventListener("load", () => {
				const uploaded_image = reader.result;
				setImage(this.files[0]);
				setImagePrev(false);
				setIsUserIcon("")
				document.querySelector("#display-image").style.backgroundImage = `url(${uploaded_image})`;
			});
			reader.readAsDataURL(this.files[0]);
		});
	}


	const getProfile = async () => {
		try {
			dispatch(showLoader());
			const _getReq = {
				email_address: loginDetails && loginDetails.email_id,
				image: true
			}
			const getRes = await getUserProfile(_getReq)

			console.log("getRes", getRes);
			if (getRes.statuscode === 200) {
				dispatch(hideLoader());
				setImagePrev(true)
				setImgRes(getRes.message)
			} else {
				setImagePrev(false)
			}
		} catch (error) {
			dispatch(hideLoader());
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

			if (getRes.statuscode == 200) {
				setTimeZoneValue(getRes.message[0].time_zone);
				setDateFormatValue(getRes.message[0].date_format);
				setLanguageValue(getRes.message[0].language)
			} else {
				console.log("getRes", getRes);
			}

			dispatch(hideLoader());
		} catch (error) {
			dispatch(hideLoader());
		}
	}



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
											<img src={"data:image/png;base64," + `${imgRes}`} alt="dummy" width="300" height="300" />
											<span className="edit-icon">
												<EditOutlined />
											</span>
											<input type="file" id="image-input" accept="image/jpeg, image/png, image/jpg" />
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
											<span className="edit-icon">
												<EditOutlined />
											</span>
											<input type="file" id="image-input" accept="image/jpeg, image/png, image/jpg" />
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
							<p className="sub-heading">Changes to your language and time format will be reflected across all applications in BMS.</p>
							<div className="split-form">
								<div className="select-field">
									<SelectSearchField
										showSearch
										label='Date format'
										placeholder='Select'
										onChangeSelect={value => onChange(value, 'dateFormat')}
										//onSearchSelect={type => onSearch(type, 'dateFormat')}
										options={optionsDateFormat}
										//handleClearSearch={e => clearSearch(e, 'plant')}
										selectedValue={dateFormatValue}
									/>
									<SelectSearchField
										showSearch
										label='Time zone'
										placeholder='Select'
										onChangeSelect={value => onChange(value, 'timeZone')}
										//onSearchSelect={type => onSearch(type, 'timeZone')}
										options={optionsTimeZone}
										//handleClearSearch={e => clearSearch(e, 'plant')}
										selectedValue={timeZoneValue}
									/>
									<SelectSearchField
										showSearch
										label='Language'
										placeholder='Select'
										onChangeSelect={value => onChange(value, 'language')}
										//onSearchSelect={type => onSearch(type, 'language')}
										options={optionsLanguage}
										//handleClearSearch={e => clearSearch(e, 'plant')}
										selectedValue={languageValue}
									/>
								</div>
								<Button
									className="custom-secondary-btn "
									type="primary"
									style={{ marginTop: "40px" }}
									onClick={savePreference}
								>
									Save Changes
								</Button>
							</div>
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
										<Input.Password placeholder="input password" value={currentPassword} onChange={(e) => { setCurrentPassword(e.target.value) }} />
									</div>
									<div className="input-pass">
										<p>New password</p>
										<Input.Password placeholder="input password" value={newPassword} onChange={(e) => { setNewPassword(e.target.value) }} />
									</div>
									<div className="input-pass">
										<p>Confirm new password</p>
										<Input.Password placeholder="input password" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} />
										{errorMsg !== "" && (
											<p className="pass-error">{errorMsg}</p>
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