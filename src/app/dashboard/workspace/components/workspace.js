import {
	ArrowRightOutlined, LayoutOutlined
} from "@ant-design/icons";
import {
	Avatar, Col, Divider,
	Empty, Row, Tabs
} from "antd";
import React, { lazy, useEffect, useState } from "react";
import { FaCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import emptyImage from "../../../../assets/images/empty-image.png";
import illustrations from "../../../../assets/images/workspace_banner.png";
import BreadCrumbWrapper from "../../../../components/BreadCrumbWrapper";
import ScreenHeader from "../../../../components/ScreenHeader/screenHeader";
import StatusBlock from "../../../../components/StatusBlock/statusBlock";
import { MDH_AIRFLOW } from "../../../../constants/apiBaseUrl";
import {
	showNotification
} from "../../../../duck/actions/commonActions";
import { getJob } from "../../../../services/jobScheduleService";
import { getCountData } from "../../../../services/workFlowServices";
import {
	getChartExceptionData,
	getUpdatedChartsViewsData
} from "../../../../services/workSpaceServices";

const Chart = lazy(() => import("./chartComponent/chartComponent"));
const DataQuality = lazy(() => import("./dataQuality/dataQuality"));
const DeviationTable = lazy(() => import("./deviationTable/deviationTable"));

import "./styles.scss";

const { TabPane } = Tabs;

const Workspace = () => {
	const [tilesData, setTilesData] = useState([]);
	const [userApproval, setUserApproval] = useState([]);
	const [chartIdException, setChartIdException] = useState([]);
	const [lastupdatedCharts, setLastUpdatedCharts] = useState([]);
	const [lastupdatedViews, setLastUpdatedViews] = useState([]);
	const [scheduleChartAlerts, setScheduleChartAlerts] = useState([]);
	const [scheduleReportAlerts, setScheduleReportAlerts] = useState([]);
	const [pbrCount, setPbrCount] = useState(0);
	const [activeTab, setActiveTab] = useState("");
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		getTilesData();
		getChartId();
		lastUpdatedChartsViews();
		getScheduleChartAlertsData();
		getScheduleReportAlertsData();
	}, []);

	//workflow approval card function
	const getTilesData = async () => {
		let req = {};
		try {
			const tilesResponse = await getCountData(req);
			if (tilesResponse["status-code"] == 200) {
				let filterPbrCount = tilesResponse["Data"].filter(
					(el) => el.application_type === "PBR"
				);
				setTilesData(tilesResponse["Data"]);
				setUserApproval(tilesResponse["counts"]);
				setPbrCount(filterPbrCount[0] && filterPbrCount[0].item_count);
			} else if (tilesResponse?.Status === 403) {
				/* istanbul ignore next */
				dispatch(showNotification("error", ""));
			}
		} catch (error) {
			dispatch(showNotification("error", error.message));
		}
	};

	//job scheduling chart alert counts
	const getScheduleChartAlertsData = async () => {
		let login_response = JSON.parse(localStorage.getItem("login_details"));
		let req = {
			app_type: "CHART",
		};
		let headers = {
			"content-type": "application/json",
			"x-access-token": login_response.token ? login_response.token : "",
			"resource-name": "WORKITEMS",
		};
		try {
			const alertResponse = await getJob(req, headers);
			setScheduleChartAlerts(alertResponse.Data);
			if (alertResponse?.Status === 403) {
				/* istanbul ignore next */
				dispatch(showNotification("error", ""));
			}
		} catch (error) {
			dispatch(showNotification("error", error.message));
		}
	};

	//job scheduling chart alert counts
	const getScheduleReportAlertsData = async () => {
		let login_response = JSON.parse(localStorage.getItem("login_details"));
		let req = {
			app_type: "REPORT_DESIGNER",
		};
		let headers = {
			"content-type": "application/json",
			"x-access-token": login_response.token ? login_response.token : "",
			"resource-name": "WORKITEMS",
		};
		try {
			const alertResponse = await getJob(req, headers);
			setScheduleReportAlerts(alertResponse.Data);
		} catch (error) {
			dispatch(showNotification("error", error.message));
		}
	};

	//top 5 charts with exception function
	const getChartId = async () => {
		let req = { limit: 5 };
		try {
			const chartIdResponse = await getChartExceptionData(req);
			if (chartIdResponse['status-code'] === 200) {
				setChartIdException(chartIdResponse.Data);
				setActiveTab(
					chartIdResponse?.Data[0]?.chart_disp_id +
					"_" +
					chartIdResponse?.Data[0]?.chart_version
				);
			} else if (chartIdResponse?.Status === 403) {
				/* istanbul ignore next */
				dispatch(showNotification("error", ""));
			} else {
				console.log("error",);
			}

		} catch (error) {
			console.log("inside2", error);
		}
	};

	//last updated views and chart function
	const lastUpdatedChartsViews = async () => {
		let req = { limit: 5 };
		try {
			const chartResponse = await getUpdatedChartsViewsData(req);
			setLastUpdatedCharts(chartResponse.last_created_or_changed_charts);
			setLastUpdatedViews(chartResponse.last_created_or_changed_views);
			if (chartResponse?.Status === 403) {
				/* istanbul ignore next */
				dispatch(showNotification("error", ""));
			}
		} catch (error) {
			dispatch(showNotification("error", error.Message));
		}
	};

	//changing of tabs
	const changeTab = (activeKey) => {
		setActiveTab(activeKey);
	};

	const greet = [
		'',
		'Good Morning',
		'Good Afternoon',
		'Good Evening'
	][parseInt(new Date().getHours() / 24 * 4)];

	return (
		<div className="custom-wrapper">
			<BreadCrumbWrapper />
			<div className="custom-content-layout">
				<ScreenHeader
					bannerbg={{
						background: "linear-gradient(180deg, #e7e6ff 0%, #fff4f4 100%)",
					}}
					title={`Howdy ${localStorage.getItem("username")}! ${greet}`}
					description="Let's see what you have on your plate today!"
					source={illustrations}
					sourceClass="workspace-illustration"
				/>
				<div className="workspace-wrapper">
					<div className="workspace-main-block">
						<div className="workspace-innerColumn">
							<div className="workspace-card1">
								<div className="innercard">
									<LayoutOutlined
										style={{ color: "#0CE7CC", fontSize: "15px" }}
									/>
									<span className="deviation-text"> Workflow Approvals</span>
									<span style={{ float: "right" }}>
										<ArrowRightOutlined
											style={{ color: "#0CE7CC", fontSize: "15px" }}
										/>
										<a
											className="workspace-review"
											onClick={() => history.push("/dashboard/workflow")}
										>
											Review
										</a>
									</span>

									<Row gutter={4}>
										{tilesData && tilesData.length > 0 ? (
											tilesData
												?.filter((el) => el.item_count > 0)
												.map((item, index) => {
													return (
														<Col className="gutter-row" span={4}>
															{item.item_count > 0 && (
																<div style={{ marginTop: "15px" }} key={index}>
																	<p className="approval-text">
																		{item.text.split(" ")[0]}
																	</p>
																	<p className="approval-count">
																		{item.item_count}
																	</p>
																</div>
															)}
														</Col>
													);
												})
										) : (
											<div style={{ display: "flex", padding: "0px 10px" }}>
												<div>
													<img src={emptyImage} />
												</div>
												<p className="no-approval">Nothing to approve!</p>
											</div>
										)}
									</Row>
								</div>
								<div className="avatar-block">
									<p>
										{`${userApproval && userApproval?.length
											} People awaiting your approval!`}{" "}
									</p>
									<Avatar.Group
										maxCount={4}
										maxStyle={{
											color: "#0CE7CC",
											backgroundColor: "#fde3cf",
										}}
									>
										{userApproval &&
											userApproval.length > 0 &&
											userApproval.map((e, j) => {
												return (
													<Avatar
														style={{
															backgroundColor: "#0CE7CC",
														}}
													>
														{e?.created_by?.split("")[0]?.toUpperCase()}
													</Avatar>
												);
											})}
									</Avatar.Group>
								</div>
							</div>
							<div className="workspace-card2">
								<div className="innercard">
									<LayoutOutlined
										style={{ color: "#0CE7CC", fontSize: "15px" }}
									/>
									<span className="deviation-text">Paper Batch Records</span>
									<span style={{ float: "right" }}>
										<ArrowRightOutlined
											style={{ color: "#0CE7CC", fontSize: "15px" }}
										/>
										<a
											onClick={() => history.push("/dashboard/workflow")}
											className="workspace-review"
										>
											View All
										</a>
									</span>
									<div className="paper-batch-card">
										<p className="paper-batch-count">{pbrCount}</p>
										<p className="paper-batch-desc">
											New paper batch records are awaiting your approval!
										</p>
									</div>
								</div>
							</div>
						</div>
						<div className="workspace-chart">
							<div className="innercard">
								<LayoutOutlined
									style={{ color: "#0CE7CC", fontSize: "15px" }}
								/>
								<span className="deviation-text">Process Control Charts</span>
								<div>
									<Tabs
										className="workspace-tabs"
										activeKey={activeTab}
										onChange={changeTab}
									>
										{chartIdException &&
											chartIdException.map((el, i) => {
												return (
													<TabPane
														tab={el.chart_disp_id}
														key={`${el.chart_disp_id}_${el.chart_version}`}
													>
														<Chart
															chartId={el.chart_disp_id}
															chartVersion={el.chart_version}
															activeTab={activeTab}
															current_tab={`${el.chart_disp_id}_${el.chart_version}`}
														/>
													</TabPane>
												);
											})}
										{/* <TabPane tab='Chart ID 1009' key='1'>
                      <p>content 1</p>
                    </TabPane> */}
									</Tabs>
								</div>
							</div>
						</div>
						<div className="workspace-innerColumn">
							<div className="workspace-card2">
								<div className="innercard">
									<LayoutOutlined
										style={{ color: "#0CE7CC", fontSize: "15px" }}
									/>
									<span className="deviation-text">Report Alerts</span>
									<span style={{ float: "right" }}>
										<ArrowRightOutlined
											style={{ color: "#0CE7CC", fontSize: "15px" }}
										/>
										<a
											href={MDH_AIRFLOW}
											target="_blank"
											className="workspace-review"
										>
											View All
										</a>
									</span>
									<div
										className="paper-batch-card"
										style={{ marginTop: "50px" }}
									>
										<p
											className="paper-batch-count"
											style={{ marginBottom: "7px" }}
										>
											{scheduleReportAlerts && scheduleReportAlerts.length > 0
												? scheduleReportAlerts.length
												: 0}
										</p>
										<p className="paper-batch-desc">
											of your report alerts configured
										</p>
									</div>
								</div>
							</div>
							<div className="workspace-card2">
								<div className="innercard">
									<LayoutOutlined
										style={{ color: "#0CE7CC", fontSize: "15px" }}
									/>
									<span className="deviation-text">
										Process Control Chart Alerts
									</span>
									<span style={{ float: "right" }}>
										<ArrowRightOutlined
											style={{ color: "#0CE7CC", fontSize: "15px" }}
										/>
										<a
											href={MDH_AIRFLOW}
											target="_blank"
											className="workspace-review"
										>
											View All
										</a>
									</span>
									<div
										className="paper-batch-card"
										style={{ marginTop: "50px" }}
									>
										<p
											className="paper-batch-count"
											style={{ marginBottom: "7px" }}
										>
											{scheduleChartAlerts && scheduleChartAlerts.length > 0
												? scheduleChartAlerts.length
												: 0}
										</p>
										<p className="paper-batch-desc">
											charts configured with alerts
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="workspace-outerColumn">
						<div className="workspace-table1">
							<div className="innercard">
								<LayoutOutlined
									style={{ color: "#0CE7CC", fontSize: "15px" }}
								/>
								<span className="deviation-text"> Recent Deviations</span>
								<DeviationTable />
							</div>
						</div>
						<div className="workspace-table2">
							<div className="innercard">
								<LayoutOutlined
									style={{ color: "#0CE7CC", fontSize: "15px" }}
								/>
								<span className="deviation-text"> Data Quality</span>
								<DataQuality />
							</div>
						</div>
					</div>
				</div>
				<div className="workspace-recent">
					<div className="recentcard">
						<LayoutOutlined style={{ color: "#0CE7CC", fontSize: "15px" }} />
						<span className="deviation-text">Recently Approved Creations</span>
						<div className="workspace-legend">
							<span>
								<FaCircle style={{ color: "#363636" }} /> Draft
							</span>
							<span style={{ margin: "0px 15px" }}>
								<FaCircle style={{ color: "#F7BB61" }} /> Awaiting Approval
							</span>
							<span>
								<FaCircle style={{ color: "#A4F588" }} /> Approved
							</span>
						</div>
						<Row>
							<Col span={11}>
								<div className="workspace-processChart-main">
									<p className="workspace-processCharts">
										Process Control Charts
									</p>

									{lastupdatedCharts && lastupdatedCharts.length > 0 ? (
										<div className="tile">
											{lastupdatedCharts.map((i, index) => {
												return (
													<Link
														key={i.chart_disp_id}
														to={{
															pathname: `/dashboard/chart_personalization/${i.chart_disp_id}?id=${i.chart_disp_id}&version=${i.chart_version}&fromScreen=Workspace`,
														}}

													>
														<StatusBlock
															key={index}
															id={i.chart_disp_id}
															name={i.chart_name}
															status={i.chart_status}
														/>
													</Link>
												)
											})}
										</div>
									) : (
										<Empty
											className="empty-workspace"
											description={<span>Nothing to see here</span>}
										/>
									)}
								</div>
							</Col>
							<Col span={1}>
								<Divider
									type="vertical"
									style={{ height: "100%", border: "-0.9px solid #CACACA" }}
								/>
							</Col>
							<Col span={11}>
								<div className="workspace-processView-main">
									<p className="workspace-processView">Views</p>

									{lastupdatedViews && lastupdatedViews.length > 0 ? (
										<div className="tile">
											{lastupdatedViews.map((i, index) => {
												return (
													<Link
														key={i.view_disp_id}
														to={{
															pathname: `/dashboard/view_creation/${i.view_disp_id}&${i.view_version}?id=${i.view_disp_id}&version=${i.view_version}&fromScreen=Workspace`,
														}}
													>
														<StatusBlock
															key={index}
															id={i.view_disp_id}
															name={i.view_name}
															status={i.view_status}
														/>
													</Link>
												)
											})}
										</div>
									) : (
										<Empty
											className="empty-workspace"
											description={<span>Nothing to see here</span>}
										/>
									)}

								</div>
							</Col>
						</Row>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Workspace;
