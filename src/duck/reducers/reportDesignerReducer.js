import { SCREEN_CHANGE, SELECTED_REPORT_ID, LOADED_LAYOUT } from '../../constants/actionTypes';

const initialState = {
	reportData: {},
	screen: false,
	loginDetails: {},
	layout: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SELECTED_REPORT_ID:
			return { ...state, reportData: action.payload };
		case SCREEN_CHANGE:
			return { ...state, screen: action.payload };
		case LOADED_LAYOUT:
			return { ...state, layout: action.payload };
		default:
			return state;
	}
};
