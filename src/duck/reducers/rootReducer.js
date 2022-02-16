import commonReducer from './commonReducer';
import chartDataReducer from './chartDataReducer';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

const createRootReducer = (history) =>
    combineReducers({
        router: connectRouter(history),
        commonReducer,
        chartDataReducer,
    });
export default createRootReducer;
