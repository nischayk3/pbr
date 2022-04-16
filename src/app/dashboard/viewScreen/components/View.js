/**
 * @author Dinesh
 * @Mareana - CPV Product
 * @version  1
 * @Last Modified - 4 April, 2022
 * @Last Changed By - Dinesh
 */

import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { CloudUploadOutlined } from '@ant-design/icons';
import { Button, Collapse, Form, message } from 'antd';
import FileUpload from './fileUpload/FileUpload';
import ParameterLookup from './parameterLookup/ParameterLookup';
import './styles.scss';
import {
	getViewConfig,
	getViews,
} from '../../../../services/viewCreationPublishing';
import {
	materialsParameterTree,
	adHocFilesParameterTree,
} from '../../../../duck/actions/fileUploadAction';
import {
	saveFunction,
	updateFunction,
} from '../../../../duck/actions/viewCreationAction';
import BreadCrumbWrapper from '../../../../components/BreadCrumbWrapper';
import Loading from '../../../../components/Loading';
import Signature from '../../../../components/ElectronicSignature/signature';
import queryString from 'query-string';
import { sendUrl } from '../../../../duck/actions/loginAction';
import { loginUrl } from '../../../../services/loginService';
import { adenabled } from '../../../../config/config';
import MaterialTree from './materialTree';
import MathEditor from './mathEditor';
import ViewSummaryData from './viewSummary';
import viewdatajson from './view.json';
import LandingPage from '../components/landing/viewCreationLanding';
const { Panel } = Collapse;

