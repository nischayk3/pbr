import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Empty, Radio, Select, Tooltip, Tag } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import {
	createSummaryData,
	createVariable,
} from '../../../../../duck/actions/viewAction';

let paramType = '';
const ParameterTable = props => {
	console.log('props param', props);
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
	console.log('saveFunction', saveFunction);
	console.log('saveAsFunction', saveAsFunction);
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const [selectedRow, setSelectedRow] = useState([]);
	const [aggregationValue, setAggregationValue] = useState('');
	const [tableData, setTableData] = useState([]);
	const [tableColumn, setTableColumn] = useState([]);
	const [selectedPrimaryData, setSelectedPrimaryData] = useState([]);

	const { rowDisable, variableCreate, parentBatches } = props;
	const dispatch = useDispatch();
	const tableColumns = [
		{
			title: 'Parameter',
			key: 'parameter_name',
			dataIndex: 'parameter_name',
			width: 150,
			fixed: 'left',
			render: (param, record, index) => (
				<Tooltip title={param}>
					<Tag
						color='geekblue'
						className='parameter-tag'
						// onClick={() => {
						// 	functionId.current = record.id;
						// 	functionPassHandler(record, index);
						// }}
					>
						{param}
					</Tag>
				</Tooltip>
			),
		},
		{
			title: 'Primary',
			key: 'primary',
			dataIndex: 'primary',
			width: 150,
			fixed: 'left',
			render: (text, record) => {
				return (
					<Radio
						// disabled={rowDisable}
						checked={paramType === record.parameter_name}
						onChange={e =>
							onRadioChange({
								checked: e.target.checked,
								type: record.parameter_name,
								primary: 'primary',
								record: record,
							})
						}>
						{text}
					</Radio>
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
		onChangeColumnsHandler();
	}, [batchData]);

	useEffect(() => {
		setTableData(selectedTableData);
	}, [selectedTableData]);

	useEffect(() => {
		if (variableCreate) {
			dispatch(createVariable(selectedRow));
		}
	}, [variableCreate]);

	useEffect(() => {
		if (saveFunction === true) {
			let arr = [];

			let varData = [...selectedRow];
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
			console.log('arrrrr', arr);
			primarySelectedData.parameter_name = functionName;
			dispatch(createSummaryData(arr));
		}
	}, [saveFunction]);

	const onRadioChange = ({ checked, type, primary, record }) => {
		console.log('on radio checked', checked);
		console.log('on radio type', type);
		console.log('on radio record', record);
		setSelectedPrimaryData(record);
		paramType = type;
	};

	const handleAggregationChange = (record, value, index) => {
		let newAggrValue = [...tableData];
		newAggrValue[index].aggregation = value.value;
		setTableData(newAggrValue);
		setAggregationValue(value.value);
	};

	const onChangeColumnsHandler = () => {
		let columns = [];

		Object.entries(batchData && batchData).map(([key, value], index) => {
			let obj = {
				title: key,
				key: index,
				dataIndex: key,
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
			};
			columns.push(obj);
		});

		if (tableColumns.length === 3) {
			let data = [...tableColumns, ...columns];

			setTableColumn(data);
		}
	};

	const selectRow = record => {
		const selectedRowKey = [...selectedRowKeys];
		if (selectedRowKey.indexOf(record.key) >= 0) {
			selectedRowKey.splice(selectedRowKey.indexOf(record.key), 1);
		} else {
			selectedRowKey.push(record.key);
		}
		setSelectedRowKeys(selectedRowKey);
	};
	console.log('selectedPrimaryData', selectedPrimaryData);
	return (
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
					console.log(
						'selectedRowKeys, selectedRows',
						selectedRowKeys,
						selectedRows
					);
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
			onRow={record => ({
				onClick: () => {
					selectRow(record);
				},
			})}
		/>
	);
};

export default ParameterTable;
