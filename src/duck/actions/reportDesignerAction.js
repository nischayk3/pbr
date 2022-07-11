import { SCREEN_CHANGE, SELECTED_REPORT_ID, LOADED_LAYOUT, REPORT_LOAD, GEN_LOAD } from '../../constants/actionTypes'

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

export const reportLoad = (payload) => ({
	type: REPORT_LOAD,
	payload
});

export const genLoad = (payload) => ({
	type: GEN_LOAD,
	payload
});



