import * as types from '../../constants/actionTypes';

const initState = {
    site: '',
};

export default (state = initState, action) => {
    switch (action.type) {
        case types.SELECTED_SITE:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
