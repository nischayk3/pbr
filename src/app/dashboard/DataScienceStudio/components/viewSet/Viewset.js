import React, { useEffect, useRef, useState } from "react";
import "./styles.scss";
//antd imports
import { Button, Col, Input, Modal, Row } from "antd";
const { Search } = Input;
//svgs
import AnalysisNewPipeline from "../../../../../assets/images/AnalysisNewPipeline.svg";
//components
import SelectField from "../../../../../components/SelectField/SelectField";
//services
import { getViewList } from "../../../../../services/analyticsService";
import { loadDssView } from "../../../../../services/dataScienceStudioService";
import { getViewConfig } from "../../../../../services/viewCreationPublishing";
//redux
import { useDispatch } from "react-redux";
import {
	hideLoader,
	showLoader,
	showNotification
} from "../../../../../duck/actions/commonActions";
// import ViewSearchTable from "./viewTable/ViewTable";
import { useHistory, useRouteMatch } from "react-router-dom";
import { loadViewTableData, sendFileUploadRes, sendViewIdVer, sendViewsetRes } from "../../../../../duck/actions/dataScienceAction";
import ViewSearchTable from "../../../chartPersonal/components/viewPage/viewChart/viewSearchTable";
import ViewTable from "../../../chartPersonal/components/viewPage/viewChart/ViewTable";

