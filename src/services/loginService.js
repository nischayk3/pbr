import { BMS_APP_LOGIN_PASS } from "../constants/apiBaseUrl";
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