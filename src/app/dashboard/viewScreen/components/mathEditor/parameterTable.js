import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Empty, Radio, Select, Tooltip, Tag, Checkbox } from 'antd';
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
const ParameterTable = props => {
	console.log('propsssss parameter table data', props);
	const paramReducer = useSelector(state => state.viewCreationReducer);
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

	const paramName = useSelector(
		state => state.viewCreationReducer.selectedParamType
	);

	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const [selectedRow, setSelectedRow] = useState([]);
	const [aggregationValue, setAggregationValue] = useState('');
	const [tableData, setTableData] = useState([]);
	const [tableColumn, setTableColumn] = useState([]);
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
		ischeckBox,
		viewJson,
		setViewJson,
	} = props;
	const dispatch = useDispatch();
	const tableColumns = [
		{
			title: 'Parameter',
			key: 'parameter_name',
			dataIndex: 'parameter_name',
			width: 150,
			fixed: 'left',
			// render: (param, record, index) => (
			// 	<Tooltip title={param}>
			// 		<Tag
			// 			color='geekblue'
			// 			className='parameter-tag'
			// 			// onClick={() => {
			// 			// 	functionId.current = record.id;
			// 			// 	functionPassHandler(record, index);
			// 			// }}
			// 		>
			// 			{param}
			// 		</Tag>
			// 	</Tooltip>
			// ),
		},
		{
			title: 'Primary',
			key: 'primary',
			dataIndex: 'primary',
			width: 150,
			fixed: 'left',
			render: (text, record) => {
				// console.log('selectedParamType', selectedParamType);
				// console.log('batchData radio', batchData);
				// console.log('rowDisable radio', rowDisable);
				// console.log('tableColumn radio', tableColumn);
				return (
					<Radio
						checked={paramType === record.parameter_name}
						onChange={e =>
							onRadioChange({
								checked: e.target.checked,
								type: record.parameter_name,
								primary: 'primary',
								record: record,
							})
						}></Radio>
				);
			},
		},
		{
			title: 'Aggregation',
			key: 'aggregation',
			dataIndex: 'aggregation',
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
						//value={aggregationValue}
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
		},
	];

	useEffect(() => {
		if (ischeckBox) {
			console.log('ischeckBox', ischeckBox);
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

	useEffect(() => {
		onChangeColumnsHandler();
	}, [batchData]);

	useEffect(() => {
		if (selectedTableData) {
			setTableData(selectedTableData);
		}
	}, [selectedTableData]);

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

			const viewDataJson = [...viewJson.data];
			viewDataJson.forEach(element => {
				element.parameters = var1;
			});
			console.log('variable', variable, var1);
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
			let functionTable = [...parentBatches];
			functionTable.forEach(item => {
				let obj = {};
				obj['year'] = item.batch_year;
				obj['batch'] = item.batch;
				Object.entries(primarySelectedData).forEach(([key, value], index) => {
					if (key === item.batch) {
						obj[functionName] = value;
					}
				});
				arr.push(obj);
			});

			primarySelectedData.parameter_name = functionName;
			fun['name'] = functionName;
			fun['definition'] = `${'V' + counter}`;
			console.log('functionnnnnn', fun);
			const varData = [...viewJson];
			varData.forEach(element => {
				element.functions = fun;
			});
			dispatch(createSummaryData(arr));
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
		console.log('value record', value, record, rowIndex, key);
		let batchRecord = [...tableData];
		batchRecord[rowIndex][key] = value;
		console.log('b1', batchRecord);
		console.log('b2', batchRecord[rowIndex]);
		console.log('b3', batchRecord[rowIndex][key]);
		setisBatchCheck(value);
		setTableData(batchRecord);
	};

	const onChangeColumnsHandler = () => {
		let columns = [];

		Object.entries(batchData && batchData).map(([key, value], index) => {
			let obj = {
				title: key,
				key: index,
				dataIndex: key,
				width: 100,
				render: (value, record, rowIndex) => {
					// console.log(
					// 	'valueeeee',
					// 	value,
					// 	ischeckBox,
					// 	isCheck,
					// 	isBatchCheck,
					// 	key
					// );
					if (isCheck === true) {
						// console.log('if', isCheck);
						if (value) {
							return (
								<Checkbox
									className='custom-check'
									checked={isBatchCheck ? isBatchCheck : isCheck}
									onChange={(e, value) =>
										onChangeBatch(e.target.checked, record, rowIndex, key)
									}
								/>
							);
						} else {
							return (
								<span className='batchClosed'>
									<CloseOutlined />
								</span>
							);
						}
					} else {
						console.log('else');
						return value ? (
							<span className='batchChecked'>
								<CheckOutlined />
							</span>
						) : (
							<span className='batchClosed'>
								<CloseOutlined />
							</span>
						);
					}
				},
			};
			columns.push(obj);
		});

		if (tableColumns.length === 3) {
			let data = [...tableColumns, ...columns];

			setTableColumn(data);
		}
	};

	// const selectRow = record => {
	// 	console.log('select row', record);
	// 	const selectedRowKey = [...selectedRowKeys];
	// 	if (selectedRowKey.indexOf(record.key) >= 0) {
	// 		selectedRowKey.splice(selectedRowKey.indexOf(record.key), 1);
	// 	} else {
	// 		selectedRowKey.push(record.key);
	// 	}
	// 	setSelectedRowKeys(selectedRowKey);
	// };

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
					columns={[...tableColumn]}
					dataSource={[...tableData]}
					size='small'
					scroll={{ y: 450 }}
					pagination={false}
					loading={isLoading}
				/>
			)}
		</>
	);
};

export default ParameterTable;
