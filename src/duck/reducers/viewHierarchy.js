import { DRUG_SUBSTANCE, DRUG_LOAD } from "../../constants/actionTypes";

const initState = {
	drugName: '',
	drugLoad: false
};

export default (state = initState, action) => {
	switch (action.type) {
		case DRUG_SUBSTANCE:
			return { ...state, drugName: action.payload };
		case DRUG_LOAD:
			return { ...state, drugLoad: action.payload };
		default:
			return state;
	}
};
