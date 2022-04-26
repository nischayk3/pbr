import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Empty, Radio, Select, Tag, Checkbox } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import {
	createSummaryData,
	createVariable,
	selectParamType,
	viewFunctionMap,
	viewParamMap,
} from '../../../../../duck/actions/viewAction';

let paramType = '';
let isCheck = '';
let count = 0;
let counter = 0;
let batchExcArr = [];
const ParameterTable = props => {
	const paramReducer = useSelector(state => state.viewCreationReducer);
	const isLoadView = useSelector(state => state.viewCreationReducer.isLoad);
	const selectedTableData = useSelector(
		state => state.viewCreationReducer.selectedParamData
	);
	const batchData = useSelector(
		state => state.viewCreationReducer.batchCoverageData
	);
	const saveFunction = useSelector(state => state.viewCreationReducer.save);
	const saveAsFunction = useSelector(state => state.viewCreationReducer.saveAs);
	const functionName = useSelector(
		state => state.viewCreationReducer.functionName
	);
	const summaryTableData = useSelector(
		state => state.viewCreationReducer.summaryTableData
	);
	const paramName = useSelector(
		state => state.viewCreationReducer.selectedParamType
	);

	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const [selectedRow, setSelectedRow] = useState([]);
	const [aggregationValue, setAggregationValue] = useState('');
	const [tableData, setTableData] = useState([]);

	const [selectedPrimaryData, setSelectedPrimaryData] = useState([]);
	const [selectedParamType, setSelectedParamType] = useState('');
	//const [count, setCount] = useState('1');
	const [isBatchCheck, setisBatchCheck] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [reloadTable, setReloadTable] = useState(true);

	const {
		rowDisable,
		variableCreate,
		parentBatches,
		viewSummaryBatch,
		setViewSummaryBatch,
		ischeckBox,
		viewJson,
		setViewJson,
		varClick,
		setVarClick,
	} = props;

	console.log('param propssss', props);
	const dispatch = useDispatch();

	let columns = [];
	const data =
		tableData !== undefined && tableData.length > 0
			? Object.keys(tableData[0])
			: [];
	const uniqueArr = (value, index, self) => {
		return self.indexOf(value) === index;
	};

	const paramColumn = data && data.filter(uniqueArr);

	paramColumn.map((item, i) => {
		if (item === 'parameter_name') {
			columns.push({
				title: item.toUpperCase().replace('_', ' '),
				dataIndex: item,
				key: `${item}-${i}`,
				width: 150,
				fixed: 'left',
			});
		} else if (item === 'primary') {
			columns.push({
				title: item.toUpperCase().replace('_', ' '),
				dataIndex: item,
				key: `${item}-${i}`,
				width: 80,
				fixed: 'left',
				render: (text, record) => {
					return (
						<Radio
							checked={paramType === record.parameter_name}
							onChange={e =>
								onRadioChange({
									checked: e.target.checked ? e.target.checked : false,
									type: record.parameter_name,
									primary: 'primary',
									record: record,
								})
							}></Radio>
					);
				},
			});
		} else if (item === 'aggregation') {
			columns.push({
				title: item.toUpperCase().replace('_', ' '),
				dataIndex: item,
				key: `${item}-${i}`,
				width: 150,
				fixed: 'left',
				render: (text, record, index) => {
					return (
						<Select
							// disabled={rowDisable}
							style={{ width: '100px' }}
							placeholder='Aggregation'
							onChange={(e, value) => {
								handleAggregationChange(record, value, index);
							}}
							//	value={aggregationValue}
						>
							<Option key='1' value='Min'>
								Min
							</Option>
							<Option key='2' value='Mean'>
								Mean
							</Option>
							<Option key='3' value='Max'>
								Max
							</Option>
							<Option key='4' value='First'>
								First
							</Option>
							<Option key='5' value='last'>
								last
							</Option>
						</Select>
					);
				},
			});
		} else if (
			item === 'id' ||
			item === 'key' ||
			item === 'sourceType' ||
			item === 'coverage'
		) {
			console.log('itemmmmmm');
		} else {
			columns.push({
				title: item,
				dataIndex: item,
				key: `${item}-${i}`,
				width: 100,
				render: value =>
					value ? (
						<span className='batchChecked'>
							<CheckOutlined />
						</span>
					) : (
						<span className='batchClosed'>
							<CloseOutlined />
						</span>
					),
			});
		}
	});

	useEffect(() => {
		if (ischeckBox) {
			isCheck = ischeckBox;
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

	// useEffect(() => {
	// 	onChangeColumnsHandler();
	// }, [batchData]);

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
		if (varClick) {
			console.log('var clickkkkkkkk', varClick);
			setSelectedRowKeys([]);
			setSelectedRow([]);
		}
	}, [varClick]);

	useEffect(() => {
		let variable = [];
		let var1 = {};
		if (variableCreate) {
			count++;
			let row = [...selectedRow];
			row.forEach((item, index) => {
				let paramObj = {};
				let materialId = item.key.split('-');
				paramObj['source_type'] = item.sourceType;
				paramObj['material_id'] = materialId[1];
				paramObj['parameter_name'] = item.parameter_name;
				paramObj['batch_exclude'] = [];
				paramObj['aggregation'] = item.aggregation;
				variable.push(paramObj);
			});

			var1[`${'V' + count}`] = variable;

			const viewDataJson = [...viewJson];

			viewDataJson.forEach(element => {
				element.parameters = var1;
			});

			setViewJson(viewDataJson);
			dispatch(createVariable(selectedRow));
			dispatch(viewParamMap(var1));
		}
	}, [variableCreate]);

	useEffect(() => {
		if (saveFunction === true) {
			counter++;
			let arr = [];
			let fun = {};
			let primarySelectedData = { ...selectedPrimaryData };
			let functionTable = [...viewSummaryBatch];
			functionTable.forEach(item => {
				let obj = {};
				Object.entries(primarySelectedData).forEach(([key, value]) => {
					if (key === item.batch) {
						obj[functionName] = value;
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
			fun['name'] = functionName;
			fun['definition'] = `${'V' + counter}`;

			const varData = [...viewJson];
			varData.forEach(element => {
				element.functions = fun;
			});

			dispatch(viewFunctionMap(fun));
		}
	}, [saveFunction]);

	useEffect(() => {
		setSelectedParamType(paramName);
	}, [paramName]);
	const onRadioChange = ({ checked, type, primary, record }) => {
		setSelectedPrimaryData(record);
		dispatch(selectParamType(type));
		paramType = type;
	};

	const handleAggregationChange = (record, value, index) => {
		let newAggrValue = [...tableData];
		newAggrValue[index].aggregation = value.value;
		setTableData(newAggrValue);
		setAggregationValue(value.value);
	};

	const onChangeBatch = (value, record, rowIndex, key) => {
		let batchExcObj = {};
		let batchRecord = [...tableData];
		batchRecord[rowIndex][key] = value;

		const selectedRowData = [...selectedRow];
		// if (selectedRow.length > 0) {
		// 	console.log(
		// 		'selectedRow',

		// 		selectedRow
		// 	);
		// }
		// console.log(
		// 	'viewJson',
		// 	selectedRowData,
		// 	selectedRow,
		// 	tableData,
		// 	selectedPrimaryData
		// );
		// selectedRow.forEach((item, index) => {
		// 	console.log(
		// 		'item.parameter_name ,record.parameter_name',
		// 		item.parameter_name,
		// 		record.parameter_name
		// 	);
		// 	if (item.parameter_name === record.parameter_name) {
		// 		batchExcArr.push(key);
		// 	}
		// 	batchExcObj[record.parameter_name] = batchExcArr;
		// 	console.log('batchExcArr', batchExcArr);
		// 	console.log('batchExcObj', batchExcObj);
		// });
		setisBatchCheck(value);
		setTableData(batchRecord);
	};

	return (
		<>
			{reloadTable && (
				<Table
					rowClassName={index =>
						index % 2 === 0 ? 'table-row-light' : 'table-row-dark'
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
					rowKey='key'
					rowSelection={{
						selectedRowKeys,
						onChange: (selectedRowKeys, selectedRows) => {
							props.callbackCheckbox(true);
							setSelectedRowKeys(selectedRowKeys);
							setSelectedRow(selectedRows);
						},
						getCheckboxProps: record => {
							return {
								disabled: rowDisable,
							};
						},
					}}
					columns={columns && columns.reverse()}
					dataSource={tableData}
					size='small'
					scroll={{ y: 450 }}
					pagination={false}
					loading={isLoading}
				/>
			)}
		</>
	);
};

export const MemoizedParameterTable = React.memo(ParameterTable);
