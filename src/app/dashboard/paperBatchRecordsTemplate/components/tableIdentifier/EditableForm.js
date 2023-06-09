import { Form } from "antd";
import React, { useState } from "react";
import { EditableUsersTable } from "./EditableTable";

const mockData = {
	userlistName: "name",
	users: [
		{
			age: 1,
			name: "john"
		},
		{
			age: 2,
			name: "marry"
		}
	]
};
/* istanbul ignore next */
export const EditableTableForm = (props) => {
	let { columnData, selectedIdentifier, setSelectedRowRows, selectedRowRows, setSelectedRowValues, selectedRowValues, triggerUpdate } = props
	const [initialColumnData, setInitialColumnData] = useState({ users: columnData })

	const onFinish = values => {
		console.log("Received values of form:", values);
	};
	const pageIdentifierValueChange = (changedValues, values) => {
		console.log("changedValues,values", changedValues, values)
	};

	return (
		<Form name="dynamic_form_item" onFinish={onFinish} initialValues={initialColumnData} onValuesChange={pageIdentifierValueChange}>
			<EditableUsersTable users={columnData} selectedIdentifier={selectedIdentifier} setSelectedRowRows={setSelectedRowRows}
				selectedRowRows={selectedRowRows} setSelectedRowValues={setSelectedRowValues} selectedRowValues={selectedRowValues}
				triggerUpdate={triggerUpdate} />
		</Form>

	);
};
