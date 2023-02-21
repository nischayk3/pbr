import { CalendarOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Input, Popconfirm, Row, Select, Table, Tooltip } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import SelectField from "../../../../components/SelectField/SelectField";
import { hideLoader, showLoader, showNotification } from '../../../../duck/actions/commonActions';
import { deleteLimitsApi } from '../../../../services/limitConfig';
import './Limitconfig.scss';

const LimitInputs = ({ setLimitsData, limitsData, openRow, selectedRowKey, paramData }) => {

	const dispatch = useDispatch();
	const [tableColumns, setTableCOlumns] = useState();
	let limitList = [
		'control',
		'specification',
		'warning'
	]
	let classList = [
		'CPP',
		'CQA'
	]
	let columns = [
		{
			title: 'Site',
			dataIndex: 'site',
			key: 'Site',
			width: 150,
			render: (text, record) =>
				limitsData.map((data, index) => {
					if (record.key === data.key) {
						if (selectedRowKey !== openRow) {
							return <p style={{ margin: "0" }}>{data.site}</p>;
						}
						return (
							<Input
								name="site"
								value={data.site}
								onChange={(e) => handleChange(index, e, "", "limits")}
							/>
						);
					}
				}),
		},
		{
			title: 'Parameter',
			dataIndex: 'parameters',
			key: 'parameters',
			render: (text, record) =>
				limitsData.map((data, index) => {
					if (record.key === data.key) {
						if (selectedRowKey !== openRow) {
							return <p style={{ margin: "0" }}>{data.parameters}</p>;
						}
						return (
							<Input
								name="parameters"
								value={data.parameters}
								onChange={(e) => handleChange(index, e, "", "limits")}
							/>
						);
					}
				}),
		},
		{
			title: (
				<Tooltip title={<span>Crirical Quality Attribute</span>}>
					<span>Crirical Quali...</span>
				</Tooltip>
			),
			dataIndex: 'parameter_class',
			key: 'parameter_class',
			width: '200',
			render: (text, record) =>
				limitsData.map((data, index) => {
					console.log(data.parameter_class, 'data.parameter_class')
					if (record.key === data.key) {
						if (selectedRowKey !== openRow) {
							return (
								data?.parameter_class?.map((paramClass) => {
									console.log(paramClass, 'apara')
									return (
										<p style={{ margin: "0" }}>{paramClass}</p>
									)
								})
							)
						}
						return (
							<Select
								mode="multiple"
								allowClear
								style={{
									width: "100%",
								}}
								value={data.parameter_class || null}
								name="parameter_class"
								onChange={(e) => handleChange(index, e, "", "parameter_class")}
							>
								{classList &&
									classList.map((ele) => {
										return <Option key={ele}>{ele}</Option>;
									})}
							</Select>
						);
					}
				}),
		},
		{
			title: 'Limit Type',
			dataIndex: 'limit_type',
			key: 'limitType',
			render: (text, record) =>
				limitsData.map((data, index) => {
					if (record.key === data.key) {
						if (selectedRowKey !== openRow) {
							return <p style={{ margin: "0" }}>{data.limit_type}</p>;
						}
						return (
							<SelectField
								name="limit_type"
								selectList={limitList}
								selectedValue={data.limit_type}
								onChangeSelect={(e) => handleChange(index, e, "", "limitType")}
							/>
						);
					}
				}),
		},
		{
			title: 'From',
			dataIndex: 'from_',
			key: 'from',
			width: 100,
			render: (text, record) =>
				limitsData.map((data, index) => {
					if (record.key === data.key) {
						if (selectedRowKey !== openRow) {
							return (<>
								<p style={{ margin: "0" }}>{data.from_}</p>
							</>);
						}
						return (
							<Input
								name="from_"
								type='number'
								value={data.from_}
								onChange={(e) => handleChange(index, e, "", "limits")}
							/>
						);
					}
				}),
		},
		{
			title: 'To',
			dataIndex: 'to_',
			key: 'to',
			width: 100,
			render: (text, record) =>
				limitsData.map((data, index) => {
					if (record.key === data.key) {
						if (selectedRowKey !== openRow) {
							return <p style={{ margin: "0" }}>{data.to_}</p>;
						}
						return (
							<Input
								name="to_"
								type='number'
								value={data.to_}
								onChange={(e) => handleChange(index, e, "", "limits")}
							/>
						);
					}
				}),
		},
		{
			title: 'Validity Date',
			dataIndex: 'validity_date',
			key: 'vod',
			render: (text, record) =>
				limitsData.map((data, index) => {
					if (record.key === data.key) {
						if (selectedRowKey !== openRow) {
							/* istanbul ignore next */
							if (!data.validity_date) {
								return "";
							} else {
								return (
									<span>
										<CalendarOutlined style={{ color: '#6C63FF', display: "inline-block", marginRight: '10px' }} />
										<p style={{ margin: "0", display: "inline-block" }}>{moment(data.validity_date).format('YYYY-MM-DD')}</p>
									</span>
								);
							}
						}

						return (
							<DatePicker
								type="text"
								name="validity_date"
								defaultValue={
									data.validity_date ? moment(data.validity_date) : ""
								}
								onChange={(dateString) =>
									handleChange(index, "", dateString, "date")
								}
							/>
						);
					}
				}),
		},
		{
			title: 'Document Name',
			dataIndex: 'document_name',
			key: 'document_name',
			render: (text, record) =>
				limitsData.map((data, index) => {
					if (record.key === data.key) {
						if (selectedRowKey !== openRow) {
							return <p style={{ margin: "0" }}>{data.document_name}</p>;
						}
						return (
							<Input
								name="document_name"
								type='text'
								value={data.document_name}
								onChange={(e) => handleChange(index, e, "", "limits")}
							/>
						);
					}
				}),
		},
		{
			title: 'Document URL',
			dataIndex: 'document_url',
			key: 'document_url',
			render: (text, record) =>
				limitsData.map((data, index) => {
					if (record.key === data.key) {
						if (selectedRowKey !== openRow) {
							return <p style={{ margin: "0" }}>{data.document_url}</p>;
						}
						return (
							<Input
								name="document_url"
								type='text'
								value={data.document_url}
								onChange={(e) => handleChange(index, e, "", "limits")}
							/>
						);
					}
				}),
		}
	];
	const text = "Are you sure to delete this?";
	const handleChange = (index, event, dateString, type) => {
		const rowsInput = [...limitsData];
		if (!dateString) {
			rowsInput[index]["validity_date"] = null;
		}
		if (dateString && type === "date") {
			rowsInput[index]["validity_date"] = dateString._d.toLocaleDateString();
		} else if (type === "limits") {
			const { name, value } = event.target;
			rowsInput[index][name] = value;
		} else if (type === 'limitType') {
			rowsInput[index]['limit_type'] = event;
		} else if (type === 'parameter_class') {
			rowsInput[index]['parameter_class'] = event;
		}
		setLimitsData(rowsInput);
	};

	const deleteParam = async (record) => {
		let tempParamData;
		try {
			dispatch(showLoader());
			if (record?.int_id) {
				const obj = {
					data: [
						record?.int_id
					]
				}
				const apiResponse = await deleteLimitsApi(obj);
				if (apiResponse?.Status === 200) {
					tempParamData = limitsData.filter((limit) => limit?.int_id !== record?.int_id)
				}
			} else {
				tempParamData = limitsData.filter((limit) => limit?.key !== record?.key)
			}
			setLimitsData(tempParamData)
			dispatch(hideLoader());
		} catch (error) {
			/* istanbul ignore next */
			dispatch(hideLoader());
			/* istanbul ignore next */
			dispatch(showNotification("error", error));
		}
	}

	const handleAdd = () => {
		// count.current = count.current + 1;
		const newData = {
			key: paramData?.length + 1,
			"cust_key": paramData[0]?.cust_key,
			"from_": Number,
			"limit_type": "",
			"molecule": paramData[0]?.molecule,
			"parameters": "",
			"site": "",
			"to_": Number,
			"validity_date": "",
			"view_disp_id": paramData[0]?.view_disp_id,
			"view_version": paramData[0]?.view_version
		};
		setLimitsData([...limitsData, newData]);
	};

	useEffect(() => {
		const obj = {
			title: '',
			width: 10,
			key: 'delete',
			render: (record) => {
				return (
					<Popconfirm
						placement="top"
						title={text}
						onConfirm={(event) => {
							event.stopPropagation();
							deleteParam(record)
						}}
						okText="Yes"
						cancelText="No"
					>
						<DeleteOutlined
							style={{ color: "red", fontSize: '18px' }}
							className="delete"
							onClick={(e) => e.stopPropagation()}
						/>
					</Popconfirm>
					// <DeleteOutlined style={{ fontSize: '18px' }} onClick={() => deleteParam(record.int_id)} />
				)
			}
		}
		if (selectedRowKey === openRow) {
			columns.unshift(obj)
		} else {
			columns = columns.filter((ele) => ele?.key !== 'delete')
		}
		setTableCOlumns(columns)
	}, [selectedRowKey, openRow, limitsData])

	useEffect(() => {
		setLimitsData(paramData)
	}, [paramData])


	return (
		<div className='expand-table'>
			<Row>
				<Col span={1} className="empty-space" />
				<Col span={23}>
					<Table
						columns={tableColumns}
						pagination={false}
						dataSource={limitsData}
					/>
					{(selectedRowKey === openRow) && <div className="add-button-limit">
						<Button
							onClick={() => handleAdd()}
						// disabled={
						// 	Object.keys(params).length > 0 &&
						// 	params.fromScreen !== "Workspace"
						// }
						>
							<PlusOutlined />
							Add new parameter
						</Button>
					</div>}
				</Col>
			</Row>
		</div>
	)
}

export default LimitInputs