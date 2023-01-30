import React, { useEffect, useState } from 'react'
import './Limitconfig.scss'
import SelectField from "../../../../components/SelectField/SelectField";
import { Col, Row, Table, Input, DatePicker, Button, Popconfirm } from 'antd';
import { DeleteOutlined, CalendarOutlined, PlusOutlined } from '@ant-design/icons'
import moment from 'moment';
import { useDispatch } from "react-redux";
import { deleteLimitsApi, saveLimitConfigApi } from '../../../../services/limitConfig';
import { hideLoader, showNotification, showLoader } from '../../../../duck/actions/commonActions';

const LimitInputs = ({ setLimitsData, limitsData, openRow, selectedRowKey, paramData }) => {

	const dispatch = useDispatch();
	const [tableColumns, setTableCOlumns] = useState();
	let limitList = [
		'Control Limits',
		'Specifications Limits',
		'Warnings'
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
							if (!data.validity_date) {
								return "";
							} else {
								const d = new Date(data.validity_date);
								const year = d.getFullYear();
								const month = d.getMonth();
								const day = d.getDate();
								return (
									<span>
										<CalendarOutlined style={{ color: '#6C63FF', display: "inline-block", marginRight: '10px' }} />
										<p style={{ margin: "0", display: "inline-block" }}>{`${year}-${month + 1}-${day}`}</p>
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
	];
	const text = "Are you sure to delete this?";
	const handleChange = (index, event, dateString, type) => {
		const rowsInput = [...limitsData];
		if (!dateString) {
			rowsInput[index]["valid_timestamp"] = null;
		}
		if (dateString && type === "date") {
			rowsInput[index]["valid_timestamp"] = dateString._d.toLocaleDateString();
		} else if (type === "limits") {
			const { name, value } = event.target;
			rowsInput[index][name] = value;
		} else if (type === 'limitType') {
			rowsInput[index]['limitType'] = event;
		}
		setLimitsData(rowsInput);
	};

	const deleteParam = async (int_id) => {
		try {
			dispatch(showLoader());
			const apiResponse = await deleteLimitsApi(int_id);
			const tempParamData = limitsData.filter((limit) => limit?.int_id !== int_id)
			setLimitsData(tempParamData)
			console.log(apiResponse, 'api');
			dispatch(hideLoader());
		} catch (error) {
			dispatch(hideLoader());
			dispatch(showNotification("error", error));
		}
	}

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
							deleteParam(record.int_id)
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
						// onClick={() => handleAdd()}
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