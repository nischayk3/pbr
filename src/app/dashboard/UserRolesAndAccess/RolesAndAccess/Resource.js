/**
 * @author Dinesh Kumar <dinesh.kumar@mareana.com>
 * @Mareana - Release 3.5
 * @version  1
 * @Last Modified - 13 Jan, 2023
 * @Last Changed By - Dinesh Kumar
 */

import { Button, Modal, Select, Table } from 'antd';
import React from 'react';


const Resource = ({ isVisible, setIsVisible }) => {
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
	const data3 = [];

	const handleChange = (value) => {
		console.log(`selected ${value}`);
	};


	const handleCancel = () => {
		setIsVisible(false)
	}
	return (
		<Modal
			width={719}
			title="CHART MANAGER - Genealogy"
			visible={isVisible}
			onCancel={handleCancel}
			footer={null}
		>
			<div className='modal-resource-wrapper'>
				<p className='card-heading'>Resources</p>
				<div className='modal-sub-header'>
					<p>The resource associated with this role</p>
					<Select
						size='medium'
						defaultValue="lucy"
						style={{
							width: 230, marginLeft: 13,
						}}
						onChange={handleChange}
						options={[
							{
								value: 'jack',
								label: 'Jack',
							},
							{
								value: 'lucy',
								label: 'Lucy',
							},
							{
								value: 'disabled',
								disabled: true,
								label: 'Disabled',
							},
							{
								value: 'Yiminghe',
								label: 'yiminghe',
							},
						]}
					/>
				</div>
				<p className='card-heading'>Authorizations</p>
				<p className='card-heading-p'>Select the actions you want to authorize chart managers to take.</p>
				<Table
					className='roles-table'
					columns={columns3}
					dataSource={data3}
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
					>
						Cancel
					</Button>
				</div>
			</div>
		</Modal>
	)

}

export default Resource;