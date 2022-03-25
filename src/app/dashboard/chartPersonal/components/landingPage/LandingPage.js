import React from 'react';
import './LandingStyles.scss';
//antd imports
import { Card, Row, Col, Input, Space, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
//svg
import Banner from '../../../../../assets/images/ChartBanner.svg';

//antd unpacking components
const { Search } = Input;


//main component
const LandingPage = ({ showView, setShowView }) => {

    const onClickOfAdd = () => {
        setShowView(true);
    }

    return (
        <div>
            <Row>
                <Col span={24} className='banner'>
                    <Card bordered={false}>
                        <div className="card-body-div">
                            <div className='text-descp'>
                                <h2>Howdy Rahul,</h2>
                                <p>Let's personalise some charts today!</p>
                            </div>
                            <img src={Banner} alt="banner" />
                            <h6>March 6 2022</h6>
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
                        <Row className='recent-charts'>
                            <Col span={6} />
                            <Col span={12} className='p36'>
                                <h3>Recently created charts</h3>
                                <Divider />
                                <Row gutter={16}>
                                    <Col span={6}>
                                        <div className='chart-tiles red'>
                                            C1
                                        </div>
                                    </Col>
                                    <Col span={6}>
                                        <div className='chart-tiles green'>
                                            C2
                                        </div>
                                    </Col>
                                    <Col span={6}>
                                        <div className='chart-tiles draft'>
                                            C3
                                        </div>
                                    </Col>
                                    <Col span={6}>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={6} />
                        </Row>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default LandingPage