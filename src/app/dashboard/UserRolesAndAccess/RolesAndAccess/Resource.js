/**
 * @author Dinesh Kumar <dinesh.kumar@mareana.com>
 * @Mareana - Release 3.5
 * @version  1
 * @Last Modified - 13 Jan, 2023
 * @Last Changed By - Dinesh Kumar
 */

import { Button, Checkbox, Modal, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { hideLoader, showLoader, showNotification } from '../../../../duck/actions/commonActions';

const Resource = ({ isVisible, setIsVisible, roleName, resourceList, callbackResource, resourceDataTable, editResource }) => {
	const [resList, setResList] = useState([]);
	const [selectedResource, setSelectedResource] = useState('');
	const [isChecked, setIsChecked] = useState(false);
	const [data, setData] = useState([]);
	const [selectedAuth, setSelectedAuth] = useState([]);

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
		setData(resourceDataTable)
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
				console.log("value,record,index", record, value);
				return (
					<Checkbox checked={value} onChange={(e) => onChangeAuth(e, record, rowIndex)} />
				)
			}
		},
	];


	const handleChange = (value) => {
		setSelectedResource(value);
		callbackResource(value)
	};

	const handleCancel = () => {
		setIsVisible(false)
		setResList([])
		setSelectedResource('')
	}

	const authSave = () => {
		console.log("roleName", roleName);
		console.log("selectedResource", selectedResource);
		console.log("selectedAuth", selectedAuth);
		let _reqAuth = {
			role_name: roleName,
			resource: selectedResource,
			authorization: selectedAuth,
			updated: false
		}
		authUpdate(_reqAuth)
	}

	//resource auth update
	const authUpdate = async (_resourceAuth) => {
		try {
			dispatch(showLoader());
			const auth = await resourceActions(_resourceAuth)
			dispatch(hideLoader());
			console.log("authhhhhh", auth);
		} catch (error) {
			dispatch(hideLoader());
			dispatch(showNotification("error", error));
		}
	}

	const onChangeAuth = (e, record, rowIndex) => {
		let authList = []
		const tableData = [...data];
		tableData[rowIndex]['isEnable'] = e.target.checked == false ? "" : e.target.checked;

		tableData.filter((item) => {
			if (item.isEnable) {
				authList.push(item.authorization);
			} else {
				authList.filter((v) => v !== record.authorization);
			}
		})
		// if (e.target.checked) {
		// 	setSelectedAuth([...selectedAuth, record.authorization]);
		// } else {
		// 	setSelectedAuth(selectedAuth.filter((v) => v !== record.authorization));
		// }
		setSelectedAuth(authList)
		setIsChecked(e.target.checked)
		console.log("e,record,index", e, record);
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