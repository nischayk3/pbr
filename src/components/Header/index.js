import { LogoutOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import mareanaLogo from '../../assets/mareana_logo.png';
import { adenabled } from '../../config/config';
import { MDH_APP_PYTHON_SERVICE } from '../../constants/apiBaseUrl';
import { showNotification } from '../../duck/actions/commonActions';
import { logoutUrl } from '../../services/loginService';
import Auth from '../../utils/auth';
import './style.scss';

const { Header } = Layout;

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

	return (
		<Header id='header'>
			<div id='hamburger' className='inline'>
				<div className='header-logo'>
					<img src={mareanaLogo} height='40' alt='menu' />
				</div>
			</div>
			<div
				className='logout-btn'
				onClick={adenabled ? () => adLogout() : () => Logout()}>
				<LogoutOutlined />
			</div>
		</Header>
	);
};

export default HeaderBar;
