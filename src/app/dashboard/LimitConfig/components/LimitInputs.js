import React, { useEffect, useState } from 'react'
import './Limitconfig.scss'
import SelectField from "../../../../components/SelectField/SelectField";
import { Col, Row, Table, Input, DatePicker, Button } from 'antd';
import { DeleteOutlined, CalendarOutlined, PlusOutlined } from '@ant-design/icons'
import moment from 'moment';

const LimitInputs = ({ editTable, openRow, selectedRowKey }) => {

	let limitList = [
		'Control Limits',
		'Specifications Limits',
		'Warnings'
	]
	const data = [
		{
			key: 1,
			site: "1655",
			parameter: "Yeild",
			limitType: "Control Limits",
			from: '6',
			to: '10',
			vod: "31-12-2028"
		},
		{
			key: 2,
			site: "1322",
			parameter: "Acidity",
			limitType: "Control Limits",
			from: '6',
			to: '10',
			vod: "20-12-2028"
		}
	];
	const [limitsData, setLimitsData] = useState(data);

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
			dataIndex: 'parameter',
			key: 'parameter',
			render: (text, record) =>
				limitsData.map((data, index) => {
					if (record.key === data.key) {
						if (selectedRowKey !== openRow) {
							return <p style={{ margin: "0" }}>{data.parameter}</p>;
						}
						return (
							<Input
								name="parameter"
								value={data.parameter}
								onChange={(e) => handleChange(index, e, "", "limits")}
							/>
						);
					}
				}),
		},
		{
			title: 'Limit Type',
			dataIndex: 'limitType',
			key: 'limitType',
			render: (text, record) =>
				limitsData.map((data, index) => {
					if (record.key === data.key) {
						if (selectedRowKey !== openRow) {
							return <p style={{ margin: "0" }}>{data.limitType}</p>;
						}
						return (
							<SelectField
							    name="limitType"
								selectList={limitList}
								selectedValue={data.limitType}
								onChangeSelect={(e) => handleChange(index, e, "", "limitType")}
							/>
						);
					}
				}),
		},
		{
			title: 'From',
			dataIndex: 'from',
			key: 'from',
			width: 100,
			render: (text, record) =>
				limitsData.map((data, index) => {
					if (record.key === data.key) {
						if (selectedRowKey !== openRow) {
							return (<>
								<p style={{ margin: "0" }}>{data.from}</p>
							</>);
						}
						return (
							<Input
								name="from"
								value={data.from}
								onChange={(e) => handleChange(index, e, "", "limits")}
							/>
						);
					}
				}),
		},
		{
			title: 'To',
			dataIndex: 'to',
			key: 'to',
			width: 100,
			render: (text, record) =>
				limitsData.map((data, index) => {
					if (record.key === data.key) {
						if (selectedRowKey !== openRow) {
							return <p style={{ margin: "0" }}>{data.to}</p>;
						}
						return (
							<Input
								name="to"
								value={data.to}
								onChange={(e) => handleChange(index, e, "", "limits")}
							/>
						);
					}
				}),
		},
		{
			title: 'Validity Date',
			dataIndex: 'vod',
			key: 'vod',
			render: (text, record) =>
				limitsData.map((data, index) => {
					if (record.key === data.key) {
						if (selectedRowKey !== openRow) {
							if (!data.vod) {
								return "";
							} else {
								const d = new Date(data.vod);
								const year = d.getFullYear();
								const month = d.getMonth();
								const day = d.getDate();
								return (
									<span>
										<CalendarOutlined style={{ color: '#6C63FF', display: "inline-block", marginRight: '10px' }} />
										<p style={{ margin: "0", display: "inline-block" }}>{data.vod}</p>
									</span>
								);
							}
						}

						return (
							<DatePicker
								type="text"
								name="vod"
								defaultValue={
									data.vod ? moment(data.vod) : ""
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

	const [tableColumns, setTableCOlumns] = useState();

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
		} else if(type === 'limitType') {
			rowsInput[index]['limitType'] = event;
		}
		setLimitsData(rowsInput);
	};


	useEffect(() => {
		const obj = {
			title: '',
			width: 10,
			key: 'delete',
			render: () => {
				return (
					<DeleteOutlined style={{ fontSize: '18px' }} />
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