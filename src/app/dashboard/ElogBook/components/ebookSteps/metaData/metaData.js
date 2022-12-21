import { PlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Form, Input, Popconfirm, Row, Select, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import "./metaData.scss";
import {
	hideLoader, showLoader, showNotification
} from "../../../../../../duck/actions/commonActions";
import { getMetadata, updatealldata } from "../../../../../../../src/services/eLogBookService";
import { useDispatch } from 'react-redux';


const Opt = [
	{
		value: 'custom meta data',
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

function metaData({ sendDataToParentTab, tempName }) {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const [check, setCheck] = useState(false)
	const [moleculeData, setMoleculeData] = useState([
		{
			key: 1,
			MetaData: "",
			KeyData: "",
			ValueData: "",
			selectDrop: false,
			Allowedit: false
		}]);
	const [selectData, setSelectData] = useState({ Add: false })
	const [formData, setFormData] = useState({
		key: '',
		MetaData: "",
		KeyData: "",
		ValueData: "",
		selectDrop: false,
		Allowedit: check
	})
	const [val, setVal] = useState('');
	const [count, setCount] = useState(1);

	const [data, setData] = useState({ label: '' })
	const [editingKey, setEditingKey] = useState('');
	const [alowEdit, setAllowEdit] = useState(false);
	const [metaDataopt, setMetaDataopt] = useState([])

	useEffect(() => {
		getMetadataLists();
		
	}, [])

	const updatemetadata = async (data) => {
	
		dispatch(showLoader());
		try {
		const metaDataupdate = await updatealldata(data);
			dispatch(hideLoader());
			if (metaDataupdate.Status === 200) {
				dispatch(showNotification('success', "updated succesfully"));
			} else {
				dispatch(showNotification('error', "Error"));
			}
		} catch (error) {
			dispatch(hideLoader());
			dispatch(showNotification('error', error));
		}
	}
	const getMetadataLists = async () => {
		let req = {
			"product": "BELATACEPT",
			"product_num": "1322454",
			"site": "1255"
		}
		let metaData_list = await getMetadata(req)
		setMetaDataopt(metaData_list);

	}

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

	const EditableCell =
		({
			editing,
			dataIndex,
			title,
			inputType,
			record,
			index,
			children,
			...restProps
		}) => {

			switch (inputType) {
				case "checkbox":
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
											required: false,
											message: `Please Input ${title}!`,
										},
									]}
									valuePropName="checked"
								>
									<Checkbox />
								</Form.Item>
							) : (
								children
							)}
						</td>
					)

				case "select":
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
											required: false,
											message: `Please Input ${title}!`,
										},
									]}
								>

									<Select
										placeholder="Select"
										defaultValue="Add Custom meta data"
										className="Selectdata"
										value={record.MetaData || formData.MetaData}
										onChange={(event) => handleChange(event, record)}
										// onChange={(e) => setFormData({...formData, MetaData : e})}
										options={Opt}
									/>

								</Form.Item>
							) : (
								children
							)}
						</td>
					);
				case "valueselect":
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
											required: false,
											message: `Please Input ${title}!`,
										},
									]}
								>

									<Select>
										{(record.MetaData === "Site" ? metaDataopt.sites : record.MetaData === "Batch" ? metaDataopt.batches : record.MetaData === "Material" ? metaDataopt.product_num : '').map((option, index) => (
											<Select.Option key={index} value={option}>{option}</Select.Option>
										))}
									</Select>

								</Form.Item>
							) : (
								children
							)}
						</td>
					);
				default:
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
											required: false,
											message: `Please Input ${title}!`,
										},
									]}
								>
									<Input placeholder="To be filled by renderer" />
								</Form.Item>
							) : (
								children
							)}
						</td>
					);
			}

		};

	const onChange = (e, cdata) => {
		setCheck(e.target.checked)
		setFormData({
			key: cdata.key,
			MetaData: formData.MetaData,
			KeyData: formData.MetaData === "Site" ? "Site" : formData.KeyData,
			ValueData: formData.ValueData,
			selectDrop: true,
			Allowedit: e.target.checked
		})
		setMoleculeData(moleculeData.map(user => (user.key === cdata.key ?
			{
				key: cdata.key,
				MetaData: formData.MetaData,
				KeyData: formData.KeyData,
				ValueData: formData.ValueData,
				selectDrop: true,
				Allowedit: formData.Allowedit,
			} : user)));

	};


	const handleChange = (event, edata) => {
		setSelectData({ Add: true });
		setData({ label: event })

		setFormData({
			key: edata.key,
			MetaData: event,
			KeyData: event === "Site" ? "Site" : event === "Batch" ? "Batch" : event === "Material" ? "Material" : '',
			ValueData: "",
			selectDrop: true,
			Allowedit: check
		})
		setMoleculeData(moleculeData.map(user => (user.key === edata.key ?
			{
				key: edata.key,
				MetaData: event,
				KeyData: event === "Site" ? "Site" : event === "Batch" ? "Batch" : event === "Material" ? "Material" : '',
				ValueData: '',
				selectDrop: true,
				Allowedit: check,
			}
			: user)));
		form.setFieldsValue({
			MetaData: event,
			KeyData: event === "Site" ? "Site" : event === "Batch" ? "Batch" : event === "Material" ? "Material" : '',
			ValueData: '',
			Allowedit: '',

			...formData,
		});
		setEditingKey(edata.key);
	};

	useEffect(() => {
		setSelectData(selectData)
		setMoleculeData(moleculeData)


		setFormData(formData)
		setEditingKey('')

	}, [moleculeData, formData])

	const handleAdd = () => {
		const newData = {
			key: moleculeData.length + 1,
			MetaData: "",
			KeyData: "",
			ValueData: "",
			selectDrop: false,
			Allowedit: false,

		};
		setSelectData({ Add: false });
		setMoleculeData([...moleculeData, newData]);
		setCount(count + 1);
	};

	const handleDelete = (i) => {
		setMoleculeData(moleculeData.filter(user => user.key !== i.key));
	};

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
						defaultValue="Add Custom meta data"
						className="Selectdata"
						value={record.MetaData || formData.MetaData}
						onChange={(event) => handleChange(event, record)}
						options={Opt}
					/>
				)
			},

			{
				title: "Key",
				dataIndex: "KeyData",
				key: "KeyData",
				width: "25%",
				editable: true,
				render: (text, record) => {
					const editable = isEditing(record);
					return record.selectDrop === false ? '' :

						editable ?
							<Input

								type="text"
								placeholder="Enter mete data field name"
								name="KeyData"
								value={record.KeyData || formData.KeyData}
								onChange={(e) => setFormData({ ...formData, KeyData: e.target.value })}
							/>
							:
							<p>{record.KeyData}</p>

				}
			},
			{
				title: "Value",
				dataIndex: "ValueData",
				key: "ValueData",
				width: "25%",
				editable: true,
				render: (text, record) => {

					const editable = isEditing(record);
					return record.selectDrop === false ? '' :
						editable ?
							record.MetaData === "Site" || record.MetaData === "Batch" || record.MetaData === "Material" ?
								<Select>
									{record.MetaData === "Site" ? metaDataopt.sites : record.MetaData === "Batch" ? metaDataopt.batches : record.MetaData === "Material" ? metaDataopt.product_num : ''.map((option) => (
										<Select.Option key={option} value={option}>{option}</Select.Option>
									))}
								</Select> :
								<Input
									type="text"
									placeholder="To be filled by renderer"
									name="ValueData"
									value={record.ValueData || formData.ValueData}
									onChange={(e) => setFormData({ ...formData, ValueData: e.target.value })}
								/>
							: <p>{record.ValueData}</p>
				}
			},
			{
				title: "Allow user to edit",
				dataIndex: "Allowedit",
				key: "Allowedit",
				width: "15%",
				editable: true,
				render: (text, record) => {
					const editable = isEditing(record);
					return record.selectDrop === false ? '' :

						<input type="checkbox" checked={record.Allowedit || check}
							disabled={editable ? false : true}
							onChange={(e) => onChange(e, record)}

						/>
				}
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
										</Popconfirm>
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
				}
			},

		];

	const handleSave = (data) => {
		showLoader();
		let req = {
			"form_ids": [
				
			  ],
			  "meta_data": {"moleculeData": data},
			  "molecule": tempName.Pname,
			  "site": "",
			  "template_name": tempName.Tname,
		}
		updatemetadata(req);
	}
	const handleNext = (e) => {
		sendDataToParentTab("2")
	}
	return (
		<>
			<div className="main-metadata">
				<div className="metadata-subheader ">
					<div className="button-layout">
						<div className="layout-button">
							<span className="data-button">
								<Button
									className="custom-secondary-btn "
									type="primary"
									onClick={(e) => handleSave(moleculeData)}
								>
									Save meta data
								</Button>
							</span>
							<Button
								className="custom-secondary-btn"
								type="primary"
								onClick={(e) => handleNext(e)}
							>
								Next
							</Button>
						</div>

					</div>
				</div>
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
									inputType: col.dataIndex === 'MetaData' ? 'select' : col.dataIndex === 'Allowedit' ? "checkbox" : col.dataIndex === "KeyData" ? "text" : col.dataIndex === " ValueData" || record.MetaData === "Batch" || record.MetaData === "Site" || record.MetaData === "Material" ? "valueselect" : "text",
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
			</div>
		</>
	)
}

export default metaData
