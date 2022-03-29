import React, { useState, useEffect } from 'react'
import { Card, Input, Divider, Table, Tabs } from 'antd';
import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import illustrations from '../../../../assets/images/landing_image.png';
import './style.scss';



export default function Landing(props) {

    const [resultDate, setResultDate] = useState('');
    const [searched, setSearched] = useState('');
    const { TabPane } = Tabs;

    useEffect(() => {
        updateDate();
    }, []);

    const updateDate = () => {
        const date = new Date();
        const month = date.toLocaleString('default', { month: 'long' });
        const latestDate = date.getDate();
        const year = date.getFullYear();
        const resultDate = month + ' ' + latestDate + ',' + ' ' + year
        setResultDate(resultDate);
    }
    return (
        <div>
            <div className='custom-wrapper'>
                <div className='sub-header'>
                    <div className='sub-header-title'>
                        <ArrowLeftOutlined className='header-icon' />
                        <span className='header-title'>Report Designer</span>

                    </div>
                </div>
                <div className='custom-content-layout'>
                    <Card className='workflow_head'>
                        <div>
                            <p className='dash-username'>Howdy {(localStorage.getItem('username'))}!</p>
                            <p className='dash-text'>Let's get designing some report templates!</p>
                        </div>
                        <img src={illustrations} className='illustration' />
                        <span className='resultdate'>{resultDate}</span>

                    </Card>

                    <center>
                        <Card style={{ width: '784px', marginTop: '21px' }}>
                            <Tabs defaultActiveKey="1" >
                                <TabPane tab="Design Report Template" key="Design Report Template">
                                    <Input.Search placeholder="Search by name, view, product number"
                                        allowClear
                                        enterButton="Search"
                                        size="medium"
                                    />
                                   { searched && <Table />}
                                    <div className="create_new">
                                        <PlusOutlined /><br />
                                        Design New Report
                                    </div><br />
                                    <p style={{ marginRight: '550px' }}>Recently designer report templates</p>
                                    <Divider />
                                </TabPane>
                                <TabPane tab="Generate Report Variant" key="Generate Report Variant">

                                    <Input.Search placeholder="Search by report id,eport name name, view, product number"
                                        allowClear
                                        enterButton="Search"
                                        size="medium"
                                    />
                                   { searched && <Table />}
                                    <div className="create_new">
                                        <PlusOutlined /><br />
                                        Generate New Report
                                    </div><br />
                                    <p style={{ marginRight: '550px' }}>Recently generated report variants</p>
                                    <Divider />

                                </TabPane>
                            </Tabs >
                        </Card>
                    </center>


                </div>
            </div>
        </div>
    )
}