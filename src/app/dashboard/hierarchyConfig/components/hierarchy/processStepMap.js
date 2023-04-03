/**
 * @author Dinesh Kumar <dinesh.kumar@mareana.com>
 * @Mareana - Release 3.5
 * @version  1
 * @Last Modified - 13 Jan, 2023
 * @Last Changed By - Dinesh Kumar
 */

import { Table } from "antd";
import React, { useState } from 'react';
import { v1 as uuid } from "uuid";

const ProcessStepMap = () => {
	const [firstLevelData, setFirstLevelData] = useState([
		{
			product: 1322545,
			plant: 1255,
			level1: 'mat1',
			description: 'mat1 description',
			process_step: 'Viral Thaw'
		}
	]);

	const [isVisible, setIsVisible] = useState(false);
	const [allRoles, setAllRoles] = useState([]);
	const [roleName, setRoleName] = useState("");
	const [roleDesc, setRoleDesc] = useState("");
	const [resourceCount, setResourceCount] = useState("0");
	const [resourceDetails, setResourceDetails] = useState([]);
	const [roleDataAccess, setRoleDataAccess] = useState([]);
	const [isRoleDetailsAvailable, setIsRoleDetailsAvailable] = useState(false);
	const [resourceList, setResourceList] = useState([]);
	const [resourceDataTable, setResourceDataTable] = useState([]);
	const [editResource, setEditResource] = useState("");
	const [isRoleActive, setIsRoleActive] = useState(false);
	const [isUnapproved, setIsUnapproved] = useState('False');
	const [newRole, setNewRole] = useState("");
	const [isEditRole, setisEditRole] = useState(true);
	const [isRoleToggle, setisRoleToggle] = useState(true);
	const [expandedData, setExpandedData] = useState([]);
	const [inculdeExcludeData, setInculdeExcludeData] = useState([]);
	const [expandedRowKeys, setExpandedRowKeys] = useState([]);
	const [editingKey, setEditingKey] = useState('');
	const [loading, setLoading] = useState(false);
	const [expandedTableData, setExpandedTableData] = useState({});

	const isEditing = (record) => record.id === editingKey;
	const dataTypeData = [{ field_name: 'Molecule', id: '01' }, { field_name: 'Plant', id: '02' }]

	const columns2 = [
		{
			title: 'Product',
			dataIndex: 'product',
			key: 'product',
			editable: true,
		},
		{
			title: 'Plant',
			dataIndex: 'plant',
			key: 'plant',
			editable: true,
		},
		{
			title: 'Level1',
			dataIndex: 'level1',
			key: 'level1',
			editable: true,
		},
		{
			title: 'Description',
			dataIndex: 'description',
			key: 'description',
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
		const options = []
		expandedData && expandedData.forEach((item) => {
			options.push({
				label: item,
				value: item,
			});
		})

		const handleChange = (text, record, value, index) => {
			const tableData = { ...expandedTableData }
			const tableRecord = { ...inculdeExcludeData }

			if (record.dataType === 'Molecule') {
				if (record['name'] === 'Include') {
					tableData['molecule_included'] = value
					tableRecord[index]['data'] = value
				} else if (record['name'] === 'Exclude') {
					tableData['molecule_excluded'] = value
					tableRecord[index]['data'] = value
				}
			}
			if (record.dataType === 'Plant') {
				if (record['name'] === 'Include') {
					tableData['plant_included'] = value
					tableRecord[index]['data'] = value
				} else if (record['name'] === 'Exclude') {
					tableData['plant_excluded'] = value
					tableRecord[index]['data'] = value
				}
			}
			setExpandedTableData(tableData)
		};

		const columns1 = [
			{
				title: 'Child',
				dataIndex: 'chilc',
				key: 'child',

			},
			{
				title: 'Product',
				dataIndex: 'product',
				key: 'product',

			},
			{
				title: 'Plant',
				dataIndex: 'plant',
				key: 'plant',

			},
			{
				title: 'Level2',
				dataIndex: 'level2',
				key: 'level2',

			},
			{
				title: 'Description',
				dataIndex: 'description',
				key: 'description',

			},
			{
				title: 'Process step',
				dataIndex: 'process_step',
				key: 'process_step',

			},

		];
		return <Table className="expandable-table__inner" columns={columns1} dataSource={inculdeExcludeData} pagination={false} rowKey={uuid()} loading={loading} />;
	};

	const onTableRowExpand = (expanded, record) => {
		const keys = [];
		if (expanded) {
			setEditingKey(record.id);
			keys.push(record.id);
			const _expandRecord = {
				// role_name: roleName,
				// active_status: false,
				// field_name: record.field_name
			}
			// getDataType(_expandRecord)
			isEditing(record);
		} else {
			setEditingKey(record.id);
			isEditing(record);
		}
		setExpandedRowKeys(keys);
	};


	const expandRowByClick = (expanded, record) => {
		console.log("expandRowByClick", expanded, record);
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
				rowKey='id'
			/>
		</>
	)
}

export default ProcessStepMap;