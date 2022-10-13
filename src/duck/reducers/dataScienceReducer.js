import { LOAD_VIEW_TABLE_DATA } from '../../constants/actionTypes';

const initState = {
	loadViewData: []
}

export default (state = initState, action) => {
	switch (action.type) {
		case LOAD_VIEW_TABLE_DATA:
			return { ...state, loadViewData: action.payload }
		default:
			return state;
	}
};
