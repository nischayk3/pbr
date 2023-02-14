import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Input, Popconfirm, Row, Select, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import "./metaData.scss";
import {
	hideLoader, showLoader, showNotification
} from "../../../../../../duck/actions/commonActions";
import { getMetadata, updatealldata } from "../../../../../../../src/services/eLogBookService";
import { useDispatch } from 'react-redux';
import { v1 as uuid } from "uuid";


const Opt = [
	{
		value: 'custom meta data',
		label: 'Add custom meta data',
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
	const dispatch = useDispatch();
	const [metaDataopt, setMetaDataopt] = useState([])
	const [moleculeData, setMoleculeData] = useState([
		{
			key: uuid(),
			MetaData: "Add custom meta data",
			KeyData: "",
			ValueData: "",
			Allowedit: false,
			editable: true
		}]);

	const [count, setCount] = useState(1);

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
			"product": tempName.Pname,
			"product_num": "1322454",
			"site": "1255"
		}
		let metaData_list = await getMetadata(req)
		setMetaDataopt(metaData_list);

	}

	const handleValue = (col, event, record) => {
		let molecule_data = [...moleculeData]
		var foundIndex = molecule_data.findIndex(x => x.key == record.key);
		switch (col) {
			case 'user_edit':
				molecule_data[foundIndex]['Allowedit'] = !record.Allowedit
				break;
			case 'key':
				molecule_data[foundIndex]['KeyData'] = event
				break;
			case 'value':
				molecule_data[foundIndex]['ValueData'] = event
				break;
			case 'select':
				molecule_data[foundIndex]['ValueData'] = event
				break;
		}
		setMoleculeData(molecule_data)
	}
	const handleChange = (event, record) => {
		let molecule_data = [...moleculeData]
		var foundIndex = molecule_data.findIndex(x => x.key == record.key);
		if (foundIndex > -1) {
			molecule_data[foundIndex]['MetaData'] = event
			if (event == 'Site' || event == 'Batch' || event == 'Material') {
				molecule_data[foundIndex]['KeyData'] = event
				molecule_data[foundIndex]['ValueData'] = ''
			}
			else {
				molecule_data[foundIndex]['KeyData'] = ''
				molecule_data[foundIndex]['ValueData'] = ''
			}
		}
		setMoleculeData(molecule_data)
	}

	const handleAdd = () => {
		moleculeData.forEach(v => v.editable = false)
		const newData = {
			key: uuid(),
			MetaData: "Add custom meta data",
			KeyData: "",
			ValueData: "",
			Allowedit: false,
			editable: true

		};
		setMoleculeData([...moleculeData, newData]);
		setCount(count + 1);
	};

	const handleDelete = (i) => {
		setMoleculeData(moleculeData.filter(user => user.key !== i.key));
	};

	const recordSave = (record) => {
		let molecule_data = [...moleculeData]
		var foundIndex = molecule_data.findIndex(x => x.key == record.key);
		if (foundIndex > -1)
			molecule_data[foundIndex]['editable'] = !record.editable
		setMoleculeData(molecule_data)
	};

	const handleCancel = (record) => {
		let molecule_data = [...moleculeData]
		var foundIndex = molecule_data.findIndex(x => x.key == record.key);
		if (foundIndex > -1) {
			molecule_data[foundIndex]['ValueData'] = ''
			molecule_data[foundIndex]['KeyData'] = ''
			molecule_data[foundIndex]['Allowedit'] = false
		}
		setMoleculeData(molecule_data)

	}
	const plantMoleculeColumns =
		[
			{
				title: "Meta data",
				dataIndex: "MetaData",
				editable: true,
				width: '20%',
				render: (_, record) => {
					return !record.editable ? <p className="input_content">{record.MetaData}</p> :
						<Select
							placeholder="Select"
							defaultValue="Add Custom meta data"
							className="Selectdata"
							value={record.MetaData}
							onChange={(event) => handleChange(event, record)}
							options={Opt}
						/>
				}
			},
			{
				title: "Key",
				dataIndex: "KeyData",
				key: "KeyData",
				editable: true,
				width: '20%',
				render: (text, record) => {
					return record.editable == true ?
						<Input
							type="text"
							placeholder="To be filled by the renderer"
							name="KeyData"
							onChange={(event) => handleValue('key', event.target.value, record)}
							value={record.KeyData}
						/> :
						<p className="input_content">{record.KeyData}</p>
				}
			},
			{
				title: "Value",
				dataIndex: "ValueData",
				key: "ValueData",
				width: '20%',
				editable: true,
				render: (text, record) => {
					let option_map = record.MetaData === "Site" ? metaDataopt && metaDataopt.sites : record.MetaData === "Batch" ? metaDataopt && metaDataopt.batches : metaDataopt && metaDataopt.product_num
					return record.editable == true ?
						record.MetaData === "Site" || record.MetaData === "Batch" || record.MetaData === "Material" ?
							<Select onChange={(event) => handleValue('select', event, record)} value={record.ValueData}>
								{option_map && option_map.map((option) => (
									<Select.Option key={option} value={option}>{option}</Select.Option>
								))}
							</Select> :
							< Input
								type="text"
								placeholder="To be filled by the renderer"
								name="ValueData"
								value={record.ValueData}
								onChange={(event) => handleValue('value', event.target.value, record)}
							/>
						: <p className="input_content">{record.ValueData}</p>
				}
			},
			{
				title: "Allow user to edit",
				dataIndex: "Allowedit",
				key: "Allowedit",
				width: '14%',
				editable: true,
				render: (text, record) => {
					return <input className="input_content" type="checkbox" checked={record.Allowedit}
						disabled={!record.editable} onChange={(e) => handleValue('user_edit', e.target.value, record)}
					/>
				}
			},
			{
				title: "Action",
				dataIndex: "action",
				width: "20%",
				render: (index, record) => {
					return record.selectDrop === false ? '' :
						<Row>
							<Col span={12} >
								{record.editable ? (
									<span>
										<Popconfirm title="Sure to Save?"
											style={{
												marginRight: 8,
											}}
											onConfirm={() => recordSave(record)}
											onCancel={() => handleCancel(record)}
										>
											<a className="save-button">Save</a>
										</Popconfirm>
									</span>
								) : (
									<Typography.Link onClick={() => recordSave(record)} >
										Edit
									</Typography.Link>
								)}
							</Col>
							<Col span={12}>
								<div className="delete-button">
									<Popconfirm title="Sure to delete?" className="deleteButton" onConfirm={() => handleDelete(record)} >
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
			"meta_data": { "moleculeData": data },
			"molecule": tempName.Pname ? tempName.Pname : '',
			"site": "",
			"template_name": tempName.Tname ? tempName.Tname : '',
			"version": 1
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
				<Table className="hierarchy-table"
					columns={plantMoleculeColumns}
					dataSource={moleculeData}
					pagination={false}
				/>
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
