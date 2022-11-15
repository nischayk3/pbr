import React, { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router";
import "./viewPage.scss";
//antd-imports
import { CloudUploadOutlined } from "@ant-design/icons";
import { Button, DatePicker, Dropdown, Menu, Tabs } from "antd";
const { TabPane } = Tabs;
//componenets
import moment from "moment";
import queryString from "query-string";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumbWrapper from "../../../../../components/BreadCrumbWrapper";
import Signature from "../../../../../components/ElectronicSignature/signature";
import ModalComponent from "../../../../../components/Modal/Modal";
import { getAnalyticsViewData } from "../../../../../duck/actions/analyticsView";
import {
	hideLoader, showLoader, showNotification
} from "../../../../../duck/actions/commonActions";
import { getPipeline, putPipelineObj } from "../../../../../services/analyticsService";
import { putJob } from "../../../../../services/jobScheduleService";
import Model from "./model/Model";
import ModelData from "./ModelData";
import Preprocess from "./preproccessing/Preprocess";
import Results from "./results/Results";
import Transformation from "./transformations";

const ViewPageAnalysis = () => {
	const [isPublish, setIsPublish] = useState(false);
	const [publishResponse, setPublishResponse] = useState({});
	const [approveReject, setApproveReject] = useState("");
	const [modelData, setModelData] = useState();
	const [tableKey, setTableKey] = useState("1");
	const [exectStart, setExectStart] = useState(false);
	const [exectLater, setExectLater] = useState(false);
	const [executed, setEXecuted] = useState(false);
	const [exectLaterDate, setExectLaterDate] = useState("");
	const [finalModelJson, setFinalModelJson] = useState({});
	const [editFinalJson, setEditFinalModelJson] = useState();
	const modelType = useRef('');

	const tabChange = (key) => {
		setTableKey(key);
	};
	const { id } = useParams();
	const dispatch = useDispatch();
	const location = useLocation();
	const parameters = queryString.parse(location.search);

	const selectedViewData = useSelector((state) => state.analyticsReducer);
	const menu = (
		<Menu
			items={[
				{
					label: "Now",
					key: "0",
					onClick: () => {
						const date = moment().format("YYYY-MM-DD");
						onExecuteClick(date);
						setExectLaterDate("");
					},
				},
				{
					label: "Later",
					key: "1",
					onClick: () => {
						setExectLater(true);
						setExectLaterDate("");
						// const date = moment().format("YYYY-MM-DD");
						// onExecuteClick(date);
					},
				},
			]}
		/>
	);
	const onSaveClick = async (save) => {
		const req = {
			...selectedViewData.viewData,
			data: [{ ...finalModelJson }],
			savetype: save,
			pipeline_disp_id: selectedViewData.viewData.pipeline_id,
		};
		dispatch(showLoader());
		const apiResponse = await putPipelineObj(req);
		if (apiResponse.statuscode === 200) {
			dispatch(hideLoader());
			setExectStart(true);
			dispatch(showNotification("success", "Model saved successfully"));
		} else {
			dispatch(hideLoader());
			setExectStart(false);
			dispatch(showNotification("error", "Model saving failed"));
		}
	};

	const onExecuteClick = async (date) => {
		const login_response = JSON.parse(localStorage.getItem("login_details"));
		const request_headers = {
			"content-type": "application/json",
			"x-access-token": login_response.token ? login_response.token : "",
			"resource-name": "ANALYTICS",
		};
		const reqBody = {
			app_data: "ANALYTICS",
			dag_id: " ",
			created_by: localStorage.getItem("username")
				? localStorage.getItem("username")
				: "",
			app_type: "ANALYTICS",
			app_id: selectedViewData.viewData.pipeline_id,
			email_config: {},
			frequency: "Once",
			frequency_unit: "Once",
			job_status: "scheduled",
			job_type: "event",
			notify_emails: [],
			scheduled_start: date,
			scheduled_end: date,
		};
		dispatch(showLoader());
		const apiResponse = await putJob(reqBody, request_headers);
		if (apiResponse.Status === 200) {
			dispatch(hideLoader());
			setEXecuted(true);
			dispatch(showNotification("success", "Model executed successfully"));
		} else {
			dispatch(hideLoader());
			dispatch(showNotification("error", "Model execution failed"));
		}
	};

	const onSchedule = () => {
		const date = moment(exectLaterDate).format("YYYY-MM-DD");
		onExecuteClick(date);
		setExectLater(false);
	};

	const getPipelineList = async () => {
		let req = {
			pipelineId: id
		};
		dispatch(showLoader());
		const data = await getPipeline(req)
		if (data.Status === 200) {
			const viewDetails = {
				pipeline_name: data?.data?.pipeline_name,
				savetype: "saveas",
				view_id: data?.data?.view_disp_id,
				view_version: data?.data?.view_version,
				data_filter: data?.data?.input_data?.data_filter,
				batch_filter: data?.data?.input_data?.batch_filter,
				pipeline_id: data?.data?.pipeline_disp_id
			};
			dispatch(getAnalyticsViewData(viewDetails));
			if (data?.data?.pipeline_data[0]?.variable_mapping?.length) {
				setExectStart(true);
			}
			setEditFinalModelJson(data.data)
			dispatch(hideLoader());
		} else {
			dispatch(hideLoader());
		}
	}

	const getResultsTabName = () => {
		let result = "Results";
		if (Object.keys(finalModelJson)?.length >= 1) {
			if (finalModelJson?.estimator?.e__0.estimator_type === "cross_decomposition") {
				result = "Cross Decomposition"
			} else if (finalModelJson?.estimator?.e__0.estimator_type === "decomposition") {
				result = "Decomposition"
			}
		} else {
			if (editFinalJson?.pipeline_data[0]?.estimator?.e__0.estimator_type === "cross_decomposition") {
				result = "Cross Decomposition"
			} else if (editFinalJson?.pipeline_data[0]?.estimator?.e__0.estimator_type === "decomposition") {
				result = "Decomposition"
			}
		}

		return result;
	}

	useEffect(() => {
		if (id) {
			getPipelineList();
		}
	}, []);

	const handleClose = () => {
		setIsPublish(false);
	};

	const PublishResponse = (res) => {
		setPublishResponse(res);
	};




	return (
		<div className="custom-wrapper bread-wrapper view-analysis-container">
			<div className="sub-header">
				<BreadCrumbWrapper
					urlName={`/dashboard/analysis/${selectedViewData.viewData.pipeline_id}`}
					value={selectedViewData.viewData.pipeline_id}
					data={selectedViewData.viewData.pipeline_id}
				/>

				<div className="btns">
					{Object.keys(parameters) &&
						Object.keys(parameters).length > 0 &&
						parameters.fromScreen !== "Workspace" ? (
						<>
							<Button
								onClick={() => {
									setIsPublish(true);
									setApproveReject("R");
								}}
							>
								Reject
							</Button>
							<Button
								onClick={() => {
									setIsPublish(true);
									setApproveReject("A");
								}}
							>
								Approve
							</Button>
						</>

					) : (
						<div>
							<Button>Share</Button>
							<Button onClick={() => onSaveClick("save")}>Save</Button>
							<Button onClick={() => onSaveClick('saveAs')}>Save As</Button>
							{/* <Button onClick={() => setExectStart(true)}>Execute</Button> */}
							<Dropdown overlay={menu} trigger={["click"]} disabled={!exectStart && !editFinalJson?.pipeline_data[0]?.variable_mapping?.length}>
								<Button>Execute</Button>
							</Dropdown>
							<Button
								onClick={() => {
									setIsPublish(true);
									setApproveReject("P");
								}}
								disabled={selectedViewData.viewData.pipeline_status === 'AWAP' || selectedViewData.viewData.pipeline_status === 'APRD'}
							>
								<CloudUploadOutlined />
								Publish
							</Button>
						</div>
					)}
				</div>

			</div>
			<div className="custom-content-layout menu-tabs-color">
				<Tabs
					defaultActiveKey="1"
					activeKey={tableKey}
					onChange={tabChange}
				>
					<TabPane tab="Preprocess" key="1">
						<Preprocess setModelData={setModelData} setTableKey={setTableKey} editFinalJson={editFinalJson} />
					</TabPane>
					<TabPane tab="Model data" key="2">
						<ModelData modelData={modelData} setModelData={setModelData} editFinalJson={editFinalJson} />
					</TabPane>
					<TabPane tab="Model" key="3">
						<Model
							finalModelJson={finalModelJson}
							setFinalModelJson={setFinalModelJson}
							editFinalJson={editFinalJson}
							tableKey={tableKey}
							modelType={modelType}
						/>
					</TabPane>
					{exectStart && <TabPane tab="Transformation" key="4">
						<Transformation finalModelJson={finalModelJson} editFinalJson={editFinalJson} tableKey={tableKey} />
					</TabPane>}
					{((executed && !exectLater) || (editFinalJson?.pipeline_data[0]?.variable_mapping?.length)) && (
						<TabPane tab={getResultsTabName()} key="5">
							<Results tablekey={tableKey} modelType={modelType} />
						</TabPane>
					)}
				</Tabs>
			</div>
			<Signature
				isPublish={isPublish}
				handleClose={handleClose}
				screenName="Analysis"
				PublishResponse={PublishResponse}
				appType="ANALYSIS"
				dispId={selectedViewData.viewData.pipeline_id}
				// version={postChartData.data && postChartData.data[0].chart_version}
				status={approveReject}
			/>
			{/* <ModalComponent isModalVisible={exectStart} closable={false} centered>
        <ModelExcecute />
      </ModalComponent> */}
			<ModalComponent
				title="Schedule Execution"
				isModalVisible={exectLater}
				closable={true}
				centered
				handleCancel={() => setExectLater(false)}
				width={400}
			>
				<label>Select Date</label>
				<DatePicker
					style={{ width: "100%", marginTop: "6px" }}
					value={exectLaterDate}
					onChange={(dateString) => setExectLaterDate(dateString)}
				/>
				<div
					style={{
						display: "flex",
						marginTop: "20px",
						columnGap: "10px",
						justifyContent: "flex-end",
					}}
				>
					<Button className="custom-primary-btn" onClick={onSchedule}>
						Schedule
					</Button>
				</div>
			</ModalComponent>
		</div>
	);
};

export default ViewPageAnalysis;
