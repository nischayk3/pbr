import { LeftOutlined } from '@ant-design/icons';
import { Button, Card, Radio, Table } from "antd";
import React, { useState } from "react";
import Plot from 'react-plotly.js';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from 'react-router-dom';
import BreadCrumbWrapper from '../../../../../components/BreadCrumbWrapper';
import { hideLoader, showLoader, showNotification } from '../../../../../duck/actions/commonActions';
import { dssSave, loadDssView } from '../../../../../services/dataScienceStudioService';
import "./style.scss";

let paramType = "";

const TargetVariable = () => {
	const loadViewDataTable = useSelector((state) => state.dataScienceReducer.loadViewData)
	const viewIdVer = useSelector((state) => state.dataScienceReducer.viewIdVer)
	const fileRes = useSelector((state) => state.dataScienceReducer.fileRes)
	const viewRes = useSelector((state) => state.dataScienceReducer.viewRes)

	const [expandedRowKeys, setExpandedRowKeys] = useState([]);
	const [expandData, setExpandData] = useState([]);
	const [parameterName, setParameterName] = useState('');

	const dispatch = useDispatch();
	const match = useRouteMatch();
	const history = useHistory();

	const columns = [
		{
			title: 'Target variable',
			dataIndex: 'targetVar',
			key: 'targetVar',
			width: 125,
			render: (text, record, index) => {
				return (
					<Radio
						checked={paramType === record.parameter_name}
						onChange={(e) =>
							onRadioChange({
								checked: e.target.checked ? e.target.checked : false,
								type: record.parameter_name,
								record: record,
								index: index
							})
						} />
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

		return (
			<div className="expandable-component">
				<Table
					className="custom-tree-table1"
					pagination={false}
					columns={childColumn}
					dataSource={expandData}
					rowKey="statistic"
				/>
				<Plot
					data={[
						{
							type: 'bar',
							x: expandData.map((item) => item.statistic),
							y: expandData.map((item) => item.value),
							marker: {
								color: 'rgb(255, 127, 14)',
							},
						},
					]}
					layout={{

						width: 520,
						height: 300,
						autosize: false,
						margin: {
							l: 50,
							r: 20,
							b: 50,
							t: 60,
							pad: 10
						},
					}}
				/>
			</div>
		)
	}

	const onTableRowExpand = (expanded, record) => {
		var keys = [];
		const _reqRow = {
			data: viewRes,
			df: fileRes,
			parameter_name: record.parameter_name,
			type: 'stats',
			unapproved: true,
			view_disp_id: viewIdVer.view_disp_id ? viewIdVer.view_disp_id : '',
			view_version: viewIdVer.view_version ? `${viewIdVer.view_version}` : '',
		}


		if (expanded) {
			keys.push(record.id)
			dssViewLoad(_reqRow); // I have set my record.id as row key. Check the documentation for more details.
		}
		console.log("keys", keys);
		setExpandedRowKeys(keys)
	}

	const onRadioChange = ({ checked, type, record, index }) => {
		console.log("record, index", checked, record, index);
		setParameterName(record.parameter_name)
		// setIsChecked(checked)
		paramType = type;
	}

	//load dss view
	const dssViewLoad = async (_reqLoad) => {
		try {
			dispatch(showLoader());
			const loadDssRes = await loadDssView(_reqLoad);
			dispatch(hideLoader());
			if (loadDssRes.statuscode === 200) {
				setExpandData(loadDssRes.data)
			}
		} catch (err) {
			dispatch(hideLoader());
			dispatch(showNotification("error", err));
		}
	}

	//save json
	const dssSaveJson = async () => {
		const _reqSave = {
			df: fileRes,
			view_disp_id: viewIdVer.view_disp_id ? viewIdVer.view_disp_id : '',
			view_version: viewIdVer.view_version ? `${viewIdVer.view_version}` : '',
			unapproved: true,
			target_variable: parameterName
		}
		try {
			dispatch(showLoader());
			const loadDssRes = await dssSave(_reqSave);
			dispatch(hideLoader());
			if (loadDssRes.statuscode === 200) {
				setExpandData(loadDssRes.message)
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
							<LeftOutlined onClick={history.goBack} />
							<p>Target Variable</p>
						</div>
					)} className="target-card">
						<div className='target-head'>
							<p>Please select a target variable based on the univariate dataset statistics provided, before proceeding to JupyterLab.</p>
							<Button
								type='primary'
								className='custom-secondary-btn'
								onClick={() => {
									dssSaveJson,
										window.open("https://mi-demo.mareana.com/jupyter/tree", "_blank");
								}}
							>
								Save and procced
							</Button>
						</div>
						<div className="target-custom-table">
							<Table
								columns={columns}
								expandable={{ expandedRowRender }}
								onExpand={onTableRowExpand}
								// expandedRowKeys={expandedRowKeys}
								dataSource={loadViewDataTable}
								rowKey="id"
							/>
						</div>
					</Card>
				</div>
			</div>
		</div>

	)
}

export default TargetVariable