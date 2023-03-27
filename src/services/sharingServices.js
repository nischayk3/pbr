import { BMS_APP_PYTHON_SERVICE } from '../constants/apiBaseUrl';
import Service from './AjaxService';

export const getShare = request => {
	let login_response = JSON.parse(localStorage.getItem('login_details'));

	const request_headers = {
		'content-type': 'application/json',
		'x-access-token': login_response.token ? login_response.token : '',
		'resource-name': 'VIEW'
	};
	return Service.get(
		BMS_APP_PYTHON_SERVICE + '/sharing',
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
export const putShare = request => {
	let login_response = JSON.parse(localStorage.getItem('login_details'));

	const request_headers = {
		'content-type': 'application/json',
		'x-access-token': login_response.token ? login_response.token : '',
		'resource-name': 'VIEW'
	}
	return Service.put(
		BMS_APP_PYTHON_SERVICE + '/sharing',
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