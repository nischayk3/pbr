import { LeftOutlined } from '@ant-design/icons';
import { Button, Card, Radio, Table } from "antd";
import React, { useState } from "react";
import Plot from 'react-plotly.js';
import { useDispatch, useSelector } from "react-redux";
import BreadCrumbWrapper from '../../../../../components/BreadCrumbWrapper';
import { hideLoader, showLoader, showNotification } from '../../../../../duck/actions/commonActions';
import { onClickTarget } from '../../../../../duck/actions/viewAction';
import { analysisView } from '../../../../../services/dataScienceStudioService';
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
		dataIndex: 'Parameter_name',
		key: 'parameters',
	},
];



const TargetVariable = () => {
	const loadViewDataTable = useSelector((state) => state.dataScienceReducer.loadViewData)
	const viewIdVer = useSelector((state) => state.dataScienceReducer.viewIdVer)

	const [expandData, setExpandData] = useState({});

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

	const onTableRowExpand = (expanded, record) => {
		console.log("expanded, record", expanded, record);
		const _reqRow = {
			view_disp_id: viewIdVer.view_disp_id,
			version: viewIdVer.view_version,
			parameter_name: record.Parameter_name
		}

		if (expanded) {
			loadAnalysisView(_reqRow); // I have set my record.id as row key. Check the documentation for more details.
		}

		// this.setState({ expandedRowKeys: keys });
	}

	//analysis view
	const loadAnalysisView = async (_reqLoad) => {
		try {
			dispatch(showLoader());
			const analysisRes = await analysisView(_reqLoad);
			dispatch(hideLoader());
			if (analysisRes.Status === 200) {
				setExpandData(analysisRes.data.Stat)
			} else {
				dispatch(showNotification("error", 'No Data found'));
			}

		} catch (err) {
			dispatch(hideLoader());
			dispatch(showNotification("error", err));
		}
	}

	return (
		<div className="custom-wrapper">
			<BreadCrumbWrapper />
			<div className="custom-content-layout">
				<div className="target-wrapper">
					<Card title={(
						<div className='card-title'>
							<LeftOutlined onClick={() => {
								dispatch(onClickTarget(false));
							}} />
							<p>Target Variable</p>
						</div>
					)} className="target-card">
						<div className='target-head'>
							<p>Please select a target variable based on the univariate dataset statistics provided, before proceeding to JupyterLab.</p>
							<Button
								type='primary'
								className='custom-secondary-btn'
							>
								Save and procced
							</Button>
						</div>
						<div className="target-custom-table">
							<Table
								columns={columns}
								expandable={{ expandedRowRender }}
								onExpand={onTableRowExpand}
								dataSource={loadViewDataTable}
								rowKey="Parameter_name"
							/>
						</div>
					</Card>
				</div>
			</div>
		</div>

	)
}

export default TargetVariable