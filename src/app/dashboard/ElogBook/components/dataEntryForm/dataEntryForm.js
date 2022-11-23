/**
 * @author Dinesh
 * @Mareana - CPV Product
 * @version  1
 * @Last Modified - 08 Nov, 2022
 * @Last Changed By - Dinesh
 * @Last Modified - 15-11-2022
 * @Last Changed By - Siddesh
 */

import { Card, Tabs } from "antd";
import React from 'react';
import elogJson from "../elog.json";
import "./dataEntryForm.scss";
import DataFormFirst from "./dataFormFirst/dataFormFirst";
const DataEntryForm = () => {
	return (
		<Card
			title="E-log Book [4 forms]"
			bordered={false}
		>
			<Tabs defaultActiveKey="1">
				<Tabs.TabPane tab="BU form" key="1">
					<DataFormFirst
						getTableData={elogJson}
					// saveTableData={saveUserConfigurationws}
					// deleteTableRow={deleteUserConfiguartions}
					/>
				</Tabs.TabPane>
				<Tabs.TabPane tab="Karl fisher" key="2">
					Content of Tab Pane 2
				</Tabs.TabPane>
				<Tabs.TabPane tab="Disso" key="3">
					Content of Tab Pane 3
				</Tabs.TabPane>
				<Tabs.TabPane tab="CU" key="4">
					Content of Tab Pane 4
				</Tabs.TabPane>
				<Tabs.TabPane tab="Assay - SA" key="5">
					Content of Tab Pane 5
				</Tabs.TabPane>
			</Tabs>

		</Card>
	)
}

export default DataEntryForm;