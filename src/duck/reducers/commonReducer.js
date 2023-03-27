import { getTheme } from "../../utils/commonUtils";
import {
	AUTHENTICATED,
	HIDE_LOADING,
	HIDE_NOTIFICATION, LOGOUT_APP, NETWORK_ERROR, PUBLISH_RESPONSE, SET_NAVIGATION_DATA,
	SET_THEME,
	SHOW_LOADING,
	SHOW_NOTIFICATION,
	TOGGLE_MENU, PUBLISH_ESIGN_ID
} from "../types/types";

const initialState = {
	showLoading: false,
	notification: {
		type: "",
		message: "",
		description: "",
		status: false,
	},
	theme: getTheme(),
	navigationData: {},
	isMenuCollapsed: true,
	isAuthenticated: true,
	isError: false,
	esignRes:'',
	publishRes: {}
};

export default (state = initialState, action) => {
	switch (action.type) {
		case TOGGLE_MENU:
			return {
				...state,
				isMenuCollapsed: !state.isMenuCollapsed,
			};
		case SHOW_LOADING:
			return {
				...state,
				showLoading: action.payload,
			};
		case HIDE_LOADING:
			return {
				...state,
				showLoading: action.payload,
			};
		case SHOW_NOTIFICATION:
			return {
				...state,
				notification: {
					status: true,
					...action.payload,
				},
			};
		case HIDE_NOTIFICATION:
			return {
				...state,
				notification: {
					status: false,
				},
			};
		case SET_THEME:
			return {
				...state,
				theme: action.payload,
			};
		case SET_NAVIGATION_DATA:
			return {
				...state,
				navigationData: action.payload,
			};
		case AUTHENTICATED:
			return {
				...state,
				isAuthenticated: action.payload,
			};
		case NETWORK_ERROR:
			return {
				...state,
				isError: action.payload,
			};
		case PUBLISH_RESPONSE:
			return {
				...state,
				publishRes: action.payload,
			}
		case PUBLISH_ESIGN_ID:
			return {
				...state,
				esignRes: action.payload,
			}
		case LOGOUT_APP:
			return initialState;
		default:
			return state;
	}
};
