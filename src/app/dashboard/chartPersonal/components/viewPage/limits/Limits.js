import queryString from "query-string";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import "./limitsStyles.scss";
//antd imports
import { DeleteTwoTone, PlusOutlined } from "@ant-design/icons";
import { Button, DatePicker, Input, Popconfirm, Table } from "antd";
import moment from "moment";
import { useDispatch } from "react-redux";
import {
	hideLoader, showLoader, showNotification
} from "../../../../../../duck/actions/commonActions";
import { postChartPlotData } from "../../../../../../services/chartPersonalizationService";

//main component
const Limits = ({ postChartData, setPostChartData }) => {
	const dispatch = useDispatch();
	const location = useLocation();
	const params = queryString.parse(location.search);

	//states for table data
	const [controlSource, setControlSource] = useState([]);
	const [specificationSource, setSpecificationSource] = useState([]);
	const [warningSource, setWarningSource] = useState([]);
	const count = useRef(0);
	const specCount = useRef(0);
	const warningCount = useRef(0);

	//function to change control limit input values
	const handleChange = (index, event, dateString, type) => {
		const rowsInput = [...controlSource];
		if (!dateString) {
			rowsInput[index]["valid_timestamp"] = null;
		}
		if (dateString && type === "date") {
			rowsInput[index]["valid_timestamp"] = dateString._d.toLocaleDateString();
		} else if (type === "limits") {
			const { name, value } = event.target;
			rowsInput[index][name] = value;
		}
		setControlSource(rowsInput);
	};

	//function to change specification limit input values
	const handleSpecChange = (index, event, dateString, type) => {
		const rowsInput = [...specificationSource];
		/* istanbul ignore next */
		if (!dateString) {
			rowsInput[index]["valid_timestamp"] = null;
		}
		/* istanbul ignore next */
		if (dateString && type === "date") {
			rowsInput[index]["valid_timestamp"] = dateString._d.toLocaleDateString();
		} else if (type === "limits") {
			const { name, value } = event.target;
			rowsInput[index][name] = value;
		}
		setSpecificationSource(rowsInput);
	};

	// function for change of warn input values
	const handleWarnChange = (index, event, dateString, type) => {
		const rowsInput = [...warningSource];
		/* istanbul ignore next */
		if (!dateString) {
			rowsInput[index]["valid_timestamp"] = null;
		}
		/* istanbul ignore next */
		if (dateString && type === "date") {
			rowsInput[index]["valid_timestamp"] = dateString._d.toLocaleDateString();
		} else if (type === "limits") {
			const { name, value } = event.target;
			rowsInput[index][name] = value;
		}
		setWarningSource(rowsInput);
	};

	//columns array for control table
	const columns = [
		{
			title: "Action",
			dataIndex: "action",
			render: (_, record) => (
				<Popconfirm
					title="Sure to delete?"
					disabled={
						Object.keys(params).length > 0 && params.fromScreen !== "Workspace"
					}
					onConfirm={() => handleDelete(record.key)}
				>
					<DeleteTwoTone
						twoToneColor={
							Object.keys(params).length > 0 &&
								params.fromScreen !== "Workspace"
								? "lightgrey"
								: "red"
						}
					/>
				</Popconfirm>
			),
		},
		{
			title: "Lower Limit",
			dataIndex: "Lower Limit",
			key: "Lower Limit",
			render: (text, record) =>
				controlSource.map((data, index) => {
					if (record.key === data.key) {
						if (
							Object.keys(params).length > 0 &&
							params.fromScreen !== "Workspace"
						) {
							return <p style={{ margin: "0" }}>{data.lower}</p>;
						}
						return (
							<Input
								type="number"
								name="lower"
								value={data.lower}
								onChange={(e) => handleChange(index, e, "", "limits")}
							/>
						);
					}
				}),
		},
		{
			title: "Upper Limit",
			dataIndex: "UL",
			key: "UL",
			render: (text, record) =>
				controlSource.map((data, index) => {
					if (record.key === data.key) {
						if (
							Object.keys(params).length > 0 &&
							params.fromScreen !== "Workspace"
						) {
							return <p style={{ margin: "0" }}>{data.upper}</p>;
						}
						return (
							<Input
								type="number"
								name="upper"
								status={
									data.upper &&
									Number(data.lower) > Number(data.upper) &&
									"error"
								}
								value={data.upper}
								onChange={(e) => handleChange(index, e, "", "limits")}
							/>
						);
					}
				}),
		},
		{
			title: "Valid Until   ",
			dataIndex: "validuntill",
			key: "validuntill",
			// width: "180",
			render: (text, record) =>
				controlSource.map((data, index) => {
					if (record.key === data.key) {
						if (
							Object.keys(params).length > 0 &&
							params.fromScreen !== "Workspace"
						) {
							if (!data.valid_timestamp) {
								return "";
							} else {
								const d = new Date(data.valid_timestamp);
								const year = d.getFullYear();
								const month = d.getMonth();
								const day = d.getDate();
								return (
									<p style={{ margin: "0" }}>{`${year}-${month + 1}-${day}`}</p>
								);
							}
						}

						return (
							<DatePicker
								type="text"
								name="valid_timestamp"
								defaultValue={
									data.valid_timestamp ? moment(data.valid_timestamp) : ""
								}
								onChange={(dateString) =>
									handleChange(index, "", dateString, "date")
								}
							/>
						);
					}
				}),
		},
	];

	//columns array for specs table
	const specColumns = [
		{
			title: "Action",
			dataIndex: "action",
			width: "100",
			render: (_, record) => (
				<Popconfirm
					title="Sure to delete?"
					disabled={
						Object.keys(params).length > 0 && params.fromScreen !== "Workspace"
					}
					onConfirm={() => handleSpecifyDelete(record.key)}
				>
					<DeleteTwoTone
						twoToneColor={
							Object.keys(params).length > 0 &&
								params.fromScreen !== "Workspace"
								? "lightgrey"
								: "red"
						}
					/>
				</Popconfirm>
			),
		},
		{
			title: "Lower Limit",
			dataIndex: "Lower Limit",
			key: "Lower Limit",
			width: "100",
			render: (text, record) =>
				specificationSource.map((data, index) => {
					if (record.key === data.key) {
						if (
							Object.keys(params).length > 0 &&
							params.fromScreen !== "Workspace"
						) {
							return <p style={{ margin: "0" }}>{data.lower}</p>;
						}
						return (
							<Input
								type="number"
								name="lower"
								value={data.lower}
								onChange={(e) => handleSpecChange(index, e, "", "limits")}
							/>
						);
					}
				}),
		},
		{
			title: "Upper Limit",
			dataIndex: "UL",
			key: "UL",
			width: "100",
			render: (text, record) =>
				specificationSource.map((data, index) => {
					if (
						Object.keys(params).length > 0 &&
						params.fromScreen !== "Workspace"
					) {
						return <p style={{ margin: "0" }}>{data.upper}</p>;
					}
					if (record.key === data.key) {
						return (
							<Input
								type="number"
								name="upper"
								status={
									data.upper &&
									Number(data.lower) > Number(data.upper) &&
									"error"
								}
								value={data.upper}
								onChange={(e) => handleSpecChange(index, e, "", "limits")}
							/>
						);
					}
				}),
		},
		{
			title: "Valid Until   ",
			dataIndex: "validuntill",
			key: "validuntill",
			render: (text, record) =>
				specificationSource.map((data, index) => {
					/* istanbul ignore next */
					if (record.key === data.key) {
						if (
							Object.keys(params).length > 0 &&
							params.fromScreen !== "Workspace"
						) {
							if (!data.valid_timestamp) {
								return "";
							} else {
								const d = new Date(data.valid_timestamp);
								const year = d.getFullYear();
								const month = d.getMonth();
								const day = d.getDate();
								return (
									<p style={{ margin: "0" }}>{`${year}-${month + 1}-${day}`}</p>
								);
							}
						}
						return (
							<DatePicker
								type="text"
								name="valid_timestamp"
								defaultValue={
									data.valid_timestamp ? moment(data.valid_timestamp) : ""
								}
								onChange={(dateString) =>
									handleChange(index, "", dateString, "date")
								}
							/>
						);
					}
				}),
		},
	];

	//columns array for warn table
	const warnColumns = [
		{
			title: "Action",
			dataIndex: "action",
			width: "100",
			render: (_, record) => (
				<Popconfirm
					title="Sure to delete?"
					disabled={
						Object.keys(params).length > 0 && params.fromScreen !== "Workspace"
					}
					onConfirm={() => handleWarningDelete(record.key)}
				>
					<DeleteTwoTone
						twoToneColor={
							Object.keys(params).length > 0 &&
								params.fromScreen !== "Workspace"
								? "lightgrey"
								: "red"
						}
					/>
				</Popconfirm>
			),
		},
		{
			title: "Lower Limit",
			dataIndex: "Lower Limit",
			key: "Lower Limit",
			width: "100",
			render: (text, record) =>
				warningSource.map((data, index) => {
					if (record.key === data.key) {
						if (
							Object.keys(params).length > 0 &&
							params.fromScreen !== "Workspace"
						) {
							return <p style={{ margin: "0" }}>{data.lower}</p>;
						}
						return (
							<Input
								type="number"
								name="lower"
								value={data.lower}
								onChange={(e) => handleWarnChange(index, e, "", "limits")}
							/>
						);
					}
				}),
		},
		{
			title: "Upper Limit",
			dataIndex: "UL",
			key: "UL",
			width: "100",
			render: (text, record) =>
				warningSource.map((data, index) => {
					if (record.key === data.key) {
						if (
							Object.keys(params).length > 0 &&
							params.fromScreen !== "Workspace"
						) {
							return <p style={{ margin: "0" }}>{data.upper}</p>;
						}
						return (
							<Input
								type="number"
								name="upper"
								status={
									data.upper &&
									Number(data.lower) > Number(data.upper) &&
									"error"
								}
								value={data.upper}
								onChange={(e) => handleWarnChange(index, e, "", "limits")}
							/>
						);
					}
				}),
		},
		{
			title: "Valid Until   ",
			dataIndex: "validuntill",
			key: "validuntill",
			width: "100",
			render: (text, record) =>
				/* istanbul ignore next */
				warningSource.map((data, index) => {
					/* istanbul ignore next */
					if (record.key === data.key) {
						if (
							Object.keys(params).length > 0 &&
							params.fromScreen !== "Workspace"
						) {
							if (!data.valid_timestamp) {
								return "";
							} else {
								const d = new Date(data.valid_timestamp);
								const year = d.getFullYear();
								const month = d.getMonth();
								const day = d.getDate();
								return (
									<p style={{ margin: "0" }}>{`${year}-${month + 1}-${day}`}</p>
								);
							}
						}
						return (
							<DatePicker
								type="text"
								name="valid_timestamp"
								defaultValue={
									data.valid_timestamp ? moment(data.valid_timestamp) : ""
								}
								onChange={(dateString) =>
									handleWarnChange(index, "", dateString, "date")
								}
							/>
						);
					}
				}),
		},
	];

	const handleAdd = () => {
		count.current = count.current + 1;
		const newData = {
			key: count.current,
			upper: "",
			lower: "",
			valid_timestamp: "",
		};
		setControlSource([...controlSource, newData]);
	};
	const handleSpecAdd = () => {
		specCount.current = specCount.current + 1;
		const newData = {
			key: specCount.current,
			upper: "",
			lower: "",
			valid_timestamp: "",
		};
		setSpecificationSource([...specificationSource, newData]);
	};

	const handleWarnAdd = () => {
		warningCount.current = warningCount.current + 1;
		const newData = {
			key: warningCount.current,
			upper: "",
			lower: "",
			valid_timestamp: "",
		};
		setWarningSource([...warningSource, newData]);
	};

	const handleDelete = (key) => {
		const dataSource = [...controlSource];
		setControlSource(dataSource.filter((item) => item.key !== key));
		count.current = count.current - 1;
	};

	const handleSpecifyDelete = (key) => {
		const dataSource = [...specificationSource];
		setSpecificationSource(dataSource.filter((item) => item.key !== key));
		specCount.current = specCount.current - 1;
	};

	const handleWarningDelete = (key) => {
		const dataSource = [...warningSource];
		setWarningSource(dataSource.filter((item) => item.key !== key));
		warningCount.current = warningCount.current - 1;
	};
	const onApplyClick = async () => {
		const data = {
			control: JSON.parse(JSON.stringify(controlSource)),
			specification: JSON.parse(JSON.stringify(specificationSource)),
			warning: JSON.parse(JSON.stringify(warningSource)),
		};
		let access = false;
		data.control.forEach((ele) => {
			if (Number(ele.lower) && Number(ele.upper)) {
				if (Number(ele.lower) >= Number(ele.upper)) {
					access = true;
					dispatch(
						showNotification(
							"error",
							"Control limts lower limit should be less than upper limit"
						)
					);
				}
			} else {
				access = true;
				dispatch(
					showNotification(
						"error",
						"Both upper and lower limits should present in control limits"
					)
				);
			}
			ele.upper = ele.upper ? Number(ele.upper) : "";
			ele.lower = ele.lower ? Number(ele.lower) : "";
			ele.valid_timestamp = ele.valid_timestamp
				? new Date(ele.valid_timestamp).toISOString()
				: null;
			delete ele.key;
		});
		data.specification.forEach((ele) => {
			if (Number(ele.lower) && Number(ele.upper)) {
				if (Number(ele.lower) >= Number(ele.upper)) {
					access = true;
					dispatch(
						showNotification(
							"error",
							"Specification limts lower limit should be less than upper limit"
						)
					);
				}
			} else {
				access = true;
				dispatch(
					showNotification(
						"error",
						"Both upper and lower limits should present in specification limits"
					)
				);
			}
			ele.upper = Number(ele.upper);
			ele.lower = Number(ele.lower);
			ele.valid_timestamp = ele.valid_timestamp
				? new Date(ele.valid_timestamp).toISOString()
				: null;
			delete ele.key;
		});
		data.warning.forEach((ele) => {
			if (Number(ele.lower) && Number(ele.upper)) {
				if (Number(ele.lower) >= Number(ele.upper)) {
					access = true;
					dispatch(
						showNotification(
							"error",
							"Warning limts lower limit should be less than upper limit"
						)
					);
				}
			} else {
				access = true;
				dispatch(
					showNotification(
						"error",
						"Both upper and lower limits should present in warning limits"
					)
				);
			}
			ele.upper = Number(ele.upper);
			ele.lower = Number(ele.lower);
			ele.valid_timestamp = ele.valid_timestamp
				? new Date(ele.valid_timestamp).toISOString()
				: null;
			delete ele.key;
		});
		if (access) {
			return false;
		}
		let errorMsg = "";
		const newArr = [...postChartData.data];
		newArr[0].limits = JSON.parse(JSON.stringify(data));
		setPostChartData({ ...postChartData, data: newArr });
		try {
			dispatch(showLoader());
			const viewRes = await postChartPlotData(postChartData);
			errorMsg = viewRes?.message;
			let newdataArr = [...postChartData.data];
			newdataArr[0].limits = viewRes.data[0].limits;
			newdataArr[0].violations = viewRes.data[0].violations;
			newdataArr[0].data = viewRes.data[0].data;
			newdataArr[0].extras.data_table = viewRes.data[0].extras.data_table;
			setPostChartData({ ...postChartData, data: newdataArr });
			dispatch(hideLoader());
		} catch (error) {
			/* istanbul ignore next */
			if (errorMsg) {
				dispatch(showNotification("error", errorMsg));
			}
			dispatch(hideLoader());
		}
	};

	useEffect(() => {
		const newCovArr = JSON.parse(JSON.stringify(postChartData));
		let control = [];
		let specify = [];
		let warn = [];
		newCovArr &&
			newCovArr.data &&
			newCovArr.data.forEach((ele) => {
				let controlcount = 0;
				let speccount = 0;
				let warncount = 0;
				if (ele.limits.control.length >= 1) {
					ele.limits.control.forEach((el) => {
						controlcount = controlcount + 1;
						el.key = controlcount;
						count.current = controlcount;
					});
				}
				if (ele.limits.specification.length >= 1) {
					ele.limits.specification.forEach((el) => {
						speccount = speccount + 1;
						el.key = speccount;
						specCount.current = speccount;
					});
				}
				if (ele.limits.warning.length >= 1) {
					ele.limits.warning.forEach((el) => {
						warncount = warncount + 1;
						el.key = warncount;
						warningCount.current = warncount;
					});
				}
				control = ele.limits.control;
				specify = ele.limits.specification;
				warn = ele.limits.warning;
				setControlSource(control);
				setSpecificationSource(specify);
				setWarningSource(warn);
			});
	}, [postChartData]);

	return (
		<div className="limit-container">
			<div className="controlLimit">
				<div className="table-bottom">
					<div className="control-header">
						<p>Control limit</p>
						<Button
							className="custom-primary-btn"
							disabled={
								Object.keys(params).length > 0 &&
								params.fromScreen !== "Workspace"
							}
							onClick={onApplyClick}
						>
							Apply
						</Button>
					</div>
					<Table
						pagination={false}
						dataSource={controlSource}
						columns={columns}
					/>
					<div className="add-button">
						<Button
							onClick={() => handleAdd()}
							disabled={
								Object.keys(params).length > 0 &&
								params.fromScreen !== "Workspace"
							}
						>
							<PlusOutlined />
							Add new row
						</Button>
					</div>
				</div>
				<div className="table-bottom p-b">
					<p>Specification</p>
					<Table
						pagination={false}
						dataSource={specificationSource}
						columns={specColumns}
					/>
					<div className="add-button">
						<Button
							onClick={() => handleSpecAdd()}
							disabled={
								Object.keys(params).length > 0 &&
								params.fromScreen !== "Workspace"
							}
						>
							<PlusOutlined />
							Add new row
						</Button>
					</div>
				</div>
				<div className="table-bottom p-b">
					<p>Warning</p>
					<Table
						pagination={false}
						dataSource={warningSource}
						columns={warnColumns}
					/>
					<div className="add-button">
						<Button
							onClick={() => handleWarnAdd()}
							disabled={
								Object.keys(params).length > 0 &&
								params.fromScreen !== "Workspace"
							}
						>
							<PlusOutlined />
							Add new row
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Limits;
