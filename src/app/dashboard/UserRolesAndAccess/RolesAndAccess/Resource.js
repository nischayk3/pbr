/**
 * @author Dinesh Kumar <dinesh.kumar@mareana.com>
 * @Mareana - Release 3.5
 * @version  1
 * @Last Modified - 13 Jan, 2023
 * @Last Changed By - Dinesh Kumar
 */

import { Button, Checkbox, Modal, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';

const Resource = ({ isVisible, setIsVisible, roleName, resourceList, callbackResource, resourceDataTable, editResource }) => {
	const [resList, setResList] = useState([]);
	const [selectedResource, setSelectedResource] = useState('');

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
			key: 'enable',
			render: () => <Checkbox />
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

	console.log("resList", resList);
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
					dataSource={resourceDataTable}
				/>
				<div className='modal-footer-btn'>
					<Button
						type='primary'
						className='custom-secondary-btn'
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