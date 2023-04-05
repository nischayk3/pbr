import React, { lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import Loading from "../components/Loading";
import Notification from "../components/Notification";
import SuspenseWrapper from "../components/SuspenseWrapper";
import { MDH_APP_PYTHON_SERVICE, PRODUCT_FOR } from "../constants/apiBaseUrl";
import ErrorPage from "./errorPage";
import ProctectedRoute from "./PrivateRoute";
import TokenExpired from "./tokenexpired";
import ReactGA from 'react-ga4';
import { getSession } from "../services/loginService";
import { showNotification } from "../duck/actions/commonActions";
import { sendLoginDetails } from "../duck/actions/loginAction";

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

	const getSessionDetail = async () => {
		try {
			const sessionres = await getSession()
			if (sessionres.Status === 200) {
				if (!sessionres.SignedInfo) {
					window.open("https://mi-dev.mareana.com", '_self')

					return;
				}
				const data = sessionres['Data'];
				localStorage.setItem('login_details', JSON.stringify(data));
				localStorage.setItem('user', data?.user_id);
				localStorage.setItem('username', data?.firstname ? data?.firstname.replaceAll('^"|"$', '') : data?.email_id.replaceAll('^"|"$', ''));
				localStorage.setItem("user_id", data?.user_id)

				dispatch(showNotification('success', `Logged in as ${data?.email_id}`));
				if (data?.token != '') {
					dispatch(sendLoginDetails(data));
				}
			} else {
				dispatch(showNotification("error", 'Login Failed', 'Sorry, an unexpectede error occurred. Please try logging in again.'));
			}
		} catch (error) {
			dispatch(showNotification("error", 'Login Failed', 'Sorry, an unexpectede error occurred. Please try logging in again.'));
		}
	}

	useEffect(() => {
		// google analytis initialize 
		if (window.location.host == 'merck-mi-dev.mareana.com' || window.location.host == 'mi-devv3-7.mareana.com') {
			ReactGA.initialize('G-1WM83NDTY2');
		}
		getSessionDetail();
	}, [])

	return (
		<>
			<Loading show={showLoading} />
			<Notification />
			<div style={{ opacity: showLoading ? 0.5 : 1 }}>
				<SuspenseWrapper>
					<Switch>
						<Route exact path="/" key="login">
							<Redirect to={"/mi/dashboard/workspace"} />
						</Route>
						<ProctectedRoute
							path={`${match.url}/mi/dashboard`}
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

						{PRODUCT_FOR == 'BMS' && (
							<Route exact path="/" component={() => { window.location = `${window.location.origin}/auth/saml-login?redirect_url=${MDH_APP_PYTHON_SERVICE}/%23/dashboard/redirect&from_=UI`; return null; }} />
						)}

						{/* login as BMS user directly redirect to SSO page */}
						{/* {PRODUCT_FOR == 'BMS' ? (
							<Route exact path="/" component={() => { window.location = `${window.location.origin}/auth/saml-login?redirect_url=${MDH_APP_PYTHON_SERVICE}/%23/dashboard/redirect&from_=UI`; return null; }} />
						) : (
							<Route exact path="/" key="login">
								<Redirect to={"/user/login"} />
							</Route>
						)} */}
					</Switch>
				</SuspenseWrapper>
			</div>
		</>
	);
};
export default App;
