import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    hideLoader,
    showLoader,
    showNotification,
} from '../../../../duck/actions/commonActions';
import { getCountData } from '../../../../services/workFlowServices';
import { Card, Tabs } from 'antd';
import { ArrowLeftOutlined, DownloadOutlined, } from '@ant-design/icons';
import DashCard from '../../../../components/CardComponent/customCard';
import illustrations from '../../../../assets/images/Banner illustration.svg';
import WorkflowTable from './workflowTable/workflowTable';
import './styles.scss';

 
const { TabPane } = Tabs;
const Workflow = () => {
    const [visible, setVisible] = useState(false);
    const [tilesData, setTilesData] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        getTilesData();
    }, []);

    const getTilesData = async () => {
        let req = {};
        try {
            dispatch(showLoader());
            const tilesResponse = await getCountData(req);
            setTilesData(tilesResponse['Data']);
            dispatch(hideLoader());
        } catch (error) {
            dispatch(hideLoader());
            dispatch(showNotification('error', error.message));
        }
    }

    const tilesClicked = (item) => {
        if (item.item_count != 0) {
            setVisible(true);
        }
    }
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

                        tilesData.map((item, index) => {
                            return (

                                <div onClick={(item) => tilesClicked(item)}>
                                    <DashCard count={item.item_count} desc={item.text} />
                                </div>

                            )
                        })
                    }
                    {visible && (
                        <Card title={<div className='table-head'>Param Data Approvals<DownloadOutlined style={{ color: '#093185', marginLeft: '25px' }} /></div>} className='table-cards'>
                            <Tabs defaultActiveKey="1" className='workflow-tabs'>
                                <TabPane tab="Awaiting Approval" key="1">
                                    <WorkflowTable />
                                </TabPane>
                                <TabPane tab="Recently Approved" key="2">
                                    Content of Tab Pane 2
                                </TabPane>
                            </Tabs>
                        </Card>
                    )}
                </div>

            </div>

        </div>
    )
}

export default Workflow;