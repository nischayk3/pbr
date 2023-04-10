import { LogoutOutlined } from '@ant-design/icons';
import { Button, Result } from "antd";
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { MDH_APP_PYTHON_SERVICE, PRODUCT_FOR } from '../../../constants/apiBaseUrl';
import "./logout.scss";

const Logout = () => {
	const history = useHistory();

	useEffect(() => {
		localStorage.removeItem('login_details');
		localStorage.removeItem('username');
		localStorage.removeItem('loginwith');
	}, []);

	const loginBack = () => {
		if (PRODUCT_FOR == 'BMS') {
			window.open(`${window.location.origin}auth/saml-login?redirect_url=${MDH_APP_PYTHON_SERVICE}/%23/dashboard/redirect&from_=UI`, '_self');
			localStorage.setItem("loginwith", 'WITH_SAML')
		} else {
			history.push('/user/login');
		}
	}



	return (
		<div className="bg-img-logout">
			<Result
				icon={<LogoutOutlined style={{ fontSize: '28px', color: '#162154' }} className="logout-icon" />}
				title="You have been logged out"
				subTitle="Thank you for using our service. Please log in again to continue."
				extra={[
					<Button onClick={(e) => loginBack()} className="custom-secondary-btn">Login</Button>,
				]}
			/>
		</div>

	)
}

export default Logout;