import React, { useEffect, useRef, useState } from "react";
import "./ScatterStyles.scss";
//antd imports
import { Button, Col, Empty, Row, Tabs } from "antd";
//components
import Modal from "../../../../../../../components/Modal/Modal";
import ScatterPlot from "../../../../../../../components/ScatterPlot/ScatterPlot";
import SelectField from "../../../../../../../components/SelectField/SelectField";
import DataTable from "../dataTables/DataTable";
import ExclusionTable from "../dataTables/ExclusionTable";
import ViolationTable from "../dataTables/ViolationTable";
import ExclusionPopup from "../ExclusionPopup";
//services
import { postChartPlotData } from "../../../../../../../services/chartPersonalizationService";
//redux
import { useDispatch } from "react-redux";
import {
	hideLoader, showLoader, showNotification
} from "../../../../../../../duck/actions/commonActions";

const { TabPane } = Tabs;

const ScatterChart = ({ postChartData, setPostChartData }) => {
	const dispatch = useDispatch();
	const chartTypeList = [
		"Scatter Plot",
		"Process Control",
		"Bar",
		"Histogram",
		"Line",
		"Distribution",
		"Box",
		"Pie",
		"Error",
		"Bubble",
		"2D-histogram",
		"Process Capability"
	];
	const [axisValues, setAxisValues] = useState({
		xaxis: null,
		yaxis: null,
		zaxis: null,
		chartType: null,
	});
	const [chartData, setChartData] = useState([]);
	const [layoutData, setLayoutData] = useState({});
	const [showChart, setShowChart] = useState(false);
	const [xaxisList, setXAxisList] = useState([]);
	const [yaxisList, setYAxisList] = useState([]);
	const [tableKey, setTableKey] = useState("3");
	const [showZAxis, setShowZAxis] = useState(false);
	const [transformationList, setTransformationList] = useState(['boxcox', 'johnson']);
	const [ppkData, setPpkData] = useState({});
	const [showPpk, setShowPpk] = useState(false);
	const exclusionIdCounter = useRef(0);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [exclusionValues, setExclusionValues] = useState({
		productCode: "",
		parameterName: "",
		parameterValue: "",
		unit: "",
		testDate: "",
		ncNumber: "",
		notes: "",
		excludeRecord: false,
	});
	const [exclusionTable, setExclusionTable] = useState([]);

	const chartNodeClicked = (data) => {
		if (postChartData && postChartData.data && postChartData.data[0] && (postChartData.data[0].chart_type == "scatter" || postChartData.data[0].chart_type == "process control" || postChartData.data[0].chart_type == "bubble" || postChartData.data[0].chart_type == "error" || postChartData.data[0].chart_type == "line")) {
			if (data && data.data && data.data.name !== "mean") {
				postChartData.data.forEach((ele) => {
					ele.extras.data_table.forEach((el) => {
						if (el.batch_num === data.text) {
							setExclusionValues({
								...exclusionValues,
								batchId: data.text,
								productCode: ele.view_name,
								parameterValue:
									ele.chart_type === "process control"
										? data.y
										: `(${data.x},${data.y})`,
								notes: "",
								unit: el.uom_code,
								excludeRecord: false,
								parameterName:
									ele.chart_type === "process control"
										? ele.chart_mapping.y.function_name
										: `(${ele.chart_mapping.x.function_name},${ele.chart_mapping.y.function_name})`,
								testDate:
									ele.chart_type === "process control"
										? new Date(
											el["recorded_date_" + ele.chart_mapping.y.function_name]
										).toLocaleDateString()
										: `(${new Date(
											el["recorded_date_" + ele.chart_mapping.x.function_name]
										).toLocaleDateString()},${new Date(
											el["recorded_date_" + ele.chart_mapping.y.function_name]
										).toLocaleDateString()})`,
							});
						}
					});
				});
				setIsModalVisible(true);
			}
		}
	};
	const handleCloseModal = () => {
		setIsModalVisible(false);
	};
	const onApply = async () => {
		if (axisValues.xaxis === axisValues.yaxis) {
			dispatch(showNotification("error", "X and Y axis cannot be same"));
			return;
		}
		if (axisValues.zaxis) {
			if (axisValues.xaxis === axisValues.zaxis) {
				dispatch(showNotification("error", "X and Z axis cannot be same"));
				return;
			} else if (axisValues.yaxis === axisValues.zaxis) {
				dispatch(showNotification("error", "Y and Z axis cannot be same"));
				return;
			}
		}
		let xAxis = {};
		let yAxis = {};
		let zAxis = {};
		let transform = {};
		const newCovArr = JSON.parse(JSON.stringify(postChartData));
		newCovArr.data[0].extras.coverage.forEach((ele) => {
			if (ele.function_name === axisValues.xaxis) {
				xAxis.function_name = ele.function_name;
				xAxis.function_id = ele.function_id;
			}
			if (ele.function_name === axisValues.yaxis) {
				yAxis.function_name = ele.function_name;
				yAxis.function_id = ele.function_id;
			}
			if (ele.function_name === axisValues.zaxis) {
				zAxis.function_name = ele.function_name;
				zAxis.function_id = ele.function_id;
			}
			if (axisValues.chartType === 'Process Capability') {
				transform.function_name = axisValues.transform;
			}
		});
		const newArr = [...postChartData.data];
		const obj = {
			function_name:
				axisValues.xaxis === "Batch" ? "batch_num" : "recorded_date",
			function_id: null,
		};
		const processObj = {
			function_name: "recorded_date",
			function_id: null,
		};
		newArr.forEach((ele) => {
			ele.chart_type =
				axisValues.chartType === "Scatter Plot"
					? "scatter"
					: axisValues.chartType?.toLowerCase();
			if (axisValues.chartType === "2D-histogram") {
				ele.chart_type = "2D-histogram";
			}
			ele.chart_mapping.x = Object.keys(xAxis).length !== 0 ? xAxis : obj;
			ele.chart_mapping.y = yAxis;
			if (showZAxis && axisValues.zaxis) {
				ele.chart_mapping.z = zAxis;
			} else {
				ele.chart_mapping.z = undefined;
			}
			if (axisValues.chartType === "Process Capability") {
				ele.chart_type = 'process capability'
				ele.chart_mapping.x = processObj;
				ele.chart_mapping.transform = transform;
			} else {
				ele.chart_mapping.transform = undefined;
			}

			if (axisValues.chartType === "Process Capability") {
				ele.layout.width = 500;
				ele.layout.height = 350;
				ele.layout.autoSize = false;
				ele.layout.xaxis.title.text = "";
				ele.layout.yaxis.title.text = "";
			} else {
				ele.layout.xaxis.title.text =
					Object.keys(xAxis).length !== 0
						? xAxis.function_name
						: obj.function_name === "batch_num"
							? "Batch"
							: "Recorded Date";
				ele.layout.yaxis.title.text = yAxis.function_name;
			}

			ele.data = [
				{
					type: "scatter",
					mode: "markers",
					marker: {
						color: "#376dd4",
						size: 15,
					},
				},
			];
		});
		setPostChartData({ ...postChartData, data: newArr });
		let errorMsg = "";
		try {
			dispatch(showLoader());
			const viewRes = await postChartPlotData(postChartData);

			errorMsg = viewRes?.message;
			let newdataArr = [...postChartData.data];
			newdataArr[0].data = viewRes.data[0].data;
			newdataArr[0].extras = viewRes.data[0].extras;
			newdataArr[0].layout = viewRes.data[0].layout;
			newdataArr[0].ppk_cpk_data = viewRes.data[0].ppk_cpk_data;
			if (JSON.stringify(viewRes?.data[0]?.ppk_cpk_data) !== '{}') {
				setShowPpk(true)
				setPpkData(viewRes.data[0].ppk_cpk_data)
				newdataArr[0].layout.width = 500;
				newdataArr[0].layout.height = 350;
			}
			setPostChartData({ ...postChartData, data: newdataArr });
			setShowChart(true);
			dispatch(hideLoader());
		} catch (error) {
			/* istanbul ignore next */
			dispatch(hideLoader());
			if (errorMsg) {
				dispatch(showNotification("error", errorMsg));
			}
		}
	};

	const tabChange = (key) => {
		setTableKey(key);
	};

	const handleChartType = (e) => {
		if (e === "Bubble" || e === "Error") {
			setShowZAxis(true);
		} else {
			setShowZAxis(false);
		}
		setAxisValues({
			...axisValues,
			chartType: e,
			xaxis: null,
			yaxis: null,
			zaxis: null,
			transform: "",
		});
	};

	useEffect(() => {
		const newCovArr = JSON.parse(JSON.stringify(postChartData));

		newCovArr &&
			newCovArr.data &&
			newCovArr.data.forEach((ele) => {
				let obj;
				let table = [];
				let count = 0;
				ele.exclusions &&
					ele.exclusions.forEach((item) => {
						exclusionIdCounter.current = count + 1;
						const excValue = item.exclusion_value.batch;
						obj = {
							exclusion_id: item.exclusion_id,
							exclusion_value: excValue,
							exclusion_description: item.exclusion_description,
							user: item.user,
							timestamp: new Date(item.timestamp).toLocaleDateString(),
						};
						table.push(obj);
					});
				setExclusionTable(table);
				if (
					(ele?.data[0]?.x && ele?.data[0]?.x?.length >= 1) ||
					ele?.data[0]?.type === "pie"
				) {
					const chart =
						ele.chart_type === "scatter"
							? "Scatter Plot"
							: ele.chart_type.replaceAll(
								/\S*/g,
								(word) =>
									`${word.slice(0, 1).toUpperCase()}${word
										.slice(1)
										.toLowerCase()}`
							);
					let xValue = "";
					let yValue = "";
					let zValue = "";
					if (ele.chart_type !== "process control") {
						xValue = ele.chart_mapping.x.function_name;
					} else {
						xValue =
							ele.chart_mapping.x.function_name === "batch_num"
								? "Batch"
								: "Date";
					}
					yValue = ele.chart_mapping.y.function_name
						? ele.chart_mapping.y.function_name
						: "";
					zValue = ele.chart_mapping?.z?.function_name
						? ele.chart_mapping?.z?.function_name
						: "";
					if (zValue) {
						setShowZAxis(true);
					} else {
						setShowZAxis(false);
					}
					setAxisValues({
						...axisValues,
						chartType: chart,
						xaxis: xValue,
						yaxis: yValue,
						zaxis: zValue,
					});
					setShowChart(true);
					setChartData(ele.data);
					setLayoutData(ele.layout);
				} else {
					setShowChart(false);
					setChartData([]);
					setLayoutData({});
					setAxisValues({
						...axisValues,
						chartType: null,
						xaxis: null,
						yaxis: null,
						zaxis: null,
					});
				}
			});
	}, [postChartData]);

	//getting xaxis list and yaxis list
	useEffect(() => {
		let list = [];
		postChartData &&
			postChartData.data &&
			postChartData.data[0].extras &&
			postChartData.data[0].extras.coverage &&
			postChartData.data[0].extras.coverage.forEach((ele) => {
				list.push(ele.function_name);
				setYAxisList(list);
				if (axisValues.chartType !== "Process Control") {
					setXAxisList(["Batch", "Date"].concat(list));
				} else {
					const tempList = ["Batch", "Date"];
					setXAxisList(tempList);
					setYAxisList(list);
				}
			});
	}, [axisValues.chartType]);

	const getDisabledButton = () => {
		if (
			axisValues.chartType &&
			axisValues.yaxis &&
			(axisValues.chartType === "Histogram" || axisValues.chartType === "Process Capability") &&
			!axisValues.xaxis
		) {

			return false;
		} else if (
			!axisValues.chartType ||
			!axisValues.xaxis ||
			!axisValues.yaxis
		) {

			return true;
		} else if (
			(axisValues.chartType === "Error" || axisValues.chartType === "Bubble") &&
			!axisValues.zaxis
		) {
			return true;
		}
		return false;
	};


	return (
		<div className="chartLayout-container">
			<Row gutter={24}>
				<Col span={showZAxis ? 5 : 6}>
					<p>Chart Type</p>
					<SelectField
						placeholder="Select Chart type"
						selectList={chartTypeList}
						selectedValue={axisValues.chartType}
						onChangeSelect={handleChartType}
					/>
				</Col>
				{axisValues.chartType === 'Process Capability' ? (
					<></>
				) : (
					<Col span={showZAxis ? 5 : 6}>
						<p>X-axis</p>
						<SelectField
							placeholder="Select X-axis"
							selectList={xaxisList}
							selectedValue={axisValues.xaxis}
							onChangeSelect={(e) => setAxisValues({ ...axisValues, xaxis: e })}
							disabled={axisValues.chartType === "Histogram"}
						/>
					</Col>
				)}

				<Col span={showZAxis ? 5 : 6}>
					<p>{axisValues.chartType === 'Process Capability' ? 'Parameter' : 'Y-axis'}</p>
					<SelectField
						placeholder="Select Y-axis"
						selectList={yaxisList}
						selectedValue={axisValues.yaxis}
						onChangeSelect={(e) => setAxisValues({ ...axisValues, yaxis: e })}
					/>
				</Col>

				{showZAxis && (
					<Col span={5}>
						<p>Z-axis</p>
						<SelectField
							placeholder="Select Z-axivs"
							selectList={yaxisList}
							selectedValue={axisValues.zaxis}
							onChangeSelect={(e) => setAxisValues({ ...axisValues, zaxis: e })}
						/>
					</Col>
				)}

				{axisValues.chartType === 'Process Capability' && (
					<Col span={5}>
						<p>Transformation</p>
						<SelectField
							placeholder="Select Transformation"
							selectList={transformationList}
							selectedValue={axisValues.transform}
							onChangeSelect={(e) => setAxisValues({ ...axisValues, transform: e })}
						/>
					</Col>
				)}

				<Col span={showZAxis ? 4 : 6} className="button-visible">
					<p>button</p>
					<Button
						className="custom-primary-btn"
						onClick={onApply}
						disabled={getDisabledButton()}
					>
						Apply
					</Button>
				</Col>
			</Row>
			<div className="chart-table">
				<div className="chart-layout">
					<div className="scatter-chart">
						{showChart && (
							<ScatterPlot
								data={chartData}
								layout={layoutData}
								nodeClicked={chartNodeClicked}
							/>
						)}
					</div>

					{showPpk && (
						<div className="show-ppk">
							<span>Results</span>
							<p>Best Transformation : {ppkData?.best_transformer}</p>
							<p>CP : {ppkData?.cp}</p>
							<p>CPK : {ppkData?.cpk}</p>
							<p>PP : {ppkData?.pp}</p>
							<p>PPK : {ppkData?.ppk}</p>
							<p>Lambda : {ppkData?.selected_lambda}</p>
						</div>
					)}
				</div>

				{showChart && (
					<Row className="tabledata">
						<Col span={24}>
							<Tabs
								defaultActiveKey="3"
								activeKey={tableKey}
								onChange={tabChange}
							>
								<TabPane tab="Exclusion" key="1">
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
								<TabPane tab="Violation" key="2">
									<ViolationTable postChartData={postChartData} />
								</TabPane>
								<TabPane tab="Data Table" key="3">
									<DataTable postChartData={postChartData} />
								</TabPane>
							</Tabs>
						</Col>
					</Row>
				)}
			</div>
			<Modal
				title="Batch Parameter"
				isModalVisible={isModalVisible}
				handleCancel={handleCloseModal}
			>
				<ExclusionPopup
					className="exclusion-modal"
					exclusionValues={exclusionValues}
					setExclusionValues={setExclusionValues}
					isModalVisible={isModalVisible}
					setIsModalVisible={setIsModalVisible}
					setExclusionTable={setExclusionTable}
					exclusionTable={exclusionTable}
					postChartData={postChartData}
					setPostChartData={setPostChartData}
					setTableKey={setTableKey}
					exclusionIdCounter={exclusionIdCounter}
				/>
			</Modal>
		</div >
	);
};

export default ScatterChart;
