import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Menu, Layout } from 'antd';
import Auth from '../../utils/auth';
import { useHistory, Link, useLocation } from 'react-router-dom';
import AppsIcon from '../../assets/icons/apps.svg';
import LogOutIcon from '../../assets/icons/log-off.svg';

import './style.scss';
// import { userLogout } from '../../api/login';

const MENU = [
    {
        key: 'home',
        icon: <img src={AppsIcon} alt='Home' className='anticon' />,
        title: 'Home',
        linkTo: '/dashboard/home',
    },
    {
        key: 'view_creation',
        icon: <img src={AppsIcon} alt='Home' className='anticon' />,
        title: 'View Creation',
        linkTo: '/dashboard/view_creation',
    },
    {
        key: 'chart_personalization',
        icon: <img src={AppsIcon} alt='Home' className='anticon' />,
        title: 'Chart Personalization',
        linkTo: '/dashboard/chart_personalization',
    },
    {
        key: 'manual_data_upload',
        icon: <img src={AppsIcon} alt='Home' className='anticon' />,
        title: 'Manual Data Upload',
        linkTo: '/dashboard/manual_data_upload',
    },
    {
        key: 'system_error_report',
        icon: <img src={AppsIcon} alt='Home' className='anticon' />,
        title: 'System Error Report',
        linkTo: '/dashboard/system_error_report',
    },
    {
        key: 'data_load',
        icon: <img src={AppsIcon} alt='Home' className='anticon' />,
        title: 'Data Load',
        linkTo: '/dashboard/data_load',
    },
    {
        key: 'audit_trail_report',
        icon: <img src={AppsIcon} alt='Home' className='anticon' />,
        title: 'Audit Trail Report',
        linkTo: '/dashboard/audit_trail_report',
    },
];

const LogoutIcon = <img src={LogOutIcon} alt='Logout' className='anticon' />;

const { Sider } = Layout;

const Sidebar = () => {
    const [selectedKey, setSelectedKey] = useState('');
    const location = useLocation();
    const history = useHistory();
    const collapsed = useSelector((state) => state.commonReducer.isMenuCollapsed);
    const theme = useSelector((state) => state.commonReducer.theme);

    const Logout = async () => {
        // LOGOUT API NOT WORKING
        // const jwt = localStorage.getItem('user_token');
        // await userLogout(jwt);
        Auth.logout(() => {
            history.push('/');
        });
    };

    const init = useCallback(() => {
        const screen = location.pathname.split('/');
        const key = MENU.filter((item) => {
            return screen.length > 2
                ? screen[2]
                    .toLowerCase()
                    .includes(item.title.replace(/\s/g, '').toLowerCase())
                : false;
        })[0]?.['key'];
        if (key) {
            setSelectedKey(key);
        }
    }, [location.pathname]);

    useEffect(() => {
        init();
    }, [init, location.pathname]);
    return (
        <Sider collapsed={collapsed} theme={theme} id='sidebar'>
            <div>
                <div id='logo-small'></div>
                <Menu selectedKeys={[selectedKey]} mode='inline' theme={theme}>
                    {MENU.map((item) => (
                        <Menu.Item key={item.key} icon={item.icon} id={item.key}>
                            <Link to={item.linkTo}>{item.title}</Link>
                        </Menu.Item>
                    ))}
                    <Menu.Item key={MENU.length + 1} icon={LogoutIcon} onClick={Logout}>
						Logout
                    </Menu.Item>
                </Menu>
            </div>
        </Sider>
    );
};

export default Sidebar;
