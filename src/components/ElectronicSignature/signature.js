/* eslint-disable react/prop-types */
import { Button, Input, Modal, Select } from "antd";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { BMS_APP_LOGIN_PASS, MDH_APP_PYTHON_SERVICE } from "../../constants/apiBaseUrl";
import {
	hideLoader,
	showLoader,
	showNotification
} from "../../duck/actions/commonActions";
import {
	approveRecord,
	eSign,
	publishEvent
} from "../../services/electronicSignatureService";
import {
	consumerSamlLogin,
	getAuthenticate,
	getAuthenticateWithLdap,
	getAuthenticateWithoutAD
} from "../../services/loginService";
import "./styles.scss";

const { Option } = Select;

const Signature = (props) => {
	const location = useLocation();
	const params = queryString.parse(location.search);
	// eslint-disable-next-line react/prop-types
	const { isPublish, handleClose } = props;
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [reason, setReason] = useState("");
	const [isauth, setIsAuth] = useState("");
	const [loginStatus, setLoginStatus] = useState("");
	const [checkRejectReason, setCheckRejectReason] = useState(false);

	const dispatch = useDispatch();

	useEffect(() => {
		const loginDetails = JSON.parse(localStorage.getItem("login_details"));
		const status = localStorage.getItem("loginwith");

		if
			(status) {
			setLoginStatus(status);
		}
		if (loginDetails) {
			setUsername(loginDetails.email_id);
		}
	}, []);

	const authenticateUser = async () => {
		let req = {};
		let header = {
			password: password,
			username: username,
		};
		try {
			dispatch(showLoader());
			const res = await getAuthenticate(req, header);
			if (res.Status != 200) {
				setIsAuth("");
				dispatch(showNotification("error", "Incorrect credentials"));
				handleClose();
			} else {
				// eslint-disable-next-line react/prop-types
				setIsAuth(props.status);
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
			username: username,
		};
		try {
			dispatch(showLoader());
			const res = await getAuthenticateWithoutAD(req, header);
			if (res.Status != 200) {
				setIsAuth("");
				dispatch(showNotification("error", "Incorrect credentials"));
				handleClose();
			} else {
				// eslint-disable-next-line react/prop-types
				setIsAuth(props.status);
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
			username: username,
		};
		try {
			dispatch(showLoader());
			const res = await getAuthenticateWithLdap(req, header);
			if (res.Status != 200) {
				setIsAuth("");
				dispatch(showNotification("error", "Incorrect credentials"));
				handleClose();
			} else {
				// eslint-disable-next-line react/prop-types
				setIsAuth(props.status);
			}
			dispatch(hideLoader());
		} catch (error) {
			dispatch(hideLoader());
			dispatch(showNotification("error", "Incorrect credentials"));
		}
	};

	const handleConfirm = async () => {
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
		req["screen"] = props.screenName;
		req["first_name"] = "first_name";
		req["last_name"] = "last_name";
		let login_response = JSON.parse(localStorage.getItem("login_details"));
		let headers = {
			"content-type": "application/json",
			"resource-name":
				props.appType == "REPORT_DESIGNER"
					? "REPORT_DESIGNER"
					: props.appType == "AUTO_ML"
						? "AUTO_ML"
						: props.appType == "ELOGBOOK-READING"
							? "DASHBOARD"
							: props.appType,
			"x-access-token": login_response.token ? login_response.token : "",
		};

		try {
			let esign_response = await eSign(req, headers);

			if (esign_response.statuscode == 200) {
				dispatch(showNotification("success", esign_response.message));
				setReason("");
				setPassword("");
				handleClose();
				setIsAuth("");
				let reqs = {};
				let req1 = {};
				let user_details = JSON.parse(localStorage.getItem("login_details"));
				let user = user_details["email_id"] ? user_details["email_id"] : "";

				reqs["application_type"] = props.appType;
				reqs["created_by"] = user;
				reqs["esign_id"] = esign_response.primary_id;
				reqs["disp_id"] = props.dispId;
				reqs["version"] = parseInt(props.version);

				req1["applicationType"] = props.appType;
				req1["esignId"] = esign_response.primary_id.toString();
				req1["resourceDispId"] = params.id;

				if (params.version != "undefined") {
					req1["resourceVersion"] = parseInt(params.version);
				}
				req1["status"] = props.status;

				//callback esign id
				if (props.eSignId) {
					props.eSignId(esign_response.primary_id);
				}

				let publish_response = {};
				if (props.appType == "ELOG_BOOK_DATA_ENTRY") {
					publish_response = await publishEvent(reqs, headers);
				} else {
					publish_response =
						Object.keys(params).length > 0 && params.fromScreen !== "Workspace"
							? await approveRecord(req1)
							: await publishEvent(reqs, headers);
				}

				if (publish_response.status_code == 200) {
					dispatch(showNotification("success", publish_response.msg));
					props.PublishResponse(publish_response);
				} else if (publish_response.Status == 200) {
					dispatch(showNotification("success", publish_response.Message));
					props.PublishResponse(publish_response);
				} else {
					dispatch(showNotification("error", publish_response.msg));
				}
			} else if (esign_response.Status == 403) {
				dispatch(showNotification("error", esign_response.Message));
			} else {
				dispatch(showNotification("error", esign_response.Message));
			}
		} catch (error) {
			dispatch(showNotification("error", error));
		}
	};

	const samlRedirect = async () => {
		const url = `${MDH_APP_PYTHON_SERVICE}/#/dashboard/saml-redirect`
		const encoded = encodeURI(url);

		const _reqSaml = {
			SignedInfoData: {
				Reason: reason,
				screenName: props.screenName,
				appType: props.appType,
				dispId: props.dispId,
				version: props.version,
				resourceDispId: params.id,
				resourceVersion: params.version,
				status: props.status,
				parameter: params
			},
			redirect_url: decodeURI(encoded)
		}

		const samlLogin = await consumerSamlLogin(_reqSaml);
		if (samlLogin.Status == 200) {
			window.open(`${window.location.origin}${BMS_APP_LOGIN_PASS}/saml-login-redirect`, '_self')
			localStorage.setItem('redirectUrl', `${location.pathname}${location.search}`)
		}
	}

	useEffect(() => {
		if (!isPublish) {
			setReason("")
			setCheckRejectReason(false)
		}
	}, [isPublish])

	return (
		<div>
			<Modal
				className="electronic-signature-modal"
				visible={isPublish}
				title="Enter details to confirm update"
				width={500}
				mask={true}
				onCancel={() => {
					handleClose();
					setIsAuth("");
				}}
				footer={
					isauth === "A" || isauth === "R" || isauth === "P"
						? [
							<Button
								className="custom-primary-btn"
								key="2"
								onClick={() => {
									handleClose();
									setIsAuth("");
								}}
							>
								Cancel
							</Button>,
							<Button
								className="custom-secondary-btn"
								disabled={!reason?.length}
								key="1"
								onClick={() => {
									handleConfirm();
								}}
							>
								Confirm
							</Button>,
						]
						: [
							loginStatus == "WITH_AD" ? (
								<Button
									className="custom-secondary-btn"
									key="3"
									onClick={() => authenticateUser()}
									disabled={username == "" || password == ""}
								>
									Authenticate with AD
								</Button>
							) : loginStatus == "WITHOUT_AD" ? (
								<Button
									className="custom-secondary-btn"
									key="3"
									disabled={username == "" || password == ""}
									onClick={() => authenticateUserWithoutAD()}
								>
									Authenticate without AD
								</Button>
							) : loginStatus == "WITH_LDAP" ? (
								<Button
									className="custom-secondary-btn"
									key="3"
									disabled={username == "" || password == ""}
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
							) : null,
						]
				}
			>
				<div className="electronic-sig">
					{loginStatus !== "WITH_SAML" ? (
						<>
							<div className="sign-cols">
								<div>
									<p style={{ margin: "8px 0px" }}>User ID</p>
									<Input
										value={username}
										disabled
										onChange={(e) => setUsername(e.target.value)}
									/>
								</div>
								<div>
									<p style={{ margin: "8px 0px" }}>Password</p>
									<Input
										type="password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
								</div>
							</div>
							{((isauth === "A" && props.status === "A") ||
								(isauth === "P" && props.status === "P")) && (
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

							{(isauth === "R" && props.status === "R") || checkRejectReason ? (
								<div>
									<p>Comment*</p>
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
						</>
					) : (
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
			</Modal>
		</div>
	);
};

export default Signature;