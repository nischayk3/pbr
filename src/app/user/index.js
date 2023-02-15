import React, { lazy } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import SuspenseWrapper from '../../components/SuspenseWrapper';
import Admin from './login/admin';

const Login = lazy(() => import('./login'));

const User = () => {
	const match = useRouteMatch();
	return (
		<SuspenseWrapper>
			<Switch>
				<Route path={`${match.url}/login`}>
					<Login />
				</Route>
				<Route path={`${match.url}/admin`} >
					<Admin />
				</Route>
			</Switch>
		</SuspenseWrapper>
	);
};

export default User;
