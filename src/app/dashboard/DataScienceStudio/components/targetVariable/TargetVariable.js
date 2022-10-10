import { Card, Radio, Table } from "antd";
import React from "react";
import Plot from 'react-plotly.js';
import "./style.scss";
const columns = [
	{
		title: 'Target variable',
		dataIndex: 'targetVar',
		key: 'targetVar',
		width: 125,
		render: () => {
			return (
				<Radio />
			)
		}
	},
	Table.EXPAND_COLUMN,
	{
		title: 'Parameters',
		dataIndex: 'parameters',
		key: 'parameters',
	},
];
const data = [
	{
		key: 1,
		parameters: 32,
		description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',

	},
	{
		key: 2,
		parameters: 42,
		description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
	},
	{
		key: 3,
		parameters: 29,
		description: 'This not expandable',
	},
	{
		key: 4,
		parameters: 32,
		description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
	},
];


const TargetVariable = ({ }) => {
	const expandedRowRender = () => {
		const childColumn = [
			{
				title: "Statistic",
				dataIndex: "statistic",
				key: "statistic"
			},
			{
				title: "value",
				dataIndex: "value",
				key: "value"
			}
		]

		const childData = [
			{
				statistic: "count",
				value: "1234"

			},
			{
				statistic: "std",
				value: "11.131"

			},
			{
				statistic: "mean",
				value: "12.12"

			}
		]

		return (
			<div className="expandable-component">
				<Table
					className="custom-tree-table1"
					pagination={false}
					columns={childColumn}
					dataSource={childData}
				/>
				<Plot
					data={[
						{
							x: [1, 2, 3],
							y: [2, 6, 3],
							type: 'scatter',
							mode: 'markers',
						},
						{ type: 'bar', x: [1, 2, 3], y: [2, 5, 3] },
					]}
					layout={{
						width: 500, height: 200, autosize: false, margin: {
							l: 150,
							r: 50,
							b: 0,
							t: 0,
							pad: 10
						},
					}}
				/>
			</div>

		)
	}

	return (
		<div className="target-wrapper">
			<Card title="< Target Variable" className="target-card">
				<p>Please select a target variable based on the univariate dataset statistics provided, before proceeding to JupyterLab.</p>
				<div className="target-custom-table">
					{/* <table>
						<thead className="table-head">
							<tr>
								<th style={{ width: '125px', borderRight: "1px solid #C7C7C7" }}>Target Variable</th>
								<th>Parameters</th>
							</tr>
						</thead>

						<tbody className="table-body">
							<tr>
								<td style={{ textAlign: 'center' }}><Radio /></td>
								<td><PlusSquareOutlined /><span>L0_S0_0</span></td>
							</tr>
							<tr>
							<td style={{ textAlign: 'center' }}><Radio /></td>
								<td><PlusSquareOutlined /><span>L0_S0_0</span></td>
							</tr>
						</tbody>
					</table> */}
					<Table
						columns={columns}
						expandable={{ expandedRowRender }}
						dataSource={data}
					/>
				</div>
			</Card>

		</div>
	)
}

export default TargetVariable