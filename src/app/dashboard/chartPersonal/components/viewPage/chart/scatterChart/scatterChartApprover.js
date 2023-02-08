import React, { useEffect, useRef, useState } from "react";
import "./ScatterStyles.scss";
//antd imports
import { Col, Empty, Row, Tabs } from "antd";
//components
import ScatterPlot from "../../../../../../../components/ScatterPlot/ScatterPlot";
import DataTable from "../dataTables/DataTable";
import ExclusionTable from "../dataTables/ExclusionTable";
import ProcessCapabilityResult from "../dataTables/ProcessCapabilityResult";
import ViolationTable from "../dataTables/ViolationTable";

const { TabPane } = Tabs;

const ScatterChartApprover = ({ postChartData, setPostChartData }) => {
	const [axisValuesApprover, setAxisValuesApprover] = useState({
		xaxis: null,
		yaxis: null,
		chartType: null,
		zaxis: null,
		transform: null,
	});
	const [chartDataApprover, setChartDataApprover] = useState([]);
	const [layoutDataApprover, setLayoutDataApprover] = useState({});
	const [showChartApprover, setShowChartApprover] = useState(false);
	const [tableKey, setTableKey] = useState("3");
	const exclusionIdCounter = useRef(0);
	const [exclusionTable, setExclusionTable] = useState([]);
	const [zAxis, setZAxis] = useState(false);
	const [showPpk, setShowPpk] = useState(false);
	const [ppkData, setPpkData] = useState({});

	const tabChange = (key) => {
		setTableKey(key);
	};

	const setPostData = () => {
		const postChartClone = JSON.parse(JSON.stringify(postChartData));
		postChartClone &&
			postChartClone.data &&
			postChartClone.data.forEach((ele) => {
				let obj1;
				let table1 = [];
				let count = 0;
				ele.exclusions &&
					ele.exclusions.forEach((item) => {
						exclusionIdCounter.current = count + 1;
						const excValue = item.exclusion_value.batch;
						obj1 = {
							exclusion_id: item.exclusion_id,
							exclusion_value: excValue,
							exclusion_description: item.exclusion_description,
							user: item.user,
							timestamp: new Date(item.timestamp).toLocaleDateString(),
						};
						table1.push(obj1);
					});
				setExclusionTable(table1);
				if (
					(ele.data[0].x && ele.data[0].x.length >= 1) ||
					ele?.data[0]?.type === "pie"
				) {
					const chartApproverType = ele.chart_type === "scatter"
						? "Scatter Plot"
						: ele.chart_type.replaceAll(
							/\S*/g,
							(word) =>
								`${word.slice(0, 1).toUpperCase()}${word
									.slice(1)
									.toLowerCase()}`
						);
					let xValueApprover = "";
					let yValueApprover = "";
					let zValueApprover = "";
					let transformApprover = "";
					if (ele.chart_type !== "process control") {
						xValueApprover = ele.chart_mapping.x.function_name;
					} else {
						xValueApprover =
							ele.chart_mapping.x.function_name === "batch_num"
								? "Batch"
								: "Date";
					}
					yValueApprover = ele.chart_mapping.y.function_name
						? ele.chart_mapping.y.function_name
						: "";
					zValueApprover = ele.chart_mapping?.z?.function_name
						? ele.chart_mapping?.z?.function_name
						: "";
					transformApprover = ele.chart_mapping?.transform?.function_name
						? ele.chart_mapping?.transform?.function_name
						: "";

					if (zValueApprover) {
						setZAxis(true);
					} else {
						setZAxis(false);
					}

					if (ele.chart_type == "Process Capability" || ele.chart_type == "process capability") {
						if (ele.chart_mapping?.transform?.function_name !== "") {
							setShowPpk(true)
							setPpkData(ele.ppk_cpk_data)
							// ele.layout.width = 500;
							// ele.layout.height = 350;
						} else {
							setShowPpk(false)
						}
					}

					setAxisValuesApprover({
						...axisValuesApprover,
						chartType: chartApproverType,
						xaxis: xValueApprover,
						yaxis: yValueApprover,
						zaxis: zValueApprover,
						transform: transformApprover,
					});
					setShowChartApprover(true);
					setChartDataApprover(ele.data);
					setLayoutDataApprover(ele.layout);
				} else {
					setShowChartApprover(false);
					setChartDataApprover([]);
					setLayoutDataApprover({});
					setAxisValuesApprover({
						...axisValuesApprover,
						chartType: null,
						xaxis: null,
						yaxis: null,
						transform: null,
					});
				}
			});
	};

	useEffect(() => {
		setPostData();
	}, [postChartData]);

	return (
		<div className="chartLayout-container">
			<div className="chart_result">
				<div className="chart_content">
					<p className="chart_label">Chart Type </p>
					<p className="chart_label"> : {axisValuesApprover.chartType
						? axisValuesApprover.chartType
						: ""}</p>
				</div>

				{axisValuesApprover.chartType === 'Process Capability' || axisValuesApprover.chartType === 'process capability' ? (
					<></>
				) : (
					<div className="chart_content">
						<p className="chart_label">X-axis </p>
						<p className="chart_label"> : {axisValuesApprover.xaxis ? axisValuesApprover.xaxis : ""}</p>
					</div>
				)}

				<div className="chart_content">
					<p className="chart_label">{axisValuesApprover.chartType === 'Process Capability' || axisValuesApprover.chartType === 'process capability' ? 'Parameter ' : 'Y-axis '} </p>
					<p className="chart_label"> : {axisValuesApprover.yaxis ? axisValuesApprover.yaxis : ""}</p>
				</div>

				{axisValuesApprover.chartType === 'Process Capability' && (
					<div className="chart_content">
						<p className="chart_label">Transformation </p>
						<p className="chart_label"> : {axisValuesApprover.transform ? axisValuesApprover.transform : ""}</p>
					</div>)
				}

				{zAxis && (
					<div className="chart_content">
						<p className="chart_label">Z-axis </p>
						<p className="chart_label">&nbsp;&nbsp;&nbsp;:{" "}
							{axisValuesApprover.zaxis ? axisValuesApprover.zaxis : ""}</p>
					</div>
				)
				}
			</div>

			<div className="chart-table">
				<div className="chart-layout">
					<Row className="scatter-chart">
						{showChartApprover && (
							<ScatterPlot data={chartDataApprover} layout={layoutDataApprover} />
						)}


					</Row>{showPpk && (
						<div className="show-ppk">
							<span>Results :</span>
							<p>CP : {ppkData?.cp}</p>
							<p>CPK : {ppkData?.cpk}</p>
							<p>PP : {ppkData?.pp}</p>
							<p>PPK : {ppkData?.ppk}</p>
							<p>Lambda : {ppkData?.selected_lambda}</p>
						</div>
					)}
				</div>

				{showChartApprover && (
					<Row className="tabledata" id="chart">
						<Col id="col-chart" span={24}>
							<Tabs
								id="tabs"
								defaultActiveKey="3"
								activeKey={tableKey}
								onChange={tabChange}
							>
								<TabPane id="tab-exclusion" tab="Exclusion" key="1">
									{exclusionTable.length >= 1 ? (
										<ExclusionTable
											setExclusionTable={setExclusionTable}
											exclusionTable={exclusionTable}
											postChartData={postChartData}
											setPostChartData={setPostChartData}
											exclusionIdCounter={exclusionIdCounter}
										/>
									) : (
										<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
									)}
								</TabPane>
								<TabPane id="tab-violation" tab="Violation" key="2">
									<ViolationTable postChartData={postChartData} />
								</TabPane>
								<TabPane id="tab-datatable" tab="Data Table" key="3">
									<DataTable postChartData={postChartData} />
								</TabPane>
								{axisValuesApprover.chartType === 'Process Capability' && (
									<TabPane id="tab-process" tab="ProcessCapability" key="4">
										<ProcessCapabilityResult postChartData={postChartData} />
									</TabPane>
								)}
							</Tabs>
						</Col>
					</Row>
				)}
			</div>
		</div >
	);
};

export default ScatterChartApprover;
