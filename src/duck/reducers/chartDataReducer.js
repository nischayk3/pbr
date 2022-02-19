import * as types from '../../constants/actionTypes';

const initialState = {
    chartName: {},
};

export default function (state = initialState, action) {
    switch (action.type) {
        case types.GET_CHART_DATA:
            return {
                ...state,
                chartName: action.payload,
            };
        default:
            return state;
    }
}
