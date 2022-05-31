import { BMS_APP_PYTHON_SERVICE } from '../constants/apiBaseUrl';
import Service from './AjaxService';

let login_response = JSON.parse(localStorage.getItem('login_details'));
const request_headers = {
	'content-type': 'application/json',
	'x-access-token': login_response.token ? login_response.token : '',
	'resource-name': 'WORKITEMS'
};

//get count data
export const getCountData = _queryParam => {
	return Service.get(BMS_APP_PYTHON_SERVICE + '/workflow-count', _queryParam, {
		'content-type': 'application/json',
		'x-access-token': login_response.token ? login_response.token : '',
		'resource-name': 'WORKITEMS',
		username: localStorage.getItem('user')
	}).then(
		response => {
			return response.data;
		},
		error => {
			return error.response.data;
		}
	);
};

//get table data
export const getTableData = _queryParam => {
	return Service.get(BMS_APP_PYTHON_SERVICE + '/approvals' + _queryParam, '', {
		'content-type': 'application/json',
		username: localStorage.getItem('user')
	}).then(
		response => {
			return response.data;
		},
		error => {
			return error.response.data;
		}
	);
};

//get unapproved table data
export const getUnapprovedData = _queryParam => {
	return Service.get(
		BMS_APP_PYTHON_SERVICE + '/unapproved-param',
		_queryParam,
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

//approve param data
export const approveParamData = _queryParam => {
	return Service.put(
		BMS_APP_PYTHON_SERVICE + '/approve-params',
		_queryParam,
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
