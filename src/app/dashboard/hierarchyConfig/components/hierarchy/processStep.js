/**
 * @author Dinesh Kumar <dinesh.kumar@mareana.com>
 * @Mareana - Release 3.5
 * @version  1
 * @Last Modified - 13 Jan, 2023
 * @Last Changed By - Dinesh Kumar
 */

import { Table } from "antd";
import React, { useEffect, useState } from 'react';
import { childProcessStep } from "../../../../../services/viewHierarchyServices";

const ProcessStepMap = ({ drugName, activeTab }) => {
	const [firstLevelData, setFirstLevelData] = useState([]);
	const [secondLevelData, setSecondLevelData] = useState([]);
	const [expandedData, setExpandedData] = useState([]);
	const [inculdeExcludeData, setInculdeExcludeData] = useState([]);
	const [expandedRowKeys, setExpandedRowKeys] = useState([]);
	const [expandedRowKey, setExpandedRowKey] = useState([]);
	const [editingKey, setEditingKey] = useState('');
	const [loading, setLoading] = useState(false);
	const [expandedTableData, setExpandedTableData] = useState({});



	const isEditing = (record) => record.uuid === editingKey;
	const dataTypeData = [{ field_name: 'Molecule', id: '01' }, { field_name: 'Plant', id: '02' }]

	useEffect(() => {
		const _req = {
			data: {
				ds_name: drugName,
			},
			keyword: "ds_name"
		}

		if (activeTab === 'Process step mapping') {
			processStepDsName(_req);
		}
	}, [activeTab])

	const columns2 = [
		{
			title: 'Product',
			dataIndex: 'n_mat_no',
			key: 'n_mat_no',
			editable: true,
		},
		{
			title: 'Plant',
			dataIndex: 'n_plant',
			key: 'n_plant',
			editable: true,
		},
		{
			title: 'Level',
			dataIndex: 'level',
			key: 'level',
			editable: true,
		},
		{
			title: 'Drug Name',
			dataIndex: 'ds_name',
			key: 'ds_name',
			editable: true,
		},
		{
			title: 'Process step',
			dataIndex: 'process_step',
			key: 'process_step',
			editable: true,
			render: (text, record, index) => {
				return (
					<div className="multi-select">
						{/* <Select
							mode="multiple"
							allowClear
							style={{
								width: '100%',
							}}
							placeholder="Please select"
							value={text}
							onChange={(value) => handleChange(text, record, value, index)}
							options={options}
						/> */}
					</div>
				)
			},
		},


	];


	const expandedRowRender = () => {

		const columns1 = [
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
		];

		const expandRowClick = (expanded, record) => {
			console.log("expandRowByClick", expanded, record);
		}

		const rowExpand = (expanded, record) => {
			console.log("rowExpand expanded, record", expanded, record);
			const keys = [];
			if (expanded) {
				setEditingKey(record.uuid);
				keys.push(record.uuid);
				const _expandReq = {
					data: record,
					keyword: 'nodes'
				}
				processStepNodes(_expandReq);
				isEditing(record);
			} else {
				setEditingKey(record.uuid);
				isEditing(record);
			}
			setExpandedRowKey(keys);
		};


		return (
			<Table
				className="expandable-table__inner"
				expandable={{ expandedRowRender, rowExpandable: (record) => record.has_child }}
				columns={columns1}
				dataSource={secondLevelData}
				expandRowByClick={expandRowClick}
				expandedRowKeys={expandedRowKey}
				onExpand={rowExpand}
				pagination={false}
				rowKey="uuid"
				loading={loading} />
		);
	};

	const onTableRowExpand = (expanded, record) => {
		console.log("expanded, record", expanded, record);
		const keys = [];
		if (expanded) {
			setEditingKey(record.uuid);
			keys.push(record.uuid);
			const _expandReq = {
				data: record,
				keyword: 'product_num'
			}
			processStepProduct(_expandReq);
			isEditing(record);
		} else {
			setEditingKey(record.uuid);
			isEditing(record);
		}
		setExpandedRowKeys(keys);
	};

	const expandRowByClick = (expanded, record) => {
		console.log("expandRowByClick", expanded, record);
	}

	const processStepDsName = async (_payload) => {
		console.log("_payload", _payload);
		const apiRes = await childProcessStep(_payload)
		if (apiRes.status === 200) {

			console.log("apiRes", apiRes);
			setFirstLevelData(apiRes.data)
			// setInitTreeData(apiRes.data)
			// dispatch(showNotification("success", 'success msg'));
		} else if (apiRes.status === 400) {
			// dispatch(showNotification("error", 'error msg'));
		} else if (apiRes.status === 404) {
			// dispatch(showNotification("error", 'error msg'));
		} else {
			// dispatch(showNotification("error", 'error msg'));
		}
	}

	const processStepProduct = async (_payload) => {
		console.log("_payload", _payload);
		const apiRes = await childProcessStep(_payload)
		if (apiRes.status === 200) {
			setSecondLevelData(apiRes.data);
		} else if (apiRes.status === 400) {
			console.log("apiRes", apiRes);
			const data = {
				has_child: false,
				level: 2,
				n_mat_desc: "SODIUM HYDROXIDE 10N BIO",
				n_mat_no: "1176418",
				n_plant: "1255"
			}
			setSecondLevelData([data]);
			//	dispatch(showNotification("error", apiRes?.message));
		} else if (apiRes.status === 404) {
			setSecondLevelData([]);
			//dispatch(showNotification("error", apiRes?.message));
		}
	}

	const processStepNodes = async (_payload) => {
		console.log("_payload", _payload);
		const apiRes = await childProcessStep(_payload)
		if (apiRes.status === 200) {
			setSecondLevelData(apiRes.data);
		} else if (apiRes.status === 400) {

			//	dispatch(showNotification("error", apiRes?.message));
		} else if (apiRes.status === 404) {
			setSecondLevelData([]);
			//dispatch(showNotification("error", apiRes?.message));
		}
	}



	return (
		<>
			<Table
				className='expandable-table'
				columns={columns2}
				expandable={{ expandedRowRender }}
				// onRow={onClickPlantName}
				expandRowByClick={expandRowByClick}
				expandedRowKeys={expandedRowKeys}
				onExpand={onTableRowExpand}
				dataSource={firstLevelData}
				rowKey="uuid"
			/>
		</>
	)
}

export default ProcessStepMap;