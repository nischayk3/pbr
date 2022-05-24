import {LOAD_TEMPLATE } from '../types/types';

const initialState = {
    templateData:[]
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOAD_TEMPLATE:
            return { ...state,templateData: action.payload };
        default:
            return state;
    }
};