import {
	BMS_APP_PYTHON_SERVICE
} from "../../constants/apiBaseUrl";
import Service from "../../services/AjaxService";

let login_response = JSON.parse(localStorage.getItem("login_details"));

export const uploadFileApi = (_queryParam) => {
	let login_response = JSON.parse(localStorage.getItem("login_details"));
	return Service.post(BMS_APP_PYTHON_SERVICE + "/upload-file", _queryParam, {
		"Content-Type": "multipart/form-data",
		"x-access-token": login_response.token ? login_response.token : "",
		"resource-name": "FILE_UPLOAD",
		Accept: "*/*"
	}).then(
		(response) => {
			return response.data;
		},
		(error) => {
			return error.response.data;
		}
	);
};

export const cancelFileUpload = (request) => {
	let login_response = JSON.parse(localStorage.getItem("login_details"));
	return Service.post(BMS_APP_PYTHON_SERVICE + "/cancel-file-upload", request, {
		"x-access-token": login_response.token ? login_response.token : "",
		"resource-name": "FILE_UPLOAD"
	}).then(
		(response) => {
			return response.data;
		},
		(error) => {
			return error.response.data;
		}
	);
};

export const approvedData = (request) => {
	let login_response = JSON.parse(localStorage.getItem("login_details"));
	return Service.post(BMS_APP_PYTHON_SERVICE + "/approve-data", request, {
		"x-access-token": login_response.token ? login_response.token : "",
		"resource-name": "FILE_UPLOAD"
	}).then(
		(response) => {
			return response.data;
		},
		(error) => {
			return error.response.data;
		}
	);
};

export const updateApprovedData = (request) => {
	let login_response = JSON.parse(localStorage.getItem("login_details"));
	return Service.post(
		BMS_APP_PYTHON_SERVICE + "/update-approved-data",
		request,
		{
			"x-access-token": login_response.token ? login_response.token : "",
			"resource-name": "FILE_UPLOAD"
		}
	).then(
		(response) => {
			return response.data;
		},
		(error) => {
			return error.response.data;
		}
	);
};

export const finalFileUpload = (request) => {
	let login_response = JSON.parse(localStorage.getItem("login_details"));
	return Service.post(BMS_APP_PYTHON_SERVICE + "/final-upload", request, {
		"x-access-token": login_response.token ? login_response.token : "",
		"resource-name": "FILE_UPLOAD"
	}).then(
		(response) => {
			return response.data;
		},
		(error) => {
			return error.response.data;
		}
	);
};

export const deleteAdHocFile = (_queryParam) => {
	return Service.del(BMS_APP_PYTHON_SERVICE + "/adhoc-files", _queryParam, {
		"x-access-token": login_response.token ? login_response.token : "",
		"resource-name": "FILE_UPLOAD"
	}).then(
		(response) => {
			return response.data;
		},
		(error) => {
			return error.response.data;
		}
	);
};
