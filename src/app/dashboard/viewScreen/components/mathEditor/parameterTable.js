import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Empty, Radio, Select, Tag, Checkbox } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import {
	createSummaryData,
	createVariable,
	selectParamType,
	viewFunctionMap,
	viewParamMap,
} from "../../../../../duck/actions/viewAction";
import {
	hideLoader,
	showLoader,
} from "../../../../../duck/actions/commonActions";
import { isNewView, setMathValue } from "../../../../../duck/actions/viewAction";

let paramType = "";

let count = 0;
let counter = 0;

const ParameterTable = (props) => {
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


	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const [selectedRow, setSelectedRow] = useState([]);
	const [aggregationValue, setAggregationValue] = useState("");
	const [tableData, setTableData] = useState([]);
	const [selectedPrimaryData, setSelectedPrimaryData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [reloadTable, setReloadTable] = useState(true);
	const [checked, setChecked] = useState(null);
	const [parameters, setParameters] = useState({});
	const [variableParam, setVariableParam] = useState({});
	const [fun, setFun] = useState({});
	const [filterTable, setFilterTable] = useState([]);

	const {
		rowDisable,
		variableCreate,
		setVariableCreate,
		parentBatches,
		viewSummaryBatch,
		setViewSummaryBatch,
		ischeckBox,
		viewJson,
		setViewJson,
		varClick,
		setVarClick,
		materialId,
		variableName,
	} = props;

	const dispatch = useDispatch();

	let columns = [
		{
			title: "PARAMETER NAME",
			dataIndex: "parameter_name",
			key: "parameter_name",
			width: 150,
			fixed: "left",
		},
		{
			title: "PRIMARY",
			dataIndex: "primary",
			key: "primary",
			width: 100,
			fixed: "left",
			render: (text, record, index) => {
				return (
					<Radio
						checked={paramType === record.parameter_name}
						onChange={(e) =>
							onRadioChange({
								checked: e.target.checked ? e.target.checked : false,
								type: record.parameter_name,
								primary: "primary",
								record: record,
								index: index,
							})
						}
					></Radio>
				);
			},
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
			},
		},
	];
	const data =
		tableData !== undefined && tableData.length > 0
			? Object.keys(tableData[0])
			: [];
	const uniqueArr = (value, index, self) => {
		return self.indexOf(value) === index;
	};

	const paramColumn = data && data.filter(uniqueArr);

	paramColumn.map((item, i) => {
		if (
			item === "parameter_name" ||
			item === "primary" ||
			item === "aggregation" ||
			item === "id" ||
			item === "key" ||
			item === "sourceType" ||
			item === "coverage"
		) {
			// console.log('i');
		} else {
			columns.push({
				title: item,
				dataIndex: item,
				key: `${item}-4`,
				width: 80,
				render: (value, record, rowIndex) => {
					if (!rowDisable) {
						if (value) {
							return (
								<Checkbox
									className="custom-check"
									onChange={(e) => onChangeBatch(e, record, rowIndex, item)}
									checked={value}
								/>
							);
						} else if (value === "") {
							return (
								<Checkbox
									className="custom-check"
									onChange={(e) => onChangeBatch(e, record, rowIndex, item)}
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
					// else if (value === '') {
					// 	return (
					// 		<Checkbox
					// 			className='custom-check'
					// 			onChange={e => onChangeBatch(e, record, rowIndex, item)}
					// 		/>
					// 	);
					// }
				},
			});
		}
	});

	useEffect(() => {
		if (ischeckBox) {
			setReloadTable(false);
			setIsLoading(true);
			if (ischeckBox) {
				setInterval(() => {
					setReloadTable(true);
					setIsLoading(false);
				}, 300);
			}
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
			setSelectedRow([]);
		}
	}, [varClick]);

	useEffect(() => {
		let varArr = [];
		let varObj = {};
		let variableObj = {};
		if (variableCreate === true) {
			count++;
			const varParameter = [...parameters];
			varParameter.forEach((element) => {
				varArr.push(element);
			});
			variableParam[variableName] = varParameter;
			setVariableParam(variableParam);

			const viewDataJson = [...viewJson];
			viewDataJson.forEach((element, index) => {
				return (element.parameters = variableParam);
			});
			setViewJson(viewDataJson);
			dispatch(createVariable(variableParam));
			dispatch(viewParamMap(variableParam));
			setVariableCreate(false);
			props.getParamData(variableParam);
		}
	}, [variableCreate]);

	useEffect(() => {
		sortArray(props.selectedVar, props.selectedData);
	}, [props.selectedVar]);

	useEffect(() => {
		// sortArray(props.selectedVar, props.selectedData);
		let defination = ''
		let m = Object.values(functions_obj)
		var newArray = m.filter(function (el) {
			return el.name == viewFunctionName;
		}
		);
		if (newArray.length > 0) {
			newArray = newArray[0]
			defination = newArray.defination
			dispatch(setMathValue(defination))
			let response = returnArr(defination, Object.keys(parameter_obj), parameter_obj)
			sortFuctionName(response)
		}
	}, [viewFunctionName]);


	const returnArr = (define, list, param) => {
		let n = list.length
		let selected_var = []

		for (let i = 0; i < n; i++) {
			if (define.includes(list[i]))
				selected_var.push(list[i])
		}

		let m = selected_var.length
		let final_arr = []
		for (let i = 0; i < m; i++) {
			final_arr.push(param[selected_var[i]])
		}

		return [].concat.apply([], final_arr);

	}
	useEffect(() => {
		if (saveFunction) {
			counter++;
			let arr = [];

			let primarySelectedData = { ...selectedPrimaryData };
			let functionTable = [...viewSummaryBatch];

			let new_column_data = newColumnData.map((e) => e.batch_num);
			functionTable.forEach((item) => {
				let obj = {};
				Object.entries(primarySelectedData).forEach(([key, value]) => {
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
			//`{${'V' + counter}}`;
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
			const primaryJson = [...parameters];
			newPrimaryData[index].primary = 1;
			let radioObj = [record];
			radioObj.forEach((element) => {
				element.primary = 0;
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
		newAggrValue[index].aggregation =
			value.value !== undefined ? value.value : "";
		// const aggJson = [...parameters];
		// aggJson[index].aggregation = value.value !== undefined ? value.value : "";
		// setParameters(aggJson);
		setTableData(newAggrValue);
		setAggregationValue(value.value !== undefined ? value.value : "");
	};

	const onChangeBatch = (e, record, rowIndex, key) => {
		setChecked(e.target.checked);
		const batchRecord = [...tableData];

		batchRecord[rowIndex][key] =
			e.target.checked == false ? "" : e.target.checked;

		const batchExcludeJson = [...parameters];
		batchExcludeJson.forEach((element, index) => {
			if (element.parameter_name === record.parameter_name) {
				//batchExc.push(key);
				element.batch_exclude.push(key);
			}
		});
		setParameters(batchExcludeJson);
		setTableData(batchRecord);
	};


	return (
		<>
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
						),
					}}
					//rowKey='key'
					rowSelection={{
						selectedRowKeys,
						onChange: (selectedRowKeys, selectedRows) => {
							let paramArr = [];
							const rowData = [...selectedRows];
							rowData.forEach((element, index) => {
								let paramsObj = {};
								const materialKey = element.key.split("-");
								paramsObj["source_type"] = element.sourceType;
								paramsObj["material_id"] = materialKey[1];
								paramsObj["parameter_name"] = element.parameter_name;
								paramsObj["batch_exclude"] = [];
								paramsObj["priority"] = index;
								paramsObj["aggregation"] = element.aggregation;
								paramArr.push(paramsObj);
							});
							setParameters(paramArr);
							props.callbackCheckbox(true);
							setSelectedRowKeys(selectedRowKeys);
							setSelectedRow(selectedRows);
						},
						getCheckboxProps: (record) => {
							return {
								disabled: rowDisable,
							};
						},
					}}
					columns={columns}
					dataSource={filterTable.length > 0 ? filterTable : tableData}
					size="small"
					scroll={{ y: 450 }}
					pagination={false}
					loading={isLoading}
				/>
			)}
		</>
	);
};

export const MemoizedParameterTable = React.memo(ParameterTable);
