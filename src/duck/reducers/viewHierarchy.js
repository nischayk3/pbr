import { DRUG_SUBSTANCE } from "../../constants/actionTypes";

const initState = {
	drugName: '',
};

export default (state = initState, action) => {
	switch (action.type) {
		case DRUG_SUBSTANCE:
			return { ...state, drugName: action.payload };
		default:
			return state;
	}
};
