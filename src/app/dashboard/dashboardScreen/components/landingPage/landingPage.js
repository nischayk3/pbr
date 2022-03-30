import React, { useState, useEffect } from 'react'
import ScreenHeader from '../../../../../components/ScreenHeader/screenHeader';
import illustrations from '../../../../../assets/images/Dashboard-Banner.svg';
import Banner from '../../../../../assets/images/Popup-Side.svg';
import { Card, Row, Col, Input, Space, Divider, message, Modal, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './styles.scss';

export default function landingPage() {
    const { Search } = Input;
    const [resultDate, setResultDate] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    useEffect(() => {
        updateDate();
    }, []);
    const updateDate = () => {
        const date = new Date();
        const month = date.toLocaleString('default', { month: 'long' });
        const latestDate = date.getDate();
        const year = date.getFullYear();
        const resultDate = month + ' ' + latestDate + ',' + ' ' + year;
        setResultDate(resultDate);
    };
    return (
        <div>
            <ScreenHeader
                bannerbg={{
                    background: 'linear-gradient(180deg, rgba(199, 144, 129, 0.15) 0%, rgba(223, 165, 121, 0.56) 100%)',
                }}
                title={`Howdy ${localStorage.getItem('username')},`}
                description='Lets get designing some report templates'
                source={illustrations}
                sourceClass='dashboard-image'
            />
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
                                <div className='create-new' onClick={() => showModal()}>
                                    <PlusOutlined />
                                    <p>Create new dashboard</p>
                                </div>
                            </Col>
                            <Col span={6} />
                        </Row>
                        <Row className='recent-charts'>
                            <Col span={6} />
                            <Col span={12} style={{ padding: '12px 18px' }}>
                                <h3>Recently created dashboard</h3>
                                <Divider />
                                <Row gutter={24}>

                                    <Col span={6} style={{ marginTop: '10px' }}>
                                        <div className='chart-tiles'>
                                            {/* <div className='legend' style={{ background: ele.chart_status === 'DRFT' ? '#363636' : ele.chart_status === 'AWAP' ? '#F6BB61' : '#A4F588', color: ele.chart_status === 'DRFT' ? '#FFFFFF' : '#000000' }}>
                                                    <p className='legendP'>{ele.chart_status}</p>
                                                </div> */}
                                            <p className='cid'>D1</p>
                                            <p className='chartName'>Dashboard</p>
                                        </div>
                                    </Col>

                                </Row>
                            </Col>
                            <Col span={6} />
                        </Row>
                    </Card>
                </Col>
            </Row>
            {
                isModalVisible && (
                    <Modal title="Create New Dashboard" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} className='landing-modal'>
                        <div className='dashboard-modal-layout'>
                            <div>
                            <img src={Banner} />
                            </div>
                            <div className='dashboard-field-layout'>
                            <p>Let's give your dashboard a name</p>
                                <Input
                                    placeholder='Enter Dashboard Name'
                                    
                                />
                                <p>Add a chart to get started</p>
                                <Input
                                    placeholder='Enter Function Name'
                                    
                                />
                            </div>
                        </div>
                    </Modal>
                )
            }
        </div>

    )
}
