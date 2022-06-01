/**
 * @author Dinesh
 * @Mareana - CPV Product
 * @version  1
 * @Last Modified - 4 April, 2022
 * @Last Changed By - Dinesh
 */

import React, { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { CloudUploadOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Button, Collapse, Form, Modal } from "antd";
import "./styles.scss";
import queryString from "query-string";
import {
	getViewConfig,
	saveFunction
} from "../../../../services/viewCreationPublishing";
import BreadCrumbWrapper from "../../../../components/BreadCrumbWrapper";
import { sendUrl } from "../../../../duck/actions/loginAction";
import { loginUrl } from "../../../../services/loginService";
import InputField from "../../../../components/InputField/InputField";
import {
	hideLoader,
	showLoader,
	showNotification
} from "../../../../duck/actions/commonActions";
import {
	isLoadView,
	sendSelectedParamData,
	setViewResposne,
	viewFunctionMap,
	viewParamMap
} from "../../../../duck/actions/viewAction";
import Signature from "../../../../components/ElectronicSignature/signature";
import MaterialTree from "./materialTree";
import { MemoizedMathEditor } from "./mathEditor";
import { MemoizedViewSummaryData } from "./viewSummary/index";
import viewdatajson from "./view.json";
import ParameterLookup from "./parameterLookup/ParameterLookup";
import FileUpload from "./fileUpload/FileUpload";

const { Panel } = Collapse;

const ViewCreation = (props) => {
	const location = useLocation();

	const selectedTableData = useSelector(
		(state) => state.viewCreationReducer.selectedParamData
	);
	const viewState = useSelector((state) => state.viewCreationReducer);
	const viewTableData = useSelector(
		(state) => state.viewCreationReducer.paramData
	);
	const dispatch = useDispatch();
	const [count, setCount] = useState(1);
	const [params, setParams] = useState(false);
	const [moleculeList, setMoleculeList] = useState([]);
	const [isPublish, setIsPublish] = useState(false);
	const [moleculeId, setMoleculeId] = useState();
	const [materialsList, setMaterialsList] = useState([]);
	const getData = useRef();
	const [filterdData, setFilterdData] = useState(null);
	const [dataLoadingState, setDataLoadingState] = useState(false);
	const [functionEditorViewState, setFunctionEditorViewState] = useState(false);
	const [parentBatches, setParentBatches] = useState([]);
	const [viewSummaryBatch, setViewSummaryBatch] = useState([]);
	const [newBatchData, setNewBatchData] = useState([]);
	const [viewDisplayId, setViewDisplayId] = useState("");
	const [viewStatus, setViewStatus] = useState();
	const [viewVersion, setViewVersion] = useState();
	const [filesListTree, setFilesListTree] = useState([]);
	const [viewSummaryTable, setViewSummaryTable] = useState([]);
	const [paramTableData, setParamTableData] = useState([]);
	const [viewJson, setViewJson] = useState(viewdatajson);
	const [isSaveVisible, setIsSaveVisible] = useState(false);
	const [viewName, setViewName] = useState("");
	const [selectedFiles, setSelectedFiles] = useState({});
	const [publishResponse, setPublishResponse] = useState({});
	const [approveReject, setApproveReject] = useState("");
	const { id } = useParams();

	const parameters = queryString.parse(location.search);

	useEffect(() => {
		setParamTableData(selectedTableData);
	}, [selectedTableData]);

	useEffect(() => {
		form.setFieldsValue({
			viewId: viewDisplayId,
			status: viewStatus,
			version: viewVersion
		});
	}, [viewDisplayId, viewStatus, viewVersion]);

	// useEffect(() => {
	// 	onMoleculeIdChanged();
	// }, [moleculeId]);

	useEffect(() => {

		if (Number(id) !== 0) {
			const tempId = id.slice(0, id.indexOf("&"));
			const version = id.slice(id.indexOf("&") + 1);
			let _reqLoad = {
				view_disp_id: tempId,
				view_version: version
			};
			setViewDisplayId(tempId);
			setViewVersion(version);
			loadView(_reqLoad);
		} else {
			setViewDisplayId(parameters.id);
			setViewVersion(parameters.version);
		}
	}, []);

	const getNewData = (el) => {
		getData.current = el;
	};

	const [form] = Form.useForm();

	const onApprove = (item) => {
		localStorage.setItem("status", item);
		//setApproveReject(item);
		window.open(`${loginUrl}?is_ui=true&ui_type=sign`, "_self");
		dispatch(sendUrl(window.location.href));
		localStorage.setItem("redirectUrl", window.location.href);
	};

	const handleSaveVisible = () => {
		setIsSaveVisible(true);
	};

	const handleCancel = () => {
		setIsSaveVisible(false);
	};

	const handleSaveView = () => {
		const viewData = JSON.parse(JSON.stringify(viewJson));
		viewData.forEach((element) => {
			(element.functions = viewState.functions),
				(element.parameters = viewState.parameters),
				(element.all_parameters = viewState.selectedParamData),
				(element.view_disp_id = viewDisplayId),
				(element.material_id = moleculeId);
			element.files = selectedFiles;
		});

		const _req = {
			data: viewData[0]
		};
		viewCreate(_req);
	};
	const handleSaveAsView = () => {
		const viewData = JSON.parse(JSON.stringify(viewJson));
		viewData.forEach((element) => {
			(element.functions = viewState.functions),
				(element.parameters = viewState.parameters),
				(element.all_parameters = viewState.selectedParamData),
				(element.material_id = moleculeId);
			element.files = selectedFiles;
			element.view_disp_id = viewDisplayId;
			element.view_status = viewStatus;
			element.view_version = viewVersion;
		});

		const _req = {
			data: viewData[0]
		};
		viewCreate(_req);
	};

	const viewCreate = async (_reqView) => {
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
			} else {
				dispatch(showNotification("error", response));
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
			dispatch(isLoadView(true));
			dispatch(setViewResposne(loadViewRes));

			if (loadViewRes.material_id) setMoleculeId(loadViewRes.material_id);
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
			Object.entries(loadViewRes).forEach(([key, value], index) => {
				// if (key === 'view_version') {
				// 	setViewVersion(value);
				// } else if (key === 'material_id') {
				// 	setMoleculeId(value);
				// } else if (key === 'view_status') {
				// 	setViewStatus(value);
				// } else if (key === 'view_name') {
				// 	setViewName(value);
				// }
			});
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
		setPublishResponse(res);
		setViewStatus(res.rep_stauts);
	};

	return (
		<div className=" viewCreation-container">
			<BreadCrumbWrapper />
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
						// onClick={() => {
						// 	adenabled ? onApprove('R') : setIsPublish(true);
						// 	setApproveReject('R');
						// }}
						>
							Reject
						</Button>
						<Button
							className="viewCreation-publishBtn"
							onClick={() => {
								setIsPublish(true);
								setApproveReject("A");
							}}
						// onClick={() => {
						// 	adenabled ? onApprove('A') : setIsPublish(true);
						// 	setApproveReject('A');
						// }}
						>
							Approve
						</Button>
					</div>
				) : (
					<div className="viewCreation-btns">
						<Button
							className="viewCreation-saveBtn"
							// disabled={!viewDisplayId}
							onClick={handleSaveVisible}
						>
							Share
						</Button>
						<Button
							className="viewCreation-saveBtn"
							// disabled={!viewDisplayId}
							onClick={handleSaveVisible}
						>
							Save
						</Button>

						<Button
							className="view-publish-btn"
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
								viewSummaryBatch={viewSummaryBatch}
								setViewSummaryBatch={setViewSummaryBatch}
								viewSummaryTable={viewSummaryTable}
								setViewSummaryTable={setViewSummaryTable}
								form={form}
								params={params}
							/>
						</div>
						<div className="viewCreation-materials">
							<Collapse
								className="viewCreation-accordian "
								defaultActiveKey={["1"]}
								expandIconPosition="right"
							>
								{moleculeId && (
									<>
										<Panel
											className="viewCreation-materialsPanel"
											header="Process hierarchy"
											key="1"
										>
											<MaterialTree
												materialsList={materialsList}
												parentBatches={parentBatches}
											/>
										</Panel>
										<Panel
											className="viewCreation-accordian viewCreation-filesPanel"
											header="Files"
											key="2"
										>
											<FileUpload
												viewSummaryTable={viewSummaryTable}
												setViewSummaryTable={setViewSummaryTable}
												parentBatches={parentBatches}
												setParentBatches={setParentBatches}
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
												getNewData={(el) => getNewData(el)}
											/>
										</Panel>
									</>
								)}
							</Collapse>
						</div>
					</div>

					{paramTableData && paramTableData.length > 0 && (
						<div className="viewCreation-rightBlocks">
							<MemoizedMathEditor
								paramTableData={paramTableData}
								//	primarySelected={primarySelect}
								newBatchData={newBatchData}
								parentBatches={parentBatches}
								viewSummaryBatch={viewSummaryBatch}
								setViewSummaryBatch={setViewSummaryBatch}
								viewJson={viewJson}
								setViewJson={setViewJson}
								materialId={moleculeId}
							/>
							<MemoizedViewSummaryData
								viewJson={viewJson}
								setViewJson={setViewJson}
								parentBatches={parentBatches}
								viewDisplayId={viewDisplayId}
								viewStatus={viewStatus}
								viewVersion={viewVersion}
							/>
						</div>
					)}
				</div>
			</div>

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
		</div>
	);
};

export default ViewCreation;
