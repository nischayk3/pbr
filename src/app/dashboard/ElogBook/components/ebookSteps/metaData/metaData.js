import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Input, Popconfirm, Row, Select, Table, Typography } from "antd";
import React, { useState } from "react";
import "./metaData.scss";


function metaData() {
	const [moleculeData, setMoleculeData] = useState([]);
	const [count, setCount] = useState(1);

	const handleAdd = () => {
		let is_add = count <= 1 ? true : validate(count - 2, moleculeData, 'product_num', 'mol')
		if (is_add) {
			const newData = {
				key: count,
				MetaData: "",
				KeyData: "",
				ValueData: "",

			};
			setMoleculeData([...moleculeData, newData]);
			setCount(count + 1);
		}
		else {
			dispatch(showNotification('error', 'Previous Row is empty'))
		}
	};


	const handleChange = (index, event) => {
		const { name, value } = event.target;
		const rowsInput = [...moleculeData];
		rowsInput[index][name] = value;
		setMoleculeData(rowsInput);
	};


	const handleDelete = (key, record) => {
		const dataSource = [...moleculeData];
		let deleted_data = [...del]
		setMoleculeData(dataSource.filter((item) => item.key !== key));
		// setCount(count - 1);
		let obj = {}
		obj[`${record.product_num}`] = record.site_code
		deleted_data.push(obj)
		setDel(deleted_data)


	};

	const handleSave = async () => {
		if (activeTab == "Plant and molecules") {
			let req = {
				ds_name: hierarchyName,
				product_num: moleculeData.map((i) => { return parseInt(i.product_num); }),
				site_code: moleculeData.map((i) => { return i.site_code; }),
				delete_row: !onceSaved && !load_drug ? [] : del.length > 0 ? del : []
			};
			let response = await putMolecule(req);
			if (response["statuscode"] == 200) {
				dispatch(showNotification('success', "Saved"))
				setDeleted([])
				setDel([])
				setOnceSaved(true)
			}
			else {
				dispatch(showNotification('error', response.message))
			}
		}

	};
	const plantMoleculeColumns =
		[
			{
				title: "Meta data",
				dataIndex: "MetaData",
				width: "25%",
				render: (_, record) => (
					<Select
						placeholder="Select"
						// defaultValue="Custom mete data"
						style={{
							width: 120,
						}}
						onChange={handleChange}
						options={[
							{
								value: 'Add custom mete data',
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
				width: "30%",
				render: (text, record) =>
					moleculeData.map((data, index) => {
						if (record.key === data.key) {
							return (
								<Input
									type="text"
									placeholder="Enter mete data field name"
									name="KeyData"
									value={data.product_num}
									onChange={(e) => handleChange(index, e)}
								/>
							);
						}
					})
			},
			{
				title: "Value",
				dataIndex: "ValueData",
				key: "ValueData",
				width: "25%",
				render: (text, record) =>
					moleculeData.map((data, index) => {
						if (record.key === data.key) {
							return (
								<Input
									type="text"
									placeholder="To be filled by rendered"
									name="ValueData"
									value={data.site_code}
									onChange={(e) => handleChange(index, e)}
									disabled
								/>
							);
						}
					})
			},
			{
				title: "Action",
				dataIndex: "action",
				width: "20%",
				render: (_, record) => (
					<Row>
						<Col span={12} >
							<Typography.Link  >
								Edit
							</Typography.Link>
						</Col>
						<Col span={12} >
							<Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
								<a style={{ color: "red" }}>Delete</a>
							</Popconfirm>
						</Col>
					</Row>
				)
			},
		];
	return (
		<>
			<div className="metadata-subheader">
				<p>Meta Data</p>
				<Button
					className="custom-secondary-btn"
					type="primary"
				// onClick={() =>  handleNext()}
				>
					Save and Next
				</Button>
			</div>

			<Table className="hierarchy-table" columns={plantMoleculeColumns} dataSource={moleculeData} pagination={false} />


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
