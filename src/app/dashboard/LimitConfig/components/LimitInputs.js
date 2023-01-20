import React, { useState } from 'react'
import { Col, Row, Table, Input, DatePicker } from 'antd'
import moment from 'moment';

const LimitInputs = ({editTable}) => {

    const data = [
        {
            key: 1,
            site: "1655",
            parameter: "Yeild",
            limitType: "UCL",
            from: '6',
            to: '10',
            vod: "31-12-2028"
        },
        {
            key: 2,
            site: "1322",
            parameter: "Acidity",
            limitType: "UCL",
            from: '6',
            to: '10',
            vod: "20-12-2028"
        }
    ];
    const [limitsData, setLimitsData] = useState(data);

    const columns = [
        {
            title: 'Site',
            dataIndex: 'site',
            key: 'Site',
            render: (text, record) =>
               limitsData.map((data, index) => {
					if (record.key === data.key) {
						if (!editTable) {
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
						if (!editTable) {
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
						if (!editTable) {
							return <p style={{ margin: "0" }}>{data.limitType}</p>;
						}
						return (
							<Input
								name="limitType"
								value={data.limitType}
								onChange={(e) => handleChange(index, e, "", "limits")}
							/>
						);
					}
				}),
        },
        {
            title: 'From',
            dataIndex: 'from',
            key: 'from',
            render: (text, record) =>
               limitsData.map((data, index) => {
					if (record.key === data.key) {
						if (!editTable) {
							return <p style={{ margin: "0" }}>{data.from}</p>;
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
            render: (text, record) =>
               limitsData.map((data, index) => {
					if (record.key === data.key) {
						if (!editTable) {
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
						if (!editTable) {
							if (!data.vod) {
								return "";
							} else {
								const d = new Date(data.vod);
								const year = d.getFullYear();
								const month = d.getMonth();
								const day = d.getDate();
								return (
									<p style={{ margin: "0" }}>{data.vod}</p>
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
		}
		setLimitsData(rowsInput);
	};

    return (
        <div className='expand-table'>
            <Row>
                <Col span={1} className="empty-space"/>
                <Col span={23}>
                    <Table
                        columns={columns}
                        pagination={false}
                        dataSource={limitsData}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default LimitInputs