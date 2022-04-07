import React, { useState, useEffect } from 'react'
import './viewPageStyles.scss'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
//antd imports
import { Row, Col, Tabs, Menu, Dropdown, message, Button } from 'antd';
import { ControlOutlined, StarOutlined, AntDesignOutlined, ArrowLeftOutlined, CloudUploadOutlined, MoreOutlined } from '@ant-design/icons';
//components
import ViewChart from './viewChart/ViewChart';
import Limits from './limits/Limits';
import Display from './display/Display';
import Chart from './chart/Chart';
import Threshold from './Threshold/threshold';
import Rules from './Rules/rules';
//chart json object
import chartJson from './chartObj.json'
//redux
import { useDispatch } from 'react-redux';
import { showLoader, hideLoader } from '../../../../../duck/actions/commonActions';
//services
import { saveChartPlotData, getChartPlotData } from '../../../../../services/chartPersonalizationService';

const { TabPane } = Tabs;


//main component
const ViewPage = () => {

    const { id } = useParams();
    const history = useHistory();
    const match = useRouteMatch();
    //state for chart json data
    const [postChartData, setPostChartData] = useState({});
    const dispatch = useDispatch();

    const callback = (key) => {

    }

    //function for saving chart data
    const saveAs = async () => {
        const obj = {
            ...postChartData,
            savetype: 'saveas'
        }
        const postData = JSON.parse(JSON.stringify(postChartData))
        let access = false;
        postData.data.forEach(element => {
            if (element.chart_name === '') {
                message.error("Chart name required")
                access = true;

                return;
            }
            if (element.chart_description === '') {
                message.error("Chart description required")
                access = true;

                return;
            }
        });
        if (access) {
            return false;
        }
        try {
            dispatch(showLoader());
            const viewRes = await saveChartPlotData(obj);
            const newArr = [...postChartData.data];
            newArr.forEach(element => {
                element.chart_id = viewRes.chart_id;
                element.chart_version = viewRes.chart_version;
                element.chart_status = viewRes.chart_status;
            })
            setPostChartData({ ...postChartData, data: newArr })
            message.success('Chart created successfully');

            dispatch(hideLoader());
        } catch (error) {
            dispatch(hideLoader());
            message.error('Chart creation failed');
        }
    }

    //function for getting chart data
    const getChart = async () => {
        const req = { chartId: id }
        try {
            const viewRes = await getChartPlotData(req);
            setPostChartData(viewRes);
        } catch (err) {
            message.error('Load chart failed');
        }
    }

    //menu for dropdown
    const menu = (
        <Menu>
            <Menu.Item key='1' onClick={saveAs}>Save As</Menu.Item>
            <Menu.Item key='2'>Share</Menu.Item>
        </Menu>
    );


    const backToLanding = () => {
        const url = match.url.substring(0, match.url.length - 2);
        history.push(url);
    }

    useEffect(() => {
        if (Number(id) === 0) {
            setPostChartData(chartJson);
        } else {
            getChart();
        }
    }, [id])

    return (
        <div className='custom-wrapper'>
            <div className='sub-header'>
                <div className='sub-header-title'>
                    <ArrowLeftOutlined className='header-icon' onClick={backToLanding} /> &nbsp;
                    <span className='header-title'>Process Control Charts</span>
                </div>
                <div className='btns'>
                    <Button>Schedule Alert</Button>
                    <Button>Save</Button>
                    <Button> <CloudUploadOutlined />
                        Publish</Button>
                    <Dropdown overlay={menu}>
                        <MoreOutlined />
                    </Dropdown>
                </div>
            </div>
            <div className='custom-content-layout'>
                <Row gutter={24}>
                    <Col span={7} className='tab-container'>
                        <Tabs defaultActiveKey="1" onChange={callback}>
                            <TabPane tab="View" key="1">
                                <ViewChart postChartData={postChartData} setPostChartData={setPostChartData} />
                            </TabPane>
                            <TabPane tab="Limits" key="2">
                                <Limits postChartData={postChartData} setPostChartData={setPostChartData} />
                            </TabPane>
                            <TabPane tab="Display" key="3">
                                <Display postChartData={postChartData} setPostChartData={setPostChartData} />
                            </TabPane>
                            <TabPane tab="Threshold" key="4">
                                <Threshold />
                            </TabPane>
                            <TabPane tab="Rule" key="5">
                                <Rules />
                            </TabPane>
                        </Tabs>
                    </Col>
                    <Col span={17}>
                        <Chart postChartData={postChartData} setPostChartData={setPostChartData} />
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default ViewPage

