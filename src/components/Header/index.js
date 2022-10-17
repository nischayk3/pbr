import { BellOutlined, CaretUpOutlined, DownOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Input, Layout } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import mareanaLogo from '../../assets/mareana_logo.png';
import { adenabled } from '../../config/config';
import { MDH_APP_PYTHON_SERVICE } from '../../constants/apiBaseUrl';
import { showNotification } from '../../duck/actions/commonActions';
import { getUserProfile, logoutUrl } from "../../services/loginService";
import Auth from '../../utils/auth';
import './style.scss';

const { Header } = Layout;
const { Search } = Input;

const HeaderBar = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const [imgRes, setImgRes] = useState("");
	const [imagePrev, setImagePrev] = useState(false);
	const [dropdownVisible, setDropdownVisible] = useState(false);
	const loginDetails = JSON.parse(localStorage.getItem("login_details"))

	useEffect(() => {
		getProfile();
		document.addEventListener('tokenExpired', () => {
			if (localStorage.getItem('login_details')) {
				adLogout('tokenExpired')
			}
		})
	}, [])

	const dropDownOpen = () => {
		setDropdownVisible(true)
	}

	const Logout = () => {
		// LOGOUT API NOT WORKING
		Auth.logout(() => {
			history.push('/');
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

	const adLogout = (tokenExpired) => {
		if (tokenExpired) {
			dispatch(showNotification("error", 'Signature Expired! Please login again.'))
		}
		localStorage.clear()
		window.open(`${logoutUrl}`, '_self')
		window.open(`${logoutUrl}?redirect_url=${MDH_APP_PYTHON_SERVICE}`, '_self')
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
			if (getRes.statuscode === 200) {
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
					<div className="user-name" onClick={dropDownOpen}>

						<Avatar size={22} style={{ backgroundColor: "orange", fontSize: "16px", padding: "1px 0" }}>
							{localStorage.getItem("username") &&
								localStorage.getItem("username").split("")[0].toUpperCase()}{" "}
						</Avatar>
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
									{/* <p><SettingOutlined /> Preferences</p> */}
								</div>
								<div className="logout" onClick={adenabled ? () => adLogout() : () => Logout()}>
									<p><LogoutOutlined /> Logout</p>
								</div>
							</div>
						</>
					)}
				</div>
			</div>

		</Header >
	);
};

export default HeaderBar;
