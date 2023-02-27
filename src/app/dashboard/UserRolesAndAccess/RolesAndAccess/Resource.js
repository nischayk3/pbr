/**
 * @author Dinesh Kumar <dinesh.kumar@mareana.com>
 * @Mareana - Release 3.5
 * @version  1
 * @Last Modified - 13 Jan, 2023
 * @Last Changed By - Dinesh Kumar
 */

import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Checkbox, Modal, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { hideLoader, showLoader, showNotification } from '../../../../duck/actions/commonActions';
import { resourceActionUpdated, resourceAuth } from '../../../../services/userRolesAndAccessService';

const Resource = ({ isVisible, setIsVisible, roleName, resourceList, callbackResource, callbackResourceCard, resourceDataTable, editResource, resourceType }) => {
	const [resList, setResList] = useState([]);
	const [selectedResource, setSelectedResource] = useState(editResource);
	const [data, setData] = useState([]);
	const [selectedAuth, setSelectedAuth] = useState([]);
	const [rolePriv, setRolePriv] = useState('');

	const dispatch = useDispatch();

	useEffect(() => {
		const resourceData = [...resourceList];
		let resListData = []
		resourceData.forEach((item) => {
			let resObj = {};
			resObj["value"] = item.resource_name;
			resObj["label"] = item.display_resource_name;
			resListData.push(resObj);
		})
		setResList(resListData);
	}, [resourceList])

	useEffect(() => {
		setResList([])
		setSelectedResource(editResource)
	}, [editResource])

	useEffect(() => {
		const auth = []
		const resData = [...resourceDataTable]
		resData.filter((item) => {
			if (item.isEnable) {
				return auth.push(item.authorization)
			}
		})
		setData(resData)
		setSelectedAuth(auth)
	}, [resourceDataTable])

	const columns3 = [
		{
			title: 'Authorization',
			dataIndex: 'authorization',
			key: 'authorization',
		},
		{
			title: 'Function',
			dataIndex: 'function',
			key: 'function',
		},
		{
			title: 'Enable',
			key: 'isEnable',
			dataIndex: 'isEnable',
			render: (value, record, rowIndex) => {
				return (
					<Checkbox checked={value} disabled={record.isDisable} onChange={(e) => onChangeAuth(e, record, rowIndex)} />
				)
			}
		},
	];


	const handleChange = (value) => {
		setSelectedResource(value);
		callbackResource(value)
		let _priv = {
			role_name: roleName,
			resource: value,
			auth: true
		}

		rolePriviledge(_priv)
	};

	const handleCancel = () => {
		setIsVisible(false)
		setResList([])
		setSelectedResource('')
	}



	const authSave = () => {
		let _reqAuth = {
			role_name: roleName,
			resource: selectedResource,
			authorization: selectedAuth,
			updated: resourceType === 'new_resource' ? false : resourceType === 'edit_resource' ? true : null
		}
		authUpdate(_reqAuth)
	}

	//resource auth update
	const authUpdate = async (_resourceAuth) => {
		try {
			dispatch(showLoader());
			const auth = await resourceActionUpdated(_resourceAuth)
			dispatch(hideLoader());
			if (auth.statuscode === 200) {
				setIsVisible(false)
				setResList([])
				setSelectedResource('')
				callbackResourceCard(_resourceAuth.role_name)
				dispatch(showNotification("success", auth.message));
			} else {
				dispatch(showNotification("error", auth.message));
			}
		} catch (error) {
			dispatch(hideLoader());
			dispatch(showNotification("error", error));
		}
	}

	// roles priviledge
	const rolePriviledge = async (_resourceAuth) => {
		try {
			const privilege = await resourceAuth(_resourceAuth)
			if (privilege.statuscode === 200) {
				if (privilege.message.length > 0) {
					const text = privilege.message.toString()
					console.log("text", text);
					setRolePriv(text)
				} else {
					setRolePriv('')
				}
			} else {
				setRolePriv('')
				dispatch(showNotification("error", privilege.message));
			}
		} catch (error) {
			dispatch(showNotification("error", error));
		}
	}

	const onChangeAuth = (e, record, rowIndex) => {
		let authList = []
		const tableData = [...data];

		tableData[rowIndex]['isEnable'] = e.target.checked == false ? "" : e.target.checked;

		tableData.filter((item) => {
			if (item.isEnable) {
				return authList.push(item.authorization);
			} else {
				return authList.filter((v) => v !== record.authorization);
			}
		})

		setSelectedAuth(authList)
		setData(tableData)
	}


	return (
		<Modal
			width={719}
			title={roleName + " - " + selectedResource}
			visible={isVisible}
			onCancel={handleCancel}
			footer={null}
		>

			<div className='modal-resource-wrapper'>
				<p className='card-heading'>Resources</p>
				<div className='modal-sub-header'>
					<p>The resource associated with this role</p>
					<Select
						showSearch
						placeholder="Select resource"
						size='medium'
						style={{
							width: 230, marginLeft: 13,
						}}
						value={selectedResource}
						onChange={handleChange}
						options={resList}
					/>
				</div>
				{rolePriv != '' ? <p className='warning'><InfoCircleOutlined className='warn-icon' />It is recommended to add access to <span className='highlight'>{rolePriv}</span> resources before adding this one.</p> : null}
				<p className='card-heading'>Authorizations</p>
				<p className='card-heading-p'>Select the actions you want to authorize chart managers to take.</p>
				<Table
					className='roles-table'
					columns={columns3}
					dataSource={data}
				/>
				<div className='modal-footer-btn'>
					<Button
						type='primary'
						className='custom-secondary-btn'
						onClick={authSave}
					>
						Save changes
					</Button>
					<Button
						type='primary'
						className='custom-primary-btn'
						onClick={handleCancel}
					>
						Cancel
					</Button>
				</div>
			</div>
		</Modal>
	)
}

export default Resource;