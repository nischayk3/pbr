import { BMS_APP_PYTHON_SERVICE } from "../constants/apiBaseUrl";
import Service from "./AjaxService";

//get view table
export const getViewTable = (_queryParam) => {
	let login_response = JSON.parse(localStorage.getItem("login_details"));
	const headers = {
		"content-type": "application/json",
		"x-access-token": login_response.token ? login_response.token : "",
		"resource-name": "VIEW",
	};
	return Service.get(
		BMS_APP_PYTHON_SERVICE + "/views-list",
		_queryParam,
		headers
	).then(
		(response) => {
			return response.data;
		},
		(error) => {
			return error.response.data;
		}
	);
};
