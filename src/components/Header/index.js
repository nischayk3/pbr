import { BellOutlined, CaretUpOutlined, DownOutlined, LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Layout, Modal } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import mareanaLogo from '../../assets/mareana_logo_svg.svg';
import { adenabled } from '../../config/config';
import { MDH_APP_PYTHON_SERVICE } from '../../constants/apiBaseUrl';
import { logoutApp, showNotification } from '../../duck/actions/commonActions';
import { getUploadProfile } from '../../duck/actions/loginAction';
import { getUserProfile, logoutUrl } from "../../services/loginService";
import Auth from '../../utils/auth';
import './style.scss';

const { Header } = Layout;
// const { Search } = Input;

const HeaderBar = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const [imgRes, setImgRes] = useState("");
	const [imagePrev, setImagePrev] = useState(false);
	const [dropdownVisible, setDropdownVisible] = useState(false);
	const [modal, setModal] = useState(false)

	const loginDetails = JSON.parse(localStorage.getItem("login_details"))

	const profile = useSelector((state) => state.loginReducer.profile)

	useEffect(() => {
		if (loginDetails && loginDetails.token != '') {
			getProfile();
		}
		document.addEventListener('tokenExpired', () => {
			if (localStorage.getItem('login_details')) {
				adLogout('tokenExpired')
			}
		})
	}, [])

	useEffect(() => {
		if (profile) {
			getProfile();
			dispatch(getUploadProfile(false));
		}
	}, [profile])

	const dropDownOpen = () => {
		setDropdownVisible(true)
	}

	const Logout = () => {
		// LOGOUT API NOT WORKING
		Auth.logout(() => {
			history.push('/user/logout');
		});
	};

	const useOutsideAlerter = (ref) => {
		useEffect(() => {
			function handleClickOutside(event) {
				if (ref.current && !ref.current.contains(event.target)) {
					setDropdownVisible(false)
				}
			}
			document.addEventListener("mousedown", handleClickOutside);
			return () => {
				document.removeEventListener("mousedown", handleClickOutside);
			};
		}, [ref]);
	}

	const adLogout = () => {
		dispatch(logoutApp(true))

		localStorage.removeItem('login_details');
		localStorage.removeItem('username');

		window.open(`${logoutUrl}`, '_self');
		window.open(`${logoutUrl}?redirect_url=${MDH_APP_PYTHON_SERVICE}/%23/user/logout`, '_self');
	}

	const wrapperRef = useRef(null);
	useOutsideAlerter(wrapperRef);

	const getProfile = async () => {
		try {
			const _getReq = {
				email_address: loginDetails && loginDetails.email_id,
				image: true
			}
			const getRes = await getUserProfile(_getReq)
			if (getRes?.statuscode === 200) {
				setImagePrev(true)
				setImgRes(getRes.message)
			} else {
				setImagePrev(false)
			}
		} catch (error) {
			dispatch(showNotification('error', error));
		}
	}

	return (
		<Header id='header' ref={wrapperRef}>
			<div id='hamburger' className='inline'>
				<div className='header-logo'>
					<img src={mareanaLogo} height='39' alt='menu' />
				</div>
			</div>
			<div className="subheader">
				{/* <Search
					placeholder="Search"
					allowClear
					//onSearch={ }
					style={{ width: 304 }}
				/> */}
				{/* <BellOutlined style={{ margin: "6px 25px", fontSize: "20px" }} /> */}
				<div className="custom-menu">
					<div className="user-name" onClick={dropDownOpen}>
						<Avatar className='user-avatar'>
							{localStorage.getItem("username") &&
								localStorage.getItem("username").split("")[0].toUpperCase()}{" "}
						</Avatar>
						<p className='login-name'>{loginDetails && loginDetails.firstname} {loginDetails && loginDetails.lastname}</p>
						<DownOutlined className='down-icon' />
					</div>
					{dropdownVisible && (
						<>
							<div className="caret">
								<CaretUpOutlined />
							</div>
							<div className="menu-detail">
								<div className="avatar-details">
									{imagePrev ? (<img src={"data:image/png;base64," + `${imgRes}`} alt="dummy" width="300" height="300" />) : (<Avatar size={64}
										style={{
											padding: "10px 0",
											margin: "10px 0"
										}}
										icon={<UserOutlined />} />)}
									<p className="username">{loginDetails && loginDetails.firstname} {loginDetails && loginDetails.lastname}</p>
									<p className="email">{loginDetails && loginDetails.email_id}</p>
								</div>
								<div className="submenu">
									<p onClick={() => {
										history.push('/dashboard/profile');
										setDropdownVisible(false)
									}}><UserOutlined /> Profile</p>
									<p onClick={() => {
										history.push('/dashboard/profile');
										setDropdownVisible(false)
									}}><SettingOutlined /> Preferences</p>
									<p onClick={() => {
										history.push('/dashboard/profile');
										setDropdownVisible(false)
									}}><BellOutlined /> Notification</p>
								</div>
								<div className="logout" onClick={() => setModal(true)}>
									<p><LogoutOutlined /> Logout</p>

								</div>

							</div>
						</>
					)}
				</div>
			</div>

			<Modal
				visible={modal}
				title="Log Out"
				onCancel={() => setModal(false)}
				footer={<div><Button onClick={() => setModal(false)}
				>Cancel</Button><Button onClick={adenabled ? () => adLogout() : () => Logout()} style={{ color: 'white', backgroundColor: '#093185' }}>Confirm</Button></div>}
			>
				You are about to log out and terminate your session do you want to confirm?
			</Modal>

		</Header >
	);
};

export default HeaderBar;
