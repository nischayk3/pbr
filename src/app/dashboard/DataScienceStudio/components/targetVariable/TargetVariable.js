import { LeftOutlined } from '@ant-design/icons';
import { Card, Radio, Table } from "antd";
import React from "react";
import Plot from 'react-plotly.js';
import { useDispatch, useSelector } from "react-redux";
import { onClickTarget } from '../../../../../duck/actions/viewAction';
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
		dataIndex: 'parameter_name',
		key: 'parameters',
	},
];
const data = [
	{
		key: 1,
		parameters: 'L0_S0_01',
		description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',

	},
	{
		key: 2,
		parameters: 'L0_S0_02',
		description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
	},
	{
		key: 3,
		parameters: 'L0_S0_02',
		description: 'This not expandable',
	},
	{
		key: 4,
		parameters: 'L0_S0_03',
		description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
	},
];


const TargetVariable = () => {
	const loadViewDataTable = useSelector((state) => state.dataScienceReducer.loadViewData)
	console.log("loadViewDataTable", loadViewDataTable)
	const dispatch = useDispatch();

	const expandedRowRender = () => {
		const childColumn = [
			{
				title: "Statistic",
				dataIndex: "statistic",
				key: "statistic"
			},
			{
				title: "Value",
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

		loadViewDataTable.map((item, i) => {
			console.log("loadViewDataTable.data_table", item.data_table)
		});
		return (
			<div className="expandable-component">
				<Table
					className="custom-tree-table1"
					pagination={false}
					columns={childColumn}
					dataSource={loadViewDataTable.map((item, i) => item.children)}
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
			<Card title={(
				<div className='card-title'>
					<LeftOutlined onClick={() => {
						dispatch(onClickTarget(false));
					}} />
					<p>Target Variable</p>
				</div>
			)} className="target-card">
				<p>Please select a target variable based on the univariate dataset statistics provided, before proceeding to JupyterLab.</p>
				<div className="target-custom-table">
					<Table
						columns={columns}
						expandable={{ expandedRowRender }}
						dataSource={loadViewDataTable}
					/>
				</div>
			</Card>

		</div>
	)
}

export default TargetVariable