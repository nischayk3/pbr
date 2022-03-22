import React from 'react'
import './viewPageStyles.scss'
//antd imports
import { Row, Col, Tabs } from 'antd';
import { ControlOutlined, StarOutlined, AntDesignOutlined } from '@ant-design/icons';
//components
import ViewChart from './viewChart/ViewChart';
import Limits from './limits/Limits';
import Display from './display/Display';
import Chart from './chart/Chart';

const { TabPane } = Tabs;


//main component
const ViewPage = () => {


    const callback = (key) => {
        console.log(key);
    }

    return (
        <div>
            <Row gutter={24}>
                <Col span={7} className='tab-container'>
                    <Tabs defaultActiveKey="1" onChange={callback}>
                        <TabPane tab={<div><AntDesignOutlined />View</div>} key="1">
                            <ViewChart />
                        </TabPane>
                        <TabPane tab={<div><ControlOutlined />Limits</div>} key="2">
                            <Limits />
                        </TabPane>
                        <TabPane tab={<div><StarOutlined />Display</div>} key="3">
                            <Display />
                        </TabPane>
                    </Tabs>
                </Col>
                <Col span={17}>
                    <Chart />
                </Col>
            </Row>
        </div>
    )
}

export default ViewPage