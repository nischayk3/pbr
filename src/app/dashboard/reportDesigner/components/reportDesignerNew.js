/**
 * @author Mihir Bagga <mihir.bagga@mareana.com>
 * @Mareana - CPV Product
 * @version 1
 * @Last Modified - 14 March, 2022
 * @Last Changed By - @Mihir
 */
import {
	CloudUploadOutlined,
	EllipsisOutlined
} from '@ant-design/icons';
import {
	Button, Dropdown, Empty, Form, Menu
} from 'antd';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import BreadCrumbWrapper from '../../../../components/BreadCrumbWrapper';
import Signature from '../../../../components/ElectronicSignature/signature';
import SaveModal from '../../../../components/SaveModal/saveModal';
import {
	hideLoader, showLoader, showNotification
} from '../../../../duck/actions/commonActions';
import {
	screenChange, sendReport
} from '../../../../duck/actions/reportDesignerAction';
import {
	getCharts, getViews, loadReport, saveReportDesign
} from '../../../../services/reportDesignerServices';
import ReportDesignerDynamicSections from './reportDesignerDynamicSections/reportDesignerDynamicSections';
import ReportDesignerForm from './reportDesignerForm/reportDesignerForm';
import './stylesNew.scss';


const ReportDesignerNew = () => {
	const dispatch = useDispatch();
	const [form] = Form.useForm();
	const location = useLocation();
	const history = useHistory();

	const loading = false;
	const isNew = true;

	const loadData = useSelector(
		state => state.reportDesignerReducer.reportLoad
	);
	const chart_deleted = useSelector(
		state => state.reportDesignerReducer.layout
	);

	const [isLoad, setIsLoad] = useState(false);
	const [isSave, setIsSave] = useState(false);
	const [isSaved, setIsSaved] = useState(false);
	const [issaved, setisSaved] = useState(false);
	const [reportName, setReportName] = useState('');
	const [viewId, setViewId] = useState('');
	const [reportId, setReportId] = useState('');
	const [viewVersion, setViewVersion] = useState('');
	const [viewIdVersion, setViewIdVersion] = useState();
	const [selectedChartList, setSelectedChartList] = useState([]);
	const [status, setStatus] = useState('');
	const [viewList, setViewList] = useState('');
	const [chartList, setChartList] = useState([]);
	const [reportData, setReportData] = useState([]);
	const [formData, setFormData] = useState({});
	const [mainJson, setMainJson] = useState({});
	const [isPublish, setIsPublish] = useState(false);
	const [params, setParams] = useState(false)
	const [selectedSectionCharts, setSelectedSectionCharts] = useState([])
	const [sectionCharts, setCharts] = useState([])
	const [approveReject, setApproveReject] = useState('')
	const [sectionKeys, setSectionKeys] = useState({})
	const [sectionAddedCharts, setSectionAddedCharts] = useState({})
	const [chartsLayout, setChartsLayout] = useState({})
	const [currentSection, setCurrentSection] = useState()

	const menu = (
		<Menu>
			<Menu.Item onClick={() => {
				PrepareJson(mainJson, 'save_as')
			}}>
				Save As
			</Menu.Item>
		</Menu>
	);

	useEffect(() => {
		if (esignPublishRes?.status_code === 200) {
			setStatus(esignPublishRes?.rep_stauts);
		}
	}, [esignPublishRes]);

	useEffect(() => {
		const params = queryString.parse(location.search);
		if (Object.keys(params).length > 0) {
			dispatch(showLoader())
			unloadUrl(params)
		}
		getViewsList();
	}, []
	);

	useEffect(() => {
		if (loadData) {
			let data = loadData.report_designer ? loadData.report_designer : {}
			if (data.data) {
				LoadData(data.data)
				setReportData(data.data)

			}
		}
	}, []
	);

	useEffect(() => { form.resetFields() }, [formData]);

	const unloadUrl = async (params) => {
		try {
			dispatch(showLoader())
			setParams(true);
			let req = { report_displ_id: params.id }
			let data = await loadReport(req)
			data = data.report_designer
			data = data.data

			setReportId(params.id)
			if (data) {
				LoadData(data)
				setTimeout(() => {
					setIsLoad(true);
					dispatch(hideLoader())
				}, 2000)
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

	const setSectionCharts = (chartName, addedCharts) => {
		selectedSectionCharts.push(chartName)
		setSelectedSectionCharts(selectedSectionCharts)
		setCharts(addedCharts)
	}

	const setSectionAddKey = (data) => {
		setSectionKeys(data)
	}

	const setSectionAddCharts = (data) => {
		setSectionAddedCharts(data)
	}

	const deleteSection = (chartsLayouts) => {
		setChartsLayout(chartsLayouts)
	}

	const checkChanges = (reportData, mainJson, save_Type) => {
		let layout_change = false
		let new_charts_added = selectedSectionCharts.length > 0

		let json_data = reportData
		let jayson = mainJson
		json_data = json_data['layout_info'] ? json_data['layout_info'] : {}
		json_data = json_data['layout_info'] ? json_data['layout_info'] : {}

		if (Object.keys(json_data).length > 0 && Object.keys(jayson).length > 0) {
			layout_change = true
		}
		else if (Object.keys(json_data).length == 0 && Object.keys(jayson).length == 0) {
			layout_change = true
		}
		else if (Object.keys(json_data).length == 0 && Object.keys(jayson).length > 0) {
			layout_change = true
		}


		if (layout_change && new_charts_added)
			return [true, jayson]
		if (!layout_change && new_charts_added) {
			setMainJson({ ...json_data })

			return [true, json_data]
		}
		if (layout_change && !new_charts_added) {
			return [true, jayson]
		}
		if (chart_deleted && !layout_change && !new_charts_added) {
			return [true, json_data]
		}
		if (!layout_change && !new_charts_added)
			return [true, json_data]
	};

	const mapViewList = viewList && viewList.length > 0 ? viewList : []

	// Get form values
	const handleValuesChange = (changedValues, values) => {
		let keys = Object.keys(changedValues.response)
		setCurrentSection(keys.length > 0 ? keys[keys.length - 1] : 0)
		setMainJson(convertToJson(values));
	};

	const handleClose = () => {
		setIsPublish(false)
	};

	const PublishResponse = (res) => {
		setStatus(res.rep_stauts)
	}

	//Get view table data
	const getViewsList = () => {
		let req = {};
		getViews(req).then((res) => {
			setViewList(res['Data']);
		});
	};

	//Get charts based on viewId-version
	const getChartsList = (version) => {
		if (viewId.length > 0)
			setSelectedChartList([])
		// message.success(`${version} selected`)
		let req = version;
		getCharts(req).then((res) => {
			if (res['status-code'] === 200)
				setChartList(res['data']);
			else
				setChartList([]);
		});
	};

	// Converting form json into layout info required by the report generator json
	const convertToJson = (json_data) => {
		let arr = {};
		let section_arr = [];
		json_data = json_data['response']
		json_data.map((item, index) => {
			let obj = {};
			if (item == undefined && index <= 0) {
				let obj = {
					content: [],
					heading: " ",
					id: 1,
					numbered: true
				}
				arr['titlepage'] = obj
			}
			if (item == undefined && index > 0) {
				let obj = {
					content: [],
					heading: " ",
					id: 1,
					numbered: true
				}
				section_arr.push(obj);
			}
			if (item !== undefined) {

				obj['heading'] = item.sectionName ? item.sectionName : '';
				obj['numbered'] = true;
				let content_arr = [];
				content_arr = item.dymamic_rows ? item.dymamic_rows.map((i, index) => {
					// let objj = {};
					let key_obj = {}
					key_obj['value'] = i && i.value ? i.value : ''
					key_obj['editable'] = i && i.editable == undefined ? false : i && i.editable
					key_obj['id'] = i && index + 1
					key_obj['key'] = i && i.keyName ? i.keyName : ''

					return key_obj;
				}) : []
				obj['content'] = content_arr ? content_arr : [];
				obj['id'] = index;

				if (index == 0)
					arr['titlepage'] = obj;
				else
					section_arr.push(obj);
			}
		});
		arr['sections'] = section_arr;

		return arr;
	};

	// Saving the json
	const PrepareJson = (formData, saveType) => {
		let check = false
		let lay_data = {}
		if (isLoad) {
			let response_changes = checkChanges(reportData, formData, saveType)
			check = response_changes[0]
			lay_data = response_changes[1]
		}
		else
			check = true
		if (check) {
			let obj = {}
			obj['view_disp_id'] = viewId;
			obj['chart_int_ids'] = selectedChartList;
			obj['view_version'] = viewVersion;
			obj['rep_name'] = reportName;
			obj['rep_status'] = status;
			obj['selected_charts'] = [...new Set(selectedSectionCharts)];
			obj['charts_layout'] = sectionCharts;
			obj['chart_details'] = selectedChartList;
			obj['add_charts_layout'] = sectionAddedCharts;
			obj['add_keys_layout'] = sectionKeys;

			if (saveType == 'save_as') {
				obj['rep_disp_id'] = '';
				obj['saveType'] = saveType
			}
			if (saveType == 'save') {
				obj['rep_disp_id'] = reportId;
				obj['saveType'] = saveType
			}
			if (saveType == 'publish') {
				obj['rep_disp_id'] = reportId;
				obj['saveType'] = saveType
			}

			obj['layout_info'] = { 'layout_info': isLoad ? lay_data : formData, 'chart_details': selectedChartList, 'add_charts_layout': sectionAddedCharts, 'add_keys_layout': sectionKeys, 'charts_layout': sectionCharts };
			let req = {}
			req['data'] = obj
			if (reportName.length > 0 && viewId.length > 0 && selectedChartList.length > 0) {
				saveReportDesign(req).then((res) => {
					if (res && res['msg'] && res['msg'] == 'success') {
						setReportId(res['rep_disp_id'])
						req.data['rep_disp_id'] = res['rep_disp_id']
						setStatus(res['rep_stauts'])
						setIsSave(true)
						setIsSaved(true)
						history.push({
							pathname: `/dashboard/report_designer/${res['rep_disp_id']}`,
						})
					}
					else
						dispatch(showNotification('error', 'Error While Saving'));
				})
				dispatch(sendReport(req['data']))
			}
			else {
				dispatch(showNotification('error', 'Report name, view or chart id Is required'));
			}
		}
		else {
			dispatch(showNotification('error', 'No Changes To Save'));
			dispatch(sendReport(mainJson))
		}
	}

	// unloading the json into component readable form
	// getting json from GET service distrupting json for each component (as required)
	const convertContent = (obj) => {

		let content_obj = obj
		let rows = []
		content_obj.map((i) => {
			let o = {}
			o['keyName'] = i.key
			o['value'] = i.value
			o['editable'] = i.editable

			rows.push(o)
		})

		return rows
	}

	const LoadData = (json_data) => {
		try {
			dispatch(showLoader())
			setIsLoad(true);

			let status = json_data['rep_status'] ? json_data['rep_status'] : ''
			if (status)
				setStatus(status)

			let ReportName = json_data['rep_name'] ? json_data['rep_name'] : ''
			if (ReportName)
				setReportName(ReportName)

			let ReportID = json_data['rep_disp_id'] ? json_data['rep_disp_id'] : ''
			if (ReportID)
				setReportId(ReportID)


			let view_version = json_data['view_id-version'] ? json_data['view_id-version'] : ''
			if (view_version) {
				let view_id = view_version[0].split('-')
				setViewId(view_id[0] ? view_id[0] : '')
				setViewIdVersion(view_version[0])
				setViewVersion(view_id[1] ? view_id[1] : '')
				getChartsList(view_version[0])

			}

			let layout_data = json_data['layout_info']

			if (layout_data) {

				setChartsLayout(layout_data['charts_layout'] ? layout_data['charts_layout'] : {})
				setCharts(layout_data['charts_layout'] ? layout_data['charts_layout'] : {})

				let section_keys = layout_data['add_keys_layout'] ? layout_data['add_keys_layout'] : {}
				setSectionKeys(section_keys)

				setSectionAddCharts(section_keys)

				let res = []
				let layout_info = layout_data.layout_info ? layout_data.layout_info : {}
				let chartList = layout_data['chart_details'] && layout_data['chart_details'].length > 0 ? layout_data['chart_details'] : []
				if (chartList.length > 0)
					setSelectedChartList(chartList)
				else
					setSelectedChartList([])

				let title_page = layout_info['titlepage'] ? layout_info['titlepage'] : {}
				let title_section = title_page['heading'] ? title_page['heading'] : {}
				let title_rows = title_page['content'] ? convertContent(title_page['content']) : {}

				let title_obj = {}
				title_obj['sectionName'] = title_section ? title_section : ''
				title_obj['dymamic_rows'] = title_rows ? title_rows : []
				res.push(title_obj)


				let section_area = layout_info['sections'] ? layout_info['sections'] : ''
				if (section_area) {
					section_area.map((item) => {
						let section_obj = {}
						section_obj['sectionName'] = item['heading'] ? item['heading'] : ''
						section_obj['dymamic_rows'] = item['content'] ? convertContent(item['content']) : []
						res.push(section_obj)
					})

					let form_res = {}
					form_res['response'] = res
					setFormData(form_res)
					form.setFieldsValue(form_res);
					// return true
				}
				else {
					setFormData({})
					form.setFieldsValue({});
					// return true
				}
			}
			else {
				setFormData({})
				form.setFieldsValue({});

			}


		}
		catch
		{
			dispatch(showNotification('error', 'Error in Loading Data'));
			dispatch(hideLoader())
		}
		setTimeout(() => {
			dispatch(hideLoader())
		}, 3000);
	}


	return (
		<div className='custom-wrapper'>
			<div className='sub-header' style={{ paddingRight: '24px' }}>
				<div className='sub-header-title'>
					{/* <div onClick={() => window.location.reload()}> */}
					<BreadCrumbWrapper
						urlName={
							`/dashboard/report_designer/${reportId}`}
						value={reportId}
						data="Untitled" />
					{/* </div> */}
				</div>
				<div className='sub-header-btns'>
					{(isLoad || isNew) && !params ? (
						<>
							<Button
								className='report-primary-btn'
								disabled={status === "APRD"}
								onClick={() => {
									PrepareJson(mainJson, 'save');
								}}>
								Save
							</Button>
							{isLoad ? (
								<Button
									className='report-primary-btn'
									onClick={() => {
										PrepareJson(mainJson, 'save_as');
									}}>
									Save As
								</Button>
							) : (
								<></>
							)}
							<Button
								style={{ marginLeft: '16px', marginRight: '16px' }}
								className='report-primary-btn'
								onClick={() => {
									dispatch(screenChange(true)); history.push({
										pathname: `/dashboard/report_generator/${reportId}`,
									})
								}}
								disabled={!isSaved}>
								Preview
							</Button>
							<Button
								className='report-secondary-btn'
								onClick={() => {
									setIsPublish(true);
									setApproveReject('P');
								}}
								disabled={status == "AWAP" || status == 'APRD'}
								style={{ marginRight: '16px' }}>
								<CloudUploadOutlined
									style={{
										color: '#093185',
										fontSize: '16px',
										marginTop: '2px',
									}}
								/>
								Publish
							</Button>
							<Dropdown
								overlay={menu}
								placement='bottomLeft'
								arrow={{ pointAtCenter: true }}>
								<EllipsisOutlined
									style={{
										transform: 'rotate(-90deg)',
										fontSize: '20px',
										marginRight: '10px',
									}}
								/>
							</Dropdown>
						</>
					) : (
						<> </>
					)}
					{params ? (
						<div>
							<Button
								className='viewCreation-rejectBtn'
								onClick={() => {
									setIsPublish(true);
									setApproveReject('R');
								}}
							>
								Reject
							</Button>
							<Button
								className='viewCreation-publishBtn'
								onClick={() => {
									setIsPublish(true);
									setApproveReject('A');
								}}
							>
								Approve
							</Button>
						</div>
					) : (
						<></>
					)}
				</div>
			</div>

			<div className='custom-content-layout'>
				<ReportDesignerForm
					setViewId={setViewId}
					viewList={viewList}
					setStatus={setStatus}
					status={status}
					isLoad={isLoad}
					reportName={reportName}
					setReportName={setReportName}
					viewVersion={viewVersion}
					setViewVersion={setViewVersion}
					reportId={reportId}
					viewIdVersion={viewIdVersion}
					setViewIdVersion={setViewIdVersion}
					getChartsList={getChartsList}
					mapViewList={mapViewList}
					show={params}
					selectedChartList={selectedChartList}
					setSelectedChartList={setSelectedChartList}
					chartList={chartList}
				/>

				{(isLoad || isNew) && loading == false && viewId == '' ? (
					<div className='new-empty-block'>
						<Empty
							description={
								<span>Fill in ‘Report info’ to add new section</span>
							}
							className='empty-block'
							image={Empty.PRESENTED_IMAGE_SIMPLE}
						/>
					</div>
				) : (
					<></>
				)}

				{(isLoad || isNew) && loading == false && viewId !== '' ? (
					<div className='reportDesigner-grid-tables'>
						<Form
							className='report-form'
							name='report-generator-form'
							form={form}
							onValuesChange={handleValuesChange}
							initialValues={formData}>
							<ReportDesignerDynamicSections
								formData={formData}
								setCurrentSection={setCurrentSection}
								currentSection={currentSection}
								show={params}
								list={selectedChartList}
								setSectionCharts={setSectionCharts}
								sectionKeys={sectionKeys}
								sectionAddedCharts={sectionAddedCharts}
								setSectionAddKey={setSectionAddKey}
								setSectionAddCharts={setSectionAddCharts}
								charts_layout={chartsLayout}
								isLoad={isLoad}
								deleteSection={deleteSection}
							/>
						</Form>
					</div>
				) : (
					<></>
				)}
				<SaveModal isSave={isSave} setIsSave={setIsSave} id={reportId} setIsSaved={setisSaved} load={isLoad || issaved} />
			</div>
			<Signature
				isPublish={isPublish}
				handleClose={handleClose}
				screenName='Report Designer'
				PublishResponse={PublishResponse}
				appType='REPORT'
				dispId={reportId}
				version={0}
				status={approveReject}
			/>
		</div>
	);
}

export default ReportDesignerNew;
