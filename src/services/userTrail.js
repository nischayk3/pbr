import { BMS_APP_PYTHON_SERVICE } from "../constants/apiBaseUrl";
import Service from "./AjaxService";
let login_response = JSON.parse(localStorage.getItem("login_details"));
const request_headers = {
	"content-type": "application/json",
	"x-access-token": login_response.token ? login_response.token : "",
	"resource-name": "USER_REPORT",
};

export const getUserSessions = (request) => {
	return Service.get(
		BMS_APP_PYTHON_SERVICE + "/user_session",
		request,
		request_headers
	).then(
		(response) => {
			return response.data;
		},
		(error) => {
			return error.response.data;
		}
	);
};