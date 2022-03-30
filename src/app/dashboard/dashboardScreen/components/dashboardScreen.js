import React, { useEffect, useState } from 'react';
import BreadCrumbWrapper from '../../../../components/BreadCrumbWrapper';
import LandingPage from './landingPage/landingPage';
import {ArrowLeftOutlined} from '@ant-design/icons';

const DashboardScreen = () => {

    const [showDashboard, setShowDashboard] = useState(false);
    const onBackArrowClick = () => {
        setShowDashboard(false);
    }
    return (
        <div className='custom-wrapper'>
            {/* <BreadCrumbWrapper /> */}
            <div className='sub-header'>
                <div className='sub-header-title'>
                    <ArrowLeftOutlined className='header-icon' onClick={onBackArrowClick} /> &nbsp;
                    <span className='header-title'>Dashboard</span>
                </div>
                {showDashboard && <div className='btns'>
                    <Button>Share</Button>
                    <Button>Save</Button>
                    <Button>Save As</Button>

                </div>}
            </div>
            <div className='custom-content-layout'>
                
                <LandingPage/>
            </div>
        </div>
    )
}

export default DashboardScreen