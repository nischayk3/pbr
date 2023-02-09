/**
 * @author Mihir Bagga <mihir.bagga@mareana.com>
 * @Mareana - CPV Product
 * @version 1
 * @Last Modified - 22 April, 2022
 * @Last Changed By - @Mihir 
 */

import React, { useState } from 'react';
import './modal.scss';
//antd imports
import { Modal, Tabs } from 'antd';
import { ArrowRightOutlined, BellOutlined, HourglassOutlined } from '@ant-design/icons';

// import { showLoader, hideLoader } from '../../duck/actions/commonActions';
//schedule-alert table
import AlertTable from './scheduled-alerts/scheduledAlertsTable';
//alert evaluation
import AlertEvaluation from './scheduled-alerts/alertEvaluation';
import ReportNotify from './scheduled-alerts/reportNotify';
import { MDH_AIRFLOW } from '../../constants/apiBaseUrl';



const { TabPane } = Tabs;
//main component
const JobSchedule = (props) => {


	//for showing schedule alert modal
	// const [alertModal, setAlertModal] = useState(props.visible);
	const [activeTab, setActiveTab] = useState('1')
	const [selectedJob, setSelectedJob] = useState('')
	const [dagId, setDagId] = useState('')
	//state for chart json data

	const changeActiveTab = (value, job_value, dag_id) => {
		setActiveTab(value)
		setSelectedJob(job_value)
		setDagId(dag_id)
	}
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

	// const handleCancel = () => {
	// 	setAlertModal(false)

	// }

	return (
		<Modal title={props.app_type !== "REPORT_DESIGNER" ? <span className="modal-title">Schedule alert</span> : <span className="modal-title">Notify Report</span>} className='schedule-modal' visible={props.visible} onCancel={props.handleCancel} footer={false} width={1300}  >
			<Tabs tabPosition='left' className='schedule-menu' activeKey={activeTab} onChange={changeActiveTab} >
				<TabPane tab={
					<span style={{ color: activeTab == '1' ? 'white' : 'grey', fontFamily: 'Roboto', fontWeight: '400', fontSize: '16px' }}>
						<BellOutlined style={{ fontSize: '18px' }} />
						{props.app_type == 'REPORT_DESIGNER' ? <span style={{ fontSize: '17px', marginBottom: '20px' }}> Notify</span> : <>Alerts</>}
					</span>

				}
					key="1"
				>
					{props.app_type == 'REPORT_DESIGNER' ? <ReportNotify appType={props.app_type} id={props.id} job={selectedJob} job_id={dagId} name={props.name} /> :
						<AlertEvaluation appType={props.app_type} id={props.id + '-' + props.version} job={selectedJob} job_id={dagId} name={props.name} />
					}
				</TabPane>
				<TabPane tab={
					<span style={{ color: activeTab == '2' ? 'white' : 'grey', fontFamily: 'Roboto', fontStyle: 'normal', fontWeight: '400', fontSize: '16px' }}>
						<HourglassOutlined style={{ fontSize: '18px' }} />  <span style={{ fontSize: '17px', marginBottom: '20px' }}> Scheduled alerts</span>
					</span>
				} key="2">
					<div className='schedule-alerts'>
						<div className='alerts-text'>
							<p className='alert-title'>Scheduled alerts</p>
							<a className="view-link" href={MDH_AIRFLOW} target="_blank">View more details</a> <span className='alert-arrow'><ArrowRightOutlined /></span>
						</div>
						<div>
							<AlertTable appType={props.app_type} id={props.app_type == 'CHART' ? props.id + '-' + props.version : props.id} changeActiveTab={changeActiveTab} activeTab={activeTab} />
						</div>
					</div>
				</TabPane>

			</Tabs>


		</Modal>

	)
}

export default JobSchedule