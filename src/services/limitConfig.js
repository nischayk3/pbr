import { BMS_APP_PYTHON_SERVICE } from "../constants/apiBaseUrl";
import Service from "./AjaxService";


export const getLimitConfig = (request) => {
	let login_response = JSON.parse(localStorage.getItem("login_details"));

	const headers = {
		"content-type": "application/json",
		"x-access-token": login_response.token ? login_response.token : "",
		"resource-name": "CHART"
	};
	return Service.get(
		BMS_APP_PYTHON_SERVICE + "/chart-limit",
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


export const saveLimitConfigApi = (_queryParam) => {
	let login_response = JSON.parse(localStorage.getItem("login_details"));
	const headers = {
		"content-type": "application/json",
		"x-access-token": login_response.token ? login_response.token : "",
		"resource-name": "chart"
	};
	return Service.post(
		BMS_APP_PYTHON_SERVICE + "/chart-limit",
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


export const deleteLimitsApi = (_queryParam) => {
    console.log(_queryParam, '_queryParam');
	let login_response = JSON.parse(localStorage.getItem("login_details"));
	const headers = {
		"content-type": "application/json",
		"x-access-token": login_response.token ? login_response.token : "",
		"resource-name": "CHART"
	};
	return Service.del(
		BMS_APP_PYTHON_SERVICE + "/chart-limit" + `?id=${_queryParam}`,
        {},
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

