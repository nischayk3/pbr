import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import chartDataReducer from './chartDataReducer';
import chartPersReducer from './chartPersReducer';
import chartViewReducer from './chartViewReducer';
import commonReducer from './commonReducer';
import dataScienceReducer from './dataScienceReducer';
import loginReducer from './loginReducer';
import pbrReducer from './pbrReducer';
import reportDesignerReducer from './reportDesignerReducer';
import viewCreationReducer from './viewCreationReducer';
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
		viewHierarchy,
		dataScienceReducer,
	});
export default createRootReducer;
