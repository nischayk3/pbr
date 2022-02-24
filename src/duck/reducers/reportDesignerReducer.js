import * as types from '../../constants/actionTypes';

const initialState = {
    data:{}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.SELECTED_REPORT_ID:
            return { ...state, data: action.payload };
        default:
            return state;
    }
};
