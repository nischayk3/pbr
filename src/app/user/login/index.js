import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Alert, Button, Checkbox, Form, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { userLogin } from "../../../api/login";
import SuccessfulImage from "../../../assets/icons/Success_image.png";
import Banner from "../../../assets/images/dashboard_login_1.png";
import microsoft from "../../../assets/images/icons8-microsoft-48.png";
import ldapIcon from "../../../assets/images/ldap-icon.png";
import { adenabled } from "../../../config/config";
import { BMS_APP_LOGIN_PASS, LDAP_LOGIN, MDH_APP_PYTHON_SERVICE, SSO_LOGIN, WITHOUT_AD_LOGIN, WITH_AD_LOGIN } from "../../../constants/apiBaseUrl";
import {
	hideLoader,
	showLoader,
	showNotification
} from "../../../duck/actions/commonActions";
import { sendLoginDetails } from "../../../duck/actions/loginAction";
import { createAccount, getAuthenticateWithLdap, loginUrl } from "../../../services/loginService";
import Auth from "../../../utils/auth";
import "./login.scss";

const Login = () => {
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [isChecked, setIsChecked] = useState(false);
	const [visible, setVisible] = useState(false);
	const [forgotPasswordFlag, setForgotPasswordFlag] = useState(false);
	const [successfulAccountCreationFlag, setSuccessfulAccountCreationFlag] = useState(false);

	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		if (localStorage.getItem("test_enabled") == null) {
			localStorage.removeItem('login_details');
			localStorage.removeItem('username');
			localStorage.removeItem('loginwith');
		}
		if (JSON.parse(localStorage.getItem("isRemember"))) {
			setEmail(localStorage.getItem("user"))
			setIsChecked(true)
		} else {
			setEmail("")
			setIsChecked(false)
		}
		localStorage.removeItem('login_details');
		localStorage.removeItem('username');
		localStorage.removeItem('loginwith');
	}, []);

	const consumerSamlLogin = async () => {
		if (localStorage.getItem("login_details")) {
			history.push("/dashboard/workspace");
			dispatch(showNotification("success", "Logged In Success"));
		} else {
			window.open(`${window.location.origin}${BMS_APP_LOGIN_PASS}/saml-login?redirect_url=${MDH_APP_PYTHON_SERVICE}/%23/dashboard/redirect&from_=UI`, '_self');
			localStorage.setItem("loginwith", 'WITH_SAML')
		}
	}

	const onFinish = async values => {
		try {
			dispatch(showLoader());
			const response = await userLogin(values);
			Auth.login({ ...response, username: values.username });
			history.push("/dashboard/view_creation");
			dispatch(hideLoader());
		} catch (err) {
			dispatch(hideLoader());
			dispatch(showNotification("error", err.message));
		}
	};

	const onLogin = async () => {
		if (localStorage.getItem("login_details")) {
			history.push("/dashboard/workspace");
			dispatch(showNotification("success", "Logged In Success"));
		} else {
			if (localStorage.getItem("test_enabled")) {
				window.open(`${loginUrl}?is_ui=True&base_url=${MDH_APP_PYTHON_SERVICE}&redirect_url=${MDH_APP_PYTHON_SERVICE}%2F%23%2Fdashboard%2Fredirect`, '_self')
				localStorage.setItem("loginwith", 'WITH_AD')
			} else {
				window.open(`${loginUrl}?is_ui=True&base_url=${MDH_APP_PYTHON_SERVICE}&redirect_url=${MDH_APP_PYTHON_SERVICE}%2F%23%2Fdashboard%2Fredirect`, '_self')
				localStorage.setItem("loginwith", 'WITH_AD')
			}
		}
	}

	const handleLogin = async () => {
		let req = {};

		let header = {
			password: password,
			username: email
		};

		try {
			localStorage.setItem("loginwith", "WITH_AD");
			localStorage.setItem("user", "dinesh.kumar@mareana.com");
			localStorage.setItem("username", "Dinesh");
			localStorage.setItem(
				"login_details", JSON.stringify({
					"Session_Type": "Manual",
					"ad_role": false,
					"email_id": "dinesh.kumar@mareana.com",
					"firstname": "Dinesh",
					"lastname": "Kumar",
					"mdh_role": [
						"MI_CYPRESS_TESTCASE"
					],
					"resource_action": {
						"AUDIT_REPORT": {
							"actions": [
								"READ",
								"MAINT",
								"DOWNLOAD"
							],
							"resource_id": 10
						},
						"AUTO_ML": {
							"actions": [
								"READ",
								"MAINT",
								"UPLOAD",
								"APPR",
								"DOWNLOAD"
							],
							"resource_id": 14
						},
						"CHART": {
							"actions": [
								"READ",
								"MAINT",
								"APPR",
								"DOWNLOAD",
								"SHARE"
							],
							"resource_id": 2
						},
						"CROSS_BATCH": {
							"actions": [
								"READ",
								"MAINT"
							],
							"resource_id": 15
						},
						"DASHBOARD": {
							"actions": [
								"READ",
								"MAINT",
								"DOWNLOAD"
							],
							"resource_id": 4
						},
						"DATA_ACCESS": {
							"actions": [
								"READ",
								"MAINT"
							],
							"resource_id": 23
						},
						"DSS": {
							"actions": [
								"READ",
								"MAINT",
								"UPLOAD"
							],
							"resource_id": 12
						},
						"ELOG_BOOK_DATA_ENTRY": {
							"actions": [
								"READ",
								"MAINT",
								"UPLOAD",
								"APPR",
								"DOWNLOAD"
							],
							"resource_id": 21
						},
						"ELOG_BOOK_TEMPLATE_CREATION": {
							"actions": [
								"READ",
								"MAINT",
								"UPLOAD",
								"APPR",
								"DOWNLOAD"
							],
							"resource_id": 22
						},
						"GENEALOGY": {
							"actions": [
								"READ",
								"MAINT",
								"UPLOAD",
								"DOWNLOAD"
							],
							"resource_id": 3
						},
						"HIERARCHY_CONFIG": {
							"actions": [
								"READ",
								"MAINT"
							],
							"resource_id": 11
						},
						"LIMIT_CONFIG": {
							"actions": [
								"READ",
								"MAINT"
							],
							"resource_id": 25
						},
						"PARAM_DATA_FILE_UPLOAD": {
							"actions": [
								"READ",
								"UPLOAD"
							],
							"resource_id": 5
						},
						"PBR_DASHBOARD": {
							"actions": [
								"READ",
								"MAINT",
								"APPR"
							],
							"resource_id": 17
						},
						"PBR_FILE_SEARCH": {
							"actions": [
								"READ"
							],
							"resource_id": 27
						},
						"PBR_FILE_UPLOAD": {
							"actions": [
								"READ",
								"MAINT",
								"UPLOAD",
								"APPR"
							],
							"resource_id": 18
						},
						"PBR_TEMPLATE": {
							"actions": [
								"READ",
								"MAINT",
								"APPR"
							],
							"resource_id": 16
						},
						"REPORT_DESIGNER": {
							"actions": [
								"READ",
								"MAINT",
								"APPR",
								"DOWNLOAD"
							],
							"resource_id": 8
						},
						"REPORT_GENERATOR": {
							"actions": [
								"READ",
								"MAINT",
								"APPR",
								"DOWNLOAD"
							],
							"resource_id": 6
						},
						"ROLES_CONFIG": {
							"actions": [
								"READ",
								"MAINT"
							],
							"resource_id": 20
						},
						"SYSTEM_CONFIG": {
							"actions": [
								"READ",
								"MAINT"
							],
							"resource_id": 26
						},
						"TABLEAU_DASHBOARD": {
							"actions": [
								"READ",
								"MAINT"
							],
							"resource_id": 24
						},
						"USER_CONFIG": {
							"actions": [
								"READ",
								"MAINT",
								"UPLOAD",
								"APPR",
								"DOWNLOAD"
							],
							"resource_id": 19
						},
						"USER_REPORT": {
							"actions": [
								"READ"
							],
							"resource_id": 13
						},
						"VIEW": {
							"actions": [
								"READ",
								"MAINT",
								"UPLOAD",
								"APPR"
							],
							"resource_id": 1
						},
						"WORKITEMS": {
							"actions": [
								"READ",
								"MAINT",
								"APPR"
							],
							"resource_id": 7
						}
					},
					"screen_set": null,
					"token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IkRpbmVzaCAgS3VtYXIiLCJ1bml4X3RpbWVzdGFtcCI6MTY3NzgwMTU2Mi44MDY0LCJ0aW1lc3RhbXAiOiIwMy8wMy8yMDIzIDA1OjI5OjIyIiwiZXhwIjoxMTEzODYyMTM2MiwiYWRfcm9sZSI6ZmFsc2UsIm1kaF9yb2xlIjpbIk1JX0NZUFJFU1NfVEVTVENBU0UiXSwiZW1haWxfaWQiOiJkaW5lc2gua3VtYXJAbWFyZWFuYS5jb20iLCJjdXN0X2tleSI6IjEwMDAifQ.QucHgVUD4M6EpxDa5dNGXx2khGExDpoqHiHArbeYnrw",
					"user_id": "dinesh.kumar@mareana.com"
				})
			);
			history.push("/dashboard/workspace");
			dispatch(hideLoader());

		} catch (error) {
			dispatch(hideLoader());
			dispatch(showNotification("error", "Incorrect credentials"));
		}
	};

	const handleLoginLdap = async () => {
		let req = {};
		let header = {
			password: password,
			username: email
		};
		try {
			dispatch(showLoader());
			const res = await getAuthenticateWithLdap(req, header);

			let data = res["token"];
			if (data) {
				dispatch(sendLoginDetails(data));
				localStorage.setItem("login_details", JSON.stringify(data));
				localStorage.setItem("user", data.email_id.replaceAll("^\"|\"$", ""));
				localStorage.setItem("username", data?.firstname ? data.firstname.replaceAll("^\"|\"$", "") : data.email_id.replaceAll("^\"|\"$", ""));
				localStorage.setItem("loginwith", 'WITH_LDAP')
				localStorage.setItem("user_id", data?.user_id)

				dispatch(showNotification("success", `Logged in as ${data.email_id}`));
				if (isChecked) {
					localStorage.setItem("isRemember", isChecked);
					setEmail(localStorage.getItem("user"))
					setIsChecked(true)
				} else {
					localStorage.setItem("isRemember", false);
					setEmail("")
					setIsChecked(false)
				}
				history.push("/dashboard/workspace");
				dispatch(hideLoader());
			} else {
				dispatch(showNotification("error", "Error in Login"));
				dispatch(hideLoader());
				history.push("/user/login");
			}
		} catch (error) {
			dispatch(hideLoader());
			dispatch(showNotification("error", "Incorrect credentials"));
		}
	};

	const handleCancel = () => {
		setVisible(false);
		setForgotPasswordFlag(false);
		setSuccessfulAccountCreationFlag(false)
	};

	const forgotPassword = () => {
		setUsername("");
		setVisible(true);
		setForgotPasswordFlag(true);
		setSuccessfulAccountCreationFlag(false);
	}
	const registerAccount = async () => {
		let req = {};
		let header = {
			username: username,
			"is-signup": forgotPasswordFlag ? false : true,
		};
		try {
			dispatch(showLoader());
			const res = await createAccount(req, header);
			if (res.Status == 200) {
				setSuccessfulAccountCreationFlag(true);
				dispatch(hideLoader());
			} else {
				dispatch(showNotification("error", res.Message));
				dispatch(hideLoader());
				history.push("/user/login");
			}
		} catch (error) {
			dispatch(hideLoader());
			dispatch(showNotification("error", "Error while registering the user"));
		}
	};

	return (
		<>
			<div className="login-wrapper bg-img">

				<div className="login-split ">
					<div className="login-left">
						<img
							src={Banner}
							height="500px"
							style={{ display: "flex", justifyContent: "center" }}
						/>
					</div>
					<div className="login-right">
						<div>
							<p className="login-head">Login</p>
							<p className="login-desc">
								Welcome Back! Please enter your details
							</p>
						</div>

						<div className="login-input">
							<Input
								className="input-prefix"
								placeholder="Enter username: admin or user"
								prefix={<UserOutlined />}
								value={email}
								onChange={(e) => setEmail(e.target.value)}

							/>
						</div>

						<div className="login-input">
							<Input.Password
								className="input-prefix"
								placeholder="Enter password: **********"
								prefix={<LockOutlined />}
								value={password}
								onChange={(e) => setPassword(e.target.value)}

							/>
						</div>

						<div className="forgot-pwd">
							<Checkbox color="primary" checked={isChecked} onChange={(e) => {
								setIsChecked(e.target.checked)
							}} >
								Remember me
							</Checkbox>
							<p onClick={forgotPassword} style={{ cursor: 'pointer' }}>Forgot your password?</p>
						</div>

						{WITHOUT_AD_LOGIN === 'true' ? (
							<Button className="login-btn" onClick={() => handleLogin()}>Log In</Button>
						) : (<></>)}

						{LDAP_LOGIN === 'true' ? (
							<Button
								className="microsoft-btn"
								onClick={() => handleLoginLdap()}>
								<span>
									<img src={ldapIcon} />
								</span>
								Sign In with LDAP
							</Button>
						) : (<></>)}

						<p className="or">Or</p>

						{SSO_LOGIN === 'true' ? (
							<Button
								className="login-btn"
								onClick={() => { consumerSamlLogin() }}>
								Login with SSO
							</Button>
						) : (<></>)}

						<div className="card card-white card-changes">
							<div className="card-content card-container-change">
								<Form
									name="basic"
									initialValues={{
										remember: true
									}}
									onFinish={adenabled ? onLogin : onFinish}>
									{!adenabled ? (
										<>
											<Form.Item
												label="Username"
												name="username"
												rules={[
													{
														required: true,
														message: "Please enter your username!"
													}
												]}>
												<Input id="username" />
											</Form.Item>

											<Form.Item
												label="Password"
												name="password"
												rules={[
													{
														required: true,
														message: "Please enter your password!"
													}
												]}>
												<Input.Password id="password" />
											</Form.Item>
										</>
									) : (
										<></>
									)}

									{WITH_AD_LOGIN === 'true' ? (
										<Form.Item>
											<Button
												htmlType="submit"
												id="login-btn"
												className="microsoft-btn">
												<span>
													<img src={microsoft} height="25px" />
												</span>
												Sign In with Microsoft
											</Button>
										</Form.Item>
									) : (<></>)}
								</Form>
							</div>
						</div>
						{/* <p className="signup-text">
							Don't have an account? <span className="sign-up" onClick={showModal}>Sign up</span>
						</p> */}
					</div>
				</div>

			</div>
			<div>
				<Modal
					title={forgotPasswordFlag && successfulAccountCreationFlag == false ? 'Forgot Password' : successfulAccountCreationFlag ? '' : 'Signup'}
					style={{ right: 80, top: 120 }}
					visible={visible}
					onCancel={handleCancel}
					footer={false}
					className='signup-modal'
				>
					{successfulAccountCreationFlag == false ?
						(
							<>
								<p className='signup-modal-text' style={{ display: 'flex', justifyContent: 'center' }}>{forgotPasswordFlag ? 'No worries, lets reset your password to help you get back in' : 'Hey there, lets create your account!'}</p>
								<div className='signup-center'>
									<div className="login-input">
										<Input
											type='email'
											className="input-prefix"
											placeholder="Enter username: admin or user"
											prefix={<UserOutlined />}
											value={username}
											onChange={(e) => setUsername(e.target.value)}

										/>
									</div>
									<Button className="login-btn" onClick={registerAccount}>{forgotPasswordFlag ? 'Generate Password' : 'Create Account'}</Button>
								</div>
							</>
						) : (
							<div className='signup-center'>
								<div>
									<img
										src={SuccessfulImage}
										height="300px"
										width='360px'
									/>
								</div>
								<Alert
									style={{ marginTop: '20px' }}
									message={forgotPasswordFlag ? 'Password Generated' : 'Account Created'}
									description={<p>Check your inbox for the password and  <a onClick={() => window.location.reload()}>login here</a></p>}
									type="success"
									showIcon
								/>
							</div>
						)}
				</Modal>
			</div>
		</>
	);
};

export default Login;