import React, { useEffect, useState } from 'react';
import './style.scss';
//antd imports
import { Card, Row, Col, Button, Menu, Dropdown, message } from 'antd';
import { ArrowLeftOutlined, CloudUploadOutlined, MoreOutlined } from '@ant-design/icons';
//components
import LandingPage from './landingPage/LandingPage';
import ViewPage from './viewPage/ViewPage';
//cjson object
import chartJson from './viewPage/chartObj.json';
//services
import { saveChartPlotData } from '../../../../services/chartPersonalizationService';
//react-redux
import { useDispatch } from 'react-redux';
import { showLoader, hideLoader } from '../../../../duck/actions/commonActions';


//main component
const ChartPersonal = () => {


    return (
        <div className='custom-wrapper'>
            <div className='sub-header'>
                <div className='sub-header-title'>
                    <ArrowLeftOutlined className='header-icon' /> &nbsp;
                    <span className='header-title'>Process Control Charts</span>
                </div>
            </div>
            <div className='custom-content-layout'>
                <LandingPage />
            </div>
        </div>
    )
}

export default ChartPersonal