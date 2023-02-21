/* eslint-env browser, node */
import { routerMiddleware } from "connected-react-router";
import { createHashHistory } from "history";
import { applyMiddleware, compose, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";

{/* remove '#' in URL, use  createBrowserHistory() */ }
export const history = createHashHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reactRouterMiddleware = routerMiddleware(history);
const middlewares = [thunk, reactRouterMiddleware];
if (process.env.NODE_ENV !== "production") {
	middlewares.push(logger); //(Use when required)
}
export const Store = createStore(
	rootReducer(history),
	composeEnhancers(applyMiddleware(...middlewares))
);
