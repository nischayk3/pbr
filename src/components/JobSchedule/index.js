/**
 * @author Mihir Bagga <mihir.bagga@mareana.com>
 * @Mareana - CPV Product
 * @version 1
 * @Last Modified - 22 April, 2022
 * @Last Changed By - @Mihir 
 */

import React, { useState } from 'react';
import './style.scss';
//antd imports
import { Modal, Tabs } from 'antd';
import { DesktopOutlined, ArrowRightOutlined } from '@ant-design/icons';
//components
//services
//react-redux
import { useDispatch } from 'react-redux';
import { showLoader, hideLoader } from '../../duck/actions/commonActions';
//schedule-alert table
import AlertTable from './scheduled-alerts/scheduledAlertsTable';
//alert evaluation
import AlertEvaluation from './scheduled-alerts/alertEvaluation';
import ReportNotify from './scheduled-alerts/reportNotify';


const { TabPane } = Tabs;
//main component
const JobSchedule = (props) => {
    //state for showing view page or landing page
    const [showView, setShowView] = useState(false);
    //for showing schedule alert modal
    const [alertModal, setAlertModal] = useState(props.visible);
    //state for chart json data

    const dispatch = useDispatch();
    //function to back to landing page

    //menu for dropdown
    // const menu = (
    //     <Menu>
    //         <Menu.Item onClick={saveAs}>Save As</Menu.Item>
    //         <Menu.Item>Share</Menu.Item>
    //     </Menu>
    // );

    // const handleOk = () => {

    // }

    const handleCancel = () => {
        setAlertModal(false)
    }

    return (
        <Modal title={props.app_type!=="REPORT" ? "Schedule Alert" : "Notify Report"} className='schedule-modal' visible={props.visible} onCancel={props.handleCancel} footer={false} width={1300} >
            <Tabs tabPosition='left' className='schedule-menu'>
                <TabPane tab={
                    <span style={{ color: 'white' }}>
                        <DesktopOutlined />
                        { props.app_type=='REPORT' ? <>Notify</> : <>Alerts</> }

                        
                    </span>
                }
                    key="1">
                        { props.app_type=='REPORT' ? <ReportNotify appType={props.app_type} /> :
                    <AlertEvaluation appType={props.app_type} id={props.id} />
                }
                </TabPane>
                <TabPane tab={
                    <span style={{ color: 'white' }}>
                        <DesktopOutlined />
                        Schedule Alerts
                    </span>
                } key="2">
                    <div className='schedule-alerts'>
                        <div className='alerts-text'>
                            <p className='alert-title'>Scheduled Alerts</p>
                            <span className='alert-arrow'><a>View More Details</a><ArrowRightOutlined style={{ marginLeft: '10px', color: '#093185' }} /></span>
                        </div>
                        <div>
                            <AlertTable appType={props.app_type} />
                        </div>
                    </div>
                </TabPane>

            </Tabs>


        </Modal>

    )
}

export default JobSchedule