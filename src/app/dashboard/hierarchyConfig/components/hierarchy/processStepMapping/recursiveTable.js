import { Select, Table } from "antd";
import React, { memo, useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { showNotification } from "../../../../../../duck/actions/commonActions";
import { childProcessStep } from "../../../../../../services/viewHierarchyServices";
const RecursiveTable = memo(function RecursiveTable({ data, steps, finalJson, setFinalJson }) {
	const [tableData, setTableData] = useState([]);
	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();

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
		const tableRecord = [...tableData]
		const tableJson = [...finalJson?.children]
		const jsonObj = {
			ds_name: finalJson?.ds_name,
			process_step: finalJson?.process_step,
			uuid: finalJson?.uuid,
		}
		const finalProcessStep = updateData(tableJson, record?.uuid, 'process-step', value)
		const newProcessStep = updateData(tableRecord, record?.uuid, 'process-step', value)

		const objMerge = {
			ds_name: jsonObj?.ds_name,
			process_step: jsonObj?.process_step,
			uuid: jsonObj?.uuid,
			children: [...finalProcessStep]
		}

		setTableData(newProcessStep)
		setFinalJson(objMerge)
	}

	const updateData = (data, uuid, key, value) => {
		return data.map((item) => {
			if (item.uuid === uuid) {
				return { ...item, [key]: value };
			} else if (item?.children?.length > 0) {
				return { ...item, children: updateData(item.children, uuid, key, value) };
			}
			return item;
		});
	};



	const processStepProduct = async (_payload) => {
		setLoading(true)
		const apiRes = await childProcessStep(_payload);
		setLoading(false)
		if (apiRes.status === 200) {
			const resData = apiRes.data.children
			setFinalJson(apiRes.data);
			setTableData(resData)
		} else if (apiRes.status === 400) {
			setFinalJson({});
			setTableData([]);
			dispatch(showNotification("error", apiRes.message));
		} else if (apiRes.status === 404) {
			setFinalJson({});
			setTableData([]);
			dispatch(showNotification("error", apiRes.message));
		} else {
			setFinalJson({});
			setTableData([]);
		}
	}


	const onTableRowExpand = (expanded, record) => {
		if (expanded) {
			if (record.level > 0) {
				const _expandProduct = {
					data: record,
					keyword: 'nodes',
					main_json: finalJson,
				}
				processStepProduct(_expandProduct);
			} else {
				const _expandNode = {
					data: record,
					keyword: 'product_num',
					main_json: finalJson,
				}
				processStepProduct(_expandNode);
			}
		}
	};

	console.log("dataaaaaaaaaaaaa", tableData);

	return (
		<Table
			className='expandable-table'
			columns={columns}
			dataSource={tableData}
			pagination={false}
			rowKey={(record) => record.uuid}
			loading={loading}
			onExpand={onTableRowExpand}
		/>
	);
});


export default RecursiveTable;