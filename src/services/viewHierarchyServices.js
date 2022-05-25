import { BMS_APP_PYTHON_SERVICE } from '../constants/apiBaseUrl';
import Service from './AjaxService';

let login_response = JSON.parse(localStorage.getItem('login_details'));

const request_headers = {
	'content-type': 'application/json',
	'x-access-token': login_response.token ? login_response.token : '',
	'resource-name': 'VIEW',
};

// Get all drug substance
export const getAllViews = request => {
	return Service.get(
		BMS_APP_PYTHON_SERVICE + '/drug-substance',
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


// Put Plant and molecule
// {
//     "delete_row": true,
//     "ds_name": "string"
//   }
export const putMolecule = request => {
	return Service.put(
		BMS_APP_PYTHON_SERVICE + '/drug-substance',
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

export const putProcessStep = request => {
	return Service.put(
		BMS_APP_PYTHON_SERVICE + '/ds-process-step',
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



export const getProcessStep = request => {
	return Service.get(
		BMS_APP_PYTHON_SERVICE + '/ds-process-step',
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