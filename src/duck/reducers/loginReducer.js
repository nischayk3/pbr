import {LOGIN_DETAILS} from '../../constants/actionTypes';

const initialState = {
    loginDetails:{}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_DETAILS:
            return { ...state,loginDetails: action.payload };
        default:
            return state;
    }
};
