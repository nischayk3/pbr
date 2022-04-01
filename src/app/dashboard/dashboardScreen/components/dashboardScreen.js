import React, { useEffect, useState } from 'react';
import BreadCrumbWrapper from '../../../../components/BreadCrumbWrapper';
import {Button} from 'antd';
import LandingPage from './landingPage/landingPage';
import ChartPage from './viewChart/viewChart';
import {ShareAltOutlined} from '@ant-design/icons';
import './styles.scss';

const DashboardScreen = () => {

    const[showChartCard,setShowChartCard]=useState(false);
    const onBackArrowClick = () => {
        //setShowDashboard(false);
    }

    const chartCard=(value)=>{
        setShowChartCard(value)
    }

    
    return (
        <div className='custom-wrapper'>
            {/* <BreadCrumbWrapper /> */}
            <div className='sub-header'>
            <BreadCrumbWrapper />
                {/* <div className='sub-header-title'>
                    <ArrowLeftOutlined className='header-icon' onClick={onBackArrowClick} /> &nbsp;
                    <span className='header-title'>Dashboard</span>
                </div> */}
                {showChartCard && <div className='btns'>
                    <Button>Save As</Button>
                    <Button>Save</Button>
                    <ShareAltOutlined style={{color:'#093185',fontSize:'18px'}}/>
                </div>}
            </div>
            <div className='custom-content-layout'>

               {!showChartCard && <LandingPage chartCard={chartCard}/>} 
                {showChartCard && <ChartPage/>}
            </div>
        </div>
    )
}

export default DashboardScreen