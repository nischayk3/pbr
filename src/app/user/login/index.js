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
import Icon from '../../../assets/mareana_logo.png';
import Banner from '../../../assets/images/dashboard_login_1.png';
import microsoft from '../../../assets/images/icons8-microsoft-48.png'
import { loginUrl } from '../../../services/loginService';
import { adenabled } from '../../../config/config';
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { MDH_APP_PYTHON_SERVICE } from '../../../constants/apiBaseUrl';

const Login = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const onFinish = async (values) => {
		try {
			dispatch(showLoader());
			const response = await userLogin(values);
			Auth.login({ ...response, username: values.username });
			history.push('/dashboard/view_creation');
			dispatch(hideLoader());
		}
		catch (err) {
			dispatch(hideLoader());
			dispatch(showNotification('error', err.message));
		}
	};

	const onLogin = async () => {
		if (localStorage.getItem('login_details')) {
			history.push('/dashboard/workspace');
			dispatch(showNotification('success', 'Logged In Success'));
		} else {
			if (localStorage.getItem("test_enabled")) {
                window.open(`${loginUrl}?is_ui=True&base_url=${MDH_APP_PYTHON_SERVICE}&redirect_url=${MDH_APP_PYTHON_SERVICE}%2F%23%2Fdashboard%2Fredirect`, '_self')
            } else {
                window.open(`${loginUrl}?is_ui=True&base_url=${MDH_APP_PYTHON_SERVICE}&redirect_url=${MDH_APP_PYTHON_SERVICE}%2F%23%2Fdashboard%2Fredirect`, '_self')
            }
		}
	};

	return (
		<div className='page-login bg-img'>
			{/* <div className='page-login-header'>
				<span className='brand-name'>Continuous Process Verification</span>
				<a href='https://www.mareana.com' target='_blank' rel='noreferrer'>
					<img src={Icon} alt={'logo'} className='logo' />
				</a>
			</div> */}

			<div className='main-body '>
				<Row style={{ padding: '80px 185px' }}>
					<Col span={12}>
						<img src={Banner} height='500px' style={{ display: 'flex', justifyContent: 'center' }} />
					</Col>
					<Col span={12}>
						<Row>
							<div>
								<p className='login-head'>Login</p>
								<p className='login-desc'>Welcome Back!Please enter your details</p>
							</div>
						</Row>
						<Row>
							<div style={{marginTop:'60px',width:'100%'}}>
							<Input
								placeholder="Enter username: admin or user"
								prefix={<UserOutlined />}
							//onChange={handleDashboardName}
							//value={props.dashboardName}
							/>
							</div>
						</Row>
						<Row>
							<div style={{margin:'30px 0px',width:'100%'}}>
							<Input
								placeholder="Enter password: ant.design"
								prefix={<LockOutlined />}
							//onChange={handleDashboardName}
							//value={props.dashboardName}
							/>
							</div>
							
						</Row>
						<Row>
							<div className='forgot-pwd'>
								<Checkbox checked>Remember me</Checkbox>
								<span style={{marginLeft:'235px'}}>Forgot your password?</span>
							</div>
						</Row>
						<Row>
							<Button className='login-btn'>Log In</Button>
						</Row>
						<Row>
							<p className='signup-text'>Don't have an account? <strong className='sign-up'>Sign up</strong></p>
						</Row>
						<Row>
							<div className='body'>
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
												<Button  htmlType='submit' id='login-btn' className='microsoft-btn'>
													<span><img src={microsoft} height='25px'/></span>Sign In with Microsoft
												</Button>
											</Form.Item>
										</Form>
									</div>
								</div>
							</div>
						</Row>
					</Col>
				</Row>
			</div>
		</div>
	);
};

export default Login;
