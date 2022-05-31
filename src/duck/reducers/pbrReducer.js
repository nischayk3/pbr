
import {LOAD_TEMPLATE, MATBATCH_INFO,PAGE_IDENTIFIER} from '../types/types';

const initialState = {
    templateData:[],
    matBatchInfo:{},
    pageIdentifier:{}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOAD_TEMPLATE:
            return { ...state,templateData: action.payload };
        case MATBATCH_INFO:
            return { ...state,matBatchInfo: action.payload };
        case PAGE_IDENTIFIER:
            return { ...state,pageIdentifier: action.payload };
        default:
            return state;
    }
};