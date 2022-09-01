// import { MsalAuthProvider, LoginType } from 'react-aad-msal';
import { BMS_APP_PYTHON_SERVICE } from "../constants/apiBaseUrl";
import Service from "./AjaxService";

export const msalConfig = {
	auth: {
		authority: "https://login.microsoftonline.com/mareana.com",
		clientId: "016b5077-e449-47f3-991d-098c6ded6ede",
		redirectUri: "https://bms-cpvdev.mareana.com/#/user/login",
	},
	cache: {
		cacheLocation: "sessionStorage", // This configures where your cache will be stored
		storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
	},
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
	scopes: ["User.Read"],
};

// Add the endpoints here for Microsoft Graph API services you'd like to use.
export const graphConfig = {
	graphMeEndpoint: "Enter_the_Graph_Endpoint_Here/v1.0/me",
};

export const getAuthorisedPermission = (request, resource) => {
	let login_response = JSON.parse(localStorage.getItem("login_details"));

	const headers = {
		"content-type": "application/json",
		"x-access-token": login_response.token ? login_response.token : "",
		"resource-name": resource,
	};
	return Service.get(
		BMS_APP_PYTHON_SERVICE + "/resource_authentication",
		request,
		headers
	).then(
		(response) => {
			return response;
		},
		(error) => {
			return error;
		}
	);
};
