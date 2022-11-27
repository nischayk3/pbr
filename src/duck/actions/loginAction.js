import { GET_PROFILE, LOGIN_DETAILS } from '../../constants/actionTypes';

export const sendLoginDetails = (payload) => ({
	type: LOGIN_DETAILS,
	payload
});

export const getUploadProfile = (payload) => ({
	type: GET_PROFILE,
	payload
})
