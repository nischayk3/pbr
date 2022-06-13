
import { LOAD_TEMPLATE, MATBATCH_INFO, PAGE_IDENTIFIER ,TEMP_ADDITIONAL} from '../types/types';

const initialState = {
	templateData: [],
	matBatchInfo: {},
	pageIdentifier: {},
	tempAdditional:{}
};

export default (state = initialState, action) => {
	switch (action.type) {
		case LOAD_TEMPLATE:
			return { ...state, templateData: action.payload };
		case MATBATCH_INFO:
			return { ...state, matBatchInfo: action.payload };
		case PAGE_IDENTIFIER:
			return { ...state, pageIdentifier: action.payload };
		case TEMP_ADDITIONAL:
			return { ...state, tempAdditional: action.payload };
		default:
			return state;
	}
};
