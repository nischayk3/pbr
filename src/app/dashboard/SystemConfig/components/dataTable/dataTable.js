import { Button, Checkbox, Form, Input, InputNumber, Popconfirm, Table, Tooltip, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { v1 as uuid } from "uuid";
import ROW_ICON from '../../../../../assets/icons/add-row.png';
import { hideLoader, showLoader, showNotification } from '../../../../../duck/actions/commonActions';
import { deleteConfig, updateConfig } from '../../../../../services/systemConfigService';

const EditableCell = ({
	editing,
	dataIndex,
	title,
	inputType,
	record,
	index,
	children,
	...restProps
}) => {

	const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
	return (
		<td {...restProps}>
			{editing ? (
				<Form.Item
					name={dataIndex}
					style={{
						margin: 0,
					}}
					rules={[
						{
							required: true,
							message: `Please Input ${title}!`,
						},
					]}
				>
					{inputNode}
				</Form.Item>
			) : (
				children
			)}
		</td>
	);
};

const DataTable = ({ tableData }) => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const [data, setData] = useState([]);
	const [editingKey, setEditingKey] = useState('');
	const [isEdit, setIsEdit] = useState(false);
	const isEditing = (record) => record.key === editingKey;

	useEffect(() => {
		if (tableData.length > 0) {
			tableData.forEach((data) => {
				data.key = uuid();
			});
			setData(tableData)
		}
	}, [])

	const onChange = (e, record, rowIndex) => {
		const rowData = [...data];
		rowData[rowIndex]['smtp_enable'] = e.target.checked == false ? "" : e.target.checked;
		setData(rowData)
	};

	// const defaultColumns = tableColumns(tableData)
	const tableColumns = (item) => {
		let objkeys =
			item !== undefined && item.length > 0 ? Object.keys(item[0]) : [];
		let column = [];
		objkeys &&
			objkeys.map((val, i) => {
				if (val == 'smtp_enable') {
					return (
						column.push({
							title: val.toUpperCase().replace(/_/g, " "),
							dataIndex: val,
							key: i,
							render: (value, record, rowIndex) => {
								return (
									<Checkbox key={rowIndex} checked={value} onChange={(e) => onChange(e, record, rowIndex)} />
								)
							}
						})
					)
				} else if (val == 'key') {
					return val
				} else {
					return (
						column.push({
							title: val.toUpperCase().replace(/_/g, " "),
							dataIndex: val,
							key: i,
							editable: true,
						})
					)
				}
			});
		column.push({
			title: 'ACTION',
			dataIndex: 'operation',
			key: 9,
			width: '150',
			render: (_, record) => {
				const editable = isEditing(record);
				return editable ? (
					<span>
						<Typography.Link
							onClick={() => save(record.key)}
							style={{
								marginRight: 8,
							}}
						>
							Save
						</Typography.Link>
						<Popconfirm title="Sure to cancel?" onConfirm={cancel}>
							<a>Cancel</a>
						</Popconfirm>
					</span>
				) : (
					<span>
						<Typography.Link disabled={editingKey !== ''} onClick={() => handleEdit(record)} style={{
							marginRight: 8,
						}}>
							Edit
						</Typography.Link>
						{data.length >= 1 ? (
							<Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
								<a>Delete</a>
							</Popconfirm>
						) : null}
					</span>
				);
			},
		})
		return column;
	};

	const handleDelete = (key) => {
		const newData = data.filter((item) => item.key !== key);
		const filterData = data.filter((item) => item.key === key)
		setData(newData);
		deleteTableConfig(filterData[0])
	};

	const handleAdd = () => {
		const newData = {
			email_id: "",
			imap_port: "",
			imap_server: "",
			pop_port: "",
			pop_server: "",
			smtp_enable: false,
			smtp_port: "",
			smtp_server: "",
			use_type: "",
			key: uuid(),
		};

		setEditingKey(newData.key);
		setData([...data, newData]);
		setIsEdit(false);

	};

	const updateTableConfig = async (_req) => {
		delete _req['key'];
		let payload = {
			data: _req,
			type: "emails"
		}
		try {
			dispatch(showLoader())
			const updateRes = await updateConfig(payload)
			if (updateRes.statuscode === 200) {
				dispatch(hideLoader());
				dispatch(showNotification("success", updateRes.message));
			} else {
				dispatch(hideLoader());
				dispatch(showNotification("error", updateRes.message));
			}

		} catch (error) {
			dispatch(hideLoader());
			dispatch(showNotification("error", error));
		}
	};


	const deleteTableConfig = async (_req) => {
		delete _req['key'];
		let payload = {
			data: _req,
			type: "emails"
		}
		try {
			dispatch(showLoader())
			const updateRes = await deleteConfig(payload)
			if (updateRes.statuscode === 200) {
				dispatch(hideLoader());
				dispatch(showNotification("success", updateRes.message));
			} else {
				dispatch(hideLoader());
				dispatch(showNotification("error", updateRes.message));
			}

		} catch (error) {
			dispatch(hideLoader());
			dispatch(showNotification("error", error));
		}
	};


	const handleEdit = (record) => {
		setEditingKey(record.key);
		setIsEdit(true);
		form.setFieldsValue({
			email_id: "",
			imap_port: "",
			imap_server: "",
			pop_port: "",
			pop_server: "",
			smtp_enable: "",
			smtp_port: "",
			smtp_server: "",
			use_type: "",
			...record,
		});
	};

	const cancel = () => {
		setEditingKey('');
	};

	const save = async (key) => {
		try {
			const row = await form.validateFields();
			const newData = [...data];
			const index = newData.findIndex((item) => key === item.key);
			setIsEdit(false);
			if (index > -1) {
				const item = newData[index];
				newData.splice(index, 1, {
					...item,
					...row,
				});
				setData(newData);
				updateTableConfig(newData[index])
				setEditingKey('');
			} else {
				newData.push(row);
				updateTableConfig(newData[index])
				setData(newData);
				setEditingKey('');
			}
		} catch (errInfo) {
			console.log('Validate Failed:', errInfo);
		}
	};

	const defaultColumns = tableColumns(data)

	const mergedColumns = defaultColumns.map((col) => {
		if (!col.editable) {
			return col;
		}
		return {
			...col,
			onCell: (record) => ({
				record,
				inputType: col.dataIndex === 'imap_port' || col.dataIndex === 'pop_port' || col.dataIndex === 'smtp_port' ? 'number' : 'text',
				dataIndex: col.dataIndex,
				title: col.title,
				editing: col.dataIndex === 'use_type' && isEdit ? false : isEditing(record),
			}),
		};
	});

	return (
		<Form form={form} component={false}>
			<div className="table-head">
				<Tooltip title="Add row">
					<Button
						onClick={handleAdd}
						type="link"
						style={{
							marginBottom: 16,
						}}
					>
						<img src={ROW_ICON} />
					</Button>
				</Tooltip>
			</div>
			< Table
				components={{
					body: {
						cell: EditableCell,
					},
				}}
				dataSource={data}
				columns={mergedColumns}
				rowClassName="editable-row"
				pagination={{
					onChange: cancel,
				}}
				rowKey={(record) => record.key}
				bordered={false} className="config-table"
			/>
		</Form>
	);
};
export default DataTable;