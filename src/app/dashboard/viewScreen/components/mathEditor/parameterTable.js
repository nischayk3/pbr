import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, Empty, Radio, Select, Table, Modal, Button, Tag, Input } from "antd";
import { CheckOutlined, CloseOutlined, RightCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import {
	createSummaryData,
	createVariable,
	isNewView,
	selectParamType,
	sendSelectedParamData,
	setMathValue,
	viewFunctionMap,
	viewParamMap
} from "../../../../../duck/actions/viewAction";
import { hideLoader } from "../../../../../duck/actions/commonActions";

let paramType = "";
let counter = 0;

const ParameterTable = ({
	variableCreate,
	setVariableCreate,
	viewSummaryBatch,
	setViewSummaryBatch,
	ischeckBox,
	viewJson,
	setViewJson,
	varClick,
	getParamData,
	selectedData,
	variableName,
	selectedVar,
	callbackCheckbox,
	rowDisable }) => {

	const paramReducer = useSelector((state) => state.viewCreationReducer);
	const isLoadView = useSelector((state) => state.viewCreationReducer.isLoad);
	const selectedTableData = useSelector(
		(state) => state.viewCreationReducer.selectedParamData
	);
	const isNew = useSelector((state) => state.viewCreationReducer.isNew);

	const newColumnData = useSelector(
		(state) => state.viewCreationReducer.newColumn
	);

	const saveFunction = useSelector((state) => state.viewCreationReducer.save);

	const functionName = useSelector(
		(state) => state.viewCreationReducer.functionName
	);
	const viewFunctionName = useSelector(
		(state) => state.viewCreationReducer.viewFunctionName
	);
	const functions_obj = useSelector(
		(state) => state.viewCreationReducer.functions
	);
	const parameter_obj = useSelector(
		(state) => state.viewCreationReducer.parameters
	);
	const totalBatch = useSelector((state) => state.viewCreationReducer.totalMolBatches);
	const totalFileBatch = useSelector((state) => state.viewCreationReducer.totalFileBatches);
	const getBatchData = useSelector((state) => state.viewCreationReducer.batchData)

	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const [tableData, setTableData] = useState([]);
	const [selectedPrimaryData, setSelectedPrimaryData] = useState([]);
	const [reloadTable, setReloadTable] = useState(true);
	const [parameters, setParameters] = useState({});
	const [variableParam, setVariableParam] = useState(
		parameter_obj ? parameter_obj : {}
	);
	const [isBatchTableVisible, setIsBatchTableVisible] = useState(false);
	const [fun, setFun] = useState({});
	const [filterTable, setFilterTable] = useState([]);
	const [molBatchColumn, setMolBatchColumn] = useState([]);
	const [isParamSelected, setIsParamSelected] = useState(true);
	const [totalMolBatch, setTotalMolBatch] = useState([]);


	const Option = Select;
	const { Search } = Input;
	const dispatch = useDispatch();

	let columns = [
		{
			title: "",
			dataIndex: "delete",
			key: "delete",
			width: 40,
			fixed: "left",
			render: (value, record) => <DeleteOutlined onClick={() => deleteParameter(record.key)} className="delete-param" />
		},
		{
			title: "PARAMETER NAME",
			dataIndex: "parameter_name",
			key: "parameter_name",
			width: 150,
			fixed: "left",
			render: (text) => {
				return (
					<div className="treenode-block-batch">
						<div className="tree-block-param-batch">
							<Tag color="geekblue">
								{text}
							</Tag>

						</div>
					</div>
				)
			}
		},
		{
			title: "PRIMARY",
			dataIndex: "primary",
			key: "primary",
			width: 80,
			fixed: "left",
			render: (text, record, index) => {
				return (
					<Radio
						// checked={paramType === record.parameter_name}
						disabled={isParamSelected}
						checked={paramType === record.parameter_name}
						onChange={(e) =>
							onRadioChange({
								checked: e.target.checked ? e.target.checked : false,
								type: record.parameter_name,
								primary: "primary",
								record: record,
								index: index
							})
						}
					></Radio>
				);
			}
		},
		{
			title: "AGGREGATION",
			dataIndex: "aggregation",
			key: "aggregation",
			width: 120,
			fixed: "left",
			render: (text, record, index) => {
				return (
					<Select
						disabled={isParamSelected}
						style={{ width: "100px" }}
						placeholder="Aggregation"
						onChange={(e, value) => {
							handleAggregationChange(text, record, value, index);
						}}
						{...(text && { defaultValue: text })}
					>
						<Option key="1" value="Min">
							Min
						</Option>
						<Option key="2" value="Mean">
							Mean
						</Option>
						<Option key="3" value="Max">
							Max
						</Option>
						<Option key="4" value="First">
							First
						</Option>
						<Option key="5" value="last">
							last
						</Option>
					</Select>
				);
			}
		}
	];

	let batchColumn = [
		{
			title: "BATCHES",
			dataIndex: "batch",
			key: "batch",
			width: 80,
		}
	]

	const data =
		tableData !== undefined && tableData.length > 0
			? Object.keys(tableData[tableData.length - 1])
			: [];

	const uniqueArr = (value, index, self) => {
		return self.indexOf(value) === index;
	};

	const uniqueCol = data && data.filter(uniqueArr);
	const paramColumn = uniqueCol.slice(0, 10)

	paramColumn.map((item) => {
		if (
			item === "parameter_name" ||
			item === "primary" ||
			item === "aggregation" ||
			item === "id" ||
			item === "key" ||
			item === "sourceType" ||
			item === "material_id" ||
			item === "coverage"
		) {
			return console.log('i');
		} else {
			return (
				columns.push({
					title: item,
					dataIndex: item,
					key: `${item}-4`,
					width: 80,
					render: (value, record, rowIndex) => {
						if (rowDisable) {
							if (value) {
								return (
									<Checkbox
										disabled={isParamSelected}
										className="custom-check"
										onChange={(e) => onChangeBatch(e, record, rowIndex, item)}
										checked={value}
									/>
								);
							} else if (value === "") {
								return (
									<Checkbox
										disabled={isParamSelected}
										className="custom-check"
										onChange={(e) => onChangeBatch(e, record, rowIndex, item)}
										checked={value === "" ? false : true}
									/>
								);
							} else {
								return (
									<span className="batchClosed">
										<CloseOutlined />
									</span>
								);
							}
						} else {
							if (value) {
								return (
									<span className="batchChecked">
										<CheckOutlined />
									</span>
								);
							} else {
								return (
									<span className="batchClosed">
										<CloseOutlined />
									</span>
								);
							}
						}
					}
				})
			)
		}
	});

	useEffect(() => {
		if (totalBatch.length > 0 || totalFileBatch.length > 0) {
			setTotalMolBatch([...totalBatch, ...totalFileBatch]);
		}
	}, [totalBatch, totalFileBatch])

	useEffect(() => {
		if (selectedTableData.length > 0) {
			let batchArr = []
			let totalMolBatches = [...totalMolBatch]
			let allMolBatches = totalMolBatches && totalMolBatches.map((e) => e.batch)

			totalMolBatches && totalMolBatches.forEach((ele) => {

				let batchObj = {}
				selectedTableData.forEach((item) => {
					Object.entries(item).forEach(([key, value]) => {
						if (key === ele.batch) {
							if (allMolBatches.includes(key)) {

								batchObj[item.parameter_name] = value;
							}
						}
					})
				})
				batchArr.push(batchObj)
			})

			const molBatchMerge = totalMolBatches.map((item, i) =>
				Object.assign({}, item, batchArr[i])
			);



			if (molBatchMerge.length > 0) {
				const molObjKey = molBatchMerge !== undefined && molBatchMerge.length > 0 ? Object.keys(molBatchMerge[0]) : []
				const molColumn = molObjKey.filter(uniqueArr);
				molColumn.map((ele, i) => {
					if (ele !== 'batch') {
						return (
							batchColumn.push({
								title: (
									<div className="treenode-block-batch">
										<div className="tree-block-param-batch">
											<Tag color="geekblue">
												{ele}
											</Tag>

										</div>
									</div>
								),
								dataIndex: ele,
								key: `${ele}-${i}`,
								width: 80,
								render: (value, record, rowIndex) => {
									if (rowDisable) {
										if (value) {
											return (
												<Checkbox
													disabled={isParamSelected}
													className="custom-check"
													onChange={(e) => onChangeBatch(e, record, rowIndex, ele)}
													checked={value}
												/>
											);
										} else if (value === "") {
											return (
												<Checkbox
													disabled={isParamSelected}
													className="custom-check"
													onChange={(e) => onChangeBatch(e, record, rowIndex, ele)}
													checked={value === "" ? false : true}
												/>
											);
										} else {
											return (
												<span className="batchClosed">
													<CloseOutlined />
												</span>
											);
										}
									} else {
										if (value) {
											return (
												<span className="batchChecked">
													<CheckOutlined />
												</span>
											);
										} else {
											return (
												<span className="batchClosed">
													<CloseOutlined />
												</span>
											);
										}
									}

								}
							})
						)
					}
				})
			}
			setMolBatchColumn([...batchColumn])

		}

		// if (Object.keys(getBatchData).length > 0) {
		// 	let batchArr = []
		// 	let allMolBatches = molBatches && molBatches.map((e) => e.batch)
		// 	let totalMolBatches = molBatches
		// 	totalMolBatches && totalMolBatches.forEach((ele) => {
		// 		let batchObj = {}
		// 		Object.entries(getBatchData.batches).forEach(([key, value]) => {
		// 			if (key === ele.batch) {
		// 				if (allMolBatches.includes(key)) {
		// 					// batchObj['batch'] = key;
		// 					batchObj[getBatchData.parameter_name] = value;
		// 				}
		// 			}
		// 		})
		// 		batchArr.push(batchObj)
		// 	})

		// 	const molBatchMerge = totalMolBatches.map((item, i) =>
		// 		Object.assign({}, item, batchArr[i])
		// 	);
		// 	setMolBatches(molBatchMerge)

		// 	if (molBatchMerge.length > 0) {
		// 		const molObjKey = molBatchMerge !== undefined && molBatchMerge.length > 0 ? Object.keys(molBatchMerge[0]) : []
		// 		const molColumn = molObjKey.filter(uniqueArr);
		// 		molColumn.map((ele, i) => {
		// 			if (ele !== 'batch') {
		// 				return (
		// 					batchColumn.push({
		// 						title: (
		// 							<div className="treenode-block-batch">
		// 								<div className="tree-block-param-batch">
		// 									<Tag color="geekblue">
		// 										{ele}
		// 									</Tag>

		// 								</div>
		// 							</div>
		// 						),
		// 						dataIndex: ele,
		// 						key: `${ele}-${i}`,
		// 						width: 80,
		// 						render: (value, record, rowIndex) => {
		// 							if (rowDisable) {
		// 								if (value) {
		// 									return (
		// 										<Checkbox
		// 											disabled={isParamSelected}
		// 											className="custom-check"
		// 											onChange={(e) => onChangeBatch(e, record, rowIndex, ele)}
		// 											checked={value}
		// 										/>
		// 									);
		// 								} else if (value === "") {
		// 									return (
		// 										<Checkbox
		// 											disabled={isParamSelected}
		// 											className="custom-check"
		// 											onChange={(e) => onChangeBatch(e, record, rowIndex, ele)}
		// 											checked={value === "" ? false : true}
		// 										/>
		// 									);
		// 								} else {
		// 									return (
		// 										<span className="batchClosed">
		// 											<CloseOutlined />
		// 										</span>
		// 									);
		// 								}
		// 							} else {
		// 								if (value) {
		// 									return (
		// 										<span className="batchChecked">
		// 											<CheckOutlined />
		// 										</span>
		// 									);
		// 								} else {
		// 									return (
		// 										<span className="batchClosed">
		// 											<CloseOutlined />
		// 										</span>
		// 									);
		// 								}
		// 							}

		// 						}
		// 					})
		// 				)
		// 			}
		// 		})
		// 	}
		// 	setMolBatchColumn([...batchColumn])
		// }
	}, [getBatchData, selectedTableData, totalMolBatch])

	useEffect(() => {
		if (ischeckBox) {
			setReloadTable(false);

			setInterval(() => {
				setReloadTable(true);

			}, 300);
		}
	}, [ischeckBox]);

	useEffect(() => {
		if (paramReducer.selectedParamData) {
			setTableData([...selectedTableData]);
		}
	}, [paramReducer]);

	useEffect(() => {
		if (isLoadView) {
			//	onChangeColumnsHandler();
			setTableData([...selectedTableData]);
		}
	}, [isLoadView]);

	useEffect(() => {
		if (!isNew) {
			//	onChangeColumnsHandler();
			setTableData([]);
			setFilterTable([]);
			dispatch(isNewView(true));
		}
	}, [!isNew]);

	useEffect(() => {
		if (!varClick) {
			setSelectedRowKeys([]);
		}
	}, [varClick]);

	useEffect(() => {
		let count = 0;
		let varArr = [];
		if (variableCreate) {
			count++;
			const varParameter = [...parameters];
			varParameter.forEach((element) => {
				varArr.push(element);
			});
			variableParam[variableName] = varParameter;
			setVariableParam(variableParam);

			const viewDataJson = [...viewJson];
			viewDataJson.forEach((element) => {
				return (element.parameters = variableParam);
			});
			setViewJson(viewDataJson);
			dispatch(createVariable(variableParam));
			dispatch(viewParamMap(variableParam));
			setVariableCreate(false);
			getParamData(variableParam);
		}
	}, [variableCreate]);

	useEffect(() => {
		sortArray(selectedVar, selectedData);
	}, [selectedVar]);

	useEffect(() => {
		// sortArray(props.selectedVar, props.selectedData);
		let defination = "";
		let m = Object.values(functions_obj);
		var newArray = m.filter(function (el) {
			return el.name == viewFunctionName;
		});
		if (newArray.length > 0) {
			newArray = newArray[0];
			defination = newArray.defination;
			dispatch(setMathValue(defination));
			let response = returnArr(
				defination,
				Object.keys(parameter_obj),
				parameter_obj
			);
			sortFuctionName(response);
		}
	}, [viewFunctionName]);

	const returnArr = (define, list, param) => {
		let n = list.length;
		let selected_var = [];

		for (let i = 0; i < n; i++) {
			if (define.includes(list[i])) selected_var.push(list[i]);
		}

		let m = selected_var.length;
		let final_arr = [];
		for (let i = 0; i < m; i++) {
			final_arr.push(param[selected_var[i]]);
		}

		return [].concat.apply([], final_arr);
	};

	useEffect(() => {
		if (saveFunction) {

			counter++;
			let arr = [];

			let primarySelectedData;
			if (Object.keys(selectedPrimaryData).length > 0) {
				primarySelectedData = { ...selectedPrimaryData };
			} else {
				const viewLoadJson = [...viewJson];
				const allParameter = viewLoadJson[0].all_parameters
				primarySelectedData = { ...allParameter && allParameter[0] }

			}

			let functionTable = [...viewSummaryBatch];
			let new_column_data = newColumnData.map((e) => e.batch_num);
			functionTable.forEach((item) => {
				let obj = {};
				Object.entries(primarySelectedData).forEach(([key]) => {
					if (key === item.batch) {
						if (new_column_data.includes(key)) obj[functionName] = true;
						else obj[functionName] = false;
					}
				});
				arr.push(obj);
			});

			const arr3 = functionTable.map((item, i) =>
				Object.assign({}, item, arr[i])
			);

			setViewSummaryBatch(arr3);
			dispatch(createSummaryData(arr3));

			primarySelectedData.parameter_name = functionName;

			let funObj1 = {};
			funObj1["name"] = functionName;
			funObj1["defination"] = paramReducer.funDetails;
			fun[counter] = funObj1;

			const varData = [...viewJson];
			varData.forEach((element) => {
				element.functions = fun;
			});

			dispatch(viewFunctionMap(fun));
		}
	}, [saveFunction]);

	const onRadioChange = ({ checked, type, primary, record, index }) => {
		if (checked) {
			const newPrimaryData = [...tableData];
			newPrimaryData[index].primary = 1;
			let radioObj = [record];
			radioObj.forEach((element) => {
				element.primary = index;
			});

			setTableData(newPrimaryData);
			setSelectedPrimaryData(radioObj[0]);
			dispatch(selectParamType(type));
			paramType = type;
		}
	};

	const sortFuctionName = (selectedData) => {
		let filterData = [...tableData];
		var parameterArray =
			selectedData &&
			selectedData.map(function (el) {
				return el.parameter_name;
			});
		if (parameterArray && parameterArray.length > 0) {
			let selected_row = [];
			for (let i = 0; i < parameterArray.length; i++) {
				let itemToFind = parameterArray[i];
				let foundIdx = filterData.findIndex(
					(el) => el.parameter_name == itemToFind
				);
				let itemToInsert = filterData[foundIdx];
				selected_row.push(itemToInsert.key);
				filterData.splice(foundIdx, 1);
				filterData.unshift(itemToInsert);
			}
			setSelectedRowKeys(selected_row);
		}
		setFilterTable(filterData);
		dispatch(hideLoader());
	};

	const sortArray = (selectedVar, selectedData) => {
		let filterData = [...tableData];

		var parameterArray =
			selectedData &&
			selectedData[selectedVar] &&
			selectedData[selectedVar].map(function (el) {
				return el.parameter_name;
			});

		if (parameterArray && parameterArray.length > 0) {
			paramType = parameterArray[0];
			let selected_row = [];
			for (let i = 0; i < parameterArray.length; i++) {
				let itemToFind = parameterArray[i];
				let foundIdx = filterData.findIndex(
					(el) => el.parameter_name == itemToFind
				);
				let itemToInsert = filterData[foundIdx];
				selected_row.push(itemToInsert.key);
				filterData.splice(foundIdx, 1);
				filterData.unshift(itemToInsert);
			}
			setSelectedRowKeys(selected_row);
		}
		setFilterTable(filterData);
		dispatch(hideLoader());
	};

	const handleAggregationChange = (text, record, value, index) => {
		let newAggrValue = [...tableData];
		let newParamArr = [...parameters]
		let param_name = newAggrValue[index].parameter_name
		newAggrValue[index].aggregation =
			value.value !== undefined ? value.value : value;
		for (var i = 0; i < newParamArr.length; i++) {
			if (newParamArr[i].parameter_name == param_name) {
				newParamArr[i].aggregation = value.value !== undefined ? value.value : value;
			}
		}
		setParameters(newParamArr);
		setTableData(newAggrValue);
	};

	const onChangeBatch = (e, record, rowIndex, key) => {

		const batchRecord = [...tableData];
		batchRecord[rowIndex][key] = e.target.checked == false ? "" : e.target.checked;

		const batchExcludeJson = [...parameters];
		batchExcludeJson.forEach((element) => {

			if (element.parameter_name === record.parameter_name) {
				element.batch_exclude.push(key);
			}
		});

		setParameters(batchExcludeJson);
		setTableData(batchRecord);
	};

	const isModalBatch = (e) => {
		setIsBatchTableVisible(true);

	}

	const handleTableCancel = () => {
		setIsBatchTableVisible(false);
	}

	const TableSearch = value => {
		const tableDataSearch = [...totalMolBatch];
		const searchTable = tableDataSearch.filter(o =>
			Object.keys(o).some(k =>
				String(o[k]).toLowerCase().includes(value.toLowerCase())
			)

		);
		setTotalMolBatch(searchTable);
	};

	const deleteParameter = (id) => {
		const deleteRecord = tableData.filter(item => item.key !== id)
		setTableData(deleteRecord)
		dispatch(sendSelectedParamData(deleteRecord));
	}
	return (
		<>
			<div className="param-table">
				<div className="param-column">
					<span onClick={(e) => isModalBatch(e)}>
						<RightCircleOutlined className="right-circle" />
					</span>
				</div>
				{reloadTable && (
					<Table
						rowClassName={(index) =>
							index % 2 === 0 ? "table-row-light" : "table-row-dark"
						}
						locale={{
							emptyText: (
								<Empty
									image={Empty.PRESENTED_IMAGE_SIMPLE}
									description={
										<span>Add parameters from under the Process Hierarchy</span>
									}
								/>
							)
						}}
						//rowKey='key'
						rowSelection={{
							selectedRowKeys,
							onChange: (selectedRowKeys, selectedRows) => {
								let paramArr = [];
								const rowData = [...selectedRows];
								rowData.forEach((element, index) => {
									let paramsObj = {};
									paramsObj["source_type"] = element.sourceType;
									paramsObj["material_id"] = element.material_id
									paramsObj["parameter_name"] = element.parameter_name;
									paramsObj["batch_exclude"] = [];
									paramsObj["priority"] = index;
									paramsObj["aggregation"] = element.aggregation;
									paramArr.push(paramsObj);
								});
								setParameters(paramArr);
								callbackCheckbox(true);
								setIsParamSelected(false);
								setSelectedRowKeys(selectedRowKeys);
							},
							// getCheckboxProps: (record) => {
							// 	return {
							// 		disabled: rowDisable
							// 	};
							// }
						}}
						columns={columns}
						dataSource={filterTable.length > 0 ? filterTable : tableData}
						size="small"
						scroll={{ y: 450 }}
						pagination={false}

						className="custom-param-table"
					/>
				)}
			</div>
			<Modal
				title={(
					<Search
						placeholder='Search'
						allowClear
						//enterButton='Search'
						// size='large'
						onSearch={TableSearch}
					/>
				)}
				width={700}
				visible={isBatchTableVisible}
				onCancel={handleTableCancel}
				footer={null}
				className="batch-modal"
			>
				<div className="batch-table-block">

					<Table
						columns={molBatchColumn}
						dataSource={totalMolBatch}
						size="small"
						scroll={{ y: 450 }}
						rowClassName={(index) =>
							index % 2 === 0 ? "table-row-light" : "table-row-dark"
						}
					/>
					<div className="batch-table-footer">
						<Button
							onClick={handleTableCancel}
							type="text"
							className="custom-primary-btn "
						>
							Apply
						</Button>
						<Button
							onClick={handleTableCancel}
							type="text"
							className="custom-primary-btn "
						>
							Back
						</Button>
					</div>
				</div>
			</Modal>
		</>
	);
};

export const MemoizedParameterTable = React.memo(ParameterTable);
