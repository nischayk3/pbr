import { Input, Table } from 'antd'
import React from 'react'
import './model.scss'

/* istanbul ignore next */
const HyperParameterTable = (props) => {
	const { dataSource, setDataSource } = props

	const handleChange = (index, event) => {
		const rowsInput = [...dataSource];
		const { name, value } = event.target;
		rowsInput[index][name] = value;
		setDataSource(rowsInput);
	};


	const columns = [
		{
			title: "Parameter",
			dataIndex: "parameter",
			key: "parameter",
		},
		{
			title: "Valid Value",
			dataIndex: "valid_value",
			key: "valid_value",
		},
		{
			title: "Default Value",
			dataIndex: "value",
			key: "value",
		},
		{
			title: "Custom Value",
			dataIndex: "customValue",
			key: "customValue",
			render: (text, record) =>
				dataSource.map((data, index) => {
					if (record.key === data.key) {
						return (
							<Input
								name="customValue"
								// status={
								//     data.customValue &&
								//     (typeof(data.customValue) !== data.valid_value) &&
								//     "error"
								// }
								value={data.customValue}
								onChange={(e) => handleChange(index, e)}
							/>
						);
					}
				}),
		}
	]


	return (
		<div className='hyper_table'>
			<Table
				columns={columns}
				dataSource={dataSource}
				pagination={false}
			/>
		</div>
	)
}

export default HyperParameterTable