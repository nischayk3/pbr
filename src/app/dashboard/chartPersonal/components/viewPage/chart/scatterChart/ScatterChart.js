/**
 * @author Vinay Reddy <vinay.reddy@mareana.com>
 * @Mareana - CPV Product
 * @version 2
 * @Last Modified - 04 April, 2023
 * @Last Changed By - @Vinay
 */
import React, { useEffect, useRef, useState } from "react";
import "./ScatterStyles.scss";
//antd imports
import { Button, Col, Empty, Row, Select, Tabs } from "antd";
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
import SelectSearchField from "../../../../../../../components/SelectSearchField/SelectSearchField";
import {
	hideLoader, showLoader, showNotification
} from "../../../../../../../duck/actions/commonActions";
import ProcessCapabilityResult from "../dataTables/ProcessCapabilityResult";
import InputField from "../../../../../../../components/InputField/InputField";

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
		"Process Capability",
		"SMA",
		"EWMA",
		"Pareto",
		"IMR"
	];
	const [axisValues, setAxisValues] = useState({
		xaxis: null,
		yaxis: null,
		zaxis: null,
		chartType: null,
		window: null
	});
	const [chartData, setChartData] = useState([]);
	const [layoutData, setLayoutData] = useState({});
	const [showChart, setShowChart] = useState(false);
	const [xaxisList, setXAxisList] = useState([]);
	const [yaxisList, setYAxisList] = useState([]);
	const [tableKey, setTableKey] = useState("3");
	const [showZAxis, setShowZAxis] = useState(false);
	const [transformationList, setTransformationList] = useState([
		{ label: "Yeo-Johnson", value: "Yeo-Johnson" },
		{ label: "Box-Cox", value: "Box-Cox" }
	]);

	// /'boxcox', 'johnson'
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
	/* istanbul ignore next */
	const chartNodeClicked = (data) => {
		// added chart typesz
		if (postChartData && postChartData.data && postChartData.data[0] && (postChartData.data[0].chart_type == "scatter" || postChartData.data[0].chart_type == "process control" || postChartData.data[0].chart_type == "bubble" || postChartData.data[0].chart_type == "error" || postChartData.data[0].chart_type == "line" || postChartData.data[0].chart_type == "process control" || postChartData.data[0].chart_type == "bubble" || postChartData.data[0].chart_type == "error" || postChartData.data[0].chart_type == "SMA" || postChartData.data[0].chart_type == "EWMA")) {
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
								testDate: new Date(
									el["recorded_date_" + ele.chart_mapping.y.function_name]
								).toLocaleDateString(),
							});
						}
					});
					ele?.violations.forEach((item) => {
						if (item.batch_num === data.text) {
							setExclusionValues({
								...exclusionValues,
								batchId: data.text,
								productCode: ele.view_name,
								parameterValue:
									ele.chart_type === "process control"
										? data.y
										: `(${data.x},${data.y})`,
								notes: "",
								unit: item.uom_code,
								excludeRecord: false,
								parameterName:
									ele.chart_type === "process control"
										? ele.chart_mapping.y.function_name
										: `(${ele.chart_mapping.x.function_name},${ele.chart_mapping.y.function_name})`,
								testDate: new Date(
									item["recorded_date"]
								).toLocaleDateString(),
							});
						}
					});
				});
				setIsModalVisible(true);
			}
		}
	};
	/* istanbul ignore next */
	const handleCloseModal = () => {
		setIsModalVisible(false);
	};

	// checking integer value
	const isInt = (n) =>  {
		return Number(n) % 1 === 0;
	 }

	const onApply = async () => {
		/* istanbul ignore next */
		if (axisValues.xaxis === axisValues.yaxis) {
			dispatch(showNotification("error", "X and Y axis cannot be same"));
			return;
		}
		/* istanbul ignore next */
		if (axisValues.zaxis) {
			if (axisValues.xaxis === axisValues.zaxis) {
				dispatch(showNotification("error", "X and Z axis cannot be same"));
				return;
			} else if (axisValues.yaxis === axisValues.zaxis) {
				dispatch(showNotification("error", "Y and Z axis cannot be same"));
				return;
			}
		}

		//added chart error messages for SMA && EWMA
		if(axisValues.chartType === "SMA" && !axisValues?.window) {
			dispatch(showNotification("error", "Please enter window input value"));
			return;
		}

		if(axisValues.chartType === "SMA" && axisValues?.window < 2 ) {
			dispatch(showNotification("error", "window value should be greater than or equal to 2"));
			return;
		}

		if(axisValues.chartType === "SMA" && !isInt(axisValues?.window) ) {
			dispatch(showNotification("error", "window value should be integer"));
			return;
		}

		if(axisValues.chartType === "EWMA" && !axisValues?.alpha) {
			dispatch(showNotification("error", "Please enter alpha input value"));
			return;
		}


		if(axisValues.chartType === "EWMA" && String(axisValues?.alpha) === "0") {
			dispatch(showNotification("error", "alpha value must be greater than 0"));

			return false;
		}

		if(axisValues.chartType === "EWMA" && Number(axisValues?.alpha) > 1) {
			dispatch(showNotification("error", "alpha value must be between 0 to 1"));

			return false;
		}

		const chartArr = [...postChartData.data];
		/* istanbul ignore next */
		if (axisValues.transform) {
			let errorValue = false;

			chartArr.forEach((ele) => {
				if (ele.limits.specification.length === 0) {
					errorValue = true;
					dispatch(showNotification("error", "Please enter Lower and Upper Specification limits"));
				} else {
					errorValue = false;
				}
			})
			if (errorValue) {
				return;
			}
		}

		let xAxis = {};
		let yAxis = {};
		let zAxis = {};
		let transform = {};
		const newCovArr = JSON.parse(JSON.stringify(postChartData));

		newCovArr.data[0].extras.coverage.forEach((ele) => {
			/* istanbul ignore next */
			if (ele.function_name === axisValues.xaxis) {
				xAxis.function_name = ele.function_name;
				xAxis.function_id = ele.function_id;
			}
			/* istanbul ignore next */
			if (ele.function_name === axisValues.yaxis) {
				yAxis.function_name = ele.function_name;
				yAxis.function_id = ele.function_id;
			}
			/* istanbul ignore next */
			if (ele.function_name === axisValues.zaxis) {
				zAxis.function_name = ele.function_name;
				zAxis.function_id = ele.function_id;
			}
			/* istanbul ignore next */
			if (axisValues.chartType === 'Process Capability') {
				transform.function_name = axisValues.transform;
			}
		});

		const newArr = [...postChartData.data];
		const obj = {
			function_name:
				(axisValues.xaxis === "Batch" || axisValues.xaxis === "batch_num") ? "batch_num" : "recorded_date",
			function_id: null,
		};

		const processObj = {
			function_name: "recorded_date",
			function_id: null,
		};

		const annotations = [
			{
				text: "This chart contains unapproved data",
				font: {
					size: 13,
					color: "rgb(116, 101, 130)",
				},
				showarrow: false,
				align: "left",
				x: 0,
				y: 1.16,
				xref: "paper",
				yref: "paper",
			},
		];

		newArr.forEach((ele) => {
			// ele.limits = {
			// 	"control": [],
			// 	"specification": [],
			// 	"warning": []
			// };
			if (ele.data_filter.unapproved_data === 1) {
				ele.layout.annotations = annotations;
			} else {
				ele.layout.annotations = [];
			}

			ele.chart_type =
				axisValues.chartType === "Scatter Plot"
					? "scatter"
					: axisValues.chartType?.toLowerCase();
			/* istanbul ignore next */
			if (axisValues.chartType === "2D-histogram") {
				ele.chart_type = "2D-histogram";
			}
			// setting up chart and window values
			if (axisValues.chartType === 'SMA') {
				ele.window = Number(axisValues?.window)
				ele.chart_type = "SMA";
			}
			if ((axisValues.chartType)?.toUpperCase() === 'IMR') {
				ele.chart_type = "IMR";
			}
			// setting up chart and alpha values 
			if (axisValues.chartType === 'EWMA') {
				ele.alpha = Number(axisValues.alpha)
				ele.chart_type = "EWMA";
			}
			ele.chart_mapping.x = Object.keys(xAxis).length !== 0 ? xAxis : obj;
			ele.chart_mapping.y = yAxis;
			/* istanbul ignore next */
			if (showZAxis && axisValues.zaxis) {
				ele.chart_mapping.z = zAxis;
			} else {
				ele.chart_mapping.z = undefined;
			}
			/* istanbul ignore next */
			if (axisValues.chartType === "Process Capability") {
				ele.chart_type = 'process capability'
				ele.chart_mapping.x = processObj;
				ele.chart_mapping.transform = transform;
			} else {
				ele.chart_mapping.transform = undefined;
				ele.ppk_cpk_data = {};
				// ele.layout.title.text = "";
			}
			/* istanbul ignore next */
			if (axisValues.chartType === "Process Capability") {
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
		/* istanbul ignore next */
		setPostChartData({ ...postChartData, data: newArr });
		let errorMsg = "";
		try {
			dispatch(showLoader());
			const viewRes = await postChartPlotData(postChartData);
			dispatch(hideLoader());
			errorMsg = viewRes?.message;
			let newdataArr = [...postChartData.data];
			newdataArr[0].data = viewRes.data[0].data;
			newdataArr[0].extras = viewRes.data[0].extras;
			newdataArr[0].layout = viewRes.data[0].layout;
			newdataArr[0].limits = viewRes.data[0].limits;
			newdataArr[0].violations = viewRes.data[0].violations;
			newdataArr[0].ppk_cpk_data = viewRes.data[0].ppk_cpk_data;
			newdataArr[0].first_y_param = viewRes.data[0]?.first_y_param
			/* istanbul ignore next */
			if (axisValues.transform !== "") {
				if (viewRes?.data[0]?.ppk_cpk_data?.return_code === 200) {
					setShowPpk(true)
					setPpkData(viewRes.data[0].ppk_cpk_data)
					// newdataArr[0].layout.width = 500;
					// newdataArr[0].layout.height = 350;
					dispatch(showNotification("success", `Best Transformation : ${viewRes.data[0].ppk_cpk_data?.best_transformer}`));
				} else {
					setShowPpk(false)
					setPpkData({})
				}
			} else {
				setShowPpk(false)
			}
			setPostChartData({ ...postChartData, data: newdataArr });
			setShowChart(true);

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

	/* istanbul ignore next */
	const handleChartType = (e) => {
		if (e !== 'Process Capability') {
			setPpkData({});
			setShowPpk(false);
		}
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
				let chart =
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
				let transformValue = "";
				// setting up values for window and chart while loading the chart
				let windowValue = '';
				let alphaValue = '';
				if (chart === 'Sma') {
					chart = "SMA"
					windowValue = ele?.window;
				}
				if (chart === 'Ewma') {
					chart = "EWMA"
					alphaValue = ele?.alpha;
				}
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
				transformValue = ele.chart_mapping?.transform?.function_name
					? ele.chart_mapping?.transform?.function_name
					: "";
				if (zValue) {
					setShowZAxis(true);
				} else {
					setShowZAxis(false);
				}
				if (ele.chart_mapping?.transform?.function_name !== "") {
					if (ele.ppk_cpk_data?.return_code === 200) {
						setShowPpk(true)
						setPpkData(ele.ppk_cpk_data)
						// ele.layout.width = 500;
						// ele.layout.height = 350;
						dispatch(showNotification("success", `Best Transformation : ${ele.ppk_cpk_data?.best_transformer}`));
					} else {
						setShowPpk(false)
						setPpkData({})
					}
				} else {
					setShowPpk(false)
					setPpkData({})
				}
				setAxisValues({
					...axisValues,
					chartType: chart,
					xaxis: xValue,
					yaxis: yValue,
					zaxis: zValue,
					transform: transformValue,
					window: windowValue,
					alpha: alphaValue
				});
				setChartData(ele.data);
				setLayoutData(ele.layout);
				if (
					(ele?.data[0]?.x && ele?.data[0]?.x?.length >= 1) ||
					ele?.data[0]?.type === "pie"
				) {
					setShowChart(true);
				} else {
					setShowChart(false);
					setChartData([]);
					setLayoutData({});
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

	const optionsTransformer = transformationList.map((item, index) => (
		<Select.Option key={index} value={item.value}>
			{item.label}
		</Select.Option>
	));
	return (
		<div className="chartLayout-container">
			<Row gutter={24}>
				<Col span={(showZAxis || axisValues.chartType === 'SMA' || axisValues.chartType === 'EWMA') ? 5 : 6}>
					<p>Chart Type</p>
					<SelectField
						placeholder="Select Chart type"
						selectList={chartTypeList}
						selectedValue={axisValues.chartType}
						onChangeSelect={handleChartType}
					/>
				</Col>
				{axisValues.chartType === 'Process Capability' || axisValues.chartType === 'process capability' ? (
					<></>
				) : (
					<Col span={(showZAxis || axisValues.chartType === 'SMA' || axisValues.chartType === 'EWMA') ? 5 : 6}>
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

				<Col span={(showZAxis || axisValues.chartType === 'SMA' || axisValues.chartType === 'EWMA') ? 5 : 6}>
					<p>{axisValues.chartType === 'Process Capability' || axisValues.chartType === 'process capability' ? 'Parameter' : 'Y-axis'}</p>
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
						{/* <p>Transformation</p> */}
						<SelectSearchField
							showSearch
							label='Transformation'
							placeholder='Select Transformation'
							onChangeSelect={(e) => setAxisValues({ ...axisValues, transform: e })}
							options={optionsTransformer}
							handleClearSearch={(e) => setAxisValues({ ...axisValues, transform: "" })}
							selectedValue={axisValues.transform}
						/>

					</Col>
				)}

				{axisValues.chartType === 'SMA' && (
					<Col span={5}>
						<InputField
							label="Window"
							value={axisValues.window}
							type="Number"
							onChangeInput={(e) => setAxisValues({ ...axisValues, window: e.target.value })}
						/>
					</Col>
				)}
				{(axisValues.chartType)?.toUpperCase() === 'EWMA' && (
					<Col span={5}>
						<InputField
							label="Alpha"
							value={axisValues.alpha}
							type="Number"
							onChangeInput={(e) => setAxisValues({ ...axisValues, alpha: e.target.value })}
						/>
					</Col>
				)}
				<Col span={(showZAxis || axisValues.chartType === 'SMA' || axisValues.chartType === 'EWMA') ? 4 : 6} className="button-visible">
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
							<span>Results :</span>
							<div className="result">
								<p>CP : {ppkData?.cp}</p>
								<p>CPK : {ppkData?.cpk}</p>
								<p>PP : {ppkData?.pp}</p>
								<p>PPK : {ppkData?.ppk}</p>
								<p>Lambda : {ppkData?.selected_lambda}</p>
							</div>
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
								{axisValues.chartType === 'Process Capability' && (
									<TabPane tab="ProcessCapability" key="4">
										<ProcessCapabilityResult postChartData={postChartData} />
									</TabPane>
								)}
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
