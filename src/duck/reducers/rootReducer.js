import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';

import chartDataReducer from './chartDataReducer';
import commonReducer from './commonReducer';
import chartPersReducer from './chartPersReducer';
import reportDesignerReducer from './reportDesignerReducer';
import chartViewReducer from './chartViewReducer';

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    commonReducer,
    chartDataReducer,
    chartPersReducer,
    reportDesignerReducer,
    chartViewReducer,
  });
export default createRootReducer;
