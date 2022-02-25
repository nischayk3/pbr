import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';

import chartDataReducer from './chartDataReducer';
import commonReducer from './commonReducer';
import chartPersReducer from './chartPersReducer';
import reportDesignerReducer from './reportDesignerReducer';
import viewCreationReducer from './viewCreationReducer';

const createRootReducer = (history) =>
    combineReducers({
        router: connectRouter(history),
        commonReducer,
        chartDataReducer,
        chartPersReducer,
        reportDesignerReducer,
        viewCreationReducer 

    });
export default createRootReducer;
