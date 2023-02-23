import { Button, Input, Modal, Select } from "antd";
import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { BMS_APP_LOGIN_PASS, MDH_APP_PYTHON_SERVICE } from "../../constants/apiBaseUrl";
import {
	hideLoader, showLoader, showNotification
} from "../../duck/actions/commonActions";
import {
	eSign
} from "../../services/electronicSignatureService";
import { consumerSamlLogin, getAuthenticate, getAuthenticateWithoutAD } from '../../services/loginService';
import { createUsers } from '../../services/userRolesAndAccessService';
import './importUser.scss';

const { Option } = Select;

function Esign(props) {
	const location = useLocation();

	let { showEsign, userType, screenName, fileID, handleEsignCancle, handlePopUpClose, appType } = props
	const dispatch = useDispatch();
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [reason, setReason] = useState("");
	const [isAuth, setIsAuth] = useState(false);
	const [loginStatus, setLoginStatus] = useState("");
	const [checkRejectReason, setCheckRejectReason] = useState(false);

	useEffect(() => {
		const loginDetails = JSON.parse(localStorage.getItem("login_details"));
		const status = localStorage.getItem("loginwith")
		if (status) {
			setLoginStatus(status);
		}
		if (loginDetails) {
			setUsername(loginDetails.email_id)
		}
	}, []);

	const authenticateUser = async () => {
		let req = {};
		let header = {
			password: password,
			username: username
		};
		try {
			dispatch(showLoader());
			const res = await getAuthenticate(req, header);
			if (res.Status != 200) {
				setIsAuth("");
				dispatch(showNotification("error", res.Message));
			} else {
				setIsAuth(true);
			}
			dispatch(hideLoader());
		} catch (error) {
			dispatch(hideLoader());
			dispatch(showNotification("error", "Incorrect credentials"));
		}
	};

	const authenticateUserWithoutAD = async () => {
		let req = {};
		let header = {
			password: password,
			username: username
		};
		try {
			dispatch(showLoader());
			const res = await getAuthenticateWithoutAD(req, header);
			if (res.Status != 200) {
				setIsAuth("");
				dispatch(showNotification("error", "Incorrect credentials"));
			} else {
				setIsAuth(true);
			}
			dispatch(hideLoader());
		} catch (error) {
			dispatch(hideLoader());
			dispatch(showNotification("error", "Incorrect credentials"));
		}
	};

	const authenticateWithLdap = async () => {
		let req = {};
		let header = {
			password: password,
			username: username
		};
		try {
			dispatch(showLoader());
			const res = await getAuthenticateWithLdap(req, header);
			if (res.Status != 200) {
				setIsAuth("");
				dispatch(showNotification("error", "Incorrect credentials"));
			} else {
				// eslint-disable-next-line react/prop-types
				setIsAuth(true);
			}
			dispatch(hideLoader());
		} catch (error) {
			dispatch(hideLoader());
			dispatch(showNotification("error", "Incorrect credentials"));
		}
	};

	const handleConfirm = async () => {
		let login_response = JSON.parse(localStorage.getItem("login_details"));
		try {
			dispatch(showLoader());
			var today = new Date();
			var h = today.getHours();
			var m = today.getMinutes();
			var s = today.getSeconds();
			let time_today = h + ":" + m + ":" + s;
			var date = new Date();
			var day = date.getDate();
			var month = date.getMonth() + 1;
			var year = date.getFullYear();
			let date_today = year + "-" + month + "-" + day;
			let req = {};

			req["date"] = date_today;
			req["timestamp"] = time_today;
			req["reason"] = reason;
			req["user_id"] = username;
			// eslint-disable-next-line react/prop-types
			req["screen"] = screenName ? screenName : "CONFIGURATION";
			req["first_name"] = login_response?.firstname ? login_response?.firstname : '';
			req["last_name"] = login_response?.lastname ? login_response?.lastname : '';

			let headers = {
				"content-type": "application/json",
				"resource-name": "CONFIGURATION",
				"x-access-token": login_response.token ? login_response.token : ""

			};
			let esign_response = await eSign(req, headers);
			if (esign_response.statuscode == 200) {
				let req = {
					esign_id: esign_response?.primary_id,
					file_id: fileID,
					flag: userType,
					reason: reason
				}
				let res = await createUsers(req);
				if (res.Status == 200) {
					dispatch(showNotification("success", res.message));
					setReason("")
					setPassword("")
					setIsAuth('')
					handleEsignCancle()
					handlePopUpClose()
					dispatch(hideLoader());
				} else {
					dispatch(hideLoader());
					dispatch(showNotification("error", res.message));
				}
			} else {
				dispatch(hideLoader());
				dispatch(showNotification("error", esign_response.message));
			}
		}
		catch (err) {
			dispatch(showNotification("error", "Error Occured"));
		}
	};

	const samlRedirect = async () => {
		const url = `${MDH_APP_PYTHON_SERVICE}/#/dashboard/saml-redirect`
		const encoded = encodeURI(url);

		const _reqSaml = {
			SignedInfoData: {
				Reason: reason,
				screenName: screenName,
				appType: appType,
				fileID: fileID,
				userType: userType,

			},
			redirect_url: decodeURI(encoded)
		}

		const samlLogin = await consumerSamlLogin(_reqSaml);
		if (samlLogin.Status == 200) {
			window.open(`${window.location.origin}${BMS_APP_LOGIN_PASS}/saml-login-redirect`, '_self')
			localStorage.setItem('redirectUrl', `${location.pathname}${location.search}`)
		}
	}

	return (
		<div>
			<Modal
				className='modal_digitalSignature'
				title='Digital Signature'
				visible={showEsign}
				footer={null}
				onCancel={() => handleEsignCancle()}
			>
				<div className='sign-form1'>
					{loginStatus !== "WITH_SAML" ? (
						<>
							<div className='sign-cols1'>
								<div>
									<p>Username</p>
									<Input
										disabled
										placeholder='Username'
										value={username}
										onChange={(e) => setUsername(e.target.value)}

									/>
								</div>
								<div>
									<p>Password</p>
									<Input
										placeholder='Password'
										autocomplete='new-password'
										type='password'
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
								</div>
							</div>
							{isAuth && (
								<div>
									<p style={{ margin: "8px 0px" }}>Signing</p>
									<Select
										onChange={(e, value) => {
											let reason_value = value.value ? value.value : "";
											setReason(reason_value);
										}}
										className="sign-select"
									>
										<Option key="Signing on behalf of team mate">
											Signing on behalf of team mate
										</Option>
										<Option key="I am an approver">I am an approver</Option>
										<Option key="I am the author">I am the author</Option>
										{/* <Option key="Other Reason">Other Reason</Option> */}
									</Select>
								</div>
							)}
							{(isAuth === "R" && props.status === "R") || checkRejectReason ? (
								<div>
									<p>Comment</p>
									<Input.TextArea
										rows={3}
										value={reason}
										style={{ width: "450px" }}
										onChange={(e) => {
											setReason(e.target.value);
										}}
									/>
								</div>
							) : (
								""
							)}
						</>) : (
						<div>
							<p style={{ margin: "8px 0px" }}>Signing</p>
							<Select
								onChange={(e, value) => {
									let reason_value = value.value ? value.value : "";
									if (reason_value === "Other Reason") {
										setCheckRejectReason(true);
										setReason("");
									} else {
										setReason(reason_value);
										setCheckRejectReason(false);
									}
								}}
								className="sign-select"
							>
								<Option key="Signing on behalf of team mate">
									Signing on behalf of team mate
								</Option>
								<Option key="I am an approver">I am an approver</Option>
								<Option key="I am the author">I am the author</Option>
								<Option key="Other Reason">Other Reason</Option>
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
								onClick={() => handleConfirm()}
							>
								Confirm
							</Button>
							<Button
								className='custom-primary-btn'
								onClick={() => handleEsignCancle()}
							>
								Cancel
							</Button>
						</>
					) : (
						<>
							{loginStatus == "WITH_AD" ? (
								<Button
									type='primary'
									id="auth_with_ad"
									style={{
										backgroundColor: '#093185',
									}}
									disabled={username == '' || password == ''}
									onClick={() => authenticateUser()}
								>
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
									onClick={() => authenticateUserWithoutAD()}
								>
									Authenticate without AD
								</Button>
							) : loginStatus == "WITH_LDAP" ? (
								<Button
									type='primary'
									id="auth_without_ad"
									style={{
										backgroundColor: '#093185',
									}}
									disabled={username == '' || password == ''}
									onClick={() => authenticateWithLdap()}
								>
									Authenticate with LDAP
								</Button>
							) : loginStatus == "WITH_SAML" ? (
								<Button
									className="custom-secondary-btn"
									key="3"
									// disabled={username == "" || password == ""}
									onClick={() => samlRedirect()}
								>
									Authenticate with SAML
								</Button>
							) : null}
						</>
					)}
				</div>
			</Modal>
		</div>
	)
}

export default Esign