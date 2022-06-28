import React, { useState, useEffect } from 'react';
import {
	Card,
	Input,
	Table,
	Tabs,
	Avatar,
	Row,
	Col,
	Modal,
	Button,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import illustrations from '../../../../assets/images/landing_image.png';
import { getReports } from '../../../../services/reportDesignerServices';
import './landing.scss';
import StatusBlock from '../../../../components/StatusBlock/statusBlock';
import { loadReport } from '../../../../services/reportDesignerServices';
import { loadReportGen, getReportGen } from '../../../../services/reportGeneratorServices';
import BreadCrumbWrapper from '../../../../components/BreadCrumbWrapper';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { sendReport } from '../../../../duck/actions/reportDesignerAction';
import {
	showLoader,
	hideLoader,
	showNotification,
} from '../../../../duck/actions/commonActions';
import Banner from '../../../../assets/images/Popup-Side.svg';
import checkIcon from '../../../../assets/images/checkbox.svg';
import ScreenHeader from '../../../../components/ScreenHeader/screenHeader';

export default function ReportLanding(props) {
	const [searched, setSearched] = useState(false);
	const [newsearched, setNewSearched] = useState(false);
	const [reportList, setReportList] = useState([]);
	const [reportGenList, setReportGenList] = useState([]);

	const [filterTable, setFilterTable] = useState(null);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [selectedReportId, setSelectedReportId] = useState('');
	const [activeTab, setActiveTab] = useState('Design Report Template');
	const [reportSearch, setReportSearch] = useState('')
	const [genSearch, setReportGen] = useState('')
	const [letDis, setLetDis] = useState(false)
	const [reportId, setReportIds] = useState('')
	const { TabPane } = Tabs;
	const history = useHistory();
	const dispatch = useDispatch();
	const handleChangeTab = value => {
		setActiveTab(value);
	};

	const columns = [
		{
			title: 'Name',
			dataIndex: activeTab == 'Design Report Template' ? 'rep_name' : 'variant_name',
			width: '200px',
			key: activeTab == 'Design Report Template' ? 'rep_name' : 'variant_name',
			render: (text, record) => {
				return {
					props: {
						style: { background: record.color },
					},
					children: <div>{text}</div>,
				};
			},
		},
		{
			title: 'ID',
			dataIndex: 'rep_disp_id',
			width: '100px',
			key: 'rep_disp_id',
			render: (text, record) => {
				return {
					props: {
						style: { background: record.color },
					},
					children: <div>{text}</div>,
				};
			},
		},
		{
			title: 'Status',
			dataIndex: 'rep_status',
			width: '100px',
			key: 'rep_status',
			render: (text, record) => {
				return {
					props: {
						style: { background: record.color },
					},
					children: <div>{text}</div>,
				};
			},
		},
		{
			title: 'Creator',
			dataIndex: 'created_by',
			key: 'created_by',
			width: '200px',
			render: (text, row, index) => {
				return (
					<div>
						<Avatar
							className='avatar-icon'
							style={{
								backgroundColor: getRandomColor(index + 1),
							}}>
							{text.split('')[0].toUpperCase()}{' '}
						</Avatar>
						<span className='avatar-text' style={{ marginLeft: '5px' }}>
							{text.split(/[.@]/)[0]}
						</span>
					</div>
				);
			},
		},
	];

	useEffect(() => {
		// updateDate();
		getReportList();
		getReportGens();
	}, []);

	// const updateDate = () => {
	// 	const date = new Date();
	// 	const month = date.toLocaleString('default', { month: 'long' });
	// 	const latestDate = date.getDate();
	// 	const year = date.getFullYear();
	// 	const resultDate = month + ' ' + latestDate + ',' + ' ' + year;
	// 	setResultDate(resultDate);
	// };

	const setReportId = value => {
		setSelectedReportId(value);
	};

	const getRandomColor = index => {
		let colors = ['#56483F', '#728C69', '#c04000', '#c19578'];
		return colors[index % 4];
	};

	const search = value => {
		if (value == '') setSearched(false);
		else {
			setSearched(true);
			const tableData = activeTab == 'Design Report Template' ? reportList : reportGenList;
			const filterTableData = tableData.filter(o =>
				Object.keys(o).some(k =>
					String(o[k]).toLowerCase().includes(value.toLowerCase())
				)
			);
			setFilterTable(filterTableData);
		}
	};
	const onSearch = value => {
		if (value == '') setNewSearched(false);
		else {
			setNewSearched(true);
			const tableData = reportGenList;
			const filterTableData = tableData.filter(o =>
				Object.keys(o).some(k =>
					String(o[k]).toLowerCase().includes(value.toLowerCase())
				)
			);

			setFilterTable(filterTableData);
		}
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const getReportList = () => {
		let req = { rep_status: 'all' };
		getReports(req).then(res => {
			if (res['status-code'] == 200) setReportList(res['Data']);
			else setReportList([]);
		});
	};

	const getReportGens = () => {
		let req = { rep_status: 'all' };
		getReportGen(req).then(res => {
			if (res['status-code'] == 200)
				setReportGenList(res['Data']);
			else setReportList([]);
		});

	}

	const getLoadReport = async report_id => {
		dispatch(showNotification('success', report_id + ' selected'));

		dispatch(showLoader());
		let req = { report_displ_id: report_id };
		let data = await loadReport(req);
		if (data.Status == 200 || data.report_designer) {
			props.getReportData(data);
			props.changeScreen();
			history.push({
				pathname: `/dashboard/report_designer/${report_id}`,
			});
		} else {
			dispatch(hideLoader());
			dispatch(showNotification('error', data.Message));
		}
	};

	const getLoadReportGenerator = async (report_id, b) => {
		dispatch(showNotification('success', report_id + ' selected'));
		setLetDis(true)
		dispatch(showLoader());
		let req = { report_displ_id: report_id };
		let data = await loadReportGen(req);
		if (data.report_generator) dispatch(sendReport(data.report_generator.data));
		if (data.Status == 200 || data.report_generator) {
			if (b) {
				history.push({
					pathname: `/dashboard/report_generator/${report_id}`,
				});
			}
			dispatch(hideLoader());
			setLetDis(false)
		} else {
			dispatch(hideLoader());
			dispatch(showNotification('error', data.Message));
		}
	};
	const NewReportGenerator = async report_id => {
		dispatch(showNotification('success', report_id + ' selected'));
		setLetDis(true)
		dispatch(showLoader());
		let req = { report_displ_id: report_id };
		let data = await loadReportGen(req);
		if (data.report_generator) dispatch(sendReport(data.report_generator.data));
		if (data.Status == 200 || data.report_generator) {
			dispatch(hideLoader());
			dispatch(showNotification('success', `Loaded ${report_id}`));
			setLetDis(false)

		} else {
			dispatch(hideLoader());
			dispatch(showNotification('error', data.Message));
		}
	};

	// const statusColor = status => {
	// 	if (status == 'APRD') {
	// 		return 'aprd';
	// 	}
	// 	if (status == 'DRFT') {
	// 		return 'drft';
	// 	}
	// 	if (status == 'AWAP') {
	// 		return 'awap';
	// 	}
	// };

	return (
		<div className='report-landing'>
			<div className='custom-wrapper'>
				<div className='sub-header'>
					<div className='sub-header-title'>
						<BreadCrumbWrapper urlName={activeTab == 'Design Report Template' ?
							`/dashboard/report_designer/${reportId}` : `/dashboard/report_generator/${reportId}`}
							value={reportId}
							data="Untitled" />
					</div>
				</div>
				<div className='landing-screen-header'>
					<ScreenHeader
						bannerbg={{
							background:
								'linear-gradient(180deg, rgba(139, 254, 197, 0.53) 0%, rgba(119, 227, 233, 0.49) 100%)',
						}}
						title={`Howdy ${localStorage.getItem('username')},`}
						description='Lets get designing some report templates'
						source={illustrations}
						sourceClass='dashboard-landing'
					/>
				</div>

				<Card className='landing-card'>
					<div style={{ width: '900px', marginLeft: '180px' }}>
						<Input.Search
							placeholder='Search by report ID, report name, chart ID, chart name, creator, status'
							allowClear
							className='landing-btn'
							enterButton='Search'
							size='large'
							onSearch={search}
							onChange={(e) => setReportSearch(e.target.value)}
							value={reportSearch}
						/>
						{searched ? (
							<Table
								className='landing-table'
								columns={columns}
								scroll={{ y: 150, x: 800 }}
								// pagination={false}
								dataSource={filterTable === null ? activeTab == 'Design Report Template' ? reportList : reportGenList : filterTable}
								onRow={record => ({
									onClick: e => {
										activeTab == 'Design Report Template'
											? getLoadReport(record.rep_disp_id)
											: getLoadReportGenerator(record.rep_disp_id, true);
										setReportSearch(record.rep_disp_id)
										setReportGen(record.rep_disp_id)
										setReportIds(record.rep_disp_id)
									},
								})}
							/>
						) : (
							<></>
						)}
						<Tabs
							className='report-landing-card'
							activeKey={activeTab}
							onChange={handleChangeTab}>
							<TabPane
								tab='Design Report Template'
								key='Design Report Template'>
								<div
									className='create-new'
									onClick={() => props.changeScreen()}>
									<PlusOutlined />
									<p>Design new report</p>
								</div>
								<br />

								<div className='card-legends'>
									<h3 className='recent'>Recently designed report templates</h3>
									<div className='legends'>
										<p>
											<span className='drft'></span>Draft
										</p>
										<p>
											<span className='await'></span>Awaiting approval
										</p>
										<p>
											<span className='aprv'></span>Approved
										</p>
									</div>
								</div>
								<div>
									<div className='tile'>
										{reportList && reportList.length > 0 ? (
											reportList.map(
												(i, index) =>
													index < 8 && (
														<div
															onClick={() => {
																getLoadReport(i.rep_disp_id);
																setReportIds(i.rep_disp_id)
															}}>
															<StatusBlock
																id={i.rep_disp_id}
																status={i.rep_status}
															/>
														</div>
													)
											)
										) : (
											<></>
										)}
									</div>
								</div>
							</TabPane>
							<TabPane
								tab='Generate Report Variant'
								key='Generate Report Variant'>
								<div
									className='create-new'
									onClick={() => setIsModalVisible(true)}>
									<PlusOutlined />
									<p>Generate new report</p>
								</div>
								<br />
								<div className='card-legends'>
									<h3 className='recent'>Recently created reports</h3>
									<div className='legends'>
										<p>
											<span className='drft'></span>Draft
										</p>
										<p>
											<span className='await'></span>Awaiting approval
										</p>
										<p>
											<span className='aprv'></span>Approved
										</p>
									</div>
								</div>
								<div className='tile'>
									{reportGenList &&
										reportGenList.length > 0 &&
										reportGenList.map(
											(i, index) =>
												index < 8 && (
													<div
														onClick={() => {
															getLoadReportGenerator(i.rep_disp_id, true);
															setReportIds(i.rep_disp_id)
														}}>
														<StatusBlock
															id={i.rep_disp_id}
															status={i.rep_status}
														/>
													</div>
												)
										)}
								</div>
							</TabPane>
						</Tabs>
					</div>
				</Card>
				<Modal
					style={{ top: 50 }}
					className='landing-modal'
					title='Create New Variant'
					visible={isModalVisible}
					onCancel={handleCancel}
					footer={false}>
					<div>
						<Row>
							<Col span={12}>
								<img className='gen-banner' src={Banner} />
							</Col>
							<Col span={12}>
								<Row>
									<p style={{ margin: '8px 0px' }}>
										Select a report to get started
									</p>
									<Input.Search
										onSearch={onSearch}
										placeholder='Search by report ID or name'
										onChange={(e) => setReportGen(e.target.value)}
										value={genSearch}
									/>
								</Row>
								<div className='landing-tiles'>
									{!newsearched &&
										reportList &&
										reportList.length > 0 &&
										reportList.map(
											(i, index) =>
												index < 4 && (
													<div
														onClick={() => {
															setReportIds(i.rep_disp_id);
															setReportId(i.rep_disp_id)
															setLetDis(true)
															NewReportGenerator(i.rep_disp_id);
														}}>
														<div
															className={
																selectedReportId == i.rep_disp_id
																	? 'landing-tile-check'
																	: 'landing-tile'
															}>
															<div className='landing-report-id'>
																{' '}
																{i.rep_disp_id}
															</div>
															<br />
															{selectedReportId == i.rep_disp_id ? (
																<img
																	className='landing-checkicon'
																	src={checkIcon}
																/>
															) : (
																<></>
															)}
														</div>
													</div>
												)
										)}
								</div>
								{newsearched ? (
									<Table
										className='landing-table'
										columns={columns}
										scroll={{ y: 150, x: 800 }}
										// style={{  height: 'auto' }}
										dataSource={filterTable === null ? reportList : filterTable}
										pagination={false}
										onRow={record => ({
											onClick: e => {
												NewReportGenerator(record.rep_disp_id);
												setReportGen(record.rep_disp_id)
											},
										})}
									/>
								) : (
									<></>
								)}
							</Col>

							<Button
								style={{
									backgroundColor: '#093185',
									color: 'white',
									borderRadius: '4px',
									marginLeft: '88%',
									marginTop: '70px',
								}}
								disabled={letDis}
								onClick={() => {
									history.push({
										pathname: `/dashboard/report_generator/${reportId}`,
									});
								}}>
								Let's Go!
							</Button>
						</Row>
					</div>
				</Modal>
			</div>
		</div>
	);
}
