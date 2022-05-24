import chartDataReducer from './chartDataReducer';
import chartPersReducer from './chartPersReducer';
import chartViewReducer from './chartViewReducer';
import { combineReducers } from 'redux';
import commonReducer from './commonReducer';
import { connectRouter } from 'connected-react-router';
import reportDesignerReducer from './reportDesignerReducer';
import viewCreationReducer from './viewCreationReducer';
import loginReducer from './loginReducer';
import pbrReducer from './pbrReducer';
import viewHierarchy from './viewHierarchy';
const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    commonReducer,
    chartDataReducer,
    chartPersReducer,
    chartViewReducer,
    reportDesignerReducer,
    viewCreationReducer,
    loginReducer,
    pbrReducer,
    viewHierarchy

    
  });
export default createRootReducer;
