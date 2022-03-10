// # Binkita Tiwari
// # Mareana Software
// # Version 1
// # Last modified - 8 Mar 2022
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
import response from './dummy.json';
import './styles.scss';

 
const { TabPane } = Tabs;
const Workflow = () => {
    const [itemCount, setItemCount] = useState();
    const [cardTitle, setCardTitle] = useState('');
    const [tilesData, setTilesData] = useState([]);
    const [activeDiv, setActiveDiv] = useState('');
    const [activeTab, setActiveTab] = useState("1");
    const [columns, setColumns] = useState([]);
    const [dataSource, setDataSource] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        getTilesData();
    }, []);

    useEffect(()=>{
        setColumns(response.config);
        setDataSource(response.data.content);
    },[cardTitle])

    const getTilesData = async () => {
        let req = {};
        try {
            dispatch(showLoader());
            // const tilesResponse = await getCountData(req);
            // setTilesData(tilesResponse['Data']);
            setTilesData([
                {
                  "application_type": "VIEW",
                  "item_count": 2,
                  "text": "View Approval"
                },
                {
                  "application_type": "CHART",
                  "item_count": 2,
                  "text": "Chart Approval"
                },
                {
                  "application_type": "REPORT",
                  "item_count": 1,
                  "text": "Report Approval"
                },
                {
                  "application_type": "PBR",
                  "item_count": 0,
                  "text": "Pbr Approval"
                },
                {
                  "application_type": "PARAM",
                  "item_count": 0,
                  "text": "Param Approval"
                },
                {
                  "application_type": "DTLOAD",
                  "item_count": 0,
                  "text": "Dtload Approval"
                }
              ])
            dispatch(hideLoader());
        } catch (error) {
            dispatch(hideLoader());
            dispatch(showNotification('error', error.message));
        }
    }

    const tilesClicked = (item) => {
        console.log(item);
       setItemCount(item.item_count);
       setCardTitle(item.text);
       setActiveDiv(item.text);
    }

   const changeTab = activeKey => {
        console.log(activeKey);
        setActiveTab(activeKey);
      };
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

                                <div onClick={() => tilesClicked(item)}>
                                    <DashCard count={item.item_count} desc={item.text} active={activeDiv} />
                                </div>

                            )
                        })
                    }
                    {itemCount>0 && (
                        <Card title={<div className='table-head'>{cardTitle}<DownloadOutlined style={{ color: '#093185', marginLeft: '25px' }} /></div>} className='table-cards'>
                            <Tabs className='workflow-tabs' activeKey={activeTab} onChange={changeTab}>
                                <TabPane tab="Awaiting Approval" key="1">
                                    <WorkflowTable columns={columns} dataSource={dataSource}/>
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