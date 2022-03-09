import './style.scss';

import {
  AppstoreOutlined,
  BarChartOutlined,
  FileSearchOutlined,
  FundOutlined,
  HistoryOutlined,
  LinkOutlined,
  LogoutOutlined,
  PartitionOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Link, useHistory, useLocation } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from 'react';

import Auth from '../../utils/auth';
import { useMsal } from '@azure/msal-react';
import { useSelector } from 'react-redux';

// import { userLogout } from '../../api/login';

const MENU = [
  // {
  //     key: 'home',
  //     icon: <img src={AppsIcon} alt='Home' className='anticon' />,
  //     title: 'Home',
  //     linkTo: '/dashboard/home',
  // },

  {
    key: 'view_creation',
    icon: <FundOutlined style={{ fontSize: '26px' }} />,
    title: 'View Creation',
    linkTo: '/dashboard/view_creation',
  },
  {
    key: 'chart_personalization',
    icon: <BarChartOutlined style={{ fontSize: '26px' }} />,
    title: 'Chart Personalization',
    linkTo: '/dashboard/chart_personalization',
  },

  {
    key: 'manual_data_upload',
    icon: <HistoryOutlined style={{ fontSize: '26px' }} />,
    title: 'Manual Data Upload',
    linkTo: '/dashboard/manual_data_upload',
  },
  {
    key: 'system_error_report',
    icon: <AppstoreOutlined style={{ fontSize: '26px' }} />,
    title: 'System Error Report',
    linkTo: '/dashboard/system_error_report',
  },
  {
    key: 'data_load',
    icon: <PartitionOutlined style={{ fontSize: '26px' }} />,
    title: 'Data Load',
    linkTo: '/dashboard/data_load',
  },
  {
    key: 'audit_trail_report',
    icon: <FileSearchOutlined style={{ fontSize: '26px' }} />,
    title: 'Audit Trail Report',
    linkTo: '/dashboard/audit_trail_report',
  },
  {
    key: 'report_designer',
    icon: <TeamOutlined style={{ fontSize: '26px' }} />,
    title: 'Report Designer',
    linkTo: '/dashboard/report_designer',
  },
  {
    key: 'report_generator',
    icon: <LinkOutlined style={{ fontSize: '26px' }} />,
    title: 'Report Generator',
    linkTo: '/dashboard/report_generator',
  },
  {
    key: 'genealogy',
    icon: <LinkOutlined style={{ fontSize: '26px' }} />,
    title: 'Genealogy',
    linkTo: '/dashboard/genealogy',
  },
];

const LogoutIcon = <LogoutOutlined style={{ fontSize: '26px' }} />;

const { Sider } = Layout;
function handleLogout(instance) {
  instance.logoutPopup().catch((e) => {
    console.error(e);
  });
}

const Sidebar = () => {
  const { instance } = useMsal();

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
        {/* <div id='logo-small'></div> */}
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
