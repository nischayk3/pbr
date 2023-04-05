import { Select, Table } from "antd";
import React, { memo, useRef, useState } from 'react';
import { childProcessStep } from "../../../../../services/viewHierarchyServices";

const RecursiveTable = memo(function RecursiveTable({ data, steps }) {
	const [stepData, setStepData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [expandedRowKeys, setExpandedRowKeys] = useState([]);
	const [procssStepJson, setProcssStepJson] = useState([]);

	const tempStatData = useRef();

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
		const apiRes = await childProcessStep(_payload)
		if (apiRes.status === 200) {
			const resData = apiRes.data
			tempStatData.current = apiRes.data;
			const esData = data.map((item) => {
				return { ...item, children: resData };
			});


			// tempData = resData;
			setStepData(resData);
		} else if (apiRes.status === 400) {
			setSecondLevelData([]);
		} else if (apiRes.status === 404) {
			setSecondLevelData([]);
		}
		setLoading(false)
	}



	const onTableRowExpand = (expanded, record) => {
		const newExpandedRowKeys = expanded
			? [...expandedRowKeys, record.uuid]
			: expandedRowKeys.filter((key) => key !== record.uuid);
		setExpandedRowKeys(newExpandedRowKeys);

		if (expanded) {
			tempStatData.current = [];



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


		}
	};

	console.log("data", data)
	console.log("stepdata", stepData)
	return (
		<Table

			className='expandable-table'
			columns={columns}
			dataSource={data}
			pagination={false}
			rowKey="uuid"
			loading={loading}
			// expandedRowKeys={expandedRowKeys}
			onExpand={onTableRowExpand}
			expandable={{
				expandedRowRender: () => <RecursiveTable data={stepData} steps={steps} />,
				rowExpandable: (record) => record?.has_child,
			}}

		/>
	);
});


export default RecursiveTable;