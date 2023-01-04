import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import "antd/dist/antd.min.css";
import axios from "axios";
import { ConnectedRouter } from "connected-react-router";
import React from "react";
import { CookiesProvider } from "react-cookie";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import App from "./app";
import { history, Store } from "./duck/store";
import "./index.scss";
import { msalConfig } from "./services/authProvider";
import * as serviceWorker from "./serviceWorker";

const msalInstance = new PublicClientApplication(msalConfig);

axios.interceptors.request.use(
	function (config) {
		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);

axios.interceptors.response.use(
	function (response) {
		return response;
	},
	function (error) {
		if (error.response.status === 401) {
			const tokenExpiredEvent = new Event("tokenExpired");
			document.dispatchEvent(tokenExpiredEvent);
		}
		return Promise.reject(error);
	}
);

ReactDOM.render(
	<BrowserRouter>
		<CookiesProvider>
			<MsalProvider instance={msalInstance}>
				<Provider store={Store}>
					<ConnectedRouter history={history}>
						<Route>
							<App />
						</Route>
					</ConnectedRouter>
				</Provider>
			</MsalProvider>
		</CookiesProvider>
	</BrowserRouter>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
