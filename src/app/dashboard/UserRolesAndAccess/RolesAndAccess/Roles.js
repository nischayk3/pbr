/**
 * @author Dinesh Kumar <dinesh.kumar@mareana.com>
 * @Mareana - Release 3.5
 * @version  1
 * @Last Modified - 13 Jan, 2023
 * @Last Changed By - Dinesh Kumar
 */
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Empty, Input, Select, Space, Switch, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useDispatch } from "react-redux";
import { v1 as uuid } from "uuid";
import { hideLoader, showLoader, showNotification } from '../../../../duck/actions/commonActions';
import { dataAccessUpdate, getResource, resourceActions, resourceDelete, roleConfig } from '../../../../services/userRolesAndAccessService';
import Resource from './Resource';

const Roles = () => {
	const [isCreateRole, setIsCreateRole] = useState(false);
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
	const [resourceType, setResourceType] = useState('');
	const [searchedColumn, setSearchedColumn] = useState("");
	const [searchText, setSearchText] = useState("");
	const dispatch = useDispatch();

	const isEditing = (record) => record.id === editingKey;
	const dataTypeData = [{ field_name: 'Molecule', id: '01' }, { field_name: 'Plant', id: '02' }]

	useEffect(() => {
		const _req = {
			active_status: true
		}
		getRolesData(_req)
	}, [])

	/* istanbul ignore next */
	function handleSearch(selectedKeys, confirm, dataIndex) {
		confirm();
		setSearchText(selectedKeys[0]);
		setSearchedColumn(dataIndex);
	}

	function handleClearSearch(confirm, dataIndex) {
		confirm({ closeDropdown: true });
		setSearchText(undefined);
		setSearchedColumn(dataIndex);
	}


	/* istanbul ignore next */
	function getColumnSearchProps(dataIndex) {
		return {
			filterDropdown: ({
				setSelectedKeys,
				selectedKeys,
				confirm,
				clearFilters,
			}) => (
				<div style={{ padding: 8 }}>
					<Input
						placeholder={`Search ${dataIndex}`}
						value={selectedKeys[0]}
						onChange={(e) =>
							setSelectedKeys(
								e.target.value ? [e.target.value] : []
							)
						}
						onPressEnter={() =>
							handleSearch(selectedKeys, confirm, dataIndex)
						}
						style={{
							marginBottom: 8,
							display: 'block',
						}}
					/>
					<Space>
						<Button
							type='primary'
							onClick={() =>
								handleSearch(selectedKeys, confirm, dataIndex)
							}
							icon={<SearchOutlined />}
							size='small'
							style={{ width: 90 }}
						>
							Search
						</Button>

						<Button
							type='link'
							size='small'
							onClick={() => {
								handleClearSearch(confirm, dataIndex)
							}}
						>
							Clear
						</Button>
					</Space>
				</div>
			),
			filterIcon: (filtered) => (
				<SearchOutlined
					style={{ color: filtered ? '#1890ff' : undefined }}
				/>
			),
			onFilter: (value, record) =>
				record[dataIndex]
					? record[dataIndex]
						.toString()
						.toLowerCase()
						.includes(value.toLowerCase())
					: "",
			onFilterDropdownVisibleChange: (visible) => {
				if (visible) {
					// setTimeout(() => this.searchInput.select());
				}
			},
			render: (text) =>
				searchedColumn === dataIndex ? (
					<Highlighter
						highlightStyle={{
							backgroundColor: '#ffc069',
							padding: 0,
						}}
						searchWords={[searchText]}
						autoEscape
						textToHighlight={text?.toString()}
					/>
				) : (
					text
				),
		};
	};

	const editRole = (resName) => {

		setResourceType('edit_resource')
		setResourceDataTable([])
		setIsVisible(true)
		setEditResource(resName)
		const editres = {
			all_resources: false,
			resource: resName,
			role_name: roleName,
		}
		getResourceDatatable(editres)
	}

	const deleteResource = (resName) => {
		let _reqRes = {
			resource_name: resName,
			role_name: roleName
		}

		deleteResourceCard(_reqRes)
	}

	const ResourceCard = ({ resourceName, resourceDesc, authTag, authCount }) => {
		return (
			<div className="resource-card">
				<div className="resource-card-head">
					<div className='card-head'>
						<p>{authCount} AUTHORIZATIONS</p>
						<h2>{resourceName}</h2>
					</div>
					<div className="resource-card-button">
						<EditOutlined onClick={() => editRole(resourceName)} />
						<DeleteOutlined onClick={() => deleteResource(resourceName)} />
					</div>
				</div>
				<p>{resourceDesc}</p>
				<div className="auth-card">
					<p>AUTHORIZATIONS</p>
					<div className="auth-tag">
						{authTag.map((item) => {
							return (
								<Tag className="status-tag">{item}</Tag>
							)
						})}
					</div>
				</div>
			</div>
		)
	}

	const handleClickROle = () => {
		setNewRole('')
		setIsCreateRole(true)
	}

	const handleClickResource = () => {
		setResourceDataTable([])
		setEditResource('')
		setIsVisible(true)
		setResourceType('new_resource')
		const resource = {
			all_resources: true
		}
		getResourceAction(resource)
	}

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
				title: 'Name',
				dataIndex: 'name',
				key: 'name',
				with: 100,
				render: (text) => {
					return (
						<div className="multi-select">
							<p>{text}</p>
						</div>
					)
				},
			},
			{
				title: '',
				dataIndex: 'data',
				key: 'data',
				render: (text, record, index) => {

					return (
						<div className="multi-select">
							<Select
								mode="multiple"
								allowClear
								style={{
									width: '100%',
								}}
								placeholder="Please select"
								value={text}
								onChange={(value) => handleChange(text, record, value, index)}
								options={options}
							/>
						</div>
					)
				},
			},
		];
		return <Table className="roles-inner-table" columns={columns1} dataSource={inculdeExcludeData} pagination={false} rowKey={uuid()} loading={loading} />;
	};

	const onTableRowExpand = (expanded, record) => {
		const keys = [];
		if (expanded) {
			setEditingKey(record.id);
			keys.push(record.id);
			const _expandRecord = {
				role_name: roleName,
				active_status: false,
				field_name: record.field_name
			}
			getDataType(_expandRecord)
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

	const columns2 = [
		{
			title: 'Data type',
			dataIndex: 'field_name',
			key: 'field_name',
			editable: true,
		},

		{
			title: 'Action',
			key: 'operation',
			render: (record) => {
				const editableRow = isEditing(record);
				return (
					<div className="actions">
						<Button
							type='link'
							id="edit"
							className='custom-primary-edit-btn '
							onClick={(e) => editableRow ? saveDataAccess(record) : editDataAccess(record)} >
							{editableRow ? 'Save' : 'Edit'}
						</Button>
					</div>
				)
			},
		},
	];

	const rolesColumn = [
		{
			title: 'Role',
			dataIndex: 'role_name',
			key: 'role_name',
			...getColumnSearchProps('role_name')
		},
		{
			title: 'Status',
			dataIndex: 'active_status',
			key: 'active_status',
			render: (text) => {
				if (text === 'Active') {
					return (
						<div className="roles-status">
							<span className='dot green'></span>
							<p>Active</p>
						</div>
					)
				} else {
					return (
						<div className="roles-status">
							<span className='dot red'></span>
							<p>Inactive</p>
						</div>
					)
				}
			},
			filters: [
				{
					text: 'Active',
					value: 'Active',
				},
				{
					text: 'Inactive',
					value: 'Inactive',
				},

			],
			filterMode: 'tree',
			filterSearch: true,
			onFilter: (value, record) => record.active_status.startsWith(value)
		}
	]

	const editDataAccess = (record) => {
		setEditingKey(record.id);

	}

	const saveDataAccess = (record) => {
		let _reqSaveData = {
			field_name: record.field_name,
			role_name: roleName,
			unapproved_data: isUnapproved === 'True' ? true : false,
			molecule_included: expandedTableData?.molecule_included != undefined ? expandedTableData?.molecule_included : [],
			molecule_excluded: expandedTableData?.molecule_excluded != undefined ? expandedTableData?.molecule_excluded : [],
			plant_included: expandedTableData?.plant_included != undefined ? expandedTableData?.plant_included : [],
			plant_excluded: expandedTableData?.plant_excluded != undefined ? expandedTableData?.plant_excluded : []
		}

		roleDataAccessUpdate(_reqSaveData)
		setEditingKey(record.id);
		isEditing(record);
		//setEditable(editRcd)
	}

	// delete resource

	const deleteResourceCard = async (_resCard) => {
		const _dltReqRecord = {
			role_name: _resCard.role_name,
			active_status: false,
			field_name: ''
		}
		try {
			const resCard = await resourceDelete(_resCard);
			if (resCard.statuscode === 200) {
				dispatch(showNotification("success", resCard.message));
				getResourceData(_dltReqRecord)
			} else {
				dispatch(showNotification("error", resCard.message));
			}
		} catch (error) {
			dispatch(showNotification("error", error));
		}
	}

	//get Roles api call
	const getRolesData = async (_resourceQuery) => {
		try {
			setLoading(true)
			const resource = await getResource(_resourceQuery);
			if (resource.statuscode === 200) {
				setAllRoles(resource.message)
			}
			setLoading(false)

		} catch (error) {
			setLoading(false)
			dispatch(showNotification("error", error));
		}
	}

	// role data accesss table update
	const roleDataAccessUpdate = async (_resourceQuery) => {
		try {
			const dataAccess = await dataAccessUpdate(_resourceQuery)
			if (dataAccess.statuscode === 200) {
				dispatch(showNotification("success", dataAccess.message));
			} else {
				dispatch(showNotification("error", dataAccess.message));
			}
		} catch (error) {
			dispatch(showNotification("error", error));
		}
	}

	// onclick resource data
	const getResourceData = async (_resourceQuery) => {
		try {
			dispatch(showLoader());
			const res = await getResource(_resourceQuery)
			if (res.statuscode === 200) {
				setRoleDesc(res?.message?.role_description)
				setResourceCount(res?.message?.role_resource_details?.length)
				setResourceDetails(res?.message?.role_resource_details)
				setRoleDataAccess(dataTypeData)
				setIsUnapproved(res?.message?.unapproved_data)
				setIsRoleDetailsAvailable(true)
			} else {
				setIsRoleDetailsAvailable(false)
			}
			dispatch(hideLoader());
		} catch (error) {
			dispatch(hideLoader());
			dispatch(showNotification("error", error));
		}
	}

	// data type expand table
	const getDataType = async (_dataType) => {
		try {
			setLoading(true)
			const dataType = await getResource(_dataType)
			setLoading(false)
			let data1 = []
			if (dataType.statuscode === 200) {
				if (_dataType.field_name === 'Molecule') {
					setExpandedData(dataType.message.molecule_total_list)
					data1 = [
						{
							name: "Include",
							dataType: _dataType.field_name,
							data: dataType.message.molecule_included
						},
						{
							name: "Exclude",
							dataType: _dataType.field_name,
							data: dataType.message.molecule_excluded
						}
					];
					setInculdeExcludeData(data1)
					setExpandedTableData(dataType.message)
				} else if (_dataType.field_name === 'Plant') {
					setExpandedData(dataType.message.plant_total_list)
					data1 = [
						{
							name: "Include",
							dataType: _dataType.field_name,
							data: dataType.message.plant_included
						},
						{
							name: "Exclude",
							dataType: _dataType.field_name,
							data: dataType.message.plant_excluded
						}
					];
					setInculdeExcludeData(data1)
					setExpandedTableData(dataType.message)
				} else {
					setInculdeExcludeData(data1)
					setExpandedData([])
					setExpandedTableData()
				}

			} else {
				setExpandedData([])
			}

		} catch (error) {
			dispatch(hideLoader());
			dispatch(showNotification("error", error));
		}
	}

	//select roles
	const selectRoles = (record) => {
		const _reqRecord = {
			role_name: record.role_name,
			active_status: false,
			field_name: ''
		}
		setRoleName(record.role_name)
		setIsRoleActive(record.active_status === "Active" ? true : false)
		getResourceData(_reqRecord)
	}

	const createRole = () => {
		setIsCreateRole(false)
		let _reqRoleConfig = {
			inactive: true,
			description: "",
			role_name: newRole,
			updated: false
		}
		rolesConfig(_reqRoleConfig)
	}

	const handleChangeRole = (e) => {
		if (e.target.value != null) {
			setNewRole(e.target.value)
		}
	}

	const onChangeRoleDesc = (e) => {
		if (e.target.value != null) {
			setRoleDesc(e.target.value)
		}
	}

	const listHeader = (
		<div className="roles-head">
			{isCreateRole ? (
				<div className="create-role">
					<Input placeholder="Enter name of new role" value={newRole} onChange={handleChangeRole} />
					<Button type="link" onClick={createRole}>
						Save
					</Button>
				</div>
			) : null}
		</div>
	)

	//role-config create role

	const rolesConfig = async (_reqRole) => {
		try {
			dispatch(showLoader());
			const config = await roleConfig(_reqRole);
			dispatch(hideLoader());
			if (config.statuscode === 200) {
				dispatch(showNotification("success", config.message));
				setisEditRole(true)
				setisRoleToggle(true)
				const _reqBackRole = {
					active_status: true
				}
				getRolesData(_reqBackRole)
			} else {
				dispatch(showNotification("error", config.message));
			}
		} catch (error) {
			dispatch(hideLoader());
			dispatch(showNotification("error", error));
		}
	}

	// get resource data
	const getResourceAction = async (_resourceQuery) => {
		try {
			dispatch(showLoader());
			const resourceAction = await resourceActions(_resourceQuery)
			dispatch(hideLoader());
			if (resourceAction.statuscode === 200) {
				setResourceList(resourceAction.message)
			} else {
				dispatch(showNotification("error", resDatatable.message));
			}

		} catch (error) {
			dispatch(hideLoader());
			dispatch(showNotification("error", error));
		}
	}

	// get resource data
	const getResourceDatatable = async (_resourceQuery) => {
		try {
			dispatch(showLoader());
			const resDatatable = await resourceActions(_resourceQuery)
			dispatch(hideLoader());
			if (resDatatable.statuscode === 200) {
				setResourceDataTable(resDatatable.message)
			} else {
				dispatch(showNotification("error", resDatatable.message));
			}

		} catch (error) {
			dispatch(hideLoader());
			dispatch(showNotification("error", error));
		}
	}

	const callbackResource = (value) => {
		const reso = {
			all_resources: false,
			resource: value
		}
		getResourceDatatable(reso)
	}

	const callbackResourceCard = (value) => {
		const _callbackReq = {
			role_name: value,
			active_status: false,
			field_name: ''
		}
		getResourceData(_callbackReq)
	}

	const handleClickEditRole = () => {

		if (isRoleToggle) {
			setisEditRole(false)
			setisRoleToggle(false)
		} else {
			let _roleUpdate = {
				inactive: isRoleActive,
				description: roleDesc,
				role_name: roleName,
				updated: true
			}
			rolesConfig(_roleUpdate)
		}

	}

	const onChangeSwitch = (checked) => {
		setIsRoleActive(checked)
	}

	const onChangeUnapproved = (checked) => {
		if (checked) {
			setIsUnapproved('True')
		} else {
			setIsUnapproved('False')
		}

	}

	return (
		<div className="roles-wrapper">
			<div className="roles">
				<div className="roles-button">
					<Button
						type='primary'
						className='custom-secondary-btn'
						onClick={handleClickROle}
					>
						Create role
					</Button>
				</div>
				<div className="table-role-wrapper">
					{listHeader}
					<Table
						className='roles-table'
						columns={rolesColumn}
						dataSource={allRoles}
						size='medium'
						onRow={(record) => ({
							onClick: () => {
								selectRoles(record)
							},
						})}
						loading={loading}
					/>
				</div>
			</div>

			<div className="roles-details">
				{isRoleDetailsAvailable ? (
					<>
						<div className="roles-heading">
							<h1>{roleName}</h1>
							<div className="sub-details">
								<p>{resourceCount} resources | Active </p>
								<Switch
									size="small"
									checked={isRoleActive}
									disabled={isEditRole}
									onChange={onChangeSwitch}
								/>

							</div>
						</div>
						<Button
							type='primary'
							className='custom-primary-btn'
							onClick={handleClickEditRole}
						>
							{isRoleToggle ? 'Edit role' : 'Save role'}
						</Button>

						<Input
							className={isRoleToggle ? "content content-border " : "content content-border-active"}
							placeholder="Add role descreption here"
							value={roleDesc}
							bordered={false}
							disabled={isEditRole}
							onChange={onChangeRoleDesc}
						/>

						<div className="card-header">
							<p className='card-heading'>Resources and authorizations</p>
							<Button
								type='primary'
								className='custom-secondary-btn'
								onClick={handleClickResource}
							>
								Add resource
							</Button>
						</div>
						<div className="resource-card-wrapper">
							{resourceDetails.map((item) => {
								return (<ResourceCard
									resourceName={item.resource_name}
									resourceDesc={item.resource_descr}
									authTag={item.auth}
									authCount={item.auth.length}
								/>)
							})}
						</div>
						<div className="data-table-wrapper">
							<div className="data-table-head">
								<p className='card-heading'>Data access</p>
								<h4>Unapproved data</h4>
							</div>

							<div className="unapproved-data">
								<p>Make unapproved data visible to {roleName}</p>
								<Switch
									size="small"
									checked={isUnapproved === 'True' ? true : false}
									onChange={onChangeUnapproved}
								/>
							</div>
							<h4>Plant & Molecule</h4>
							{/* <div>
								<Button
									type='primary'
									className='custom-primary-btn'
								>
									Edit
								</Button>
								<Button
									type='primary'
									className='custom-secondary-btn'
								>
									Add data access
								</Button>
							</div> */}
						</div>

						<Table
							className='roles-table'
							columns={columns2}
							expandable={{ expandedRowRender }}
							// onRow={onClickPlantName}
							expandRowByClick={expandRowByClick}
							expandedRowKeys={expandedRowKeys}
							onExpand={onTableRowExpand}
							dataSource={roleDataAccess}
							rowKey='id'
						/>
						<Resource
							isVisible={isVisible}
							setIsVisible={setIsVisible}
							roleName={roleName}
							resourceList={resourceList}
							callbackResource={callbackResource}
							callbackResourceCard={callbackResourceCard}
							resourceDataTable={resourceDataTable}
							editResource={editResource}
							resourceType={resourceType}
						/>
					</>

				) : (<Empty imageStyle={{
					height: 160,
				}} image={Empty.PRESENTED_IMAGE_SIMPLE} description={
					<span>
						Select a role to view its details here
					</span>
				} />)}
			</div>
		</div>
	)
}

export default Roles;