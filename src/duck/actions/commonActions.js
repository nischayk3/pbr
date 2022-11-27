import {
	AUTHENTICATED, HIDE_LOADING,
	HIDE_NOTIFICATION, SHOW_LOADING,
	SHOW_NOTIFICATION
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
