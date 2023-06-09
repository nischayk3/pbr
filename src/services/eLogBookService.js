import { BMS_APP_PYTHON_SERVICE } from '../constants/apiBaseUrl';
import Service from './AjaxService';

let login_response = JSON.parse(localStorage.getItem("login_details"));

const request_headers = {
	"content-type": "application/json",
	"x-access-token": login_response.token ? login_response.token : "",
	"resource-name": "ELOG_BOOK_DATA_ENTRY",
};

export const getTemplatesList = (request) => {
	return Service.get(
		BMS_APP_PYTHON_SERVICE + "/elogbook-templates-list",
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

export const getTemplateData = (request) => {
	return Service.get(
		BMS_APP_PYTHON_SERVICE + "/elogbook-forms",
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


export const putFormData = (request) => {
	return Service.put(
		BMS_APP_PYTHON_SERVICE + "/elogbook-forms",
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

export const getDummyTemplate = (request) => {
	return Service.get(
		BMS_APP_PYTHON_SERVICE + "/elogbook-form-template",
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

export const getFormList = (request) => {
	return Service.get(
		BMS_APP_PYTHON_SERVICE + "/elogbook-forms-list",
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

export const getMetadata = (request) => {
	return Service.get(
		BMS_APP_PYTHON_SERVICE + "/elogbook-metadata",
		request,
		request_headers,
	).then(
		(response) => {
			return response.data;
		},
		(error) => {
			return error.response.data;
		}
	);
};

export const getformtemplate = (request) => {
	return Service.get(
		BMS_APP_PYTHON_SERVICE + "/elogbook-form-template",
		request,
		request_headers,
	).then(
		(response) => {
			return response.data;
		},
		(error) => {
			return error.response.data;
		}
	);
};

export const updateformtemplate = (request) => {
	return Service.put(
		BMS_APP_PYTHON_SERVICE + "/elogbook-form-template",
		request,
		request_headers,
	).then(
		(response) => {
			return response.data;
		},
		(error) => {
			return error.response.data;
		}
	);
};

export const updatealldata = request => {
	return Service.put(
		BMS_APP_PYTHON_SERVICE + '/elogbook-save-template',
		request,
		request_headers,
	).then(
		response => {
			return response.data;
		},
		error => {
			return error.response.data;
		}
	);
};