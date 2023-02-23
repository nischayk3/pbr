import React, { lazy } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import Loading from "../components/Loading";
import Notification from "../components/Notification";
import SuspenseWrapper from "../components/SuspenseWrapper";
import { MDH_APP_PYTHON_SERVICE, PRODUCT_FOR } from "../constants/apiBaseUrl";
import ErrorPage from "./errorPage";
import ProctectedRoute from "./PrivateRoute";
import TokenExpired from "./tokenexpired";

// APP ROUTE COMPONENTS
const Dashboard = lazy(() => import("./dashboard"));
const Account = lazy(() => import("./user"));

const App = () => {
	const dispatch = useDispatch();
	const match = useRouteMatch();

	const showLoading = useSelector((state) => state.commonReducer.showLoading);
	const authenticated = useSelector(
		(state) => state.commonReducer.isAuthenticated
	);
	const error = useSelector(
		(state) => state.commonReducer.isError
	);

	return (
		<>
			<Loading show={showLoading} />
			<Notification />
			<div style={{ opacity: showLoading ? 0.5 : 1 }}>
				<SuspenseWrapper>
					<Switch>
						<ProctectedRoute
							path={`${match.url}dashboard`}
							key="dashboard"
							authorised={authenticated}
							errorStatus={error}
							component={Dashboard}
						/>
						<Route path={`${match.url}tokenexpired`} key="tokenexpired">
							<TokenExpired />
						</Route>
						<Route path={`${match.url}error`} key="error">
							<ErrorPage />
						</Route>
						<Route path={`${match.url}user`} key="user">
							<Account />
						</Route>

						{/* login as BMS user directly redirect to SSO page */}
						{PRODUCT_FOR == 'BMS' ? (
							<Route exact path="/" component={() => { window.location = `${window.location.origin}/auth/saml-login?redirect_url=${MDH_APP_PYTHON_SERVICE}/%23/dashboard/redirect&from_=UI`; return null; }} />
						) : (
							<Route exact path="/" key="login">
								<Redirect to={"/user/login"} />
							</Route>
						)}
					</Switch>
				</SuspenseWrapper>
			</div>
		</>
	);
};
export default App;
