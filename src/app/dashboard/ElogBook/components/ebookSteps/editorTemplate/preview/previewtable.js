import { Form, Input, Table } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
	const [form] = Form.useForm();
	return (
		<Form form={form} component={false}>
			<EditableContext.Provider value={form}>
				<tr {...props} />
			</EditableContext.Provider>
		</Form>
	);
};

const EditableCell = ({
	title,
	editable,
	children,
	dataIndex,
	record,
	handleSave,
	...restProps
}) => {
	const [editing, setEditing] = useState(false);
	const inputRef = useRef(null);
	const form = useContext(EditableContext);
	useEffect(() => {
		if (editing) {
			inputRef.current.focus();
		}
	}, [editing]);

	const toggleEdit = () => {
		setEditing(!editing);
		form.setFieldsValue({
			[dataIndex]: record[dataIndex],
		});
	};

	const save = async () => {
		try {
			const values = await form.validateFields();
			toggleEdit();
			handleSave({ ...record, ...values });
		} catch (errInfo) {
			console.log('Save failed:', errInfo);
		}
	};

	let childNode = children;

	if (editable) {
		childNode = editing ? (
			<Form.Item
				style={{
					margin: 0,
				}}
				name={dataIndex}
				rules={[
					{
						required: true,
						message: `${title} is required.`,
					},
				]}
			>
				<Input ref={inputRef} onPressEnter={save} onBlur={save} />
			</Form.Item>
		) : (
			<div
				className="editable-cell-value-wrap"
				style={{
					paddingRight: 24,
				}}
				onClick={toggleEdit}
			>
				{children}
			</div>
		);
	}

	return <td {...restProps}>{childNode}</td>;
};

function Previewtable({ task, handleColumnTitle, handleRowName, layout, setLayout }) {

	const handleSave = row => {
		const newData = [...task.datasource];
		const index = newData.findIndex(item => row.key === item.key);
		const item = newData[index];
		newData.splice(index, 1, {
			...item,
			...row
		});

		layout.forEach(row => {
			row.children.forEach((col) => {
				col.children.forEach((component) => {
					if (component.id === task.id) {
						component.datasource = newData;
					}
				})
			})
		});
		setLayout(layout)
	};

	const components = {
		body: {
			row: EditableRow,
			cell: EditableCell
		}
	};
	const columns2 = layout.columns.map(col => {
		if (!col.editable) {
			return col;
		}
		return {
			...col,
			onCell: record => ({
				record,
				editable: col.editable,
				dataIndex: col.dataIndex,
				title: col.title,
				handleSave: handleSave
			})
		};
	});
	return (
		<div>
			<div><h3>{layout.tableName}</h3></div>
			<div>{layout.description}</div>
			<Table
				columns={layout.columns}
				dataSource={layout.datasource}
				components={components}
				rowClassName={() => "editable-row"}
				bordered
				pagination={{ pageSize: 50 }} scroll={{ y: 240 }}
				onHeaderRow={column => {
					return {
						onClick: (i) => handleColumnTitle(column, i.target.innerText),
					};
				}}
			/>
		</div>
	)
}

export default Previewtable
