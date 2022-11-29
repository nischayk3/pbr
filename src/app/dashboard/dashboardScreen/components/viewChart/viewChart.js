import {
	CheckCircleOutlined, CloseOutlined, EditOutlined, PlusOutlined, UndoOutlined
} from '@ant-design/icons';
import {
	Button,
	Card, Col, DatePicker, Row, Select, Slider, Switch
} from 'antd';
import moment from 'moment';
import queryString from "query-string";
import React, {
	forwardRef, useEffect, useImperativeHandle, useState
} from 'react';
import Plot from 'react-plotly.js';
import { useDispatch } from 'react-redux';
import { useLocation } from "react-router";
import {
	hideLoader, showLoader, showNotification
} from '../../../../../duck/actions/commonActions';
import { getSiteId } from '../../../../../services/chartPersonalizationService';
import { getDashboard } from '../../../../../services/dashboardServices';
import { getChartPlotData } from '../../../../../services/workSpaceServices';
import ChartFilter from '../chartFilter/chartFilter';
import dummy from './dummy.json';
import './styles.scss';

const ViewChart = (props, ref) => {
	const dispatch = useDispatch();
	const location = useLocation();
	const params = queryString.parse(location.search);
	const [dashboardInfo, setDashboardInfo] = useState({});
	const [siteList, setSiteList] = useState([]);
	const [tempPanels, setTempPanels] = useState([]);
	const [tempCard, setTempCard] = useState({});
	const [isEditable, setIsEditable] = useState(null);

	useImperativeHandle(
		ref,
		() => ({
			getChildState: () => {
				return Object.assign({}, dashboardInfo, { panels: tempPanels });
			},
		}),
		[dashboardInfo, tempPanels]
	);
	// const range = [
	// 	{ key: 'Last 5 minutes', value: 5 },
	// 	{ key: 'Last 10 minutes', value: 10 },
	// 	{ key: 'Last 15 minutes', value: 15 },
	// 	{ key: 'Last 20 minutes', value: 20 },
	// 	{ key: 'Last 25 minutes', value: 25 },
	// 	{ key: 'Last 30 minutes', value: 30 },
	// ];

	const typeOfCharts = ['Analysis', 'Charts', 'Grafana'];

	useEffect(() => {
		fetchDataFromUrl();
		getSiteGlobalFilter();
	}, []);
	useEffect(() => {
		let info = JSON.parse(JSON.stringify(dashboardInfo));
		info.dashboard_name = props.dashboardName;
		setDashboardInfo(info);
	}, [props.dashboardName]);

	const getChartData = (chartId, payload = {}) => {
		let login_response = JSON.parse(sessionStorage.getItem('login_details'));
		let req = { chartId: chartId, ...payload };
		let headers = {
			'content-type': 'application/json',
			'x-access-token': login_response.token ? login_response.token : '',
			'resource-name': 'DASHBOARD',
		};
		try {
			//dispatch(showLoader());
			return getChartPlotData(req, headers);

			//dispatch(hideLoader());
		} catch (error) {/* istanbul ignore next */
			dispatch(hideLoader());
			dispatch(showNotification('error', error.Message));
		}
	};

	const getSiteIdHandler = (id = props.viewData.viewId) => {

		let reqSite = { view_id: id };
		return getSiteId(reqSite).then(res => {
			if (res.Status === 200) {
				return res.Data;
			} else if (res.Status === 400) {
				dispatch(showNotification('error', 'Site Error - ' + res.Message));
				return [];
			} else if (res === 'Internal Server Error') {
				dispatch(showNotification('error', 'Site Error - ' + res));
				return [];
			}
		});
	};

	const getSiteGlobalFilter = async () => {
		dispatch(showLoader());
		let req = {};
		try {
			let res = await getSiteId(req);
			setSiteList(res.Data);
			dispatch(hideLoader());
		} catch (error) {/* istanbul ignore next */
			dispatch(hideLoader());
			dispatch(showNotification('error', 'There is no data for selected filters'));
		}
	};

	const fetchDataFromUrl = async () => {

		if (props.dashboardId) {
			let req = {
				dashboardId: props.dashboardId,
				version: props.dashboardVersion,
			};
			try {
				dispatch(showLoader());
				const dashboardRes = await getDashboard(req);
				dashboardRes.data[0].version = props.dashboardVersion;
				dashboardRes.data[0].panels.map(async (el, i) => {
					let res = await getChartData(el.chart_id);
					let chartLayout = {
						xaxis: res.data[0]?.layout.xaxis,
						yaxis: res.data[0]?.layout.yaxis,
						autosize: false,
						width: 580,
						height: 300,
						margin: {
							l: 60,
							r: 50,
							//b: 75,
							t: 40,
							pad: 4,
						},
					};

					el.chartLayout = chartLayout;
					el.data = res.data;
					el.data[0].data = el.data[0].data.map((item, index) => {
						if (item.mode === 'markers') {
							item.marker.defaultColor = item.marker.color;
							item.marker.color = [...item.text].fill(item.marker.color);
						}
						return item;
					});
				});
				setTempPanels(dashboardRes.data[0].panels);
				setDashboardInfo(dashboardRes.data[0]);
				dispatch(hideLoader());
			} catch (error) {
				dispatch(hideLoader());
				dispatch(showNotification('error', 'Unable to fetch data'));
			}
		} else {
			let newDummy = JSON.parse(JSON.stringify(dummy));
			newDummy.dashboard_name = props.dashboardName;
			newDummy.panels[0].chart_id = props.viewData.chartDispId;
			newDummy.panels[0].chart_name = props.viewData.chartName;

			try {
				dispatch(showLoader());
				let resp = await getSiteIdHandler();
				newDummy.panels[0].data_filter.site_list = resp;

				let res = await getChartData(newDummy.panels[0].chart_id);
				let chartLayout = {
					xaxis: res.data[0]?.layout.xaxis,
					yaxis: res.data[0]?.layout.yaxis,
					autosize: false,
					width: 580,
					height: 300,
					margin: {
						l: 60,
						r: 50,
						t: 40,
						pad: 4,
					},
				};

				newDummy.panels[0] = Object.assign(
					{},
					res,
					{ chartLayout: chartLayout },
					newDummy.panels[0]
				);
				setTempPanels(newDummy.panels);
				setDashboardInfo(newDummy);
				dispatch(hideLoader());
			} catch (error) {
				/* istanbul ignore next */
				dispatch(hideLoader());
				dispatch(showNotification('error', 'Unable to fetch data'));
			}
		}
	};


	const onChangeInnerCheckbox = (checked, index) => {
		const isChecked = checked ? 1 : 0;
		let arr = [...tempPanels];
		arr[index].data_filter.unapproved_data = isChecked;
		arr[index].data[0].has_unapproved = isChecked == 1 ? true : false
		arr[index].data[0].unapprove_data = isChecked == 1 ? true : false
		setTempPanels(arr);
	};

	const onChangeTempCheckbox = checked => {
		const isChecked = checked ? 1 : 0;
		let obj = { ...tempCard };
		obj.data_filter.unapproved_data = isChecked;
		setTempCard(obj);
	};

	const onChangeStart = (date, dateString) => {
		if (date) {
			let the_date = moment(date).toISOString()
			if (!the_date.includes(dateString)) {
				let split_date = the_date.split('T')
				date = dateString + 'T' + split_date[1]
			}
		}
		let obj = { ...dashboardInfo };
		if (obj.data_filter.date_range == '') {
			obj.data_filter.date_range = `${date ? moment(date).toISOString() : ''}/`;
		} else {
			obj.data_filter.date_range = `${date ? moment(date).toISOString() : ''}/${obj.data_filter.date_range.split('/')[1]
				}`;
		}

		setDashboardInfo(obj);
	};
	const onChangeEnd = (date, dateString) => {
		if (date) {
			let the_date = moment(date).toISOString()
			if (!the_date.includes(dateString)) {
				let split_date = the_date.split('T')
				date = dateString + 'T' + split_date[1]
			}
		}
		let obj = { ...dashboardInfo };
		if (obj.data_filter.date_range == '') {
			obj.data_filter.date_range = `/${date ? moment(date).toISOString() : ''}`;
		} else {
			obj.data_filter.date_range = `${obj.data_filter.date_range.split('/')[0]
				}/${date ? moment(date).toISOString() : ''}`;
		}

		setDashboardInfo(obj);
	};

	const onInnerStart = (date, dateString, index) => {
		if (date) {
			let the_date = moment(date).toISOString()
			if (!the_date.includes(dateString)) {
				let split_date = the_date.split('T')
				date = dateString + 'T' + split_date[1]
			}
		}

		let arr = [...tempPanels];
		if (arr[index].data_filter.date_range == '') {
			arr[index].data_filter.date_range = `${date ? moment(date).toISOString() : ''
				}/`;
		} else {
			arr[index].data_filter.date_range = `${date ? moment(date).toISOString() : ''
				}/${arr[index].data_filter.date_range.split('/')[1]}`;
		}

		setTempPanels(arr);
	};
	const onInnerEnd = (date, dateString, index) => {
		if (date) {
			let the_date = moment(date).toISOString()
			if (!the_date.includes(dateString)) {
				let split_date = the_date.split('T')
				date = dateString + 'T' + split_date[1]
			}
		}
		let arr = [...tempPanels];
		if (arr[index].data_filter.date_range == '') {
			arr[index].data_filter.date_range = `/${date ? moment(date).toISOString() : ''
				}`;
		} else {
			arr[index].data_filter.date_range = `${arr[index].data_filter.date_range.split('/')[0]
				}/${date ? moment(date).toISOString() : ''}`;
		}
		setTempPanels(arr);
	};
	const onInnerTempStart = (date, dateString) => {
		let obj = { ...tempCard };
		if (obj.data_filter.date_range == '') {
			obj.data_filter.date_range = `${date ? moment(date).toISOString() : ''}/`;
		} else {
			obj.data_filter.date_range = `${date ? moment(date).toISOString() : ''}/${obj.data_filter.date_range.split('/')[1]
				}`;
		}
		setTempCard(obj);
	};
	const onInnerTempEnd = (date, dateString) => {
		let obj = { ...tempCard };
		if (obj.data_filter.date_range == '') {
			obj.data_filter.date_range = `/${date ? moment(date).toISOString() : ''}`;
		} else {
			obj.data_filter.date_range = `${obj.data_filter.date_range.split('/')[0]
				}/${date ? moment(date).toISOString() : ''}`;
		}
		setTempCard(obj);
	};

	const handleGlobalDropdownChange = (value, text) => {
		let obj = JSON.parse(JSON.stringify(dashboardInfo));
		switch (text) {
			case 'Site':
				obj.data_filter.site = value;
				setDashboardInfo(obj);
				break;
			case 'Unapproved Data':
				obj.data_filter.unapproved_data = value ? 1 : 0;
				setDashboardInfo(obj);
				break;
		}

	};

	const onTypeChartsChange = (e, index) => {
		let arr = [...tempPanels];
		tempPanels[index].source_type = e;
		setTempPanels(arr);
	};

	const onTempChartsChange = e => {
		let obj = { ...tempCard };
		obj.source_type = e;
		setTempCard(obj);
	};

	/* istanbul ignore next */
	const onSiteChange = (e, index) => {
		let arr = [...tempPanels];
		tempPanels[index].data_filter.site = e;
		setTempPanels(arr);
	};

	/* istanbul ignore next */
	const onTempSiteChange = e => {
		let obj = { ...tempCard };
		obj.data_filter.site = e;
		setTempCard(obj);
	};

	/* istanbul ignore next */
	const removeCard = index => {
		let arr = [...tempPanels];
		arr.splice(index, 1);
		let obj = JSON.parse(JSON.stringify(dashboardInfo));
		obj.panels = [...obj.panels];
		obj.panels.splice(index, 1);
		setDashboardInfo(obj);
		setTempPanels(arr);
	};

	const showPreview = async index => {
		let arr = [...tempPanels];
		let id = tempPanels[index].chart_id;
		let payload = {
			site: tempPanels[index].data_filter.site,
			date_range: tempPanels[index].data_filter.date_range == '/' ? '' : tempPanels[index].data_filter.date_range,
			unapproved_data: tempPanels[index].data[0].unapprove_data,
		};
		dispatch(showLoader());
		try {
			let res = await getChartData(id, payload);
			let chartLayout = {
				xaxis: res.data[0]?.layout.xaxis,
				yaxis: res.data[0]?.layout.yaxis,
				autosize: false,
				width: 580,
				height: 250,
				margin: {
					l: 60,
					r: 50,
					//b: 75,
					t: 40,
					pad: 4,
				},
			};
			arr[index] = Object.assign({}, arr[index], res, {
				chartLayout: chartLayout,
			});
			arr[index].data[0].data = arr[index].data[0].data.map((item, index) => {
				if (item.mode === 'markers') {
					item.marker.defaultColor = item.marker.color;
					item.marker.color = [...item.text].fill(item.marker.color);
				}
				return item;
			});
			setTempPanels(arr);
			dispatch(hideLoader());
		} catch (error) {/* istanbul ignore next */
			dispatch(hideLoader());
			dispatch(showNotification('error', 'There is no data for selected filters'));
		}
	};

	const showPreviewTemp = async () => {
		let obj = { ...tempCard };
		let id = obj.chart_id;
		let payload = {
			site: obj.data_filter.site,
			date_range: obj.data_filter.date_range,
			unapproved_data: obj.data_filter.unapproved_data,
		};
		dispatch(showLoader());
		try {
			let res = await getChartData(id, payload);
			let chartLayout = res.data[0]?.layout

			let temp_layout_margin = { 'l': 60, 'r': 50, 't': 40, 'pad': 4 }
			chartLayout['margin'] = temp_layout_margin
			chartLayout['height'] = 250
			chartLayout['width'] = 580
			chartLayout['autosize'] = false
			obj = Object.assign({}, obj, res, { chartLayout: chartLayout });
			setTempCard(obj);
			dispatch(hideLoader());
		} catch (error) {/* istanbul ignore next */
			dispatch(hideLoader());
			dispatch(showNotification('error', 'There is no data for selected filters'));
		}
	};

	/* istanbul ignore next */
	const searchCallback = async (data, index) => {
		let arr = [...tempPanels];
		arr[index].chart_id = data.chartDispId;
		arr[index].chart_name = data.chartName;
		arr[index].view_id = data.viewId;
		let res = await getSiteIdHandler(data.viewId);
		arr[index].data_filter.site_list = res;
		setTempPanels(arr);
	};

	const searchTempCallback = async data => {
		let obj = { ...tempCard };
		obj.chart_id = data.chartDispId;
		obj.chart_name = data.chartName;
		obj.view_id = data.viewId;
		let res = await getSiteIdHandler(data.viewId);
		obj.data_filter.site_list = res;
		setTempCard(obj);
	};


	const addNewCard = () => {
		let newDummy = { ...dummy };
		setTempCard(newDummy.panels[0]);
	};

	/* istanbul ignore next */
	const onTempApply = () => {
		let obj = JSON.parse(JSON.stringify(tempCard));
		obj.chartLayout.height = 300;
		let arr = [...tempPanels, obj];
		setTempPanels(arr);
		let info = { ...dashboardInfo };
		info.panels = [...dashboardInfo.panels, obj];
		setDashboardInfo(info);
		setTempCard({});
	};

	const appliedGlobalFilters = async () => {
		let arr = [...tempPanels];
		let obj = JSON.parse(JSON.stringify(dashboardInfo));
		let payload = {};
		try {
			dispatch(showLoader());
			await Promise.all(
				arr.map(async (el, i) => {
					if (
						el.data_filter.site ||
						el.data_filter.date_range ||
						el.data_filter.unapproved_data
					) {
						payload = {
							site: el.data_filter.site,
							date_range: el.data_filter.date_range == '/' ? '' : el.data_filter.date_range,
							unapproved_data: el.data_filter.unapproved_data,
						};
					} else {
						payload = {
							site: obj.data_filter.site,
							date_range: obj.data_filter.date_range == '/' ? '' : obj.data_filter.date_range,
							unapproved_data: obj.data_filter.unapproved_data,
						};
					}
					let res = await getChartData(el.chart_id, payload);
					dispatch(hideLoader());
					let chartLayout = {
						xaxis: res.data[0]?.layout.xaxis,
						yaxis: res.data[0]?.layout.yaxis,
						autosize: false,
						width: 580,
						height: 210,
						margin: {
							l: 60,
							r: 50,
							//b: 75,
							t: 10,
							pad: 4,
						},
					};
					el.chartLayout = chartLayout;
					el.data = res.data;

					el.data[0].data = el.data[0].data.map((item, index) => {
						if (item.mode === 'markers') {
							item.marker.defaultColor = item.marker.color;
							item.marker.color = [...item.text].fill(item.marker.color);
						}
						return item;
					});
				})
			);
			setTempPanels(arr);
			setDashboardInfo(obj);
			//dispatch(hideLoader());
		} catch (error) {/* istanbul ignore next */
			dispatch(hideLoader());
			dispatch(showNotification('error', 'Unable to fetch data'));
		}
	};

	/* istanbul ignore next */
	const onPointSelected = data => {

		if (data && data.points) {
			let points = data.points.map((item, index) => item.text);
			let panels = JSON.parse(JSON.stringify(tempPanels));
			points &&
				points.map(point => {
					panels.map((el, i) => {
						el.data[0].data = el.data[0].data.map((item, k) => {
							if (item.mode === 'markers') {
								let pointIndex = item.text.findIndex(x => x == point);
								if (pointIndex >= 0) {
									item.marker.color[pointIndex] = 'orange';
								}
								item.selectedpoints = null;
							}
							return item;
						});
					});

					setTempPanels(panels);
				});
		}
	};

	const onResetFilters = index => {
		let arr = [...tempPanels];
		arr[index].data_filter.date_range = '';
		arr[index].data_filter.site = '';
		arr[index].data_filter.unapproved_data = false;
		setTempPanels(arr);
	};

	return (
		<div>
			<Card
				className='dashboard-cards'
				title={
					props.dashboardName
						? props.dashboardName
						: dashboardInfo.dashboard_name
				}>
				<div className='global-filters'>
					<div className='dashboard-filters'>
						<div>
							<Select
								style={{ width: 120 }}
								value={dashboardInfo?.data_filter?.site || undefined}
								onChange={value => handleGlobalDropdownChange(value, 'Site')}
								placeholder='Site'
								className='global-filters-params select-site'
								disabled={params['share']}
								allowClear>
								{siteList &&
									siteList.map((ele, index) => {
										return (
											<Option key={index} value={Object.values(ele)[0]}>
												{Object.keys(ele)[0]}
											</Option>
										);
									})}
							</Select>
						</div>
						<div className='show-data'>
							<p style={{ paddingTop: '4px' }}>Show Unapproved data</p>
							<Switch
								type='primary'
								checked={dashboardInfo?.data_filter?.unapproved_data}
								onChange={value =>
									handleGlobalDropdownChange(value, 'Unapproved Data')
								}
								disabled={params['share']}
							/>
						</div>
					</div>
					<div className='dashboard-filters'>
						<DatePicker
							style={{ height: '34px' }}
							className='global-filters-params'
							onChange={onChangeStart}
							disabled={params['share']}
							value={
								dashboardInfo?.data_filter?.date_range?.split('/')[0]
									? moment(
										dashboardInfo?.data_filter?.date_range?.split('/')[0],
										'YYYY-MM-DD'
									)
									: ''
							}
							allowClear
						/>

						<DatePicker
							className='global-filters-params'
							onChange={onChangeEnd}
							disabled={params['share']}
							value={
								dashboardInfo?.data_filter?.date_range?.split('/')[1]
									? moment(
										dashboardInfo?.data_filter?.date_range?.split('/')[1],
										'YYYY-MM-DD'
									)
									: ''
							}
							style={{ height: '34px' }}
							allowClear
						/>

						<Select
							placeholder='Exploration controls'
							className='global-filters-params'
							style={{ height: '34px' }}
							disabled={params['share']}
							onChange={value =>
								handleGlobalDropdownChange(value, 'Exploration Controls')
							}>
							<Option value='Ph'>
								PH
								<Slider range defaultValue={[20, 50]} />
							</Option>
							<Option value='Temperature'>
								Temperature
								<Slider range defaultValue={[20, 50]} />
							</Option>
							<Option value='Batch'>
								Batch
								<Slider range defaultValue={[20, 50]} />
							</Option>
						</Select>

						<Button
							type='primary'
							className='custom-secondary-btn'
							onClick={() => appliedGlobalFilters()}
							disabled={params['share']}
							style={{ height: '34px' }}>
							Apply
						</Button>
					</div>
				</div>

				<Row gutter={[16, 24]} className='chart-row'>
					{tempPanels.map((el, index) => {
						let layout_margin = { 'l': 60, 'r': 50, 't': 40, 'pad': 4 }
						let layout_height = el?.chartLayout && el.chartLayout.height
						let layout_width = el?.chartLayout && el.chartLayout.width
						let layout_data = el?.data[0].layout && el?.data[0]?.layout
						layout_data['margin'] = layout_margin
						layout_data['height'] = layout_height
						layout_data['width'] = layout_width

						return (
							<Col
								className='gutter-row'
								span={12}
								style={{ padding: '1px 22px' }}>
								<div
									className='chartCard'
									style={{
										border:
											isEditable == index
												? '1px solid #486BC9'
												: '2px solid #D9D9D9',
									}}>
									<div className='inner-chart-filters'>
										<div
											style={{
												display: 'flex',
												flexDirection: 'row',
												justifyContent: 'space-between',
												margin: '5px 7px',
											}}>
											<div className='dashboard-chart-name'>
												{el.chart_name}
											</div>
											<div>
												{isEditable == index ? (
													<div
														style={{ display: 'flex', flexDirection: 'row' }}>
														<div>
															<UndoOutlined
																style={{ color: '#486BC9', fontSize: '16px' }}
																onClick={() => onResetFilters(index)}
															/>
														</div>
														<div>
															<span
																style={{
																	marginLeft: '20px',
																	marginRight: '20px',
																}}>
																Apply{' '}
																<CheckCircleOutlined
																	style={{ color: '#486BC9' }}
																	onClick={() => {
																		setIsEditable(null);
																		let panels = [...tempPanels];
																		panels[index] = { ...tempPanels[index] };
																		panels[index].chartLayout = {
																			...tempPanels[index].chartLayout,
																		};
																		panels[index].chartLayout.height = 300;
																		setIsEditable(null);
																		setTempPanels(panels);
																	}}
																/>
															</span>
															<span>
																<CloseOutlined
																	style={{ color: '#262626', fontSize: '14px' }}
																	onClick={() => removeCard(index)}
																/>
															</span>
														</div>
													</div>
												) : (
													<>
														<span
															className={params['share'] ? "disable-event" : ""}
															style={{
																marginLeft: '20px',
																marginRight: '20px',

															}}>
															Edit{' '}
															<EditOutlined
																className={params['share'] ? "disable-event" : ""}
																style={{ color: '#486BC9' }}
																onClick={() => {
																	let panels = [...tempPanels];
																	if (isEditable != null) {
																		panels[isEditable] = {
																			...tempPanels[isEditable],
																		};
																		panels[isEditable].chartLayout = {
																			...tempPanels[isEditable].chartLayout,
																		};
																		panels[isEditable].chartLayout.height = 300;
																	}
																	panels[index] = { ...tempPanels[index] };
																	panels[index].chartLayout = {
																		...tempPanels[index].chartLayout,
																	};
																	panels[index].chartLayout.height = 250;
																	setIsEditable(index);
																	setTempPanels(panels);
																}}
															/>
														</span>
														<span style={{ marginLeft: '10px' }}>
															<CloseOutlined
																className={params['share'] ? "disable-event" : ""}
																style={{ color: '#262626', fontSize: '14px' }}
																onClick={() => removeCard(index)}
															/>
														</span>
													</>
												)}
											</div>
										</div>
									</div>
									<div>
										{isEditable == index && (
											<ChartFilter
												checked={tempPanels[index].data[0].unapprove_data}
												typeChartValue={tempPanels[index].source_type}
												checkboxChange={value =>
													onChangeInnerCheckbox(value, index)
												}
												onChangeTypeCharts={e => onTypeChartsChange(e, index)}
												typeOfChartsOptions={typeOfCharts}
												selectedTypeOfCharts={tempPanels[index].source_type}
												dateRange={tempPanels[index].data_filter.date_range}
												siteValue={tempPanels[index].data_filter.site}
												chartName={tempPanels[index].chart_name}
												chartId={tempPanels[index].chart_id}
												siteOption={tempPanels[index].data_filter.site_list}
												onInnerStart={(date, dateString) =>
													onInnerStart(date, dateString, index)
												}
												onInnerEnd={(date, dateString) =>
													onInnerEnd(date, dateString, index)
												}
												onSiteChange={e => onSiteChange(e, index)}
												viewData={props.viewData}
												searchTableData={props.searchTableData}
												setSearchTableData={props.setSearchTableData}
												searchTable={props.searchTable}
												onSearchChange={props.onSearchChange}
												searchData={props.searchData}
												setViewData={props.setViewData}
												showPreview={() => showPreview(index)}
												rawTableData={props.rawTableData}
												searchCallback={data => searchCallback(data, index)}
											/>
										)}
										<div
											style={{
												marginTop: isEditable == index ? '0px' : '50px',
												marginBottom: isEditable == index ? '0px' : '-10px',
												padding: '5px 11px',
											}}>
											<Plot
												data={el.data && el?.data[0]?.data}
												layout={layout_data}
												onSelected={data => onPointSelected(data)}
											/>
										</div>
									</div>
								</div>
							</Col>
						);
					})}
					<Col className='gutter-row' span={12} style={{ padding: '1px 22px' }}>
						<div className='newCard'>
							{Object.keys(tempCard).length == 0 ? (
								<div className={params['share'] ? "disable-event before-new-card" : "before-new-card"} onClick={() => addNewCard()}  >
									<PlusOutlined className={params['share'] ? "disable-event" : ""} />
									<p>Add new chart</p>
								</div>
							) : (
								<>
									<div className='inner-chart-filters'>
										<span>
											{tempCard.chart_name ? tempCard.chart_name : 'Untitled'}
										</span>

										<div style={{ float: 'right' }}>
											<span style={{ marginLeft: '20px', marginRight: '20px' }}>
												Apply{' '}
												<CheckCircleOutlined
													style={{ color: '#486BC9' }}
													onClick={() => onTempApply()}
												/>
											</span>
											<span>
												<CloseOutlined
													style={{ color: '#262626', fontSize: '14px' }}
												/>
											</span>
										</div>
									</div>
									<div>
										<ChartFilter
											checked={tempCard.data_filter.unapproved_data}
											typeChartValue={tempCard.source_type}
											checkboxChange={value => onChangeTempCheckbox(value)}
											onChangeTypeCharts={e => onTempChartsChange(e)}
											typeOfChartsOptions={typeOfCharts}
											selectedTypeOfCharts={tempCard.source_type}
											dateRange={tempCard.data_filter.date_range}
											siteValue={tempCard.data_filter.site}
											chartName={tempCard.chart_name}
											chartId={tempCard.chart_id}
											siteOption={tempCard.data_filter.site_list}
											onInnerStart={(date, dateString) =>
												onInnerTempStart(date, dateString)
											}
											onInnerEnd={(date, dateString) =>
												onInnerTempEnd(date, dateString)
											}
											onSiteChange={e => onTempSiteChange(e)}
											showPreview={() => showPreviewTemp()}
											rawTableData={props.rawTableData}
											searchCallback={data => searchTempCallback(data)}
										/>
										{tempCard?.data && (
											<div style={{ padding: '5px 11px' }}>
												<Plot
													data={tempCard?.data && tempCard?.data[0]?.data}
													layout={tempCard && tempCard?.chartLayout}
												/>
											</div>
										)}
									</div>
								</>
							)}
						</div>
					</Col>
				</Row>
			</Card>
		</div>
	);
};

export default forwardRef(ViewChart);
