// import React, { useState, useEffect } from 'react';
// import { Table, Empty, Radio, Select, Tooltip, Tag, Checkbox } from 'antd';
// import { useSelector, useDispatch } from 'react-redux';
// const DataTable = props => {
// 	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
// 	const [selectedRow, setSelectedRow] = useState([]);
// 	const [tableData, setTableData] = useState([]);
// 	const [tableColumn, setTableColumn] = useState([]);

// 	const { viewJson, setViewJson } = props;

// 	const selectedTableData = useSelector(
// 		state => state.viewCreationReducer.selectedParamData
// 	);
// 	const batchData = useSelector(
// 		state => state.viewCreationReducer.batchCoverageData
// 	);
// 	useEffect(() => {
// 		if (selectedTableData) {
// 			setTableData(selectedTableData);
// 		}
// 	}, [selectedTableData]);

// 	let columns = [
// 		{
// 			title: 'Parameter',
// 			key: 'parameter_name',
// 			dataIndex: 'parameter_name',
// 			width: 150,
// 			fixed: 'left',
// 		},
// 		{
// 			title: 'Primary',
// 			key: 'primary',
// 			dataIndex: 'primary',
// 			width: 150,
// 			fixed: 'left',
// 			render: (text, record) => {
// 				return <Radio checked></Radio>;
// 			},
// 		},
// 		{
// 			title: 'Aggregation',
// 			key: 'aggregation',
// 			dataIndex: 'aggregation',
// 			width: 150,
// 			fixed: 'left',
// 		},
// 	];
// 	const tablekeys = tableData.length > 0 ? Object.keys(tableData[0]) : [];
// 	const uniqueArr = (value, index, self) => {
// 		return self.indexOf(value) === index;
// 	};
// 	const filterColumn = batchData;

// 	Obje;

// 	filterColumn.map((ele, i) => {
// 		if (ele != 'id' || ele != 'sourceType' || ele != 'key') {
// 			columns.push({
// 				title: ele.toUpperCase().replace('_', ' '),
// 				dataIndex: ele,
// 				key: `${ele}-${i}`,
// 				width: 100,
// 			});
// 		}
// 	});
// 	console.log('filterColumn', filterColumn);
// 	return (
// 		<Table
// 			rowClassName={index =>
// 				index % 2 === 0 ? 'table-row-light' : 'table-row-dark'
// 			}
// 			locale={{
// 				emptyText: (
// 					<Empty
// 						image={Empty.PRESENTED_IMAGE_SIMPLE}
// 						description={
// 							<span>Add parameters from under the Process Hierarchy</span>
// 						}
// 					/>
// 				),
// 			}}
// 			rowKey='key'
// 			rowSelection={{
// 				selectedRowKeys,
// 				onChange: (selectedRowKeys, selectedRows) => {
// 					props.callbackCheckbox(true);
// 					setSelectedRowKeys(selectedRowKeys);
// 					setSelectedRow(selectedRows);
// 				},
// 				// getCheckboxProps: record => {
// 				// 	return {
// 				// 		disabled: rowDisable,
// 				// 	};
// 				// },
// 			}}
// 			columns={columns}
// 			dataSource={[]}
// 			size='small'
// 			scroll={{ y: 450 }}
// 			pagination={false}
// 		/>
// 	);
// };
// export default DataTable;
