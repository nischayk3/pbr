import { GET_PROFILE, LOGIN_DETAILS, REDIRECT_URL } from '../../constants/actionTypes';
import { LOGOUT_APP } from '../types/types';

const initialState = {
	loginDetails: {},
	redirectUrl: '',
	profile: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_DETAILS:
			return { ...state, loginDetails: action.payload };
		case REDIRECT_URL:
			return { ...state, redirectUrl: action.payload };
		case GET_PROFILE:
			return { ...state, profile: action.payload }
		case LOGOUT_APP:
			return initialState;
		default:
			return state;
	}
};
