import { BMS_APP_PYTHON_SERVICE } from '../constants/apiBaseUrl';
import Service from './AjaxService';
let login_response = JSON.parse(localStorage.getItem('login_details'));
const request_headers = {
	'content-type': 'application/json',
	'x-access-token': login_response.token ? login_response.token : '',
	'resource-name': 'VIEW',
};

export const getViews = request => {
	return Service.get(
		BMS_APP_PYTHON_SERVICE + '/views-list',
		request,
		request_headers
	).then(
		response => {
			return response.data;
		},
		error => {
			return error.response.data;
		}
	);
};

export const getViewConfig = request => {
	return Service.get(
		BMS_APP_PYTHON_SERVICE + '/view-config',
		request,
		request_headers
	).then(
		response => {
			return response.data;
		},
		error => {
			return error.response.data;
		}
	);
};

export const getMoleculeList = (request, request_headers) => {
	return Service.get(
		BMS_APP_PYTHON_SERVICE + '/molecules2',
		request,
		request_headers
	).then(
		response => {
			return response.data;
		},
		error => {
			return error.response.data;
		}
	);
};

export const saveFunction = request => {
	return Service.put(
		BMS_APP_PYTHON_SERVICE + '/views',
		request,
		request_headers
	).then(
		response => {
			return response.data;
		},
		error => {
			return error.response.data;
		}
	);
};
