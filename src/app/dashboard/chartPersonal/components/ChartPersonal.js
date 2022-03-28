import React, { useState } from 'react';
import './style.scss';
//antd imports
import { Card, Row, Col, Button, Menu, Dropdown } from 'antd';
import { ArrowLeftOutlined, CloudUploadOutlined, MoreOutlined } from '@ant-design/icons';
//components
import LandingPage from './landingPage/LandingPage';
import ViewPage from './viewPage/ViewPage';
//cjson object
import chartJson from './viewPage/chartObj.json';
import { saveChartPlotData } from '../../../../services/chartPersonalizationService';


//main component
const ChartPersonal = () => {
    //state for showing view page or landing page
    const [showView, setShowView] = useState(false);
    //state for chart json data
    const [postChartData, setPostChartData] = useState(chartJson);
    //function to back to landing page
    const onBackArrowClick = () => {
        setShowView(false);
    }

    //function for saving chart data
    const saveAs = async () => {
        const obj = {
            ...postChartData,
            savetype: 'saveas'
        }
        try {
            // dispatch(showLoader());
            const viewRes = await saveChartPlotData(obj);
            console.log(viewRes);

            // dispatch(hideLoader());
        } catch (error) {
            // dispatch(hideLoader());
            // dispatch(showNotification('error', error.message));
        }
    }

    //menu for dropdown
    const menu = (
        <Menu>
            <Menu.Item onClick={saveAs}>Save As</Menu.Item>
            <Menu.Item>Share</Menu.Item>
        </Menu>
    );

    return (
        <div className='custom-wrapper'>
            <div className='sub-header'>
                <div className='sub-header-title'>
                    <ArrowLeftOutlined className='header-icon' onClick={onBackArrowClick} /> &nbsp;
                    <span className='header-title'>Process Control Charts</span>
                </div>
                {showView && <div className='btns'>
                    <Button>Schedule Alert</Button>
                    <Button>Save</Button>
                    <Button> <CloudUploadOutlined />
                        Publish</Button>
                    <Dropdown overlay={menu}>
                        <MoreOutlined />
                    </Dropdown>
                </div>}
            </div>
            <div className='custom-content-layout'>
                {!showView && <LandingPage showView={showView} setShowView={setShowView} />}
                {showView && <ViewPage showView={showView} setShowView={setShowView} postChartData={postChartData} setPostChartData={setPostChartData} />}
            </div>
        </div>
    )
}

export default ChartPersonal