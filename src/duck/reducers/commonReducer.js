import {
	HIDE_LOADING,
	HIDE_NOTIFICATION,
	SET_NAVIGATION_DATA,
	SET_THEME,
	SHOW_LOADING,
	SHOW_NOTIFICATION,
	TOGGLE_MENU
} from '../types/types';
import { getTheme } from '../../utils/commonUtils';

const initialState = {
	showLoading: false,
	notification: {
		type: '',
		message: '',
		description: '',
		status: false
	},
	theme: getTheme(),
	navigationData: {},
	isMenuCollapsed: true
};

export default (state = initialState, action) => {
	switch (action.type) {
		case TOGGLE_MENU:
			return {
				...state,
				isMenuCollapsed: !state.isMenuCollapsed
			};
		case SHOW_LOADING:
			return {
				...state,
				showLoading: action.payload
			};
		case HIDE_LOADING:
			return {
				...state,
				showLoading: action.payload
			};
		case SHOW_NOTIFICATION:
			return {
				...state,
				notification: {
					status: true,
					...action.payload
				}
			};
		case HIDE_NOTIFICATION:
			return {
				...state,
				notification: {
					status: false
				}
			};
		case SET_THEME:
			return {
				...state,
				theme: action.payload
			};
		case SET_NAVIGATION_DATA:
			return {
				...state,
				navigationData: action.payload
			};
		default:
			return state;
	}
};
