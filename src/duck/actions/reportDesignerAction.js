import { SCREEN_CHANGE, SELECTED_REPORT_ID, LOADED_LAYOUT } from '../../constants/actionTypes'

export const sendReport = (payload) => ({
	type: SELECTED_REPORT_ID,
	payload
});

export const screenChange = (payload) => ({
	type: SCREEN_CHANGE,
	payload
});

export const loadedLayout = (payload) => ({
	type: LOADED_LAYOUT,
	payload
});


