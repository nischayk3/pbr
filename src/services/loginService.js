import { BMS_APP_LOGIN_PASS, BMS_APP_PYTHON_SERVICE } from "../constants/apiBaseUrl";
import Service from "./AjaxService";

export const loginUrl = BMS_APP_LOGIN_PASS + "/login";
export const logoutUrl = BMS_APP_LOGIN_PASS + "/logout";

export const getSession = (request) => {
	return Service.get(BMS_APP_LOGIN_PASS + "/get-session", request, {
		withCredentials: true
	}).then(
		(response) => {
			return response.data;
		},
		(error) => {
			return error.response.data;
		}
	);
};

export const getAuthenticate = (request, header) => {
	return Service.get(BMS_APP_LOGIN_PASS + "/login-pass", request, header).then(
		(response) => {
			return response.data;
		},
		(error) => {
			return error.response.data;
		}
	);
};

export const getAuthenticateWithoutAD = (request, header) => {
	return Service.get(BMS_APP_LOGIN_PASS + "/token", request, header).then(
		(response) => {
			return response.data;
		},
		(error) => {
			return error.response.data;
		}
	);
};

export const getAuthenticateWithLdap = (request, header) => {
	return Service.get(BMS_APP_LOGIN_PASS + "/ldap_login", request, header).then(
		(response) => {
			return response.data;
		},
		(error) => {
			return error.response.data;
		}
	);
};

//register api
export const createAccount = (request, headers) => {
	return Service.post(BMS_APP_LOGIN_PASS + '/register', request, headers).then(
		(response) => {
			return response.data;
		},
		(error) => {
			return error.response.data;
		}
	);
};

//password change
export const passwordChange = (request) => {
	const login_response = JSON.parse(localStorage.getItem("login_details"));

	const headers = {
		"content-type": "application/json",
		"x-access-token": login_response.token ? login_response.token : "",
		"resource-name": 'USER_REPORT',
	};
	return Service.put(BMS_APP_PYTHON_SERVICE + '/password_change', request, headers).then(
		(response) => {
			return response.data;
		},
		(error) => {
			return error.response.data;
		}
	);
};

//get user profilr
export const getUserProfile = (request) => {
	const login_response = JSON.parse(localStorage.getItem("login_details"));

	const headers = {
		"content-type": "application/json",
		"x-access-token": login_response.token ? login_response.token : "",
		"resource-name": 'USER_REPORT',
	};
	return Service.get(BMS_APP_PYTHON_SERVICE + '/user-profile', request, headers).then(
		(response) => {
			return response.data;
		},
		(error) => {
			return error.response.data;
		}
	);
};

//send user profilr
export const sendUserProfile = (request) => {
	const login_response = JSON.parse(localStorage.getItem("login_details"));

	const headers = {
		"content-type": "application/json",
		"x-access-token": login_response.token ? login_response.token : "",
		"resource-name": 'USER_REPORT',
		'Content-Type': 'multipart/form-data',
	};

	return Service.post(BMS_APP_PYTHON_SERVICE + '/user-profile', request, headers).then(
		(response) => {
			return response.data;
		},
		(error) => {
			return error.response.data;
		}
	);
};