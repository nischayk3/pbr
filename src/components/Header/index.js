import { BellOutlined, LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Input, Layout } from 'antd';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import mareanaLogo from '../../assets/mareana_logo.png';
import { MDH_APP_PYTHON_SERVICE } from '../../constants/apiBaseUrl';
import { showNotification } from '../../duck/actions/commonActions';
import { logoutUrl } from '../../services/loginService';
import Auth from '../../utils/auth';
import './style.scss';

const { Header } = Layout;
const { Search } = Input;

const HeaderBar = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	useEffect(() => {
		document.addEventListener('tokenExpired', () => {
			if (localStorage.getItem('login_details')) {
				adLogout('tokenExpired')
			}
		})
	}, [])

	// const toggleCollapsed = () => {
	// 	dispatch(toggleMenu());
	// };

	const Logout = () => {
		// LOGOUT API NOT WORKING
		// const jwt = localStorage.getItem('user_token');
		// await userLogout(jwt);
		Auth.logout(() => {
			history.push('/');
		});
	};

	const adLogout = (tokenExpired) => {
		if (tokenExpired) {
			dispatch(showNotification("error", 'Signature Expired! Please login again.'))
		}
		localStorage.clear()
		window.open(`${logoutUrl}`, '_self')
		window.open(`${logoutUrl}?redirect_url=${MDH_APP_PYTHON_SERVICE}`, '_self')
	}
	const loginResponse = JSON.parse(localStorage.getItem("login_details"))

	return (
		<Header id='header'>
			<div id='hamburger' className='inline'>
				<div className='header-logo'>
					<img src={mareanaLogo} height='40' alt='menu' />
				</div>
			</div>
			<div className="subheader">
				<Search
					placeholder="Search"
					allowClear
					//onSearch={ }
					style={{ width: 304 }}
				/>
				<BellOutlined style={{ margin: "6px 25px", fontSize: "20px" }} />
				<div className="custom-menu">
					<div className="user-name">
						<Avatar style={{ backgroundColor: "orange" }}>
							{localStorage.getItem("username") &&
								localStorage.getItem("username").split("")[0].toUpperCase()}{" "}
						</Avatar>
						<p style={{ padding: "0px 10px" }}>
							{localStorage.getItem("username")}
						</p>
					</div>
					<div className="menu-detail">
						<div className="avatar-details">
							<Avatar size={64}
								style={{
									padding: "10px 0",
									margin: "10px 0"
								}}
								icon={<UserOutlined />} />
							<p className="username">	{localStorage.getItem("username")}</p>
							<p className="email">	{localStorage.getItem("password")}{loginResponse && loginResponse.email_id}</p>
						</div>
						<div className="submenu">
							<p onClick={() => history.push('/dashboard/profile')}><UserOutlined /> Profile</p>
							<p><SettingOutlined /> Preferences</p>
						</div>
						<div className="logout">
							<p><LogoutOutlined /> Logout</p>
						</div>
					</div>
				</div>
			</div>
			{/* <div
				className='logout-btn'
				onClick={adenabled ? () => adLogout() : () => Logout()}>
				<LogoutOutlined />
			</div> */}
		</Header >
	);
};

export default HeaderBar;
