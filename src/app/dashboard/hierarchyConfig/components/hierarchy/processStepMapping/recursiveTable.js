import { Select, Table } from "antd";
import React, { memo, useEffect, useState } from 'react';
import { childProcessStep } from "../../../../../../services/viewHierarchyServices";

const testData = [];

const RecursiveTable = memo(function RecursiveTable({ data, steps }) {
	const [stepData, setStepData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [expandedRowKeys, setExpandedRowKeys] = useState([]);
	const [procssStepJson, setProcssStepJson] = useState([]);
	const [tableData, setTableData] = useState([]);



	useEffect(() => {
		setTableData(data)
	}, [data])



	const columns = [
		{
			title: 'Product',
			dataIndex: 'n_mat_no',
			key: 'n_mat_no',

		},
		{
			title: 'Plant',
			dataIndex: 'n_plant',
			key: 'n_plant',

		},
		{
			title: 'Level',
			dataIndex: 'level',
			key: 'level',

		},
		{
			title: 'Description',
			dataIndex: 'n_mat_desc',
			key: 'n_mat_desc',
		},
		{
			title: 'Process step',
			dataIndex: 'process_step',
			key: 'process_step',
			editable: true,
			render: (text, record, index) => {
				return (
					<div className="multi-select">
						<Select
							allowClear
							style={{
								width: '100%',
							}}
							placeholder="Please select"
							value={text}
							onChange={(value) => handleChange(text, record, value, index)}
							options={steps}
						/>
					</div>
				)
			},
		},
	];

	const handleChange = (text, record, value, index) => {
		console.log('text, record, value, index', text, record, value, index);
	}

	const processStepProduct = async (_payload) => {
		setLoading(true)
		const apiRes = await childProcessStep(_payload);

		if (apiRes.status === 200) {
			const resData = apiRes.data
			const expandJson = createHierarchicalJSON(resData, record.uuid);
			console.log("createHierarchicalJSON", JSON.parse(expandJson));
			setStepData(resData);
		} else if (apiRes.status === 400) {
			setSecondLevelData([]);
		} else if (apiRes.status === 404) {
			setSecondLevelData([]);
		}
		setLoading(false)
	}

	function createHierarchicalJSON(data, keyField) {
		const items = {};
		const roots = [];

		for (let i = 0; i < data.length; i++) {
			const item = data[i];
			const itemId = item[keyField];
			const parentId = item.parentId || null;

			if (!items[itemId]) {
				items[itemId] = { ...item, children: [] };
			}

			if (parentId === null) {
				roots.push(items[itemId]);
			} else if (items[parentId]) {
				items[parentId].children.push(items[itemId]);
			}
		}

		return JSON.stringify(roots);
	}



	const onTableRowExpand = (expanded, record) => {
		const keys = [];
		if (expanded) {
			keys.push(record.uuid);
			if (record.level > 0) {
				const _expandProduct = {
					data: record,
					keyword: 'nodes'
				}
				processStepProduct(_expandProduct);
			} else {
				const _expandNode = {
					data: record,
					keyword: 'product_num'
				}
				processStepProduct(_expandNode);
			}


			// const esData = data.map((item) => {
			// 	return { ...item, children: resData };
			// });

		}
		setExpandedRowKeys(keys);
	};

	console.log("tableData", tableData);
	return (
		<Table
			className='expandable-table'
			columns={columns}
			dataSource={tableData}
			pagination={false}
			rowKey={(record) => record.uuid}
			loading={loading}
			expandedRowKeys={expandedRowKeys}
			onExpand={onTableRowExpand}
			expandable={{
				expandedRowRender: () => <RecursiveTable data={stepData} steps={steps} />,
				rowExpandable: (record) => record?.has_child,
			}}

		/>
	);
});


export default RecursiveTable;