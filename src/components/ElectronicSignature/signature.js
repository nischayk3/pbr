import React, { useState } from "react";
import { useLocation } from "react-router";
import { Button, Input, Modal, Select } from "antd";
import "./styles.scss";
import { useDispatch } from "react-redux";
import queryString from "query-string";
import {
	approveRecord,
	eSign,
	publishEvent
} from "../../services/electronicSignatureService";
import { getAuthenticate } from "../../services/loginService";
import {
	hideLoader,
	showLoader,
	showNotification
} from "../../duck/actions/commonActions";

const { Option } = Select;

function Signature(props) {
	const location = useLocation();
	const params = queryString.parse(location.search);
	var { isPublish, handleClose } = props;
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [reason, setReason] = useState("");
	const [isauth, setIsAuth] = useState("");

	const dispatch = useDispatch();

	const authenticateUser = async () => {
		let req = {};
		let header = {
			username: username,
			password: password
		};
		try {
			dispatch(showLoader());
			const res = await getAuthenticate(req, header);
			if (res.Status != 200) {
				setIsAuth("");
				dispatch(showNotification("error", "Incorrect credentials"));
				handleClose();
			} else {
				setIsAuth(props.status);
			}
			dispatch(hideLoader());
		} catch (error) {
			dispatch(hideLoader());
			dispatch(showNotification("error", "Unable to fetch coverages"));
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
		req["screen"] = props.screenName;
		req["first_name"] = "first_name";
		req["last_name"] = "last_name";
		let login_response = JSON.parse(localStorage.getItem("login_details"));
		let headers = {
			"content-type": "application/json",
			"x-access-token": login_response.token ? login_response.token : "",
			"resource-name":
				props.appType == "REPORT" ? "REPORT_DESIGNER" : props.appType
		};
		try {
			let esign_response = await eSign(req, headers);

			if (esign_response.statuscode == 200) {
				dispatch(showNotification("success", esign_response.message));
				handleClose();
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
				props.eSignId(esign_response.primary_id);
				let publish_response =
					Object.keys(params).length > 0 && params.fromScreen !== "Workspace"
						? await approveRecord(req1)
						: await publishEvent(reqs, headers);

				if (publish_response.status_code == 200) {
					dispatch(showNotification("success", publish_response.msg));
					props.PublishResponse(publish_response);
				} else if (publish_response.Status == 200) {
					dispatch(showNotification("success", publish_response.Message));
				} else {
					dispatch(showNotification("error", publish_response.msg));
				}
			} else {
				dispatch(showNotification("error", esign_response.message));
			}
		} catch {
			dispatch(showNotification("error", "Error Occured"));
		}
	};

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
								onClick={() => handleClose()}
							>
								Cancel
							</Button>,
							<Button
								className="custom-secondary-btn"
								key="1"
								onClick={() => handleConfirm()}
							>
								Confirm
							</Button>
						]
						: [
							<Button
								className="custom-secondary-btn"
								key="3"
								onClick={() => authenticateUser()}
							>
								Authenticate
							</Button>
						]
				}
			>
				<div className="electronic-sig">
					<div className="sign-cols">
						<div>
							<p style={{ margin: "8px 0px" }}>User ID</p>
							<Input
								value={username}
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
										setReason(reason_value);
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

					{isauth === "R" && props.status === "R" && (
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
					)}
				</div>
			</Modal>
		</div>
	);
}

export default Signature;