const ViewCreation = () => {
	const molecule_Id = useSelector(
		state => state.viewCreationReducer.molecule_id
	);
	const selectedTableData = useSelector(
		state => state.viewCreationReducer.selectedParamData
	);

	const saveMathFun = useSelector(state => state.viewCreationReducer.save);
	const saveAsMathFun = useSelector(state => state.viewCreationReducer.saveAs);
	const mathFunDetails = useSelector(
		state => state.viewCreationReducer.funDetails
	);
	const viewState = useSelector(state => state.viewCreationReducer);
	const viewTableData = useSelector(
		state => state.viewCreationReducer.paramData
	);

	const dispatch = useDispatch();
	const location = useLocation();
	const [count, setCount] = useState(1);
	const [params, setParams] = useState(false);

	const [moleculeList, setMoleculeList] = useState([]);
	const [functionEditorRecord, setFunctionEditorRecord] = useState([]);
	const [isPublish, setIsPublish] = useState(false);
	const [moleculeId, setMoleculeId] = useState();
	const [materialsList, setMaterialsList] = useState([]);

	const text = useRef();
	const getData = useRef();

	const [filterdData, setFilterdData] = useState(null);
	const [dataLoadingState, setDataLoadingState] = useState(false);
	const [visible, setVisible] = useState(false);
	const [isLoad, setIsLoad] = useState(false);
	const [functionEditorViewState, setFunctionEditorViewState] = useState(false);
	const [parentBatches, setParentBatches] = useState([]);
	const [newBatchData, setNewBatchData] = useState([]);
	const [viewList, setViewList] = useState([]);
	const [viewDisplayId, setViewDisplayId] = useState('');
	const [viewStatus, setViewStatus] = useState();
	const [viewVersion, setViewVersion] = useState();
	const viewStatusData = useRef();
	const viewVersionData = useRef();
	const [filterTable, setFilterTable] = useState(null);
	const [filesListTree, setFilesListTree] = useState([]);
	const [mathFunction, setMathFunction] = useState();
	const tableData = useRef();
	const [viewFunctionName, setViewFunctionName] = useState('');
	const newParameterData = useRef([]);
	const [meanChange, setMeanChange] = useState('');
	const functionId = useRef();
	const loadedData = useRef();
	const updateSaved = useRef(false);
	const functionChanged = useRef(false);
	const counter = useRef(0);
	const [showSpinner, setShowSpinner] = useState(false);
	const [approveReject, setApproveReject] = useState('');
	const [ad, setAd] = useState(false);
	const [publishResponse, setPublishResponse] = useState({});
	const [paramRadioValue, setParamRadioValue] = useState('');
	const [primarySelect, setPrimarySelect] = useState(false);
	const [viewSummaryTable, setViewSummaryTable] = useState([]);
	const [viewSummaryTableData, setViewSummaryTableData] = useState([]);
	const [paramTableData, setParamTableData] = useState([]);
	const [viewJson, setViewJson] = useState(viewdatajson);
	const [showLanding, setShowLanding] = useState(false);

	useEffect(() => {
		setParamTableData(selectedTableData);
	}, [selectedTableData]);

	const getNewData = el => {
		getData.current = el;
	};

	//for not emptying state on rendering this component
	tableData.current = viewSummaryTable;
	viewStatusData.current = viewStatus;
	viewVersionData.current = viewVersion;

	const [form] = Form.useForm();

	const updateData = () => {
		if (!functionChanged.current) {
			let data = [...viewSummaryTable];
			let currentData = { ...getData.current };
			data[count - 2] = currentData;
			data[count - 2].param = text.current
				? text.current
				: data[count - 2].param;
			data[count - 2].id = data[count - 2].id;
			setViewSummaryTable(data);
		} else {
			let data = [...viewSummaryTable];
			let currentData = { ...getData.current };
			data[count - 2] = currentData;
			data[count - 2].param = text.current
				? text.current
				: data[count - 2].param;
			data[count - 2].id = data[count - 2].id;
			data[count - 2].aggregation = meanChange;
			data.forEach(ele => {
				if (ele.id === functionId.current) {
					ele.parameters = newParameterData.current;
					ele.functionType = mathFunction;
				}
			});

			setViewSummaryTable(data);
		}
		message.success('Function Updated Successfully');
		functionChanged.current = false;
		text.current = '';
	};

	const saveFunctionData = () => {
		let currentData = { ...getData.current };
		currentData.param = text.current ? text.current : currentData.param;
		currentData.id = count;
		currentData.aggregation = meanChange;
		currentData.parameters = newParameterData.current;
		setViewSummaryTable([...viewSummaryTable, currentData]);

		setCount(count + 1);
		message.success('Function Added Successfully');
	};

	//Get view table data for load popup
	const getViewsList = () => {
		let req = {};
		getViews(req).then(res => {
			setViewList(res['Data']);
		});
	};

	const onOkHandler = async viewId => {
		setShowSpinner(true);
		setVisible(false);
		setViewSummaryTable([]);
		setFilesListTree([]);
		setFunctionEditorViewState(false);
		setCount(1);
		counter.current = 0;
		let files = [];
		let status = {};
		let req = { view_disp_id: viewId ? viewId : viewDisplayId };
		getViewConfig(req)
			.then(res => {
				setMoleculeId(res.material_id);
				setViewStatus(res.view_status);
				setViewVersion(res.view_version);
				setViewFunctionName(res.view_name);
				if (res.view_status === 0) {
					status = 'DRFT';
				}
				if (res.view_status === 1) {
					status = 'AWAP';
				}
				if (res.view_status === 2) {
					status = 'APRD';
				}
				form.setFieldsValue({
					viewName: res.view_name,
					version: res.view_version,
					status: status,
					viewId: viewId ? viewId : viewDisplayId,
				});
				updateSaved.current = true;
				setVisible(false);
				setIsLoad(true);
				setViewSummaryTable([]);
				loadedData.current = res;
				const getFile = req => {
					const resp = adHocFilesParameterTree(req);
					files.push(resp);
					setFilesListTree([...files]);
				};
				let tempArr = [];
				Object.values(loadedData.current.functions).forEach(values => {
					tempArr.push(values);
				});
				tempArr.forEach(ele => {
					ele.definition = ele.definition.replace('{', '').replace('}', '');
				});
				Object.entries(loadedData.current.parameters).forEach(
					([key, value], index) => {
						tempArr.forEach(element => {
							if (String(element.definition) === String(key)) {
								element.paramsOld = value;
							}
						});
					}
				);
				let tempSummaryArr = [];
				tempArr.forEach(values => {
					if (values.paramsOld.length <= 1) {
						values.paramsOld.forEach(element => {
							materialsList.forEach(ele => {
								if (String(ele.mat_no) === String(element.material_id)) {
									ele.parameters.forEach(item => {
										if (String(item.param) === String(values.name)) {
											let rowData = {};
											let batchData = {};
											let newBatchData = {};
											parentBatches.map((el, index) => {
												if (item.coverage_list.includes(el)) {
													batchData[el] = true;
													newBatchData[el] = true;
												} else {
													batchData[el] = false;
													newBatchData[el] = false;
												}
											});
											counter.current = counter.current + 1;
											batchData['id'] = counter.current;
											rowData = Object.assign(item, batchData);
											rowData.parameters = [item];
											tempSummaryArr.push(rowData);
											setNewBatchData(newBatchData);
											setFunctionEditorViewState(true);
										}
									});
								}
							});
						});
					} else {
						let data = [];
						let obj = {};
						values.paramsOld.forEach(ele => {
							materialsList.forEach(element => {
								if (String(element.mat_no) === String(ele.material_id)) {
									element.parameters.forEach(item => {
										if (String(item.param) === String(ele.parameter_name)) {
											data.push(item);
										}
									});
								}
							});
						});
						if (values.functionType !== 'union') {
							data.forEach((item, i) => {
								if (i == 0) {
									obj = { ...item };
								} else {
									Object.entries(item).forEach(([key, value], index) => {
										if (key.includes('B')) {
											obj[key] = obj[key] && item[key];
											obj.param = item.param;
											obj.id = item.id;
										}
									});
								}
							});
							getNewData(obj);
						} else {
							data.forEach((item, i) => {
								if (i == 0) {
									obj = { ...item };
								} else {
									Object.entries(item).forEach(([key, value], index) => {
										if (key.includes('B')) {
											obj[key] = obj[key] || item[key];
											obj.param = item.param;
											obj.id = item.id;
										}
									});
								}
							});
							getNewData(obj);
						}
						counter.current = counter.current + 1;
						getData.current.id = counter.current;
						getData.current.param = values.name;
						tempSummaryArr.push(getData.current);
					}
				});
				if (Object.keys(loadedData.current.files).length) {
					Object.keys(loadedData.current.files).forEach(key => {
						let req = { file_id: key, detailedCoverage: true };
						adHocFilesParameterTree(req).then(res => {
							files.push(res);
							setFilesListTree([...files]);
							tempArr.forEach(values => {
								if (values.paramsOld.length <= 1) {
									values.paramsOld.forEach(element => {
										files.forEach(ele => {
											if (String(ele.File_id) === String(element.file_id)) {
												ele.Data.forEach(item => {
													let rowData = {};
													let batchData = {};
													let newBatchData = {};
													if (
														String(item.param) ===
														String(element.parameter_name)
													) {
														parentBatches.map((el, index) => {
															if (item.coverage_list.includes(el)) {
																batchData[el] = true;
																newBatchData[el] = true;
															} else {
																batchData[el] = false;
																newBatchData[el] = false;
															}
														});
														counter.current = counter.current + 1;
														batchData['id'] = counter.current;
														rowData = Object.assign(item, batchData);
														rowData.parameters = [item];
														tempSummaryArr.push(rowData);
													}
												});
											}
										});
									});
								} else {
									let data = [];
									let obj = {};
									values.paramsOld.forEach(ele => {
										files.forEach(element => {
											if (String(element.File_id) === String(ele.file_id)) {
												element.parameters.forEach(item => {
													if (
														String(item.param) === String(ele.parameter_name)
													) {
														data.push(item);
													}
												});
											}
										});
									});
									if (values.functionType !== 'union') {
										data.forEach((item, i) => {
											if (i == 0) {
												obj = { ...item };
											} else {
												Object.entries(item).forEach(([key, value], index) => {
													if (key.includes('B')) {
														obj[key] = obj[key] && item[key];
														obj.param = item.param;
														obj.id = item.id;
													}
												});
											}
										});
										getNewData(obj);
									} else {
										data.forEach((item, i) => {
											if (i == 0) {
												obj = { ...item };
											} else {
												Object.entries(item).forEach(([key, value], index) => {
													if (key.includes('B')) {
														obj[key] = obj[key] || item[key];
														obj.param = item.param;
														obj.id = item.id;
													}
												});
											}
										});
										getNewData(obj);
									}
									counter.current = counter.current + 1;
									getData.current.id = counter.current;
									getData.current.param = values.name;
									tempSummaryArr.push(getData.current);
								}
							});
							setCount(counter.current + 1);
							setViewSummaryTable([...tempSummaryArr]);
							setFunctionEditorViewState(true);
							setShowSpinner(false);
							setNewBatchData(newBatchData);
						});
					});
				} else {
					setCount(counter.current + 1);
					setViewSummaryTable([...tempSummaryArr]);
					setFunctionEditorViewState(true);
					setNewBatchData(newBatchData);
					setShowSpinner(false);
				}
			})
			.catch(err => {
				message.error(err.Message);
				// setVisible(true);
				setShowSpinner(false);
				setIsLoad(false);
			});
		setFilterdData(null);
		form.setFieldsValue({
			filters: null,
		});
	};
	useEffect(() => {
		if (saveMathFun === true) {
			updateData();
		} else if (saveAsMathFun === true) {
			saveFunctionData();
		}
	}, []);
	useEffect(() => {}, [paramRadioValue]);

	useEffect(() => {
		setViewSummaryTableData(viewTableData);
	});

	useEffect(() => {
		form.setFieldsValue({
			viewId: viewDisplayId,
			status: viewStatus,
			version: viewVersion,
		});
	}, [viewDisplayId, viewStatus, viewVersion]);

	const onMoleculeIdChanged = () => {
		let reqMaterial = { moleculeId: moleculeId, detailedCoverage: true };
		materialsParameterTree(reqMaterial).then(res => {
			{
				res.map((item, index) => {
					setDataLoadingState(false);
					setParentBatches(item.batches);
					setMaterialsList(item.children);
					setDataLoadingState(true);
				});
			}

			if (res.Status === 401) {
				message.error(res.Message);
			}
			if (res.Status === 400) {
				message.error(res.Message);
			}
			if (res.Status === 404) {
				message.error(res.Message);
			}
		});
	};

	const onApprove = item => {
		localStorage.setItem('status', item);
		//setApproveReject(item);
		window.open(`${loginUrl}?is_ui=true&ui_type=sign`, '_self');
		dispatch(sendUrl(window.location.href));
		localStorage.setItem('redirectUrl', window.location.href);
	};
	const handleSaveFunc = async () => {
		if (!viewFunctionName.length) {
			message.error('Please Enter Name');

			return false;
		}
		const converted = Object.assign(
			{},
			...filesListTree.map(object => ({
				[object.File_id]: {
					file_name: object.File_name,
					file_url: `/services/v1/adhoc-files/${object.File_id}`,
					upload_timestamp: object.timeStamp,
				},
			}))
		);
		const functionObj = Object.assign(
			{},
			...viewSummaryTable.map((object, index) => ({
				[object.id]: {
					name: object.param,
					functionType: object.functionType,
					definition: `{${index + 1}}`,
					aggregation: object.aggregation ? object.aggregation : 'Mean',
				},
			}))
		);
		const parameter = Object.assign(
			{},
			...viewSummaryTable.map((object, index) => ({
				[index + 1]: object.parameters.map((ele, index) => {
					return {
						parameter_name: ele.param,
						source_type: ele.sourceType,
						material_id: ele.mat_no,
						batch_lock: [],
						priority: 0,
					};
				}),
			}))
		);
		let status;
		if (viewStatus === 'DRFT') {
			status = 0;
		}
		if (viewStatus === 'AWAP') {
			status = 1;
		}
		if (viewStatus === 'APRD') {
			status = 2;
		}
		const obj = {
			view_name: viewFunctionName,
			material_id: moleculeList[0].product_num,
			material_name: moleculeList[0].product_desc,
			files: converted,
			functions: functionObj,
			parameters: parameter,
			view_description: 'Test View Object',
			view_version: viewVersion,
			view_disp_id: viewDisplayId,
			view_status: viewStatus,
		};
		const headers = {
			username: 'user_mareana1',
			password: 'mareana_pass1',
			view_version: viewVersion,
			view_disp_id: viewDisplayId,
		};
		setShowSpinner(true);
		try {
			const response = await updateFunction(
				obj,
				viewDisplayId,
				viewVersion,
				headers
			);
			if (response.statuscode === 200) {
				setViewDisplayId(response.view_disp_id);
				setViewStatus(response.view_status);
				setViewVersion(response.view_version);
				message.success('Updated Successfully');
				setShowSpinner(false);
			} else {
				message.error(response);
			}
		} catch (err) {
			message.error(err);
		}
	};
	const handleSaveAsFunc = async () => {
		if (!viewFunctionName.length) {
			message.error('Please Enter Name');

			return false;
		}
		const converted = Object.assign(
			{},
			...filesListTree.map(object => ({
				[object.File_id]: {
					file_name: object.File_name,
					file_url: `/services/v1/adhoc-files/${object.File_id}`,
					upload_timestamp: object.timeStamp,
				},
			}))
		);
		const functionObj = Object.assign(
			{},
			...viewSummaryTable.map((object, index) => ({
				[object.id]: {
					name: object.param,
					definition: `{${index + 1}}`,
					aggregation: object.aggregation ? object.aggregation : 'Mean',
					functionType: object.functionType,
				},
			}))
		);
		const parameter = Object.assign(
			{},
			...viewSummaryTable.map((object, index) => ({
				[index + 1]: object.parameters.map((ele, index) => {
					return {
						parameter_name: ele.param,
						source_type: ele.sourceType,
						material_id: ele.sourceType === 'material' ? ele.mat_no : undefined,
						file_id: ele.sourceType === 'file' ? ele.file_id : undefined,
						batch_lock: [],
						priority: 0,
					};
				}),
			}))
		);
		const obj = {
			view_name: viewFunctionName,
			material_id: moleculeList[0].product_num,
			material_name: moleculeList[0].product_desc,
			files: converted,
			functions: functionObj,
			parameters: parameter,
			view_description: 'Test View Object',
			view_status: 0,
			view_version: 1,
		};
		const headers = {
			username: 'user_mareana1',
			password: 'mareana_pass1',
		};
		setShowSpinner(true);
		try {
			const response = await saveFunction(obj, headers);
			if (response.statuscode === 200) {
				setViewDisplayId(response.view_disp_id);
				setViewStatus(response.view_status);
				setViewVersion(response.view_version);
				message.success('Saved Successfully');
				updateSaved.current = true;
				setShowSpinner(false);
			} else {
				message.error(response);
			}
		} catch (err) {
			message.error(err);
		}
	};

	const handleClose = () => {
		setIsPublish(false);
	};

	const PublishResponse = res => {
		setPublishResponse(res);
		setViewStatus(res.rep_stauts);
	};

	useEffect(() => {
		onMoleculeIdChanged();
	}, [moleculeId]);

	useEffect(() => {
		getViewsList();
		const params = queryString.parse(location.search);
		if (Object.keys(params).length > 0) {
			setParams(true);
			onOkHandler(params.id);
			if (Object.keys(params).includes('publish')) {
				setParams(true);
				setAd(true);
				onOkHandler(params.id);
				setIsPublish(true);
			}
		}
	}, [materialsList]);

	const handleSaveView = async () => {
		console.log('handle save function');
		const viewData = JSON.parse(JSON.stringify(viewJson));
		console.log('view Data', viewData);
		viewData.forEach(element => {
			(element.functions = viewState.functions),
				(element.parameters = viewState.parameters),
				(element.all_parameters = viewState.selectedParamData),
				(element.material_id = moleculeId);
		});
		const headers = {
			username: 'user_mareana1',
			password: 'mareana_pass1',
		};
		try {
			const response = await saveFunction(viewData, headers);
			if (response.statuscode === 200) {
				console.log('response', response);
				// setViewDisplayId(response.view_disp_id);
				// setViewStatus(response.view_status);
				// setViewVersion(response.view_version);
				message.success('Saved Successfully');
				// updateSaved.current = true;
			} else {
				message.error(response);
			}
		} catch (err) {
			message.error(err);
		}
	};

	return (
		<div className='reportDesigner-container viewCreation-container'>
			<BreadCrumbWrapper />
			<div className='breadcrumbs-btn'>
				{params ? (
					<div className='viewCreation-btns'>
						<Button
							className='viewCreation-rejectBtn'
							// onClick={() => {
							//   setIsPublish(true);
							//   setApproveReject('R');
							// }}
							onClick={() => {
								adenabled ? onApprove('R') : setIsPublish(true);
								setApproveReject('R');
							}}>
							Reject
						</Button>
						<Button
							className='viewCreation-publishBtn'
							// onClick={() => {
							//   setIsPublish(true);
							//   setApproveReject('A');
							// }}
							onClick={() => {
								adenabled ? onApprove('A') : setIsPublish(true);
								setApproveReject('A');
							}}>
							Approve
						</Button>
					</div>
				) : (
					materialsList.length > 0 && (
						<div className='viewCreation-btns'>
							<Button
								className='viewCreation-saveBtn'
								// disabled={!viewDisplayId}
								onClick={handleSaveView}>
								Save
							</Button>

							<Button
								className='viewCreation-publishBtn'
								onClick={() => {
									setIsPublish(true);
									setAd(true);
								}}>
								<CloudUploadOutlined />
								Publish
							</Button>
						</div>
					)
				)}
			</div>

			<div className='reportDesigner-gridBlocks viewCreation-grids'>
				<div className='reportDesigner-grid-tables viewCreation-blocks'>
					<div className='viewCreation-leftBlocks bg-white'>
						<div className='viewCreation-parameterLookup'>
							<h4 className='viewCreation-blockHeader'>Parameter Lookup</h4>

							<ParameterLookup
								moleculeList={moleculeList}
								setMoleculeList={setMoleculeList}
								moleculeId={moleculeId}
								setMoleculeId={setMoleculeId}
								materialsList={materialsList}
								setMaterialsList={setMaterialsList}
								filterdData={filterdData}
								setFilterdData={setFilterdData}
								dataLoadingState={dataLoadingState}
								setDataLoadingState={setDataLoadingState}
								parentBatches={parentBatches}
								setParentBatches={setParentBatches}
								viewSummaryTable={viewSummaryTable}
								setViewSummaryTable={setViewSummaryTable}
								form={form}
								params={params}
							/>
						</div>
						<div className='viewCreation-materials'>
							<Collapse
								className='viewCreation-accordian '
								defaultActiveKey={['1']}
								expandIconPosition='right'>
								{moleculeId && (
									<>
										<Panel
											className='viewCreation-materialsPanel'
											header='Process hierarchy'
											key='1'>
											<MaterialTree
												materialsList={materialsList}
												parentBatches={parentBatches}
											/>
										</Panel>
										<Panel
											className='viewCreation-accordian viewCreation-filesPanel'
											header='Files'
											key='2'>
											<FileUpload
												viewSummaryTable={viewSummaryTable}
												setViewSummaryTable={setViewSummaryTable}
												parentBatches={parentBatches}
												setParentBatches={setParentBatches}
												newBatchData={newBatchData}
												setNewBatchData={setNewBatchData}
												functionEditorViewState={functionEditorViewState}
												setFunctionEditorViewState={setFunctionEditorViewState}
												filesListTree={filesListTree}
												setFilesListTree={setFilesListTree}
												count={count}
												setCount={setCount}
												getNewData={el => getNewData(el)}
											/>
										</Panel>
									</>
								)}
							</Collapse>
						</div>
					</div>

					{paramTableData.length > 0 && (
						<div className='viewCreation-rightBlocks'>
							<MathEditor
								paramTableData={paramTableData}
								primarySelected={primarySelect}
								newBatchData={newBatchData}
								parentBatches={parentBatches}
								viewJson={viewJson}
								setViewJson={setViewJson}
							/>
							<ViewSummaryData viewJson={viewJson} setViewJson={setViewJson} />
						</div>
					)}
				</div>
			</div>

			{/* <Signature
				isPublish={isPublish}
				handleClose={handleClose}
				screenName='View Creation'
				PublishResponse={PublishResponse}
				appType='VIEW'
				dispId={viewDisplayId}
				version={viewVersion}
				status={approveReject}
				ad={ad}
			/> */}
		</div>
	);
};

export default ViewCreation;
