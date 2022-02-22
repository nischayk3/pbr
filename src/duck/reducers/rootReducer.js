import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';

import chartDataReducer from './chartDataReducer';
import commonReducer from './commonReducer';
import chartPersReducer from './chartPersReducer';

const createRootReducer = (history) =>
    combineReducers({
        router: connectRouter(history),
        commonReducer,
        chartDataReducer,
        chartPersReducer,
    });
export default createRootReducer;
