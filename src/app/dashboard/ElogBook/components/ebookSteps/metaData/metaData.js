import { PlusOutlined } from "@ant-design/icons";
import { Form, Button, Col, Input, Popconfirm, Row, Select, Table, Typography, Checkbox } from "antd";
import React, { useEffect, useState } from "react";
import "./metaData.scss";

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
const Data = [
	{
		key: 1,
		MetaData: "custom mete data",
		KeyData: "Data1",
		ValueData: "Value1",
		selectDrop: true,
		editable: true,
	},
	{
		key: 2,
		MetaData: "custom mete data",
		KeyData: "Data2",
		ValueData: "Value2",
		selectDrop: true,
		editable: false,
	},
	{
		key: 3,
		MetaData: "Site",
		KeyData: "Site",
		ValueData: "Value3",
		selectDrop: true,
		editable: true,
	},
]

function metaData() {
	const [form] = Form.useForm();
	const [moleculeData, setMoleculeData] = useState(Data);
	const [selectData, setSelectData] = useState({ Add: false })
	const [formData, setFormData] = useState({
		key: '',
		MetaData: "",
		KeyData: "",
		ValueData: "",
		selectDrop: false,
		editable:''
	})
	const [count, setCount] = useState(1);
	const [data, setData] = useState({ label: '' })
	const [editingKey, setEditingKey] = useState('');
	const isEditing = (record) => record.key === editingKey;
	const edit = (record) => {
		form.setFieldsValue({
			MetaData: '',
			KeyData: '',
			ValueData: '',
			
			...record,
		});
		setEditingKey(record.key);
	};
	const cancel = () => {
		setEditingKey('');
	};
	const save = async (key) => {
		console.log(key);
		try {
			const row = await form.validateFields();
			console.log(row);
			const newData = [...moleculeData];
			console.log(newData);
			const index = newData.findIndex((item) => key.key === item.key);
			console.log(index);
			if (index > -1) {
				const item = newData[index];
				newData.splice(index, 1, {
					...item,
					...row,
				});
				setMoleculeData(newData);
				setEditingKey('');
			} else {
				newData.push(row);
				setMoleculeData(newData);
				setEditingKey('');
			}
		} catch (errInfo) {
			console.log('Validate Failed:', errInfo);
		}
	};


	const onChange = (e, cdata) => {
		console.log(`checked = ${e.target.checked}`, cdata);

	};


	const handleChange = (event, edata) => {
		console.log(event, edata);
		setSelectData({ Add: true });
		setData({ label: event })
		if (event !== '') {
			setFormData({
				key: '',
				MetaData: event,
				KeyData: "",
				ValueData: "",
				selectDrop: true,
				editable: ''
			})
		}
		const ndata = moleculeData.map(user => (user.key === edata.key ? {
			key: moleculeData.length,
			MetaData: event,
			KeyData: event == "Site" ? "Site" : "",
			ValueData: "",
			selectDrop: true,
			editable:'',
		} : user));
		setMoleculeData(ndata)
		console.log(ndata);
	};
	useEffect(() => {
		setSelectData(selectData)
	}, [])

	const handleAdd = () => {
		const newData = {
			key: moleculeData.length + 1,
			MetaData: "",
			KeyData: "",
			ValueData: "",
			selectDrop: false,
			editable: ""

		};
		setSelectData({ Add: false });
		setFormData({
			key: count,
			MetaData: "",
			KeyData: "",
			ValueData: "",
			selectDrop: false,
			editable:""
		})
		setMoleculeData([...moleculeData, newData]);
		setCount(count + 1);
	};


	console.log(selectData, moleculeData, data);

	const handleDelete = (i) => {
		console.log(i);
		setMoleculeData(moleculeData.filter(user => user.key !== i.key));
	};

	const plantMoleculeColumns =
		[
			{
				title: "Meta data",
				dataIndex: "MetaData",
				width: "20%",
				render: (_, record) => (
					<Select
						placeholder="Select"
						defaultValue="Add Custom mete data"
						style={{
							width: 120,
						}}
						value={record.MetaData || ''}
						onChange={(event) => handleChange(event, record)}
						options={[
							{
								value: 'custom mete data',
								label: 'Add custom mete data',
							},
							{
								value: 'Site',
								label: 'Site',
							},
							{
								value: 'Batch',
								label: 'Batch',
							},
							{
								value: 'Material',
								label: 'Material',
							},
						]}
					/>
				)
			},

			{
				title: "Key",
				dataIndex: "KeyData",
				key: "KeyData",
				width: "25%",
				editable: true,
				render: (text, record) =>
					record.selectDrop === false ? '' :

						<Input
							type="text"
							placeholder="Enter mete data field name"
							name="KeyData"
							value={record.KeyData}
							onChange={(e) => handleChange(e,record)}
						/>


			},
			{
				title: "Value",
				dataIndex: "ValueData",
				key: "ValueData",
				width: "20%",
				editable: true,
				render: (text, record) =>
					record.selectDrop === false ? '' :

						<Input
							type="text"
							placeholder="To be filled by rendered"
							name="ValueData"
							value={record.ValueData || ''}
							onChange={(e) => handleChange( e, record )}
							disabled={record.ValueData ? true : true}
						/>

			},
			{
				title: "Allow user to edit",
				dataIndex: "Allowedit",
				key: "Allowedit",
				width: "15%",
				render: (text, record) =>
					record.selectDrop === false ? '' :
						<Checkbox checked={record.editable || '' } onChange={(e) => handleChange(e,record)}></Checkbox>

			},
			{
				title: "Action",
				dataIndex: "action",
				width: "30%",
				render: (index, record) => {
					const editable = isEditing(record);
					return record.selectDrop === false ? '' :
						// formData.selectDrop === true || selectData.Add === true ?
						<Row>
							<Col span={12} >
								{editable ? (
									<span>
										<Typography.Link
											onClick={() => save(record)}
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
									<Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
										Edit
									</Typography.Link>
								)}
							</Col>
							<Col span={12} >

								<div>
									<Popconfirm title="Sure to delete?"  className="deleteButton" onConfirm={() => handleDelete(record)}>
										<a>Delete</a>
									</Popconfirm>
								</div>

							</Col>
						</Row>
					// :''
				}
			},

		];
	return (
		<>
<Form form={form} component={false}>
			<Table className="hierarchy-table" 
			columns={plantMoleculeColumns.map((col) => {
				if (!col.editable) {
					return col;
				}
				return {
					...col,
					onCell: (record) => ({
						record,
						inputType: col.dataIndex,
						dataIndex: col.dataIndex,
						title: col.title,
						editing: isEditing(record)

					})
				};
			})}

				components={{
					body: {
						cell: EditableCell,
					},
				}}

				rowClassName="editable-row" dataSource={moleculeData} pagination={false} />
 </Form>

			<div className="add-button">
				<Button
					onClick={() => handleAdd()}
					className="add-row-button"
				>
					<PlusOutlined />
					Add new row
				</Button>
			</div>

		</>
	)
}

export default metaData
