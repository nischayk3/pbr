import { BMS_APP_PYTHON_SERVICE } from "../constants/apiBaseUrl";
import Service from "./AjaxService";

export const getSystemConfig = (request) => {
	let login_response = JSON.parse(localStorage.getItem("login_details"));

	const headers = {
		"content-type": "application/json",
		"x-access-token": login_response.token ? login_response.token : "",
		"resource-name": "WORKITEMS"
	};
	return Service.get(
		BMS_APP_PYTHON_SERVICE + "/system-config",
		request,
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

export const updateConfig = (request) => {
	let login_response = JSON.parse(localStorage.getItem("login_details"));

	const headers = {
		"content-type": "application/json",
		"x-access-token": login_response.token ? login_response.token : "",
		"resource-name": "WORKITEMS"
	};
	return Service.put(
		BMS_APP_PYTHON_SERVICE + "/system-config",
		request,
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


export const deleteConfig = (request) => {
	let login_response = JSON.parse(localStorage.getItem("login_details"));

	const headers = {
		"content-type": "application/json",
		"x-access-token": login_response.token ? login_response.token : "",
		"resource-name": "WORKITEMS"
	};
	return Service.del(
		BMS_APP_PYTHON_SERVICE + "/system-config",
		request,
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