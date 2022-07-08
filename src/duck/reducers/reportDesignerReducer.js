import { SCREEN_CHANGE, SELECTED_REPORT_ID, LOADED_LAYOUT, REPORT_LOAD, GEN_LOAD } from '../../constants/actionTypes';

const initialState = {
	reportData: {},
	screen: false,
	loginDetails: {},
	layout: false,
	reportLoad: {},
	genLoad: false,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SELECTED_REPORT_ID:
			return { ...state, reportData: action.payload };
		case SCREEN_CHANGE:
			return { ...state, screen: action.payload };
		case LOADED_LAYOUT:
			return { ...state, layout: action.payload };
		case REPORT_LOAD:
			return { ...state, reportLoad: action.payload };
		case GEN_LOAD:
			return { ...state, genLoad: action.payload };
		default:
			return state;

	}
};
