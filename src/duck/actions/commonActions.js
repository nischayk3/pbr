import {
	AUTHENTICATED,
	HIDE_LOADING,
	HIDE_NOTIFICATION, LOGOUT_APP, NETWORK_ERROR, PUBLISH_RESPONSE, SHOW_LOADING,
	SHOW_NOTIFICATION,PUBLISH_ESIGN_ID
} from "../types/types";

export const showLoader = () => (dispatch) => {
	dispatch({
		type: SHOW_LOADING,
		payload: true,
	});
};
export const hideLoader = () => (dispatch) => {
	dispatch({
		type: HIDE_LOADING,
		payload: false,
	});
};
export const checkAuth = () => (dispatch) => {
	dispatch({
		type: AUTHENTICATED,
		payload: false,
	});
};

export const checkNetworkError = (payload) => ({
	type: NETWORK_ERROR,
	payload,
});

export const pushPublishResponse = (payload) => ({
	type: PUBLISH_RESPONSE,
	payload,
})
export const pushEsignResponse = (payload) => ({
	type: PUBLISH_ESIGN_ID,
	payload,
})


export const showNotification = (type, message, description) => (dispatch) => {
	dispatch({
		type: SHOW_NOTIFICATION,
		payload: {
			type,
			message,
			description,
			status: true,
		},
	});
};
export const hideNotification = () => (dispatch) => {
	dispatch({
		type: HIDE_NOTIFICATION,
		payload: {
			status: false,
		},
	});
};

export const logoutApp = (payload) => ({
	type: LOGOUT_APP,
	payload,
});
