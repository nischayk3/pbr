/* eslint-disable react/prop-types */
import { Button, Input, Modal, Select } from "antd";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { BMS_APP_LOGIN_PASS, MDH_APP_PYTHON_SERVICE } from "../../constants/apiBaseUrl";
import {
	hideLoader,
	showLoader,
	showNotification
} from "../../duck/actions/commonActions";
import {
	approveRecord,
	eSign,
	eSignReason,
	publishEvent
} from "../../services/electronicSignatureService";
import {
	consumerSamlLogin,
	getAuthenticate,
	getAuthenticateWithLdap,
	getAuthenticateWithoutAD
} from "../../services/loginService";
import { currentTimeStamp, latestDate } from "../../utils/dateHelper";
import "./styles.scss";


const Signature = (props) => {
	const history = useHistory();
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
	const [reasonList, setReasonList] = useState([]);
	const [otherReason, setOtherReason] = useState('');

	const dispatch = useDispatch();
	const login_response = JSON.parse(localStorage.getItem("login_details"));

	useEffect(() => {
		const status = localStorage.getItem("loginwith");
		if (status) {
			setLoginStatus(status);
		}
		if (login_response) {
			const userId = status == "WITHOUT_AD" ? login_response?.user_id : login_response?.email_id
			setUsername(userId);
		}
	}, []);

	useEffect(() => {
		if (!isPublish) {
			setReason("")
			setCheckRejectReason(false)
		}
		if (isPublish) {
			getReasonList()
		}
	}, [isPublish])


	const getReasonList = async () => {
		const _headers = {
			"content-type": "application/json",
			"x-access-token": login_response.token ? login_response.token : "",
			"resource-name": "WORKITEMS",
		};
		const _req = {}
		try {
			const reason = await eSignReason(_req, _headers)
			if (reason.statuscode === 200) {
				const reasonData = [];
				const data = reason?.message

				data.forEach((item) => {
					let obj = {};
					obj['value'] = item;
					obj['label'] = item;
					reasonData.push(obj)
				})

				setReasonList(reasonData)
			} else {
				dispatch(showNotification("error", reason.message));
			}
		} catch (error) {
			dispatch(showNotification("error", error));
		}
	}


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
		let req = {};

		req["date"] = latestDate();
		req["timestamp"] = currentTimeStamp();
		req["reason"] = reason === 'Reason for signature' ? otherReason : isauth === "R" ? otherReason : reason;
		req["user_id"] = username;
		// eslint-disable-next-line react/prop-types
		req["screen"] = props.screenName;
		req["first_name"] = login_response?.firstname ? login_response?.firstname : '';
		req["last_name"] = login_response?.lastname ? login_response?.lastname : '';

		let headers = {
			"content-type": "application/json",
			"resource-name":
				props.appType == "REPORT_DESIGNER"
					? "REPORT_DESIGNER"
					: props.appType == "AUTO_ML"
						? "AUTO_ML"
						: props.appType == "ELOGBOOK-READING"
							? "DASHBOARD"
							: params?.fromScreen == 'Workflow'
								? 'WORKITEMS'
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

					publish_response = Object.keys(params).length > 0 && params.fromScreen !== "Workflow"
						? await publishEvent(reqs, headers) : await approveRecord(req1)

				} else if (props.appType == "PBR_TEMPLATE") {
					if (params.fromScreen == "Workflow" || params.fromScreen == "Workspace") {
						publish_response =
							Object.keys(params).length > 0 && params.fromScreen !== "Workspace"
								? await approveRecord(req1)
								: await publishEvent(reqs, headers);
					} else {
						publish_response =
							Object.keys(params).length > 0 && await approveRecord(req1)
					}

				} else {
					publish_response =
						Object.keys(params).length > 0 && params.fromScreen !== "Workspace"
							? await approveRecord(req1)
							: await publishEvent(reqs, headers);
				}

				if (publish_response.status_code == 200) {
					dispatch(showNotification("success", publish_response.msg));
					props.PublishResponse(publish_response);
					if (location?.state?.path) {
						history.push(`${location.state.path}`)
					}

				} else if (publish_response.Status == 200) {
					dispatch(showNotification("success", publish_response.Message));
					props.PublishResponse(publish_response);
					if (location?.state?.path) {
						history.push(`${location.state.path}`)
					}
				}
				// else {
				// 	dispatch(showNotification("error", publish_response.msg));
				// }
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
				Reason: reason === 'Reason for signature' ? otherReason : isauth === "R" ? otherReason : reason,
				screenName: props.screenName,
				appType: props.appType,
				dispId: props.dispId,
				version: props.version,
				resourceDispId: params.id,
				resourceVersion: params.version,
				status: props.status,
				parameter: params,
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
								id="cancel"
							>
								Cancel
							</Button>,
							<Button
								className="custom-secondary-btn"
								disabled={!reason?.length && !otherReason?.length}
								id="confirm"
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
									id='auth_with_ad'
									className="custom-secondary-btn"
									key="3"
									onClick={() => authenticateUser()}
									disabled={username == "" || password == ""}
								>
									Authenticate with AD
								</Button>
							) : loginStatus == "WITHOUT_AD" ? (
								<Button
									id="auth_without_ad"
									className="custom-secondary-btn"
									key="3"
									disabled={username == "" || password == ""}
									onClick={() => authenticateUserWithoutAD()}
								>
									Authenticate without AD
								</Button>
							) : loginStatus == "WITH_LDAP" ? (
								<Button
									id="auth_without_ldap"
									className="custom-secondary-btn"
									key="3"
									disabled={username == "" || password == ""}
									onClick={() => authenticateWithLdap()}
								>
									Authenticate with LDAP
								</Button>
							) : loginStatus == "WITH_SAML" ? (
								<Button
									id="auth_without_saml"
									className="custom-secondary-btn"
									key="4"
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
										id="username"
										value={username}
										disabled
										onChange={(e) => setUsername(e.target.value)}
									/>
								</div>
								<div>
									<p style={{ margin: "8px 0px" }}>Password</p>
									<Input
										id="password"
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
												if (reason_value === "Reason for signature") {
													setCheckRejectReason(true);
													setReason(reason_value);
													setOtherReason('')
												} else {
													setReason(reason_value);
													setCheckRejectReason(false);
												}
											}}
											value={reason}
											placeholder="Select reason"
											options={reasonList}
											className="sign-select"
											id="esign_reason"
										/>

									</div>
								)}

							{(isauth === "R" && props.status === "R") || checkRejectReason ? (
								<div>
									<p>Comment*</p>
									<Input.TextArea
										rows={3}
										value={otherReason}
										style={{ width: "450px" }}
										onChange={(e) => {
											setOtherReason(e.target.value)
											// setReason(e.target.value);
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
									if (reason_value === "Reason for signature") {
										setCheckRejectReason(true);
										setReason(reason_value);
										setOtherReason('')
									} else {
										setReason(reason_value);
										setCheckRejectReason(false);
									}
								}}
								value={reason}
								placeholder="Select reason"
								options={reasonList}
								className="sign-select"
								id="esign_reason"
							/>

						</div>
					)}

				</div>
			</Modal>
		</div>
	);
};

export default Signature;