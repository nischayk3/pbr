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
	const [values, setValue] = useState(false)
	const onhandleChange = e => {
		setValue(e.target.checked)
	}
	const inputNode = inputType === 'select' ? <Select options={[
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
	]} /> : inputType === 'checkbox' ? <Checkbox onChange={(e) => onhandleChange(e)} /> : <Input />;
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


function metaData({ sendDataToParent, Alldata }) {
	const [form] = Form.useForm();
	const [check, setCheck] = useState(false)
	const [moleculeData, setMoleculeData] = useState(Alldata);
	const [selectData, setSelectData] = useState({ Add: false })
	const [formData, setFormData] = useState({
		key: '',
		MetaData: "",
		KeyData: "",
		ValueData: "",
		selectDrop: false,
		Allowedit: ''
	})
	const [val, setVal] = useState('');
	const [count, setCount] = useState(1);

	const [data, setData] = useState({ label: '' })
	const [editingKey, setEditingKey] = useState('');
	const isEditing = (record) => record.key === editingKey;
	const edit = (record) => {
		form.setFieldsValue({
			MetaData: '',
			KeyData: '',
			ValueData: '',
			Allowedit: '',

			...record,
		});
		setEditingKey(record.key);
	};
	const cancel = () => {
		setEditingKey('');
	};
	const save = async (key) => {
				try {
			const row = await form.validateFields();
			const newData = [...moleculeData];
			const index = newData.findIndex((item) => key.key === item.key);
			if (index > -1) {
				const item = newData[index];
				newData.splice(index, 1, {
					...item,
					...row,
				});
				setMoleculeData(newData);
				sendDataToParent(moleculeData)
				setEditingKey('');
			} else {
				newData.push(row);
				setMoleculeData(newData);
				sendDataToParent(moleculeData)
				setEditingKey('');
			}
		} catch (errInfo) {
			console.log('Validate Failed:', errInfo);
		}
	};

	const handleChang = (e, cdata) => {
		setCheck(!check)
		setVal(e.target.value)
		setMoleculeData(moleculeData.map(user => (user.key === cdata.key ?
			{
				key: cdata.key,
				MetaData: formData.MetaData,
				KeyData: formData.KeyData,
				ValueData: e.target.value,
				selectDrop: true,
				Allowedit: false,
			} : user)));

		sendDataToParent(moleculeData)
	}

	const onChange = (e, cdata) => {
		setCheck(e.target.checked)
		setMoleculeData(moleculeData.map(user => (user.key === cdata.key ?
			{
				key: cdata.key,
				MetaData: formData.MetaData,
				KeyData: formData.KeyData,
				ValueData: val,
				selectDrop: true,
				Allowedit: check,
			} : user)));

		sendDataToParent(moleculeData)

	};


	const handleChange = (event, edata) => {
		setCheck(!check)
		setSelectData({ Add: true });
		setData({ label: event })

		setFormData({
			key: edata.key,
			MetaData: event,
			KeyData: event === "Site" ? "Site" : "",
			ValueData: "",
			selectDrop: true,
			Allowedit: false
		})
		setMoleculeData(moleculeData.map(user => (user.key === edata.key ?
			{
				key: edata.key,
				MetaData: event,
				KeyData: event === "Site" ? "Site" : '',
				ValueData: '',
				selectDrop: true,
				Allowedit: false,
			}
			: user)));
		sendDataToParent(moleculeData);
	};


	useEffect(() => {
		setSelectData(selectData)
		setMoleculeData(moleculeData)
		sendDataToParent(moleculeData)

		setFormData(formData)

	}, [moleculeData, formData])

	const handleAdd = () => {
		const newData = {
			key: moleculeData.length + 1,
			MetaData: "",
			KeyData: "",
			ValueData: "",
			selectDrop: false,
			Allowedit: false

		};
		setSelectData({ Add: false });
		setMoleculeData([...moleculeData, newData]);
		// sendDataToParent()
		setCount(count + 1);
	};



	const handleDelete = (i) => {
		setMoleculeData(moleculeData.filter(user => user.key !== i.key));
	};

	const Opt = [
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
	]

	const plantMoleculeColumns =
		[
			{
				title: "Meta data",
				dataIndex: "MetaData",
				width: "20%",
				editable: true,
				render: (_, record) => (
					<Select
						placeholder="Select"
						defaultValue="Add Custom mete data"
						className="Selectdata"
						value={record.MetaData || formData.MetaData}
						onChange={(event) => handleChange(event, record)}
						// onChange={(e) => setFormData({...formData, MetaData : e})}
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
							value={record.KeyData || formData.KeyData}
							// onChange={(e) => handleChang(e,record)}
							onChange={(e) => setFormData({ ...formData, KeyData: e.target.value })}
						/>


			},
			{
				title: "Value",
				dataIndex: "ValueData",
				key: "ValueData",
				width: "25%",
				editable: true,
				render: (text, record) =>
					record.selectDrop === false ? '' :

						<Input
							type="text"
							placeholder="To be filled by rendered"
							name="ValueData"
							value={record.ValueData || formData.ValueData}
							onChange={(e) => handleChang(e, record)}
						// onChange={(e) => setFormData({...formData, ValueData : e.target.value})}
						// disabled={record.ValueData ? true : true}
						/>

			},
			{
				title: "Allow user to edit",
				dataIndex: "Allowedit",
				key: "Allowedit",
				width: "15%",
				editable: true,
				render: (text, record) =>
					record.selectDrop === false ? '' :
						<Checkbox name="Allowedit" checked={record.Allowedit || formData.Allowedit}
							onChange={(e) => onChange(e, record)}
						// onChange={(e) => setFormData({...formData, Allowedit : e.target.checked})}

						></Checkbox>

			},
			{
				title: "Action",
				dataIndex: "action",
				width: "20%",
				render: (index, record) => {
					const editable = isEditing(record);
					return record.selectDrop === false ? '' :
						<Row>
							<Col span={12} >
								{editable ? (
									<span>
										<Popconfirm title="Sure to Save?"
											onConfirm={() => save(record)}
											style={{
												marginRight: 8,
											}}
										>
											<a className="save-button">Save</a>
											{/* </Typography.Link> */}
										</Popconfirm>
										{/* <Typography.Link  onClick={cancel}>
											<a>Cancel</a>
										</Typography.Link> */}
									</span>
								) : (
									<Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
										Edit
									</Typography.Link>
								)}
							</Col>
							<Col span={12} >

								<div className="delete-button">
									<Popconfirm title="Sure to delete?" className="deleteButton" onConfirm={() => handleDelete(record)}>
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
								inputType: col.dataIndex === 'MetaData' ? 'select' : col.dataIndex === 'Allowedit' ? "checkbox" : "text",
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
