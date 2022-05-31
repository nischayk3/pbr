
import { LOAD_TEMPLATE, MATBATCH_INFO } from '../types/types';

const initialState = {
	templateData: [],
	matBatchInfo: {}
};

export default (state = initialState, action) => {
	switch (action.type) {
		case LOAD_TEMPLATE:
			return { ...state, templateData: action.payload };
		case MATBATCH_INFO:
			return { ...state, matBatchInfo: action.payload };
		default:
			return state;
	}
};
