import { LOAD_VIEW_TABLE_DATA, VIEW_ID_VERSION } from '../../constants/actionTypes';

const initState = {
	loadViewData: [],
	viewIdVer: {}
}

export default (state = initState, action) => {
	switch (action.type) {
		case LOAD_VIEW_TABLE_DATA:
			return { ...state, loadViewData: action.payload }
		case VIEW_ID_VERSION:
			return { ...state, viewIdVer: action.payload }
		default:
			return state;
	}
};
