import { SCREEN_CHANGE, SELECTED_REPORT_ID } from '../../constants/actionTypes'

export const sendReport = (payload) => ({
	type: SELECTED_REPORT_ID,
	payload
});

export const screenChange = (payload) => ({
	type: SCREEN_CHANGE,
	payload
});


