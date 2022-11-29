import {
	SELECTED_CHART_ID, SELECTED_CHART_VERSION
} from '../../constants/actionTypes';

//send chart id
export const sendChartId = (payload) => ({
	type: SELECTED_CHART_ID,
	payload
});


export const sendChartVersion = (payload) => ({
	type: SELECTED_CHART_VERSION,
	payload
});
