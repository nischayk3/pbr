/**
 * @author Mihir Bagga <mihir.bagga@mareana.com>
 * @Mareana - CPV Product
 * @version 2
 * @Last Modified - 28 April, 2023
 * @Last Changed By - @Mihir
 */

import React, { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "./viewPage.scss";
//antd-imports
import { CloudUploadOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Button, DatePicker, Dropdown, Menu, Tabs, Tooltip } from "antd";
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
import { getPipeline, getResults, putPipelineObj } from "../../../../../services/analyticsService";
import { putJob } from "../../../../../services/jobScheduleService";
import Model from "./model/Model";
import ModelData from "./ModelData";
import ModelExcecute from './ModelExcecute';
import Preprocess from "./preproccessing/Preprocess";
// import Transformation from "./transformations";
import Results from "./results/Results";


const ViewPageAnalysis = () => {
	const [isPublish, setIsPublish] = useState(false);
	const [publishResponse, setPublishResponse] = useState({});
	const [approveReject, setApproveReject] = useState("");
	const [encoderData, setEncoderData] = useState({ encoderDropDownData: [], encoderValueData: [], encoderId: '', encoderValue: '', savedValue: '', selectedObjs: [] })
	const [modelData, setModelData] = useState();
	const [tableKey, setTableKey] = useState("1");
	const [exectStart, setExectStart] = useState(false);
	const [exectLater, setExectLater] = useState(false);
	const [executed, setEXecuted] = useState(false);
	const [exectLaterDate, setExectLaterDate] = useState("");
	const [finalModelJson, setFinalModelJson] = useState({});
	const [outlierMapping, setOutlierMapping] = useState({});
	const [catMapping, setCatMapping] = useState({});
	const [editFinalJson, setEditFinalModelJson] = useState();
	const [resultsData, setResultsData] = useState([]);
	const [metricList, setMetricList] = useState([]);
	const [executedModel, setExecutedModal] = useState(false);
	// const [results, setResults] = useState(false);
	const [resultStatus, setResultStatus] = useState('')
	const [message, setMessage] = useState('')

	const modelType = useRef('');
	const jobId = useRef('')

	const tabChange = (key) => {
		setTableKey(key);
		if (key == 5) {
			getResultFunc()
		}
	};
	const { id } = useParams();
	const dispatch = useDispatch();
	const location = useLocation();
	const parameters = queryString.parse(location.search);

	const selectedViewData = useSelector((state) => state.analyticsReducer);
	const esignPublishRes = useSelector((state) => state.commonReducer.publishRes);

	useEffect(() => {
		if (esignPublishRes?.status_code === 200) {
			setPublishResponse(esignPublishRes);
		}
	}, [esignPublishRes]);

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
		const tempObj = JSON.parse(JSON.stringify(finalModelJson));
		if (tempObj.feature_union_mapping) {
			Object.entries(tempObj.feature_union_mapping).forEach(([key, value]) => {
				if (value.type === "Encoder") {
					delete tempObj.feature_union_mapping[key]
				}
			});
			let tempEncoder = Object.assign({}, encoderData.selectedObjs)
			let tempIds = {
				0: '5',
				1: '6',
				2: '7',
			};
			Object.keys(tempIds).forEach(function (ele) {
				tempEncoder[tempIds[ele]] = tempEncoder[ele];
				delete tempEncoder[ele];
			})
			tempObj.feature_union_mapping = Object.assign(tempObj.feature_union_mapping, tempEncoder)

		}
		tempObj['outlier_mapping'] = outlierMapping ? outlierMapping : {}
		tempObj['categorical_mapping'] = catMapping ? catMapping : {}
		const req = {
			...selectedViewData.viewData,
			data: [{ ...tempObj }],
			savetype: save,
			pipeline_disp_id: selectedViewData.viewData.pipeline_id,
			outlier_mapping: outlierMapping ? outlierMapping : {},
			categorical_mapping: catMapping ? catMapping : {}
		};

		dispatch(showLoader());
		const apiResponse = await putPipelineObj(req);
		if (apiResponse?.status === 200) {
			dispatch(hideLoader());
			setExectStart(true);
			dispatch(showNotification("success", "Model saved successfully"));
		} else {
			/* istanbul ignore next */
			dispatch(hideLoader());
			/* istanbul ignore next */
			setExectStart(false);
			/* istanbul ignore next */
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
			app_type: "AUTO_ML",
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
		if (apiResponse?.Status === 200) {
			dispatch(hideLoader());
			setEXecuted(true);
			jobId.current = apiResponse?.job_id
			setExecutedModal(true)
			dispatch(showNotification("success", "Model execution started successfully"));
		} else {
			/* istanbul ignore next */
			dispatch(hideLoader());
			/* istanbul ignore next */
			dispatch(showNotification("error", "Model execution failed"));
		}
	};

	// const onSchedule = () => {
	// 	const date = moment(exectLaterDate).format("YYYY-MM-DD");
	// 	onExecuteClick(date);
	// 	setExectLater(false);
	// };

	const getPipelineList = async () => {
		let req = {
			pipelineId: id
		};
		dispatch(showLoader());
		const data = await getPipeline(req)
		if (data?.status === 200) {
			const viewDetails = {
				pipeline_name: data?.data?.pipeline_name,
				savetype: "saveas",
				view_id: data?.data?.view_disp_id,
				view_version: data?.data?.view_version,
				data_filter: data?.data?.input_data?.data_filter,
				batch_filter: data?.data?.input_data?.batch_filter,
				pipeline_id: data?.data?.pipeline_disp_id,
				view_status: data?.data?.view_status,
				view_name: data?.data?.view_name
			};
			dispatch(getAnalyticsViewData(viewDetails));
			if (data?.data?.pipeline_data[0]?.variable_mapping?.length) {
				setExectStart(true);
			}
			setEditFinalModelJson(data.data)
			setFinalModelJson(data?.data?.pipeline_data[0])
			dispatch(hideLoader());
		} else {
			/* istanbul ignore next */
			dispatch(hideLoader());
		}
	}

	const checkStatus = (bool) => {
		let flag = false;
		if (bool === 'Pending') {
			flag = false
		} else if (bool === 'Not Executed') {
			flag = true
		} else {
			flag = true
		}

		return flag
	}
	const resultDataCleanUp = (json, stats) => {
		if (stats == "Successful") {
			const array_not_to_be_include = ['res_message', 'run_status', 'Evaluation'];
			const algorithms_list = Object.keys(json);
			const results_list = algorithms_list
				.filter((i) => !array_not_to_be_include.includes(i))
				.map((i) => {
					const { score, charts } = json[i];
					return {
						score,
						charts: charts ? charts.map((c) => Object.values(c)) : [],
						name: i,
					};
				});
			return results_list;
		}
		else {
			return []
		}
	};
	const getResultFunc = async () => {
		const reqBody = {
			pipelineid: id,
		};
		const apiResponse = await getResults(reqBody);
		if (apiResponse?.status === 200) {
			dispatch(hideLoader());
			if (checkStatus(apiResponse.data.run_status)) {
				if (apiResponse.data.run_status !== 'Pending' && apiResponse.data.run_status !== 'Not Executed') {
					setExecutedModal(false);
				}
				setResultStatus(apiResponse.data.run_status)
				setMessage(apiResponse.data.res_message)
			}

			setResultsData(resultDataCleanUp(apiResponse.data, apiResponse.data.run_status));
			if (apiResponse?.data?.Evaluation) {
				const { Evaluation } = apiResponse.data
				setMetricList(Evaluation)

			}
		} else {
			/* istanbul ignore next */
			dispatch(hideLoader());
			/* istanbul ignore next */
			showNotification("error", "Unable to get results");
		}
	};

	useEffect(() => {
		if (id) {
			getPipelineList();
			getResultFunc()
		}
	}, []);

	const handleClose = () => {
		setIsPublish(false);
	};

	const PublishResponse = (res) => {
		setPublishResponse(res);
	};

	const ViewDetails = () => {
		return (
			<div>
				<p>View ID: {selectedViewData?.viewData?.view_id || '-'}</p>
				<p>View Name: {selectedViewData?.viewData?.view_name || '-'}</p>
				<p>View Version: {selectedViewData?.viewData?.view_version || '-'}</p>
				<p>View Status: {selectedViewData?.viewData?.view_status || '-'}</p>
			</div>
		)
	}

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
							<Tooltip placement="bottom" title={ViewDetails}>
								<Button>View details <InfoCircleOutlined /></Button>
							</Tooltip>
							<Button disabled>Share</Button>
							<Button onClick={() => onSaveClick("save")}>Save</Button>
							<Button id="save-as" disabled onClick={() => onSaveClick('saveAs')}>Save As</Button>
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
							encoderData={encoderData}
							setEncoderData={setEncoderData}
							setNodeMapping={setOutlierMapping}
							catMapping={setCatMapping}
						/>
					</TabPane>
					{/* {exectStart && <TabPane tab="Transformation" key="4">
						<Transformation finalModelJson={finalModelJson} editFinalJson={editFinalJson} tableKey={tableKey} />
					</TabPane>} */}
					{resultStatus !== 'Pending' && resultStatus !== 'Not Executed' && <TabPane tab="Results" key="5">
						<Results jobId={jobId} tablekey={tableKey} modelType={modelType} resultsData={resultsData} metricList={metricList} resultStatus={resultStatus} setResultsData={setResultsData} message={message} />
					</TabPane>}
				</Tabs>
			</div>
			<Signature
				isPublish={isPublish}
				handleClose={handleClose}
				screenName="Analytics"
				PublishResponse={PublishResponse}
				appType="AUTO_ML"
				dispId={selectedViewData.viewData.pipeline_id}
				version='1'
				status={approveReject}
			/>
			{executedModel && <ModalComponent isModalVisible={executedModel} closable={false} centered>
				<ModelExcecute jobId={jobId} getResultFunc={getResultFunc} resultsData={resultsData} resultStatus={resultStatus} />
			</ModalComponent>}
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
					<Button className="custom-primary-btn">
						Schedule
					</Button>
				</div>
			</ModalComponent>
		</div>
	);
};

export default ViewPageAnalysis;
