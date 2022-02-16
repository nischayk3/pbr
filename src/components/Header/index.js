import React from 'react';
import { Layout, Button, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { toggleMenu } from '../../duck/actions/commonActions';
import hamburgerIcon from '../../assets/icons/hamburger.svg';
import mareanaLogo from '../../assets/mareana_logo.png';
import cpvLogo from '../../assets/cpv-logo.png';
import './style.scss';

const { Header } = Layout;
const { Search } = Input;
const HeaderBar = () => {
    const dispatch = useDispatch();

    const toggleCollapsed = () => {
        dispatch(toggleMenu());
    };

    return (
        <Header id='header'>
            <div id='hamburger' className='inline'>
                <div className='header-logo'>
                    <img src={mareanaLogo} height='40' alt='menu' />
                    <span></span>
                    <img src={cpvLogo} alt='cpv' />
                </div>

                {/* <Button onClick={toggleCollapsed}>
					<img src={hamburgerIcon} alt='menu' />
				</Button> */}
            </div>
            <div className='inline' id='search-header'>
                {/* <Search
          className="search-secondary"
          placeholder="Search here..."
          onSearch={(value) => console.log(value)}
          enterButton
        /> */}
            </div>
        </Header>
    );
};

export default HeaderBar;
