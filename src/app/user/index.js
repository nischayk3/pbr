import React, { lazy } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import SuspenseWrapper from '../../components/SuspenseWrapper';
import CustomerLogin from './login/customerLogin';

const Login = lazy(() => import('./login'));

const User = () => {
	const match = useRouteMatch();
	return (
		<SuspenseWrapper>
			<Switch>
				<Route path={`${match.url}/login`}>
					<Login />
				</Route>
				<Route path={`${match.url}/customer-login`} >
					<CustomerLogin />
				</Route>
			</Switch>
		</SuspenseWrapper>
	);
};

export default User;
