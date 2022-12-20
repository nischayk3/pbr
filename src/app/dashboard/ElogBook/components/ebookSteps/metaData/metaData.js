import { PlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Form, Input, Popconfirm, Row, Select, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import "./metaData.scss";
import {
	hideLoader, showLoader, showNotification
} from "../../../../../../duck/actions/commonActions";
import { getMetadata } from "../../../../../../../src/services/eLogBookService"

const Data = 
        {
			"metaData": [
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
						],
           
                        "table": {
                            "columns": [

                                        {
                                            "align": "center",
                                            "dataIndex": "mete_data",
                                            "editable": true,
                                            "label": "Meta data",
                                            "name": "meta_data",
                                            "title": "Meta data",
                                            "type": "select",
											"options":[
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
                                        },
                                        {
                                            "align": "center",
                                            "dataIndex": "keyData",
                                            "editable": true,
                                            "label": "Key",
                                            "name": "keyData",
                                            "title": "Key",
                                            "type": "input"
                                        },
										{
                                            "align": "center",
                                            "dataIndex": "value",
                                            "editable": true,
                                            "label": "Value",
                                            "name": "value",
                                            "title": "Value",
                                            "type": "input"
                                        },
										{
                                            "align": "center",
                                            "dataIndex": "allow_user_to_edit",
                                            "editable": true,
                                            "label": "Allow user too edit",
                                            "name": "allow_user_to_edit",
                                            "title": "Allow user too edit",
                                            "type": "toggle",
                                            "toggle": false,
											"toggletrue": true
                                        },
                                    
                                        {
                                            "align": "center",
                                            "children": [],
                                            "dataIndex": "actions",
                                            "editable": true,
                                            "fixed": "right",
                                            // "key": "460fba44-76fe-11ed-a3fc-af1c9e8a9d3d",
                                            "label": "Actions",
                                            "name": "actions",
                                            "title": "Actions",
                                            "type": "button",
                                            "width": "150px"
                                }
                            ],
                            "dataSource": [],
                            "deleteActionColumn": false,
                            "rowInitialData": {
                                "edit": true,
                                "sample": "",
                                "series_a_mg": "",
                                "series_a_value": ""
                            }
                        }
                    
      
		}


function metaData({ sendDataToParent, Alldata }) {
	const [form] = Form.useForm();
	const [check, setCheck] = useState(false)
	const [moleculeData, setMoleculeData] = useState([
		{
			key: 1,
				MetaData: "",
				KeyData: "",
				ValueData: "",
				selectDrop: false,
				Allowedit: false
			// key: 1,
			// MetaData: "",
			// KeyData: "Data1",
			// ValueData: "Value1",
			// selectDrop: true,
			// Allowedit: false,
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
	const[alowEdit, setAllowEdit] = useState(false);
	const [metaDataopt, setMetaDataopt] = useState([])

	useEffect(() => {
		getMetadataLists()
	}, [])

	const getMetadataLists = async () => {
		let req = {
			 "product" : "BELATACEPT",
			 "product_num": "1322454",
			 "site": "1255"
		}
		let metaData_list = await getMetadata(req)
		setMetaDataopt(metaData_list);
	
		console.log(metaData_list);
	}

	const isEditing = (record) => record.key === editingKey;
	const edit = (record) => {
		console.log(record);
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
			console.log(row);
			const newData = [...moleculeData];
			const index = newData.findIndex((item) => key.key === item.key);
			if (index > -1) {
				const item = newData[index];
				newData.splice(index, 1, {
					...item,
					...row,
				});
				console.log(newData);
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
	
	const onChanges = (e ,record) => {
		setAllowEdit(e.target.checked)
		setFormData({
			key: record.key,
			MetaData: formData.MetaData,
			KeyData: formData.MetaData === "Site" ? "Site" : formData.KeyData,
			ValueData: formData.ValueData,
			selectDrop: true,
			Allowedit: alowEdit
		})
	}
	
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
						defaultValue="Add Custom mete data"
						className="Selectdata"
						value={record.MetaData || formData.MetaData}
						onChange={(event) => handleChange(event, record)}
						// onChange={(e) => setFormData({...formData, MetaData : e})}
						options={Data.metaData }
					/>
							
							</Form.Item>
						): (
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
						{(record.MetaData === "Site" ? metaDataopt.sites : record.MetaData === "Batch" ? metaDataopt.batches : record.MetaData === "Material" ? metaDataopt.product_num : '' ).map((option, index) => (
						  <Select.Option key={index} value={option}>{option}</Select.Option>
						))}
					  </Select>
					
							</Form.Item>
						): (
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
								 <Input  />
							</Form.Item>
						): (
							children
						)}
					</td>
					);
				}
				
		
			

};


console.log(formData, metaDataopt);
	const handleChang = (e, cdata) => {
		console.log(cdata);
		// setCheck(!check)
		setVal(e.target.value)
		// setMoleculeData(moleculeData.map(user => (user.key === cdata.key ?
		// 	{
		// 		key: cdata.key,
		// 		MetaData: formData.MetaData,
		// 		KeyData: formData.KeyData,
		// 		ValueData: e.target.value,
		// 		selectDrop: true,
		// 		Allowedit: formData.Allowedit,
		// 	} : user)));

		sendDataToParent(moleculeData)

		// form.setFieldsValue({
		// 	MetaData: '',
		// 	KeyData: '',
		// 	ValueData: '',
		// 	Allowedit: '',

		// 	...formData,
		// });
		// setEditingKey(formData.key);
	}

	const onChange = (e, cdata) => {
		console.log(e.target.checked);
		setCheck(e.target.checked)
		setFormData({
			key: cdata.key,
			MetaData: formData.MetaData,
			KeyData: formData.MetaData === "Site" ? "Site" : formData.KeyData,
			ValueData: formData.ValueData,
			selectDrop: true,
			Allowedit: e.target.checked
		})
		console.log(formData);
		// setFormData({...formData, Allowedit : e.target.checked})
		setMoleculeData(moleculeData.map(user => (user.key === cdata.key ?
			{
				key: cdata.key,
				MetaData: formData.MetaData,
				KeyData: formData.KeyData,
				ValueData: formData.ValueData,
				selectDrop: true,
				Allowedit: formData.Allowedit,
			} : user)));

		sendDataToParent(moleculeData)

		// form.setFieldsValue({
		// 	MetaData: '',
		// 	KeyData: '',
		// 	ValueData: '',
		// 	Allowedit: '',

		// 	...formData,
		// });
		// setEditingKey(formData.key);

	};


	const handleChange = (event, edata) => {
		// setCheck(!check)
		setSelectData({ Add: true });
		setData({ label: event })

		setFormData({
			key: edata.key,
			MetaData: event,
			KeyData: event === "Site" ? "Site" : event === "Batch" ? "Batch" :  event === "Material" ? "Material" : '',
			ValueData: "",
			selectDrop: true,
			Allowedit: check
		})
		setMoleculeData(moleculeData.map(user => (user.key === edata.key ?
			{
				key: edata.key,
				MetaData: event,
				KeyData:event === "Site" ? "Site" : event === "Batch" ? "Batch" :  event === "Material" ? "Material" : '',
				ValueData: '',
				selectDrop: true,
				Allowedit: check,
			}
			: user)));
		sendDataToParent(moleculeData);
		form.setFieldsValue({
				MetaData: event,
				KeyData: event === "Site" ? "Site" : event === "Batch" ? "Batch" :  event === "Material" ? "Material" : '',
				ValueData: '',
				Allowedit: '',

			...formData,
		});
		setEditingKey(edata.key);
	};

	const handleChanged = (event, edata) => {
		// setCheck(!check)
		setSelectData({ Add: true });
		setData({ label: event })
		
		setFormData({
			key: edata.key,
			MetaData: event,
			KeyData: event === "Site" ? "Site" : "",
			ValueData: "",
			selectDrop: true,
			Allowedit: check
		})
		setMoleculeData(moleculeData.map(user => (user.key === edata.key ?
			{
				key: edata.key,
				MetaData: event,
				KeyData: event === "Site" ? "Site" : '',
				ValueData: '',
				selectDrop: true,
				Allowedit: check,
			}
			: user)));
		sendDataToParent(moleculeData);
		form.setFieldsValue({
			MetaData: event,
			KeyData: event === "Site" ? "Site" : "",
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
       
	}, [moleculeData,formData])

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
		// sendDataToParent()
		setCount(count + 1);
	};


console.log(moleculeData);
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
						options={Data.metaData}
					/>
				)
			},

			{
				title: "Key",
				dataIndex: "KeyData",
				key: "KeyData",
				width: "25%",
				editable: true,
				render: (text, record) =>{
					const editable = isEditing(record);
					return	record.selectDrop === false ? '' :

					editable  ? 
						<Input
						
							type="text"
							placeholder="Enter mete data field name"
							name="KeyData"
							value={record.KeyData || formData.KeyData}
							// onChange={(e) => handleChang(e,record)}
							onChange={(e) => setFormData({ ...formData, KeyData: e.target.value })}
						/>
						: 
						<p>{record.KeyData }</p>
					
				}
			},
			{
				title: "Value",
				dataIndex: "ValueData",
				key: "ValueData",
				width: "25%",
				editable: true,
				render: (text, record) =>{
				
				const editable = isEditing(record);
				return record.selectDrop === false ? '' :
				editable  ? 
				record.MetaData === "Site" || record.MetaData === "Batch" || record.MetaData === "Material" ?
				<Select>
						{record.MetaData === "Site" ? metaDataopt.sites : record.MetaData === "Batch" ? metaDataopt.batches : record.MetaData === "Material" ? metaDataopt.product_num : '' .map((option) => (
						  <Select.Option key={option} value={option}>{option}</Select.Option>
						))}
					  </Select> :
						<Input
							type="text"
							placeholder="To be filled by rendered"
							name="ValueData"
							value={record.ValueData || formData.ValueData}
							// onChange={(e) => handleChang(e, record)}
						onChange={(e) => setFormData({...formData, ValueData : e.target.value})}
						// disabled={record.ValueData ? true : true}
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
				render: (text, record) =>{
					const editable = isEditing(record);
				return record.selectDrop === false ? '' :
					
				<input type="checkbox" checked={record.Allowedit || check} 
						disabled={editable  ? false : true}
							onChange={(e) => onChange(e, record)}
						// onChange={(e) => setFormData({...formData, Allowedit : e.target.checked})}

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

		const handleSave = (data) => {
		   showLoader()
		}
		console.log(Data);
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
						// disabled = {state.length > 1 ? false : true}
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
								inputType: col.dataIndex === 'MetaData' ? 'select' : col.dataIndex === 'Allowedit' ? "checkbox" : col.dataIndex === "KeyData" ? "text" : col.dataIndex === " ValueData" || record.MetaData === "Batch" || record.MetaData === "Site" || record.MetaData === "Material" ? "valueselect"  : "text" ,
								dataIndex: col.dataIndex,
								title: col.title,
								editing: isEditing(record)

							})
						};
					})}

					components={{
						body: {
							// row: EditableRow,
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
