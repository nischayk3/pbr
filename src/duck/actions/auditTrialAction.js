import {
	API_RESULTSET_URL,
	BMS_APP_PYTHON_SERVICE
} from '../../constants/apiBaseUrl';
import Service from '../../services/AjaxService';

/*To get the list of tables*/
export const returnData = (request) => {
	return Service.post(API_RESULTSET_URL + '/returnData', request).then(
		(response) => {
			return response.data;
		},
		(error) => {
			return error.response.data;
		}
	);
};


export const loadFilter = (request) => {
	return Service.post(API_RESULTSET_URL + '/loadFilter', request).then(
		(response) => {
			return response;
		},
		(error) => {
			return error.response.data;
		}
	);
};
export const auditDataChange = (request) => {
	return Service.post(
		BMS_APP_PYTHON_SERVICE + '/audit-data-change',
		request
	).then(
		(response) => {
			return response.data;
		},
		(error) => {
			return error.response.data;
		}
	);
};


export const auditFilter = (request, headers) => {
	return Service.get(BMS_APP_PYTHON_SERVICE + '/audit-filter', request, headers).then(
		(response) => {
			return response.data;
		},
		(error) => {
			return error.response.data;
		}
	);
};
