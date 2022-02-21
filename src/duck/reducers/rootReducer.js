import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';

import chartDataReducer from './chartDataReducer';
import commonReducer from './commonReducer';

const createRootReducer = (history) =>
    combineReducers({
        router: connectRouter(history),
        commonReducer,
        chartDataReducer,
    });
export default createRootReducer;
