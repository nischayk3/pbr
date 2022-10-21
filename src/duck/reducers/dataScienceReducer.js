import { FILE_UPLOAD_RES, LOAD_VIEW_TABLE_DATA, VIEWSET_RES, VIEW_ID_VERSION } from '../../constants/actionTypes';

const initState = {
	loadViewData: [],
	viewIdVer: {},
	viewRes: {},
	fileRes: {}
}

export default (state = initState, action) => {
	switch (action.type) {
		case LOAD_VIEW_TABLE_DATA:
			return { ...state, loadViewData: action.payload }
		case VIEW_ID_VERSION:
			return { ...state, viewIdVer: action.payload }
		case FILE_UPLOAD_RES:
			return { ...state, fileRes: action.payload }
		case VIEWSET_RES:
			return { ...state, viewRes: action.payload }
		default:
			return state;
	}
};
