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
import { getResource, resourceActions, roleConfig } from '../../../../services/userRolesAndAccessService';
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
	const [searchedColumn, setSearchedColumn] = useState('');
	const [resourceList, setResourceList] = useState([]);
	const [resourceDataTable, setResourceDataTable] = useState([]);
	const [editResource, setEditResource] = useState("");
	const [isRoleActive, setIsRoleActive] = useState(false);
	const [newRole, setNewRole] = useState("");
	const [isEditRole, setisEditRole] = useState(true);
	const [isRoleToggle, setisRoleToggle] = useState(true);
	const [expandedData, setExpandedData] = useState([]);

	const dispatch = useDispatch();

	useEffect(() => {
		const _req = {
			// role_name: "",
			active_status: true
		}
		getRolesData(_req)
	}, [])

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
							onClick={() => clearFilters && handleReset(clearFilters)}
							size='small'
							style={{ width: 90 }}
						>
							Reset
						</Button>
						<Button
							type='link'
							size='small'
							onClick={() => {
								confirm({ closeDropdown: false });
								setSearchText(selectedKeys[0]);
								setSearchedColumn(dataIndex);
							}}
						>
							Filter
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

	const editRole = (resourceName) => {
		setIsVisible(true)
		setEditResource(resourceName)
		const editres = {
			all_resources: false,
			resource: resourceName
		}
		getResourceDatatable(editres)
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
						<DeleteOutlined />
					</div>
				</div>
				<p>{resourceDesc}</p>
				<div className="auth-card">
					<p>AUTHORIZATIONS</p>
					{authTag.map((item) => {
						return (
							<Tag className="status-tag">{item}</Tag>
						)
					})}
				</div>
			</div>
		)
	}

	const handleClickROle = () => {
		setNewRole('')
		setIsCreateRole(true)
	}

	const handleClickResource = () => {
		setEditResource('')
		setIsVisible(true)
		const resource = {
			all_resources: true
		}
		getResourceAction(resource)
	}

	const expandedRowRender = () => {
		const options = [];
		for (let i = 10; i < 36; i++) {
			options.push({
				label: i.toString(36) + i,
				value: i.toString(36) + i,
			});
		}
		const handleChange = (value) => {
			console.log(`selected ${value}`);
		};
		const columns1 = [
			{
				title: 'Name',
				dataIndex: 'name',
				key: 'name',
				render: () => {
					return (
						<Select
							mode="multiple"
							allowClear
							style={{
								width: '100%',
							}}
							placeholder="Please select"
							defaultValue={['a10', 'c12']}
							onChange={handleChange}
							options={options}
						/>
					)
				},
			},
			{
				title: 'Include',
				key: 'include',
				render: () => <Switch size="small" defaultChecked />,
			},

		];
		const data1 = [];
		for (let i = 0; i < 3; ++i) {
			data1.push({
				key: i.toString(),
				name: 'Belatacept',
			});
		}
		return <Table className="roles-inner-table" columns={columns1} dataSource={data1} pagination={false} rowKey={uuid()} />;
	};


	const onTableRowExpand = (expanded, record) => {
		console.log("expanded, record", expanded, record);
		//var keys = [];
		if (expanded) {
			const _expandRecord = {
				role_name: roleName,
				active_status: false,
				field_name: record.field_name
			}
			getDataType(_expandRecord)
			//	keys.push(record.key); // I have set my record.id as row key. Check the documentation for more details.
		}


	};


	const columns2 = [
		{
			title: 'Data type',
			dataIndex: 'field_name',
			key: 'field_name',
		},

		{
			title: 'Action',
			key: 'operation',
			render: () => (
				<div className="actions">
					<a>Edit</a>
					<a>Delete</a>
				</div>
			),
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
			onFilter: (value, record) => record.active.startsWith(value)
		}
	]

	const data2 = [];

	for (let i = 0; i < 3; ++i) {
		data2.push({
			key: i.toString(),
			datatype: 'Molecule',
		});
	}

	//get Roles api call
	const getRolesData = async (_resourceQuery) => {
		try {
			dispatch(showLoader());
			const resource = await getResource(_resourceQuery)
			if (resource.statuscode === 200) {
				setAllRoles(resource.message)
			}
			dispatch(hideLoader());

		} catch (error) {
			dispatch(hideLoader());
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
				setRoleDataAccess(res?.message?.role_data_access)
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
			dispatch(showLoader());
			const dataType = await getResource(_dataType)
			dispatch(hideLoader());
			console.log("dataTyped", dataType);
			// if (res.statuscode === 200) {
			// 	setExpandedData(res.message)
			// } else {
			// 	setExpandedData([])
			// }

		} catch (error) {
			dispatch(hideLoader());
			dispatch(showNotification("error", error));
		}
	}

	//select roles
	const selectRoles = (record) => {
		const _reqRecord = {
			role_name: record.role_name,
			active_status: false
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
			if (resourceAction.statuscode === 200) {
				setResourceList(resourceAction.message)
			}
			dispatch(hideLoader());
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
			if (resDatatable.statuscode === 200) {
				setResourceDataTable(resDatatable.message)
			}
			dispatch(hideLoader());
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
							<p className='card-heading'>Data access</p>
							<div>
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
							</div>
						</div>

						<Table
							className='roles-table'
							columns={columns2}
							expandable={{
								expandedRowRender
								// defaultExpandedRowKeys: ['0'],
							}}
							onExpand={onTableRowExpand}
							dataSource={roleDataAccess}
							rowKey='field_name'
						/>
						<Resource
							isVisible={isVisible}
							setIsVisible={setIsVisible}
							roleName={roleName}
							resourceList={resourceList}
							callbackResource={callbackResource}
							resourceDataTable={resourceDataTable}
							editResource={editResource}
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