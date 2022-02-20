import React from 'react';

import { ConnectedRouter } from 'connected-react-router';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';

import App from './app';
import configureStore, { history } from './duck/store';
import * as serviceWorker from './serviceWorker';
import './index.scss';
import 'antd/dist/antd.min.css';

ReactDOM.render(
    <>
        {/* <React.StrictMode> */}
        <Provider store={configureStore()}>
            <ConnectedRouter history={history}>
                <Route>
                    <App />
                </Route>
            </ConnectedRouter>
        </Provider>
        {/* </React.StrictMode> */}
    </>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
