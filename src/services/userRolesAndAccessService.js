import axios from 'axios';
import { BMS_APP_PYTHON_SERVICE } from "../constants/apiBaseUrl";
import Service from "./AjaxService";

let login_response = JSON.parse(localStorage.getItem('login_details'));
const request_headers = {
	'x-access-token': login_response?.token ? login_response?.token : '',
	'resource-name': 'CONFIGURATION',
	"content-type": "application/json",
};

export const getRoleConfiguartions = () => {
	let login_response = JSON.parse(localStorage.getItem('login_details'));
	return axios.get('/services/v1/role-config', {
		headers: {
			'x-access-token': login_response.token ? login_response.token : '',
			'resource-name': 'CONFIGURATION'
		}
	})
}

export const saveRoleConfiguartions = data => {
	const body = { data }
	let login_response = JSON.parse(localStorage.getItem('login_details'));
	return axios.put('/services/v1/role-config', body, {
		headers: {
			'x-access-token': login_response.token ? login_response.token : '',
			'resource-name': 'CONFIGURATION'
		}
	})
}

export const deleteRoleConfiguartions = data => {
	let login_response = JSON.parse(localStorage.getItem('login_details'));
	return axios.delete('/services/v1/role-config', {
		headers: {
			'x-access-token': login_response.token ? login_response.token : '',
			'resource-name': 'CONFIGURATION'
		},
		data: { data }
	})
}

export const getUserConfiguartions = () => {
	let login_response = JSON.parse(localStorage.getItem('login_details'));
	return axios.get('/services/v1/user-config', {
		headers: {
			'x-access-token': login_response.token ? login_response.token : '',
			'resource-name': 'CONFIGURATION'
		}
	})
}

export const saveUserConfigurationws = data => {
	const body = { data }
	let login_response = JSON.parse(localStorage.getItem('login_details'));
	return axios.put('/services/v1/user-config', body, {
		headers: {
			'x-access-token': login_response.token ? login_response.token : '',
			'resource-name': 'CONFIGURATION'
		}
	})
}

export const deleteUserConfiguartions = data => {
	let login_response = JSON.parse(localStorage.getItem('login_details'));
	return axios.delete('/services/v1/user-config', {
		headers: {
			'x-access-token': login_response.token ? login_response.token : '',
			'resource-name': 'CONFIGURATION'
		},
		data: { data }
	})
}

export const uploadUsers = (_queryParam) => {
	return Service.post(
		BMS_APP_PYTHON_SERVICE + "/upload-users",
		_queryParam,
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

export const createUsers = (_queryParam) => {
	return Service.put(
		BMS_APP_PYTHON_SERVICE + "/create-users",
		_queryParam,
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


export const getResource = (_queryParam) => {
	return Service.get(
		BMS_APP_PYTHON_SERVICE + "/role-auth-dataaccess",
		_queryParam,
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

export const resourceActions = (_queryParam) => {
	return Service.get(
		BMS_APP_PYTHON_SERVICE + "/resource-action-details",
		_queryParam,
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

export const roleConfig = (_queryParam) => {
	return Service.put(
		BMS_APP_PYTHON_SERVICE + "/role-config-v2",
		_queryParam,
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