const Viewset = ({ isVisible, onCancel }) => {
	const [searchTableData, setSearchTableData] = useState([]);
	const [showViewTable, setShowViewTable] = useState(false);
	const [versionList, setVersionList] = useState([0]);
	const deepSearch1 = useRef(false);
	const searchViewData = useRef([]);
	const [showBatchData, setShowBatchData] = useState(false);
	const [isDisable, setIsDisable] = useState(true);

	const [viewData, setViewData] = useState({
		viewName: "",
		viewDispId: " ",
		viewVersion: 0,
		searchValue: "",
		pipeLineName: "",
	});
	const [deepSearch, setDeepSearch] = useState(false);
	const [viewConfigRes, setViewConfigRes] = useState({})
	const dispatch = useDispatch();
	const match = useRouteMatch();
	const history = useHistory();

	const ref = useRef(null);


	//function for getting viewdata list
	const getViewTableData = async () => {
		let reqView = { vew_status: "APRD" };
		let antdDataTable = [];
		try {

			const viewRes = await getViewList(reqView);
			viewRes.Data.forEach((item, key) => {
				let antdObj = {};
				antdObj["key"] = key;
				antdObj["created_by"] = item.created_by;
				antdObj["created_on"] = item.created_on;
				antdObj["product_num"] = item.product_num;
				antdObj["view_disp_id"] = item.view_disp_id;
				antdObj["view_info"] = item.view_info;
				antdObj["view_name"] = item.view_name;
				antdObj["view_status"] = item.view_status;
				antdObj["view_version"] = item.view_version;
				antdObj["view"] = item.view;
				antdDataTable.push(antdObj);
			});
			searchViewData.current = JSON.parse(JSON.stringify(antdDataTable));
			setSearchTableData(antdDataTable);


		} catch (error) {
			/* istanbul ignore next */
			dispatch(hideLoader());
			dispatch(showNotification("error", error.message));
		}
	};

	//load view
	const loadView = async (_reqLoad) => {
		try {
			dispatch(sendViewIdVer(_reqLoad))
			dispatch(showLoader());
			const loadViewRes = await getViewConfig(_reqLoad);
			dispatch(hideLoader());
			if (loadViewRes !== {}) {
				setIsDisable(false)
				dispatch(sendViewsetRes(loadViewRes))
				dispatch(sendFileUploadRes({}))
				setViewConfigRes(loadViewRes)
			}
		} catch (err) {
			dispatch(hideLoader());
			dispatch(showNotification("error", err));
		}
	};

	//load dss view
	const dssViewLoad = async (_reqLoad) => {
		try {
			dispatch(showLoader());
			const loadDssRes = await loadDssView(_reqLoad);
			let param = []
			dispatch(hideLoader());
			if (loadDssRes.statuscode === 200) {
				loadDssRes.message.forEach((item, key) => {
					let obj = {}
					obj['parameter_name'] = item.parameter_name;
					obj['id'] = key
					param.push(obj)
				})
				dispatch(loadViewTableData(param))
				history.push({
					pathname: `${match.url}/target_variable`,
				});
			}
		} catch (err) {
			dispatch(hideLoader());
			dispatch(showNotification("error", err));
		}
	}

	//function to handle search
	const searchTable = () => {
		const filterData = searchViewData.current.filter((o) =>
			Object.keys(o).some((k) =>
				String(o[k]).toLowerCase().includes(viewData.searchValue.toLowerCase())
			)
		);
		setSearchTableData(filterData);
	};

	//on focus of input field showing table results.
	const onFocus = () => {
		setShowViewTable(true);
	};
	//on blur out of input field showing table results.
	const onBlurOut = () => {
		setShowViewTable(false);
	};

	//on search value changes
	const onSearchChange = (e) => {
		console.log("onSearchChange", e.target.value)
		if (e.target.value === "") {
			setSearchTableData(searchViewData.current);
			setViewData({
				...viewData,
				viewName: null,
				viewDispId: null,
				status: null,
				searchValue: e.target.value,
				viewVersion: null,
			});
		} else {
			setViewData({ ...viewData, searchValue: e.target.value });
		}
	};

	//function for closing view table result on click of outside.
	const closeTableView = (e) => {
		if (ref.current && !ref.current.contains(e.target)) {
			onBlurOut();
			setSearchTableData(searchViewData.current);
		}
	};

	const onNextClick = () => {
		let _reqDss = {
			//data: viewConfigRes
			data: viewConfigRes,
			df: {},
			parameter_name: '',
			type: 'parameter',
			unapproved: true,
			view_disp_id: viewData.viewDispId ? viewData.viewDispId : '',
			view_version: viewData.viewVersion ? `${viewData.viewVersion}` : '',
		}
		dssViewLoad(_reqDss);
		onCancel()
	};

	const onSelectedView = (record) => {
		let tempVersionList = [0];
		searchViewData.current.forEach((ele) => {
			if (ele.view_disp_id === record.view_disp_id) {
				tempVersionList.push(ele.view_version);
				tempVersionList = tempVersionList.sort((a, b) => a - b);
				setVersionList(tempVersionList);
			}
		});
		setViewData({
			...viewData,
			viewName: record.view_name,
			viewDispId: record.view_disp_id,
			status: record.view_status,
			searchValue: record.view_disp_id,
			viewVersion: record.view_version,
		});
		let _reqLoad = {
			view_disp_id: record.view_disp_id,
			view_version: record.view_version,
		};
		loadView(_reqLoad);


		setDeepSearch(false);
		deepSearch1.current = false;
	};

	useEffect(() => {
		getViewTableData();
		document.addEventListener("mousedown", closeTableView);
	}, []);

	const callbackReqPayload = (_req) => {
		console.log("_req", _req)
		loadView(_req);
	}

	return (
		<Modal
			title="Load dataset - Select view"
			centered
			visible={isVisible}
			onCancel={onCancel}
			footer={false}
			width={787}
		>
			{!showBatchData ? (
				<Row gutter={24} className="newPipelineContainer">
					<Col span={12} className="img-container">
						<img src={AnalysisNewPipeline} alt="Analysis new pipeline image" />
					</Col>
					<Col span={12}>
						<Row className="input-mb">
							<Col span={24} ref={ref} className="search-table">
								<p>View ID</p>
								<Search
									className="viewSearch"
									placeholder="Select a view ID"
									onFocus={onFocus}
									value={viewData.searchValue}
									onChange={onSearchChange}
									onSearch={searchTable}
								/>
								{showViewTable && (
									<ViewSearchTable
										searchTableData={searchTableData}
										setViewSearch={setShowViewTable}
										setDeepSearch={setDeepSearch}
										deepSearch={deepSearch1}
										viewData={viewData}
										setViewData={setViewData}
										searchViewData={searchViewData}
										setVersionList={setVersionList}
										callbackReq={callbackReqPayload}
									/>
								)}
							</Col>
						</Row>
						{!showViewTable && (
							<Row gutter={24} className="view-details">
								<Col span={12}>
									<Row>
										<Col span={7}>
											<label>View ID</label>
										</Col>
										<Col span={12} className="wordBreak">
											<label>: {viewData.viewName || "-"}</label>
										</Col>
									</Row>
								</Col>
								<Col span={12} className="col-pr">
									<Row>
										<Col span={8}>
											<label>Version</label>
										</Col>
										<Col span={12}>
											<SelectField
												selectList={versionList}
												selectedValue={viewData.viewVersion}
												onChangeSelect={(e) =>
													setViewData({ ...viewData, viewVersion: e })
												}
											/>
										</Col>
									</Row>
								</Col>
							</Row>
						)}
						<Row className="button-mt">
							<Button
								type='primary'
								className='custom-secondary-btn'
								onClick={onNextClick}
								disabled={isDisable}
								id="next-btn"
							>
								Next
							</Button>
							<Button
								className="custom-primary-btn"
								onClick={onCancel}

							>
								Back
							</Button>
						</Row>
					</Col>
				</Row>
			) : (

				<></>
			)}
			<Modal
				visible={deepSearch}
				onCancel={() => setDeepSearch(false)}
				width={700}
				closable={false}
				footer={false}
				title={
					<div className="header-title">
						<h4>Views</h4>
						<Input.Search
							placeholder="Search by..."
							onSearch={searchTable}
							value={viewData.searchValue}
							onChange={onSearchChange}
						/>
					</div>
				}
			>
				<ViewTable
					searchTableData={searchTableData}
					setDeepSearch={setDeepSearch}
					deepSearch1={deepSearch1}
					onSelectedView={onSelectedView}
				/>
			</Modal>
		</Modal>
	);
};

export default Viewset;
