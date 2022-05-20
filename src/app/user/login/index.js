import React from 'react';
import { Form, Input, Button, Row, Col, Checkbox } from 'antd';
import { userLogin } from '../../../api/login';
import Auth from '../../../utils/auth';
import { useDispatch } from 'react-redux';
import {
	showNotification,
	showLoader,
	hideLoader,
} from '../../../duck/actions/commonActions';
import './login.scss';
import { useHistory } from 'react-router-dom';
import Banner from '../../../assets/images/dashboard_login_1.png';
import microsoft from '../../../assets/images/icons8-microsoft-48.png';
import { loginUrl } from '../../../services/loginService';
import { adenabled } from '../../../config/config';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { MDH_APP_PYTHON_SERVICE } from '../../../constants/apiBaseUrl';

const Login = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const onFinish = async values => {
		try {
			dispatch(showLoader());
			const response = await userLogin(values);
			Auth.login({ ...response, username: values.username });
			history.push('/dashboard/view_creation');
			dispatch(hideLoader());
		} catch (err) {
			dispatch(hideLoader());
			dispatch(showNotification('error', err.message));
		}
	};

	const onLogin = async () => {
		if (localStorage.getItem('login_details')) {
			history.push('/dashboard/workspace');
			dispatch(showNotification('success', 'Logged In Success'));
		} else {
			if (localStorage.getItem('test_enabled')) {
				window.open(
					`${loginUrl}?is_ui=True&base_url=${MDH_APP_PYTHON_SERVICE}&redirect_url=${MDH_APP_PYTHON_SERVICE}%2F%23%2Fdashboard%2Fredirect`,
					'_self'
				);
			} else {
				window.open(
					`${loginUrl}?is_ui=True&base_url=${MDH_APP_PYTHON_SERVICE}&redirect_url=${MDH_APP_PYTHON_SERVICE}%2F%23%2Fdashboard%2Fredirect`,
					'_self'
				);
			}
		}
	};

	return (
		<div className='login-wrapper bg-img'>
			<div className='login-split '>
				<div className='login-left'>
					<img
						src={Banner}
						height='500px'
						style={{ display: 'flex', justifyContent: 'center' }}
					/>
				</div>
				<div className='login-right'>
					<div>
						<p className='login-head'>Login</p>
						<p className='login-desc'>
							Welcome Back! Please enter your details
						</p>
					</div>

					<div className='login-input'>
						<Input
							className='input-prefix'
							placeholder='Enter username: admin or user'
							prefix={<UserOutlined />}
							//onChange={handleDashboardName}
							//value={props.dashboardName}
						/>
					</div>

					<div className='login-input'>
						<Input
							className='input-prefix'
							placeholder='Enter password: **********'
							prefix={<LockOutlined />}
							//onChange={handleDashboardName}
							//value={props.dashboardName}
						/>
					</div>

					<div className='forgot-pwd'>
						<Checkbox color='primary' checked>
							Remember me
						</Checkbox>
						<p>Forgot your password?</p>
					</div>

					<Button className='login-btn'>Log In</Button>

					<p className='signup-text'>
						Don't have an account? <span className='sign-up'>Sign up</span>
					</p>

					<div className='card card-white card-changes'>
						<div className='card-content card-container-change'>
							<Form
								// {...layout}
								name='basic'
								initialValues={{
									remember: true,
								}}
								onFinish={adenabled ? onLogin : onFinish}>
								{!adenabled ? (
									<>
										<Form.Item
											label='Username'
											name='username'
											rules={[
												{
													required: true,
													message: 'Please enter your username!',
												},
											]}>
											<Input id='username' />
										</Form.Item>

										<Form.Item
											label='Password'
											name='password'
											rules={[
												{
													required: true,
													message: 'Please enter your password!',
												},
											]}>
											<Input.Password id='password' />
										</Form.Item>
									</>
								) : (
									<></>
								)}

								<Form.Item
								//  {...tailLayout}
								>
									<Button
										htmlType='submit'
										id='login-btn'
										className='microsoft-btn'>
										<span>
											<img src={microsoft} height='25px' />
										</span>
										Sign In with Microsoft
									</Button>
								</Form.Item>
							</Form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
