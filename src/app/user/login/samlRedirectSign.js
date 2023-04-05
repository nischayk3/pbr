import { Button, Card, Result } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import {
	hideLoader, pushEsignResponse, pushPublishResponse, showNotification
} from '../../../duck/actions/commonActions';
import { approveRecord, eSign, publishEvent } from '../../../services/electronicSignatureService';
import { getSession } from '../../../services/loginService';
import { createUsers } from '../../../services/userRolesAndAccessService';
import { currentTimeStamp, latestDate } from '../../../utils/dateHelper';

export default function RedirectSAMLSign() {
	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();
	useEffect(() => {
		getSessionDetail()
	}, [])

	const handleConfirm = async (reason, parameter, screenName, appType, dispId, version, status, resourceDispId, resourceVersion, fileID, userType) => {
		let req = {};
		let login_response = JSON.parse(localStorage.getItem("login_details"));
		req["date"] = latestDate();;
		req["timestamp"] = currentTimeStamp();
		req["reason"] = reason;
		req["user_id"] = login_response["email_id"] ? login_response["email_id"] : "";
		req["screen"] = screenName;
		req["first_name"] = login_response["firstname"] ? login_response["firstname"] : "";
		req["last_name"] = login_response["lastname"] ? login_response["lastname"] : "";

		let headers = {
			"content-type": "application/json",
			"resource-name":
				appType == "REPORT"
					? "REPORT_DESIGNER"
					: appType == "AUTO_ML"
						? "AUTO_ML"
						: appType == "ELOGBOOK-READING"
							? "DASHBOARD"
							: appType,
			"x-access-token": login_response.token ? login_response.token : "",
		};

		try {
			let esign_response = await eSign(req, headers);
			if (esign_response.statuscode == 200) {
				if (screenName === "CONFIGURATION") {
					let req = {
						esign_id: esign_response?.primary_id,
						file_id: fileID,
						flag: userType,
						reason: reason
					}
					let res = await createUsers(req);
					if (res.Status == 200) {
						dispatch(showNotification("success", res.message));
						dispatch(hideLoader());
					} else {
						dispatch(hideLoader());
						dispatch(showNotification("error", res.message));
					}
				} else {
					dispatch(showNotification("success", esign_response.message));
					let reqs = {};
					let req1 = {};
					let user_details = JSON.parse(localStorage.getItem("login_details"));
					let user = user_details["email_id"] ? user_details["email_id"] : "";

					reqs["application_type"] = appType;
					reqs["created_by"] = user;
					reqs["esign_id"] = esign_response.primary_id;
					reqs["disp_id"] = dispId;
					reqs["version"] = parseInt(version);

					req1["applicationType"] = appType;
					req1["esignId"] = esign_response.primary_id.toString();
					req1["resourceDispId"] = resourceDispId;

					if (resourceVersion != undefined) {
						req1["resourceVersion"] = parseInt(resourceVersion);
					}
					req1["status"] = status;

					// //callback esign id
					if (esign_response?.primary_id) {
						let redirectRes = {
							eSignId: esign_response.primary_id,

						}
						dispatch(pushEsignResponse(redirectRes))
					}
					let publish_response = {};
					if (appType == "ELOG_BOOK_DATA_ENTRY") {
						console.log(req1)
						publish_response = Object.keys(parameter).length > 0 && parameter.fromScreen !== "Workflow"
							? await publishEvent(reqs, headers) : await approveRecord(req1)

					} else if (appType == "PBR_TEMPLATE") {
						if (parameter.fromScreen == "Workflow" || parameter.fromScreen == "Workspace") {
							publish_response =
								Object.keys(parameter).length > 0 && parameter.fromScreen !== "Workspace"
									? await approveRecord(req1)
									: await publishEvent(reqs, headers);
						} else {
							publish_response =
								Object.keys(parameter).length > 0 && await approveRecord(req1)
						}

					} else {
						publish_response =
							Object.keys(parameter).length > 0 && parameter.fromScreen !== "Workspace"
								? await approveRecord(req1)
								: await publishEvent(reqs, headers);
					}

					if (publish_response.status_code == 200) {
						dispatch(showNotification("success", publish_response.msg));
						pushPublishResponse(publish_response);
						if (location?.state?.path) {
							history.push(`${location.state.path}`)
						}

					} else if (publish_response.Status == 200) {
						dispatch(showNotification("success", publish_response.Message));
						pushPublishResponse(publish_response);
						if (location?.state?.path) {
							history.push(`${location.state.path}`)
						}
					}
					// else {
					// 	dispatch(showNotification("error", publish_response.msg));
					// }
				}
			} else if (esign_response.Status == 403) {
				dispatch(showNotification("error", esign_response.Message));
			} else {
				dispatch(showNotification("error", esign_response.Message));
			}
		} catch (err) {
			dispatch(showNotification("error", err));
		}
	};

	const getSessionDetail = async () => {
		try {
			const res = await getSession()
			const url = localStorage.getItem('redirectUrl')
			if (res.status === 200) {
				let signedInfoData = res['SignedInfo'];
				handleConfirm(signedInfoData?.Reason, signedInfoData?.parameter, signedInfoData?.screenName, signedInfoData?.appType, signedInfoData?.dispId, signedInfoData?.version, signedInfoData?.status, signedInfoData?.resourceDispId, signedInfoData?.resourceVersion, signedInfoData?.fileID, signedInfoData?.userType)
				history.push(`${url}`)
			}
			else {
				dispatch(showNotification('error', 'Login Failed', 'Sorry, an unexpectede error occurred. Please try logging in again.'))
				history.push(`${url}`)
			}
		} catch (error) {
			dispatch(showNotification('error', 'Login Failed', 'Sorry, an unexpectede error occurred. Please try logging in again.'))
			history.push(`${url}`)
		}
	}


	return (
		<div className="custom-wrapper">
			<div className="custom-content-layout">
				<Card>
					<Result
						title='You are being redirected, please, wait.... '
						subTitle="If you haven't been redirected in 30 sececons, please click this button."
						extra={
							<Button type='primary' onClick={getSessionDetail} >
								Continue
							</Button>
						}
					/>
				</Card>
			</div>
		</div >
	)
}