import { Input, Table } from 'antd'
import React from 'react'
import './model.scss'

const HyperParameterTable = ({ dataSource, setDataSource, estimatorPopupDataValues, setEstimatorPopupDataValues, algo }) => {

	const handleChange = (index, event) => {
		let custom_array = { ...estimatorPopupDataValues }
		const rowsInput = [...dataSource];
		const { name, value } = event.target;
		custom_array.hyperparameters[algo][index]['customValue'] = value;

		setEstimatorPopupDataValues(custom_array)
		setDataSource(custom_array);
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