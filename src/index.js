import React from 'react';
import axios from 'axios'
import { ConnectedRouter } from 'connected-react-router';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { CookiesProvider } from 'react-cookie';
import App from './app';
import configureStore, { history } from './duck/store';
import * as serviceWorker from './serviceWorker';
import './index.scss';
import 'antd/dist/antd.min.css';
import { msalConfig } from './services/authProvider';

const msalInstance = new PublicClientApplication(msalConfig);

axios.interceptors.request.use(function (config) {
	return config;
}, function (error) {
	return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
	return response;
}, function (error) {
	if (error.response.status === 401) {
		const tokenExpiredEvent = new Event('tokenExpired')
		document.dispatchEvent(tokenExpiredEvent)
	}
	return Promise.reject(error);
});

ReactDOM.render(
	<BrowserRouter>
		<CookiesProvider>
			<MsalProvider instance={msalInstance}>
				<Provider store={configureStore()}>
					<ConnectedRouter history={history}>
						<Route>
							<App />
						</Route>
					</ConnectedRouter>
				</Provider>
			</MsalProvider>
		</CookiesProvider>
	</BrowserRouter>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
