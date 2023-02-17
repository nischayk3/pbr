/* eslint-env browser, node */
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { applyMiddleware, compose, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";

export const history = createBrowserHistory();

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
