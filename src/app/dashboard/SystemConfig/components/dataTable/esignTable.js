import { Button, Form, Input, InputNumber, Popconfirm, Table, Tooltip, Typography } from 'antd';
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

const EsignTable = ({ tableData, esignDataLoading }) => {
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
	}, [esignDataLoading])

	// const defaultColumns = tableColumns(tableData)
	const tableColumns = (item) => {
		let objkeys =
			item !== undefined && item.length > 0 ? Object.keys(item[0]) : [];
		let column = [];
		objkeys &&
			objkeys.map((val, i) => {
				if (val == 'key') {
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
		deleteTableConfig(filterData[0])
		setData(newData);
	};


	const handleAdd = () => {
		const newData = {
			language: "",
			reason_code: "",
			reason_text: "",
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
			type: "esign_reasons"
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
			type: "esign_reasons"
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
			language: "",
			reason_code: "",
			reason_text: "",
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
				inputType: 'text',
				dataIndex: col.dataIndex,
				title: col.title,
				editing: col.dataIndex === 'reason_code' && isEdit ? false : isEditing(record),
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
				bordered={false}
				className="config-table"
				dataSource={data}
				columns={mergedColumns}
				rowClassName="editable-row"
				pagination={{
					onChange: cancel,
				}}
				rowKey={(record) => record.email_id}
				loading={esignDataLoading}
			/>
		</Form>
	);
};
export default EsignTable;