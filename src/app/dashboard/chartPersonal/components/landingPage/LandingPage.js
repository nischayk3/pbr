import React, { useEffect, useState } from 'react';
import './LandingStyles.scss';
//antd imports
import { Card, Row, Col, Input, Space, Divider, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
//svg
import Banner from '../../../../../assets/images/ChartBanner.svg';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { showLoader, hideLoader } from '../../../../../duck/actions/commonActions';
//services
import { getUpdatedChartsViewsData } from '../../../../../services/workSpaceServices';
//antd unpacking components
const { Search } = Input;


//main component
const LandingPage = ({ showView, setShowView }) => {

    //state for recently created charts
    const [chartData, setChartData] = useState([]);
    const onClickOfAdd = () => {
        setShowView(true);
    }

    const dispatch = useDispatch();

    let date = new Date();
    date = date.toDateString().substring(4, 15);

    const lastUpdatedChartsViews = async () => {
        let req = { limit: 5 }
        try {
            dispatch(showLoader());
            const chartResponse = await getUpdatedChartsViewsData(req);
            console.log(chartResponse, 'chart');
            setChartData(chartResponse.last_created_or_changed_charts);
            dispatch(hideLoader());
        } catch (error) {
            dispatch(hideLoader());
            message.error('Unable to fetch charts')
        }
    }

    useEffect(() => {
        lastUpdatedChartsViews();
    }, []);

    return (
        <div>
            <Row>
                <Col span={24} className='banner'>
                    <Card bordered={false}>
                        <div className="card-body-div">
                            <div className='text-descp'>
                                <h2>Howdy {localStorage.getItem('username')},</h2>
                                <p>Let's personalise some charts today!</p>
                            </div>
                            <img src={Banner} alt="banner" />
                            <h6>{date}</h6>
                        </div>
                    </Card>
                </Col>
            </Row>
            <Row className="landing-content">
                <Col span={24}>
                    <Card bordered={false}>
                        <Row>
                            <Col span={6} />
                            <Col span={12} className='p36'>
                                <Search
                                    placeholder="Search by view ID, name, product number, creator, status"
                                    allowClear
                                    enterButton="Search"
                                    size="large"
                                // onSearch={onSearch}
                                />
                            </Col>
                            <Col span={6} />
                        </Row>
                        <Row>
                            <Col span={6} />
                            <Col span={12} className='p36'>
                                <div className='create-new' onClick={onClickOfAdd}>
                                    <PlusOutlined />
                                    <p>Create new chart</p>
                                </div>
                            </Col>
                            <Col span={6} />
                        </Row>
                        {chartData.length !== 0 && <Row className='recent-charts'>
                            <Col span={6} />
                            <Col span={12}>
                                <h3>Recently created charts</h3>
                                <Divider />
                                <Row gutter={24}>
                                    {chartData && chartData.map((ele) => {
                                        return (
                                            <Col span={6} style={{ marginTop: '10px' }}>
                                                <div className='chart-tiles'>
                                                    <div className='legend' style={{ background: ele.chart_status === 'DRFT' ? '#363636' : ele.chart_status === 'AWAP' ? '#F6BB61' : '#A4F588', color: ele.chart_status === 'DRFT' ? '#FFFFFF' : '#000000' }}>
                                                        <p className='legendP'>{ele.chart_status}</p>
                                                    </div>
                                                    <p className='cid'>{ele.chart_disp_id}</p>
                                                    <p className='chartName'>{ele.chart_name}</p>
                                                </div>
                                            </Col>
                                        )
                                    })}
                                </Row>
                            </Col>
                            <Col span={6} />
                        </Row>}
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default LandingPage