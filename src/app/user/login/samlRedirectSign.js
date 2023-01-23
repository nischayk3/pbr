import { Result } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
	hideLoader, pushPublishResponse, showLoader, showNotification
} from '../../../duck/actions/commonActions';
import { eSign, publishEvent } from '../../../services/electronicSignatureService';
import { getSession } from '../../../services/loginService';

export default function RedirectSAMLSign() {
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		GetSession()
	}, [])

	const handleConfirm = async (reason, parameter, screenName, appType, dispId, version, status, resourceDispId, resourceVersion) => {

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
		let login_response = JSON.parse(localStorage.getItem("login_details"));
		req["date"] = date_today;
		req["timestamp"] = time_today;
		req["reason"] = reason;
		req["user_id"] = login_response["email_id"] ? login_response["email_id"] : "";
		req["screen"] = screenName;
		req["first_name"] = login_response["firstname"] ? login_response["firstname"] : "";
		req["last_name"] = login_response["lastname"] ? login_response["lastname"] : "";
		console.log("request111111111", req);
		let headers = {
			"content-type": "application/json",
			"resource-name":
				appType == "REPORT"
					? "REPORT_DESIGNER"
					: appType == "ANALYSIS"
						? "ANALYTICS"
						: appType == "ELOGBOOK-READING"
							? "DASHBOARD"
							: appType,
			"x-access-token": login_response.token ? login_response.token : "",
		};

		try {
			let esign_response = await eSign(req, headers);

			if (esign_response.statuscode == 200) {
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
				// if (props.eSignId) {
				// 	props.eSignId(esign_response.primary_id);
				// }

				let publish_response = {};
				if (appType == "ELOGBOOK-READING") {
					publish_response = await publishEvent(reqs, headers);
				} else {
					publish_response =
						Object.keys(parameter).length > 0 && parameter.fromScreen !== "Workspace"
							? await approveRecord(req1)
							: await publishEvent(reqs, headers);
				}

				if (publish_response.status_code == 200) {
					dispatch(showNotification("success", publish_response.msg));
					dispatch(pushPublishResponse(publish_response));
				} else if (publish_response.Status == 200) {
					dispatch(showNotification("success", publish_response.Message));
					dispatch(pushPublishResponse(publish_response));
				} else {
					dispatch(showNotification("error", publish_response.msg));
				}
			} else if (esign_response.Status == 403) {
				dispatch(showNotification("error", esign_response.Message));
			} else {
				dispatch(showNotification("error", esign_response.Message));
			}
		} catch {
			dispatch(showNotification("error", "Error Occured"));
		}
	};

	const GetSession = async () => {
		dispatch(showLoader())
		let res = await getSession()

		if (res.Status === 200) {
			let data = res['Data'];
			let signedInfoData = res['SignedInfo'];
			dispatch(showNotification('success', `Logined As ${data.email_id}`))
			dispatch(hideLoader())
			let url = localStorage.getItem('redirectUrl')
			handleConfirm(signedInfoData?.Reason, signedInfoData?.parameter, signedInfoData?.screenName, signedInfoData?.appType, signedInfoData?.dispId, signedInfoData?.version, signedInfoData?.status, signedInfoData?.resourceDispId, signedInfoData?.resourceVersion)
			// window.open(url + '&publish=True', '_self')
			history.push(`${url}`)
		}

		else {
			dispatch(showNotification('error', 'Error in Login'))
			dispatch(hideLoader())
			history.push('/user/workflow')
		}
	}


	return (
		<div>
			<Result
				title="Electonic Signature SAML"
			/>
		</div>
	)
}