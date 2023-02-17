import { Collapse } from "antd";
import React from 'react';
import DataTable from "./dataTable";
import "./style.scss";

const ConfigTable = () => {

	const { Panel } = Collapse;
	return (
		<div className="config-wrap">
			<Collapse
			// defaultActiveKey={['1']}
			>
				<Panel header="Data sources" key="1">
					<DataTable />
				</Panel>
				<Panel header="E-sign reasons" key="2">
					{/* <Table bordered={false} columns={columns} dataSource={isApproved} className="elog-table" /> */}
				</Panel>
				<Panel header="Product types" key="3">
					{/* <Table bordered={false} columns={columns} dataSource={isRejected} className="elog-table" /> */}
				</Panel>
				<Panel header="System session timeout" key="4">
					{/* <Table bordered={false} columns={columns} dataSource={isRejected} className="elog-table" /> */}
				</Panel>
			</Collapse>
		</div>
	)
}

export default ConfigTable