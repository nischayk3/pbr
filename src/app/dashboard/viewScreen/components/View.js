/**
 * @author Dinesh
 * @Mareana - CPV Product
 * @version  1
 * @Last Modified - 4 April, 2022
 * @Last Changed By - Dinesh
 */

import React, { useEffect, useRef, useState } from "react";
import { useLocation, useParams, useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { CloudUploadOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Button, Collapse, Modal } from "antd";
import "./styles.scss";
import queryString from "query-string";
import {
	getViewConfig,
	getMoleculeList,
	saveFunction,
} from "../../../../services/viewCreationPublishing";
import BreadCrumbWrapper from "../../../../components/BreadCrumbWrapper";
import InputField from "../../../../components/InputField/InputField";
import {
	hideLoader,
	showLoader,
	showNotification,
} from "../../../../duck/actions/commonActions";
import {
	isLoadView,
	sendSelectedParamData,
	sendTotalMolBatches,
	setViewResposne,
	viewFunctionMap,
	viewParamMap,
} from "../../../../duck/actions/viewAction";
import Signature from "../../../../components/ElectronicSignature/signature";
import MaterialTree from "./materialTree";
import { MemoizedMathEditor } from "./mathEditor";
import { MemoizedViewSummaryData } from "./viewSummary/index";
import viewdatajson from "./view.json";
import FileUpload from "./fileUpload/FileUpload";
import ParamLookup from "./parameterLookup/ParamLookup";

const { Panel } = Collapse;

const ViewCreation = () => {
	const location = useLocation();
	const history = useHistory();

	const selectedTableData = useSelector(
		(state) => state.viewCreationReducer.selectedParamData
	);

	const viewState = useSelector((state) => state.viewCreationReducer);
	const dispatch = useDispatch();
	const [count, setCount] = useState(1);
	const [moleculeList, setMoleculeList] = useState({});
	const [isPublish, setIsPublish] = useState(false);
	const [moleculeId, setMoleculeId] = useState();
	const [functionEditorViewState, setFunctionEditorViewState] = useState(false);
	const [highlightFilterValue, setHighlightFilterValue] = useState("");
	const [viewSummaryBatch, setViewSummaryBatch] = useState([]);
	const [newBatchData, setNewBatchData] = useState([]);
	const [viewDisplayId, setViewDisplayId] = useState("");
	const [viewStatus, setViewStatus] = useState('');
	const [viewVersion, setViewVersion] = useState('');
	const [filesListTree, setFilesListTree] = useState([]);
	const [viewSummaryTable, setViewSummaryTable] = useState([]);
	const [paramTableData, setParamTableData] = useState([]);
	const [viewJson, setViewJson] = useState(viewdatajson);
	const [isSaveVisible, setIsSaveVisible] = useState(false);
	const [viewName, setViewName] = useState("");
	const [selectedFiles, setSelectedFiles] = useState({});
	const [approveReject, setApproveReject] = useState("");
	const [isEditView, setIsEditView] = useState(false);
	const [fromWorkflowScreen, setFromWorkflowScreen] = useState(false);
	//const [filterParam, setFilterParam] = useState("");
	const [loadBatches, setLoadBatches] = useState([]);

	const { id } = useParams();

	const parameters = queryString.parse(location.search);

	useEffect(() => {
		if (Object.keys(parameters) &&
			Object.keys(parameters).length > 0 &&
			parameters.fromScreen !== "Workspace") {
			setFromWorkflowScreen(true)
		}

	}, [parameters])

	useEffect(() => {
		setParamTableData(selectedTableData);
	}, [selectedTableData]);

	useEffect(() => {
		if (Number(id) !== 0) {
			const tempId = id.slice(0, id.indexOf("&"));
			const version = id.slice(id.indexOf("&") + 1);
			let _reqLoad = {
				view_disp_id: tempId,
				view_version: version,
			};
			setViewDisplayId(tempId);
			setViewVersion(version);
			dispatch(isLoadView(true));
			loadView(_reqLoad);

		} else {
			setViewDisplayId(parameters.id);
			setViewVersion(parameters.version);
		}
	}, []);

	//Moleculelist api call
	const loadMolecule = async (_reqMolecule) => {
		try {
			dispatch(showLoader());
			const moleculeRes = await getMoleculeList(_reqMolecule);
			if (moleculeRes.Status === 200) {

				setMoleculeList(prevMol => ({ ...prevMol, ...moleculeRes.Data }));
				if (moleculeRes.Data.mol_batches && moleculeRes.Data.mol_batches.length > 0) {
					setLoadBatches(moleculeRes.Data.mol_batches)
					setViewSummaryBatch(moleculeRes.Data.mol_batches);
					dispatch(sendTotalMolBatches(moleculeRes.Data.mol_batches))
				}
				dispatch(hideLoader());
				/* istanbul ignore next */
			} else if (moleculeRes.Status === 401 && moleculeRes.Status === 400) {

				dispatch(hideLoader());
				dispatch(showNotification("error", "No Data Found"));
				/* istanbul ignore next */
			} else {

				dispatch(hideLoader());
				dispatch(showNotification("error", moleculeRes.Message));
			}
			/* istanbul ignore next */
		} catch (error) {

			dispatch(hideLoader());
			dispatch(showNotification("error", error));
		}
	};

	//Moleculelist api call
	const filterLoadMolecule = async (_reqMolecule, filterSplitValue) => {
		try {
			dispatch(showLoader());
			const moleculeRes = await getMoleculeList(_reqMolecule);
			if (moleculeRes.Status === 200) {
				setMoleculeList(prevMol => ({ ...prevMol, ...moleculeRes.Data }));
				const _filterReq2 = {
					data: {
						hierarchy: moleculeRes.Data.hierarchy,
					},
					parameters: {
						molecule_name: filterSplitValue[3],
						process_step_int_id: parseInt(filterSplitValue[0]),
						product_num: filterSplitValue[1],
					},
				}
				filterLoadMolecule1(_filterReq2)
				if (moleculeRes.Data && moleculeRes.Data.mol_batches && moleculeRes.Data.mol_batches.length > 0) {
					setViewSummaryBatch(moleculeRes.Data.mol_batches);
				}
				dispatch(hideLoader());
			}
			/* istanbul ignore next */
		} catch (error) {

			dispatch(hideLoader());
			dispatch(showNotification("error", error));
		}
	};

	const filterLoadMolecule1 = async (_reqMolecule) => {
		try {
			dispatch(showLoader());
			const moleculeRes1 = await getMoleculeList(_reqMolecule);
			if (moleculeRes1.Status === 200) {
				setMoleculeList(prevMol => ({ ...prevMol, ...moleculeRes1.Data }));
				if (moleculeRes1.Data && moleculeRes1.Data.mol_batches && moleculeRes1.Data.mol_batches.length > 0) {
					setViewSummaryBatch(moleculeRes1.Data.mol_batches);
				}
				dispatch(hideLoader());
			}
		} catch (error) {
			dispatch(hideLoader());
			dispatch(showNotification("error", error));
		}
	};

	//selected molecule
	const getMoleculeId = (mol) => {
		const _reqMol = {
			data: {},
			parameters: { molecule_name: mol },
		};
		setMoleculeId(mol);
		loadMolecule(_reqMol);
	};

	//tree node click
	const hierarchyProcessClick = (treeinfo) => {

		if (treeinfo && treeinfo.process_step) {
			const _reqMol = {
				data: {
					hierarchy: moleculeList.hierarchy,
				},
				parameters: {
					molecule_name: treeinfo.ds_name,
					process_step_int_id: treeinfo.process_step_int_id,
				},
			};
			loadMolecule(_reqMol);
		}
		if (treeinfo && treeinfo.product_num) {
			const _reqMol = {
				data: {
					hierarchy: moleculeList.hierarchy,
				},
				parameters: {
					molecule_name: treeinfo.ds_name,
					process_step_int_id: parseInt(treeinfo.process_step_int_id),
					product_num: treeinfo.product_num,
				},
			};
			loadMolecule(_reqMol);
		}
	};

	const filterMolequles = async (filterValue) => {
		const filterSplit = filterValue && filterValue.split('_')
		setHighlightFilterValue(filterSplit[2])
		// setFilterParam(filterSplit)
		const _filterReq1 = {
			data: {
				hierarchy: moleculeList.hierarchy,
			},
			parameters: {
				molecule_name: filterSplit[3],
				process_step_int_id: parseInt(filterSplit[0]),
			},
		}
		await filterLoadMolecule(_filterReq1, filterSplit)
	}

	const handleSaveVisible = () => {
		setIsSaveVisible(true);
	};

	const handleCancel = () => {
		setIsSaveVisible(false);
	};
	/* istanbul ignore next */
	const handleSaveView = () => {
		const viewData = JSON.parse(JSON.stringify(viewJson));
		viewData.forEach((element) => {
			element.functions = viewState.functions;
			element.parameters = viewState.parameters;
			element.all_parameters = viewState.selectedParamData;
			element.material_id = moleculeId;
			element.files = selectedFiles;
		});

		const _req = {
			data: viewData[0],
		};
		/* istanbul ignore next */
		viewCreate(_req);
	};
	/* istanbul ignore next */
	const handleSaveAsView = () => {
		const viewData = JSON.parse(JSON.stringify(viewJson));
		viewData.forEach((element) => {
			element.functions = viewState.functions;
			element.parameters = viewState.parameters;
			element.all_parameters = viewState.selectedParamData;
			element.material_id = moleculeId;
			element.files = selectedFiles;
			element.view_disp_id = viewDisplayId;
			element.view_status = viewStatus;
			element.view_version = viewVersion;
		});

		const _req = {
			data: viewData[0],
		};
		/* istanbul ignore next */
		viewCreate(_req);
	};

	const viewCreate = async (_reqView) => {
		/* istanbul ignore next */
		try {
			const response = await saveFunction(_reqView);
			if (response.statuscode === 200) {
				setIsSaveVisible(false);
				setViewDisplayId(response.view_disp_id);
				setViewStatus(response.view_status);
				setViewVersion(response.view_version);
				dispatch(
					showNotification(
						"success",
						`View Id: ${response.view_disp_id} have been successfully saved`
					)
				);

				history.push({
					pathname: `/dashboard/view_creation/${response.view_disp_id}&1`,
				})
			} else if (response.data.statuscode === 400) {
				dispatch(showNotification("error", response.data.message));
			}
		} catch (err) {
			dispatch(showNotification("error", err));
		}
	};

	const onChangeViewName = (e, value) => {
		const newArr = [...viewJson];
		newArr.forEach((element) => {
			element.view_name = e.target.value;
		});
		setViewJson(newArr);
		setViewName(e.target.value);
	};

	const loadView = async (_reqLoad) => {
		try {
			dispatch(showLoader());
			const loadViewRes = await getViewConfig(_reqLoad);
			setViewJson([loadViewRes]);
			dispatch(setViewResposne(loadViewRes));

			if (loadViewRes.material_id !== "") {
				setMoleculeId(loadViewRes.material_id)
				setIsEditView(true)
				const reqMol = {
					data: {},
					parameters: { molecule_name: loadViewRes.material_id },
				};
				loadMolecule(reqMol);
			}

			if (loadViewRes.view_status) {
				setViewStatus(loadViewRes.view_status);
			}
			if (loadViewRes.functions) {
				dispatch(viewFunctionMap(loadViewRes.functions));
			}
			if (loadViewRes.parameters) {
				dispatch(viewParamMap(loadViewRes.parameters));
			}
			if (loadViewRes.files) {
				setSelectedFiles(loadViewRes.files);
			}
			if (loadViewRes.view_name) {
				setViewName(loadViewRes.view_name);
			}
			dispatch(sendSelectedParamData(loadViewRes["all_parameters"]));
			dispatch(hideLoader());
		} catch (err) {
			dispatch(hideLoader());
			dispatch(showNotification("error", err));
		}
	};

	const handleClose = () => {
		setIsPublish(false);
	};

	const PublishResponse = (res) => {
		setViewStatus(res.rep_stauts);
	};


	return (
		<div className=" viewCreation-container">
			<BreadCrumbWrapper
				urlName={`/dashboard/view_creation/${viewDisplayId}&1`}
				value={viewDisplayId}
				data="Untitled" />

			<div className="breadcrumbs-btn">
				{Object.keys(parameters) &&
					Object.keys(parameters).length > 0 &&
					parameters.fromScreen !== "Workspace" ? (
					<div className="viewCreation-btns">
						<Button
							className="viewCreation-rejectBtn"
							onClick={() => {
								setIsPublish(true);
								setApproveReject("R");
							}}
						>
							Reject
						</Button>
						<Button
							className="viewCreation-publishBtn"
							onClick={() => {
								setIsPublish(true);
								setApproveReject("A");
							}}
						>
							Approve
						</Button>
					</div>
				) : (
					<div className="viewCreation-btns">
						<Button
							className="viewCreation-saveBtn"
							onClick={handleSaveVisible}
							id="save-view"
						>
							Save
						</Button>

						<Button
							className="view-publish-btn"
							disabled={viewStatus === 'AWAP' || viewStatus === 'APRD'}
							onClick={() => {
								setIsPublish(true);
								setApproveReject("P");
							}}
						>
							<CloudUploadOutlined />
							Publish
						</Button>
					</div>
				)}
			</div>

			<div className="viewCreation-grids">
				<div className=" viewCreation-blocks">
					<div className="viewCreation-leftBlocks bg-white">
						<div className="viewCreation-parameterLookup">
							<h4 className="viewCreation-blockHeader">Parameter Lookup</h4>
							<ParamLookup
								callbackMoleculeId={getMoleculeId}
								callbackFilter={filterMolequles}
								moleculeId={moleculeId}
								setMoleculeId={setMoleculeId}
								isEditView={isEditView}
								fromWorkflowScreen={fromWorkflowScreen} />
						</div>
						<div className="viewCreation-materials">
							<Collapse
								className="viewCreation-accordian "
								defaultActiveKey={["1", "2"]}
							//expandIconPosition="right"
							>
								{moleculeId && (
									<>
										<Panel
											className="viewCreation-materialsPanel"
											header="Process hierarchy"
											key="1"
										>
											<MaterialTree
												fromWorkflowScreen={fromWorkflowScreen}
												moleculeList={moleculeList}
												callbackProcessClick={hierarchyProcessClick}
												highlightFilterValue={highlightFilterValue}
											/>

										</Panel>
										<Panel
											className="viewCreation-accordian viewCreation-filesPanel"
											header="Files"
											key="2"
										>
											<FileUpload
												fromWorkflowScreen={fromWorkflowScreen}
												viewSummaryTable={viewSummaryTable}
												setViewSummaryTable={setViewSummaryTable}
												newBatchData={newBatchData}
												setNewBatchData={setNewBatchData}
												functionEditorViewState={functionEditorViewState}
												setFunctionEditorViewState={setFunctionEditorViewState}
												selectedFiles={selectedFiles}
												setSelectedFiles={setSelectedFiles}
												filesListTree={filesListTree}
												setFilesListTree={setFilesListTree}
												count={count}
												setCount={setCount}
												setViewSummaryBatch={setViewSummaryBatch}
												viewJson={viewJson}
											/>
										</Panel>
									</>
								)}
							</Collapse>
						</div>
					</div>

					{loadBatches && loadBatches.length > 0 && (
						<div className="viewCreation-rightBlocks">
							{paramTableData && paramTableData.length > 0 && (
								<>
									<MemoizedMathEditor
										fromWorkflowScreen={fromWorkflowScreen}
										viewSummaryBatch={viewSummaryBatch}
										setViewSummaryBatch={setViewSummaryBatch}
										viewJson={viewJson}
										setViewJson={setViewJson}
										materialId={moleculeId}
									/>
									<MemoizedViewSummaryData
										viewJson={viewJson}
										viewDisplayId={viewDisplayId}
										viewStatus={viewStatus}
										viewVersion={viewVersion}
										fromWorkflowScreen={fromWorkflowScreen}

									/>
								</>
							)}
						</div>
					)}
				</div>
			</div >

			<Signature
				isPublish={isPublish}
				handleClose={handleClose}
				screenName="View Creation"
				PublishResponse={PublishResponse}
				appType="VIEW"
				dispId={viewDisplayId}
				version={viewVersion}
				status={approveReject}
			/>
			<Modal
				width={400}
				visible={isSaveVisible}
				onCancel={handleCancel}
				footer={null}
			>
				<div className="function-modal">
					<p className="heading">
						<InfoCircleOutlined className="heading-icon" /> Save
					</p>
					<div className="function-input">
						<InputField
							id="view-name"
							label="Enter view name"
							placeholder="E.g. View 1"
							onChangeInput={(e) => onChangeViewName(e)}
							value={viewName}
						/>

						<div className="function-btn">
							<Button
								onClick={handleCancel}
								type="link"
								className="custom-secondary-btn-link "
								id="cancel-save"
							>
								Cancel
							</Button>
							<Button
								onClick={() => {
									handleSaveAsView();
								}}
								type="text"
								className="custom-primary-btn "
							>
								Save as a copy
							</Button>
							<Button
								onClick={() => {
									handleSaveView();
								}}
								type="text"
								className="custom-secondary-btn "
							>
								Save
							</Button>
						</div>
					</div>
				</div>
			</Modal>
		</div >
	);
};

export default ViewCreation;
