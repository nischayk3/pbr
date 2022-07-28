import React, { lazy } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import Loading from "../components/Loading";
import Notification from "../components/Notification";
import SuspenseWrapper from "../components/SuspenseWrapper";
import ProctectedRoute from "./PrivateRoute";
import TokenExpired from "./tokenexpired";

// APP ROUTE COMPONENTS
const Dashboard = lazy(() => import("./dashboard"));
const Account = lazy(() => import("./user"));

const App = () => {
	const match = useRouteMatch();
	const showLoading = useSelector((state) => state.commonReducer.showLoading);
	const authenticated = useSelector(
		(state) => state.commonReducer.isAuthenticated
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
							component={Dashboard}
						/>
						<Route path={`${match.url}tokenexpired`} key="tokenexpired">
							<TokenExpired />
						</Route>
						<Route path={`${match.url}user`} key="user">
							<Account />
						</Route>
						<Route exact path="/" key="login">
							<Redirect to={"/user/login"} />
						</Route>
					</Switch>
				</SuspenseWrapper>
			</div>
		</>
	);
};
export default App;
