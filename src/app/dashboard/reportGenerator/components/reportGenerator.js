/**
 * @author Mihir Bagga <mihir.bagga@mareana.com>
 * @Mareana - CPV Product
 * @version 1
 * @Last Modified - 14 March, 2022
 * @Last Changed By - @Mihir
 */

import { CloudUploadOutlined, FileTextOutlined } from '@ant-design/icons';
import { Button, Card, Collapse, Input, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './styles.scss';
// import { getReports } from '../../../../services/reportDesignerServices';
import axios from 'axios';
import FileSaver from 'file-saver';
import BreadCrumbWrapper from '../../../../components/BreadCrumbWrapper';
import Signature from '../../../../components/ElectronicSignature/signature';
import JobSchedule from '../../../../components/JobSchedule';
import SaveModal from '../../../../components/SaveModal/saveModal';
import {
	hideLoader,
	showLoader,
	showNotification
} from '../../../../duck/actions/commonActions';
import {
	latexBuilder, saveReportGenerator, loadReportGen
} from '../../../../services/reportGeneratorServices';
import Chart from '../../reportDesigner/components/reportChart/chartComponent/chartComponent';
import ReportGeneratorForm from '../components/reportGeneratorForm';
import { useLocation } from 'react-router';

const { Panel } = Collapse;


function ReportGenerator(props) {
	const repotData = useSelector(
		state => state.reportDesignerReducer.reportData
	);
	const location = useLocation()
	const screenChange = useSelector(
		state => state.reportDesignerReducer.screen
	);

	const genLoad = useSelector(
		state => state.reportDesignerReducer.genLoad
	);

	const esignPublishRes = useSelector((state) => state.commonReducer.publishRes)

	const handleCancel = () => {
		setAlertVisible(false);
	};

	const ReportData = repotData;
	// const [chart, setCharts] = useState([]);
	const [table, setTable] = useState([]);
	const [isSave, setIsSave] = useState(false);
	const [isSaved, setIsSaved] = useState(false);
	const [reportId, setReportId] = useState('');
	const [isPublish, setIsPublish] = useState(false);
	const [status, setStatus] = useState('')
	const [reportName, setReportName] = useState('');
	const [reportStatus, setReportStatus] = useState('');
	const [approveReject, setApproveReject] = useState('')
	const [chartLayout, setChartLayout] = useState({});
	const [isProcess, setProcess] = useState(false);
	const selectedDays = {
		Sunday: false,
		Monday: false,
		Tuesday: false,
		Wednesday: false,
		Thursday: false,
		Friday: false,
		Saturday: false,
	};
	const [alertVisible, setAlertVisible] = useState(false);

	const dispatch = useDispatch();

	useEffect(() => {
		unloadTest(ReportData);
	}, [ReportData]);

	useEffect(() => {
		if (esignPublishRes?.status_code === 200) {
			setStatus(esignPublishRes?.rep_stauts);
		}
	}, [esignPublishRes])

	const PublishResponse = (res) => {
		setStatus(res.rep_stauts)
	}
	const handleClose = () => {
		setIsPublish(false)
	};

	const makeArrayOfObject = ar => {
		let res = [];
		if (ar && ar.length > 0) {
			for (let i = 0; i < ar.length; i++) {
				let res_obj = {};
				res_obj['chart'] = ar[i];
				res_obj['violation'] = true;
				res_obj['exclusion'] = true;
				res_obj['data_table'] = true;
				if (isProcess)
					res_obj['process_capabilites'] = true;

				res_obj['layout'] = {};
				res_obj['data'] = {};
				res_obj['chartType'] = '';
				res.push(res_obj);
			}
			return res;
		} else return res;
	};


	const createChartRecord = arr => {
		let res = {};
		for (let key in arr) {
			res[`${key}`] = makeArrayOfObject(arr[key]);
		}
		return res;
	};

	const updateChartLayout = (chartt, section, param) => {
		section = section + 1;

		let objIndex = chartLayout[section].findIndex(obj => obj.chart == chartt);
		chartLayout[section][objIndex][`${param}`] = false;
	};

	const getTableData = (obj, rep_layout) => {
		obj = obj.layout_info;
		//let headingList = [];
		let allSections = [];
		// let titleHeading =
		// 	obj['titlepage'] && obj['titlepage'].heading
		// 		? obj['titlepage'].heading
		// 		: '';
		let titleObj = obj && obj['titlepage'] ? obj['titlepage'] : '';

		// headingList.push(titleHeading);
		allSections.push(titleObj);

		let headingSection = obj['sections'] ? obj['sections'] : [];
		allSections = [...allSections, ...headingSection];

		for (let i = 0; i < allSections.length; i++) {
			if (allSections[i])
				allSections[i].charts = rep_layout[i + 1] ? rep_layout[i + 1] : [];
		}

		return allSections;
	};

	const unloadTest = ReportDatas => {
		dispatch(showLoader());
		setReportId(ReportDatas['rep_disp_id'] ? ReportDatas['rep_disp_id'] : '');
		if (ReportDatas.layout_info && ReportDatas.layout_info.charts_layout)
			setChartLayout(
				ReportDatas.layout_info.charts_layout
					? createChartRecord(ReportDatas.layout_info.charts_layout)
					: {}
			);
		else
			setChartLayout(ReportDatas.charts_layout ? ReportDatas.charts_layout : {});
		setReportName(ReportDatas['rep_name'] ? ReportDatas['rep_name'] : '');
		// setCharts(
		// 	ReportDatas['chart_int_ids']
		// 		? createArraObj(ReportDatas['chart_int_ids'])
		// 		: []
		// );
		setTable(
			ReportDatas['layout_info']
				? getTableData(
					ReportDatas['layout_info'],
					ReportDatas.layout_info.charts_layout
						? ReportDatas.layout_info.charts_layout
						: {}
				)
				: {}
		);
		setReportId(ReportDatas['rep_disp_id'] ? ReportDatas['rep_disp_id'] : '');
		setReportName(ReportDatas['rep_name'] ? ReportDatas['rep_name'] : '');
		setReportStatus(ReportDatas['rep_status'] ? ReportDatas['rep_status'] : '');
		dispatch(hideLoader());
	};

	// const update_object = (arr, i) => {
	// 	let objIndex = chart.findIndex(chart => chart.chart == i);
	// 	if (arr.includes('excursion')) chart[objIndex].excursion = true;
	// 	else chart[objIndex].excursion = false;
	// 	if (arr.includes('violation')) chart[objIndex].violation = true;
	// 	else chart[objIndex].violation = false;
	// 	if (arr.includes('parameter')) chart[objIndex].parameter = true;
	// 	else chart[objIndex].parameter = false;
	// 	if (arr.includes('exclusion')) chart[objIndex].exclusion = true;
	// 	else chart[objIndex].exclusion = false;

	// 	let object = chart;
	// 	setCharts(object);
	// };
	const generateReport = async () => {
		dispatch(showNotification('success', 'Generating Report'));
		let generate_obj = {};
		let title_page = table[0] ? table[0] : {};
		let sections =
			table.length > 0 ? table.filter((item, index) => index > 0) : [];

		generate_obj['titlepage'] = title_page;
		generate_obj['sections'] = sections;

		let final_obj = {};
		final_obj['layout_info'] = generate_obj;
		final_obj['charts_layout'] = chartLayout;

		let rjson = {};
		rjson['data'] = final_obj;

		let data = { rjson: rjson };

		let json_response = await latexBuilder(data);
		if (json_response.statuscode == 200) {
			dispatch(showNotification('success', 'Downloading Report'));

			axios
				.post('/latex_report', json_response.latex_json, {
					responseType: 'arraybuffer',
				})
				.then(response => {
					var blob = new Blob([response.data], { type: 'application/pdf' });
					FileSaver.saveAs(blob, `${reportId}.pdf`);
				});
		} else {
			dispatch(showNotification('error', 'Failed to generate report'));
		}
	};

	const prepareJson = () => {
		let obj = {};
		let user_details = localStorage.getItem('username');
		let user = user_details ? user_details : '';

		obj['rep_disp_id'] = reportId;
		obj['rep_name'] = reportName;
		obj['rep_status'] = reportStatus;
		obj['user'] = user;
		obj['variant_name'] = user + '_variant';
		obj['chart_info'] = chartLayout;
		obj['charts_layout'] = chartLayout;
		obj['days_layout'] = selectedDays;

		let layout_obj = {};
		layout_obj['titlepage'] = table[0] ? table[0] : {};
		layout_obj['sections'] = table.length > 0 ? table.filter((item, index) => index > 0) : [];
		obj['layout_info'] = layout_obj;
		let req = {};
		req['data'] = obj;
		req['saveType'] = 'save';

		saveReportGenerator(req).then(res => {
			if (res.Status == 200) {
				setIsSave(true);
			} else {
				dispatch(showNotification('error', 'Not Saved'));
			}
		});
	};

	const handleEdit = (value, heading, k) => {
		let objIndex = table.findIndex(t => t.heading == heading);
		if (objIndex >= 0) {
			if (table[objIndex].content.length > 0) {
				let cntnt_Index = table[objIndex].content.findIndex(t => t.key == k);
				table[objIndex].content[cntnt_Index].value = value;
			}
		}
	};



	const reloadUrl = async (reload_id) => {
		try {
			dispatch(showLoader())
			let req = { report_displ_id: reload_id }
			let data = await loadReportGen(req)
			data = data.report_generator
			data = data.data
			if (data) {
				unloadTest(data)
			}
			else {
				dispatch(hideLoader())
				dispatch(showNotification('error', "Error in loading data"))
			}
		}
		catch (err) {
			dispatch(showNotification('error', err))
		}
	}
	useEffect(() => {
		const report_param_id = location.pathname.split("/").filter((i) => i);
		if (report_param_id.length > 2) {
			dispatch(showLoader())
			reloadUrl(report_param_id[2])
		}
	}
		, []
	);

	return (
		<div className='custom-wrapper'>
			<div className='sub-header' style={{ paddingRight: '24px' }}>
				<div className='sub-header-title'>
					<BreadCrumbWrapper
						urlName={
							`/dashboard/report_generator/${reportId}`}
						value={reportId}
						data="Untitled" />
				</div>
				<div className='sub-header-btns'>
					{!screenChange ? (
						<>
							<Button
								className='report-primary-btn'
								onClick={() => {
									setAlertVisible(true);
								}}>
								Notify Report
							</Button>
							<Button
								className='report-primary-btn'
								style={{ marginLeft: '16px', marginRight: '16px' }}
								onClick={() => prepareJson()}>
								Save
							</Button>
						</>
					) : (
						<>
							<Button
								className='report-secondary-btn'
								onClick={() => {
									setIsPublish(true);
									setApproveReject('P');
								}}
								style={{ marginRight: '16px', marginTop: '2px' }}>
								<CloudUploadOutlined
									style={{
										color: '#093185',
										fontSize: '16px',
										marginTop: '2px',
									}}
								/>
								Publish
							</Button>
						</>
					)}
					<Button
						className='report-secondary-btn'
						onClick={() => generateReport()}>
						<FileTextOutlined style={{ color: '#093185' }} /> Generate Report
					</Button>
					{/* <Dropdown overlay={menu} placement="bottomLeft" arrow={{ pointAtCenter: true }}>
                        <EllipsisOutlined style={{ transform: 'rotate(-90deg)', fontSize: '20px', marginLeft: '5px' }} />
                    </Dropdown> */}
				</div>
			</div>
			<div className='custom-content-layout'>
				<div className='report-card'>
					<Card title='Generate new report variant' className='generator-card'>
						<ReportGeneratorForm stat={status} />
						<div className='table-card'>
							{table && table.length > 0 &&
								table.map(i => (
									<Collapse
										key={i.heading}
										accordion
										className='collapse-generate'
										bordered={true}>
										<Panel
											header={
												<span className='chart-names'>
													{i.heading}{' '}
													{i.charts &&
														i.charts.length > 0 &&
														i.charts.map(a => (
															<span className='chart-tags'>{a}</span>
														))}
												</span>
											}
											key={i.heading}
											className='chart-panel'>
											{i['content'] && i['content'].length > 0 ? (
												<div className='generator-table'>
													<table cellspacing='0' cellpadding='0'>
														<tr className='tr'>
															<th className='th-key' colspan={5}>
																Key
															</th>
															<th className='th-value' colspan={15}>
																Value
															</th>
														</tr>
														<tbody>
															{i['content'] &&
																i['content'].map((item, j) => (
																	<tr className='tr'>
																		<td className='td-key' colspan={5}>
																			{item.key}
																		</td>
																		<td className='td' colspan={15}>
																			{item.editable == false ||
																				item.editable == undefined ? (
																				<Input.TextArea
																					autoSize={true}
																					defaultValue={item.value}
																					onChange={e =>
																						handleEdit(
																							e.target.value,
																							i.heading,
																							item.key
																						)
																					}
																				/>
																			) : (
																				<span>{item.value}</span>
																			)}{' '}
																		</td>
																	</tr>
																))}
														</tbody>
													</table>
												</div>
											) : (
												<></>
											)}
											{i.charts &&
												i.charts.length > 0 &&
												i.charts.map(j => (
													<div>
														<p className='chart-name-rep'>
															{j}{' '}
															<span className='tag-div'>
																{' '}
																<Tag
																	className='chart-tag'
																	closable
																	onClose={() =>
																		updateChartLayout(j, i.id, 'violation')
																	}>
																	Violation
																</Tag>{' '}
																<Tag
																	className='chart-tag'
																	closable
																	onClose={() =>
																		updateChartLayout(j, i.id, 'exclusion')
																	}>
																	Exclusion
																</Tag>{' '}
																<Tag
																	className='chart-tag'
																	closable
																	onClose={() =>
																		updateChartLayout(j, i.id, 'data_table')
																	}>
																	Data Table
																</Tag>

															</span>{' '}
														</p>
														<Chart setProcess={setProcess} chartName={j} />
													</div>
												))}
										</Panel>
									</Collapse>
								))}
						</div>
					</Card>
				</div>
			</div>
			<SaveModal isSave={isSave} setIsSave={setIsSave} setIsSaved={setIsSaved} id={''} load={genLoad || isSaved} />
			<JobSchedule
				visible={alertVisible}
				app_type='REPORT_DESIGNER'
				handleCancel={handleCancel}
				id={reportId}
				name={reportName}
			/>
			<Signature
				isPublish={isPublish}
				handleClose={handleClose}
				screenName='Report Designer'
				PublishResponse={PublishResponse}
				appType='REPORT_DESIGNER'
				dispId={reportId}
				version={0}
				status={approveReject}
			/>
		</div>
	);
}

export default ReportGenerator;
