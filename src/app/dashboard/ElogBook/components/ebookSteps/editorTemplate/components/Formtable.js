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
	const inputRef = useRef();
	const form = useContext(EditableContext);
	useEffect(() => {
		if (editing) {
			inputRef.current.focus();
		}
	}, [editing]);

	const toggleEdit = () => {
		setEditing(!editing);
		form.setFieldsValue({
			[dataIndex]: record[dataIndex]
		});
	};

	const save = async (e) => {
		try {
			const values = await form.validateFields();
			toggleEdit();
			handleSave({ ...record, ...values });
		} catch (errInfo) {
			console.log("Save failed:", errInfo);
		}
	};

	let childNode = children;

	if (editable) {
		childNode = editing ? (
			<Form.Item
				style={{
					margin: 0
				}}
				name={dataIndex}
				rules={[
					{
						required: true,
						message: `${title} is required.`
					}
				]}
			>
				<Input ref={inputRef} onPressEnter={save} onBlur={save} />
			</Form.Item>
		) : (
			<div
				className="editable-cell-value-wrap"
				style={{
					paddingRight: 24
				}}
				onClick={toggleEdit}
			>
				{children}
			</div>
		);
	}

	return <td {...restProps}>{childNode}</td>;
};

function Formtable({ task, handleColumnTitle, handleRowName, layout, setLayout }) {
	console.log(layout);
	const handleSave = row => {
		console.log(row);
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
			cell: EditableCell,
		}
	};

	const mapColumns = (col) => {
		if (!col.editable) {
			return col;
		}
		const newCol = {
			...col,
			onCell: (record) => ({
				record,
				editable: col.editable,
				dataIndex: col.dataIndex,
				title: col.title,
				handleSave: handleSave
			})
		};
		if (col.children) {
			newCol.children = col.children.map(mapColumns);
		}
		return newCol;
	};

	const columns2 = task.columns.map(mapColumns);

	return (
		<div>
			<div><h3>{task.tableName}</h3></div>
			<div>{task.description}</div>
			<Table columns={columns2} dataSource={task.datasource}
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

export default Formtable
