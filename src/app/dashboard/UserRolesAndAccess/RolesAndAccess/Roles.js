/**
 * @author Dinesh Kumar <dinesh.kumar@mareana.com>
 * @Mareana - Release 3.5
 * @version  1
 * @Last Modified - 13 Jan, 2023
 * @Last Changed By - Dinesh Kumar
 */
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Checkbox, Input, List, Modal, Select, Switch, Table, Tag } from 'antd';
import React, { useState } from 'react';

const Roles = () => {
	const [isCreateRole, setIsCreateRole] = useState(false);
	const [isVisible, setIsVisible] = useState(false);

	const data = [
		'Chart manager',
		'Default',
		'Old approver',
		'View creator',
		'View',
	];

	const listHeader = (
		<div className="roles-head">
			<p>Role</p>
			{isCreateRole && (
				<div className="create-role">
					<Input placeholder="Enter name of new role" />
					<Button type="link" >
						Save
					</Button>
				</div>
			)}
		</div>
	)

	const resourceCard = (
		<div className="resource-card">
			<div className="resource-card-head">
				<div className='card-head'>
					<p>3 AUTHORIZATIONS</p>
					<h2>GENEALOGY</h2>
				</div>
				<div className="resource-card-button">
					<EditOutlined />
					<DeleteOutlined />
				</div>
			</div>
			<p>Chart managers can access Genealogy with the authorizations given below.</p>
			<div className="auth-card">
				<p>AUTHORIZATIONS</p>
				<Tag className="status-tag">DISPLAY</Tag>
				<Tag className="status-tag">MAINTAIN</Tag>
			</div>
		</div>
	)

	const handleClickROle = () => {
		setIsCreateRole(true)
	}

	const handleClickResource = () => {
		setIsVisible(true)
	}

	const handleCancel = () => {
		setIsVisible(false)
	}

	const expandedRowRender = () => {
		const columns1 = [
			{
				title: 'Name',
				dataIndex: 'name',
				key: 'name',
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
		return <Table className="roles-inner-table" columns={columns1} dataSource={data1} pagination={false} />;
	};
	const columns2 = [
		{
			title: 'Data type',
			dataIndex: 'datatype',
			key: 'datatype',
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
	const data2 = [];
	const data3 = [];
	for (let i = 0; i < 3; ++i) {
		data2.push({
			key: i.toString(),
			datatype: 'Molecule',
		});
	}

	const handleChange = (value) => {
		console.log(`selected ${value}`);
	};

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
				<List
					header={listHeader}
					// footer={<div>Footer</div>}
					dataSource={data}
					renderItem={(item) => (
						<List.Item>
							{item}
						</List.Item>
					)}
				/>
			</div>
			<div className="roles-details">
				<div className="roles-heading">
					<h1>Chart Manager</h1>
					<div className="sub-details">
						<p>3 resources | Active </p>
						<Switch size="small" defaultChecked />
					</div>
				</div>
				<Button
					type='primary'
					className='custom-primary-btn'
				>
					Edit role
				</Button>
				<p className="content">
					The chart manager works with sample sentences like this one, and can always be replaced by the correct information since this is only a design placeholder.
				</p>
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
					{resourceCard}
					{resourceCard}
					{resourceCard}
					{resourceCard}
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
						expandedRowRender,
						defaultExpandedRowKeys: ['0'],
					}}
					dataSource={data2}
				/>
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
				{/* <Empty imageStyle={{
					height: 160,
				}} image={Empty.PRESENTED_IMAGE_SIMPLE} description={
					<span>
						Select a role to view its details here
					</span>
				} /> */}
			</div>
		</div>
	)
}

export default Roles;