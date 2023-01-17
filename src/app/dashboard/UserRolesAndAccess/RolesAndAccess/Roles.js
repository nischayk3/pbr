/**
 * @author Dinesh Kumar <dinesh.kumar@mareana.com>
 * @Mareana - Release 3.5
 * @version  1
 * @Last Modified - 13 Jan, 2023
 * @Last Changed By - Dinesh Kumar
 */
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Input, List, Switch, Table, Tag } from 'antd';
import React, { useState } from 'react';

const Roles = () => {
	const [isCreateRole, setIsCreateRole] = useState(false);

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
	const data2 = [];
	for (let i = 0; i < 3; ++i) {
		data2.push({
			key: i.toString(),
			datatype: 'Molecule',
		});
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
				<p className="content">
					The chart manager works with sample sentences like this one, and can always be replaced by the correct information since this is only a design placeholder.
				</p>
				<p className='card-heading'>Resources and authorizations</p>
				<div className="resource-card-wrapper">
					{resourceCard}
					{resourceCard}
					{resourceCard}
					{resourceCard}
				</div>

				<p className='card-heading'>Data access</p>
				<Table
					className='roles-table'
					columns={columns2}
					expandable={{
						expandedRowRender,
						defaultExpandedRowKeys: ['0'],
					}}
					dataSource={data2}
				/>
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