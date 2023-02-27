import axios from 'axios';
import { BMS_APP_PYTHON_SERVICE } from "../constants/apiBaseUrl";
import Service from "./AjaxService";

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
	let login_response = JSON.parse(localStorage.getItem('login_details'));
	let _request_headers = {
		'x-access-token': login_response?.token ? login_response?.token : '',
		'resource-name': 'CONFIGURATION',
		"content-type": "application/json",
	};
	return Service.post(
		BMS_APP_PYTHON_SERVICE + "/upload-users",
		_queryParam,
		_request_headers
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
	let login_response = JSON.parse(localStorage.getItem('login_details'));
	let _request_headers = {
		'x-access-token': login_response?.token ? login_response?.token : '',
		'resource-name': 'CONFIGURATION',
		"content-type": "application/json",
	};
	return Service.put(
		BMS_APP_PYTHON_SERVICE + "/create-users",
		_queryParam,
		_request_headers
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
	let login_response = JSON.parse(localStorage.getItem('login_details'));
	let _request_headers = {
		'x-access-token': login_response?.token ? login_response?.token : '',
		'resource-name': 'CONFIGURATION',
		"content-type": "application/json",
	};
	return Service.get(
		BMS_APP_PYTHON_SERVICE + "/role-auth-dataaccess",
		_queryParam,
		_request_headers
	).then(
		(response) => {
			return response.data;
		},
		(error) => {
			return error.response.data;
		}
	);
};

export const resourceAuth = (_queryParam) => {
	let login_response = JSON.parse(localStorage.getItem('login_details'));
	let _request_headers = {
		'x-access-token': login_response?.token ? login_response?.token : '',
		'resource-name': 'CONFIGURATION',
		"content-type": "application/json",
	};
	return Service.get(
		BMS_APP_PYTHON_SERVICE + "/role-dep-privilege",
		_queryParam,
		_request_headers
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
	let login_response = JSON.parse(localStorage.getItem('login_details'));
	let _request_headers = {
		'x-access-token': login_response?.token ? login_response?.token : '',
		'resource-name': 'CONFIGURATION',
		"content-type": "application/json",
	};
	return Service.get(
		BMS_APP_PYTHON_SERVICE + "/resource-action-details",
		_queryParam,
		_request_headers
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
	let login_response = JSON.parse(localStorage.getItem('login_details'));
	let _request_headers = {
		'x-access-token': login_response?.token ? login_response?.token : '',
		'resource-name': 'CONFIGURATION',
		"content-type": "application/json",
	};
	return Service.put(
		BMS_APP_PYTHON_SERVICE + "/role-config-v2",
		_queryParam,
		_request_headers
	).then(
		(response) => {
			return response.data;
		},
		(error) => {
			return error.response.data;
		}
	);
};

export const resourceActionUpdated = (_queryParam) => {
	let login_response = JSON.parse(localStorage.getItem('login_details'));
	let _request_headers = {
		'x-access-token': login_response?.token ? login_response?.token : '',
		'resource-name': 'CONFIGURATION',
		"content-type": "application/json",
	};
	return Service.put(
		BMS_APP_PYTHON_SERVICE + "/resource-action-details",
		_queryParam,
		_request_headers
	).then(
		(response) => {
			return response.data;
		},
		(error) => {
			return error.response.data;
		}
	);
};

export const dataAccessUpdate = (_queryParam) => {
	let login_response = JSON.parse(localStorage.getItem('login_details'));
	let _request_headers = {
		'x-access-token': login_response?.token ? login_response?.token : '',
		'resource-name': 'CONFIGURATION',
		"content-type": "application/json",
	};
	return Service.put(
		BMS_APP_PYTHON_SERVICE + "/role-auth-dataaccess",
		_queryParam,
		_request_headers
	).then(
		(response) => {
			return response.data;
		},
		(error) => {
			return error.response.data;
		}
	);
};

export const resourceDelete = (_queryParam) => {
	let login_response = JSON.parse(localStorage.getItem('login_details'));
	let _request_headers = {
		'x-access-token': login_response?.token ? login_response?.token : '',
		'resource-name': 'CONFIGURATION',
		"content-type": "application/json",
	};
	return Service.del(
		BMS_APP_PYTHON_SERVICE + "/role-auth-dataaccess",
		_queryParam,
		_request_headers
	).then(
		(response) => {
			return response.data;
		},
		(error) => {
			return error.response.data;
		}
	);
};