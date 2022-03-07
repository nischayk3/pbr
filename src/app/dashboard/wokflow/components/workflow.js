import React from 'react';
import { Card, Popover, Tabs } from 'antd';
import { ArrowLeftOutlined, DownloadOutlined, } from '@ant-design/icons';
import DashCard from '../../../../components/cardComponent/customCard';
import illustrations from '../../../../assets/images/Banner illustration.svg';
import WorkflowTable from './workflowTable/workflowTable';
import './styles.scss';


const config = [
    {
        count: 5,
        desc: 'Parameter data Approval'
    },
    {
        count: 2,
        desc: 'View Approval'
    },
    {
        count: 2,
        desc: 'Chart Approval'
    },
    {
        count: 0,
        desc: 'Report Approval'
    },
    {
        count: 0,
        desc: 'PBR Approval'
    },
    {
        count: 0,
        desc: 'Data Load Approval'
    }
]

const { TabPane } = Tabs;
const Workflow = () => {
    return (
        <div className='custom-wrapper'>
            <div className='sub-header'>
                <div className='sub-header-title'>
                    <ArrowLeftOutlined className='header-icon' />
                    <span className='header-title'>Workflow</span>

                </div>
            </div>
            <div className='custom-content-layout'>
                <Card className='workflow_head'>
                    <div>
                        <p className='dash-username'>Hello {(localStorage.getItem('user'))},welcome back!</p>
                        <p className='dash-text'>Today is a great day to approve some records! Let's take look.</p>
                    </div>
                    <img src={illustrations} className='illustration' />

                </Card>
                <div className='workflow_items approve-wrapper' style={{ width: '305px' }}>
                    {

                        config.map((item, index) => {
                            return (
                                
                                    <div onClick={() => console.log(item)}>
                                        <DashCard count={item.count} desc={item.desc} />
                                    </div>
                                
                            )
                        })
                    }
                    <Card title={<div className='table-head'>Param Data Approvals<DownloadOutlined style={{ color: '#093185', marginLeft: '25px' }} /></div>} className='table-cards'>
                        <Tabs defaultActiveKey="1" className='workflow-tabs'>
                            <TabPane tab="Awaiting Approval" key="1">
                                <WorkflowTable/>
                            </TabPane>
                            <TabPane tab="Recently Approved" key="2">
                                Content of Tab Pane 2
                            </TabPane>
                        </Tabs>
                    </Card>
                </div>

            </div>

        </div>
    )
}

export default Workflow;