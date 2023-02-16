import { Collapse, Tag } from "antd";
import React from 'react';

const ConfigTable = () => {

	const { Panel } = Collapse;
	return (
		<div>
			<Collapse bordered={false}
			// defaultActiveKey={['1']}
			>

				<Panel header={
					(<Tag color="yellow">In progress</Tag>)
				} key="1">
					{/* <Table bordered={false} columns={columns} className="elog-table" /> */}
				</Panel>
				<Panel header={
					(<Tag color="green">Approved</Tag>)
				} key="2">
					{/* <Table bordered={false} columns={columns} dataSource={isApproved} className="elog-table" /> */}
				</Panel>
				<Panel header={
					(<Tag color="red">Rejected</Tag>)
				} key="3">
					{/* <Table bordered={false} columns={columns} dataSource={isRejected} className="elog-table" /> */}
				</Panel>
			</Collapse>
		</div>
	)
}

export default ConfigTable