/**
 * @author Dinesh
 * @Mareana - CPV Product
 * @version  1
 * @Last Modified - 09 Aug, 2022
 * @Last Changed By - Dinesh
 */

import { UserOutlined } from '@ant-design/icons';
import { Alert, Avatar, Button, Input } from 'antd';
import React, { useState } from "react";
import BreadCrumbWrapper from "../../../../components/BreadCrumbWrapper";
import InputField from '../../../../components/InputField/InputField';
import SelectSearchField from "../../../../components/SelectSearchField/SelectSearchField";
import { passwordChange } from "../../../../services/loginService";
import "./style.scss";

const Profile = () => {
	const loginDetails = JSON.parse(localStorage.getItem("login_details"))
	const loginWith = localStorage.getItem("loginwith")

	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("")
	const [errorMsg, setErrorMsg] = useState("");


	const handlePassChange = async () => {
		const userId = localStorage.getItem("user")

		if (newPassword === confirmPassword) {
			const _req = {
				"current_password": currentPassword,
				"new_password": confirmPassword,
				"user_id": userId
			}
			const res = await passwordChange(_req);
		} else {
			setErrorMsg("Password does not match")
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
							<Avatar size={137}
								style={{
									padding: "10px 0",
									margin: "10px 0"
								}}
								icon={<UserOutlined />} />
						</div>
						<div className="edit-form">
							<p className="heading">Basic Information</p>
							<div className="split-form">
								<div>
									<InputField
										label="First name"
										value={loginDetails && loginDetails.firstname}
										disabled
									/>
									<InputField
										label="Email"
										value={loginDetails && loginDetails.email_id}
										disabled
									/>
								</div>
								<div>
									<InputField
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
									// onChangeSelect={value => onChangeParam(value, 'plant')}
									// onSearchSelect={type => onSearchParam(type, 'plant')}
									// options={optionsPlant}
									//handleClearSearch={e => clearSearch(e, 'plant')}
									//selectedValue={selectParam['plant']}
									/>
									<SelectSearchField
										showSearch
										label='Time zone'
										placeholder='Select'
									// onChangeSelect={value => onChangeParam(value, 'plant')}
									// onSearchSelect={type => onSearchParam(type, 'plant')}
									// options={optionsPlant}
									//handleClearSearch={e => clearSearch(e, 'plant')}
									//selectedValue={selectParam['plant']}
									/>
									<SelectSearchField
										showSearch
										label='Language'
										placeholder='Select'
									// onChangeSelect={value => onChangeParam(value, 'plant')}
									// onSearchSelect={type => onSearchParam(type, 'plant')}
									// options={optionsPlant}
									//handleClearSearch={e => clearSearch(e, 'plant')}
									//selectedValue={selectParam['plant']}
									/>
								</div>
								<Button
									className="custom-secondary-btn "
									type="primary"
									style={{ marginTop: "40px" }}
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