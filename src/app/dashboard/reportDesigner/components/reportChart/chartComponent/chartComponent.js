import { Table, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { useDispatch } from 'react-redux';
import {
	hideLoader,
	showLoader
} from '../../../../../../duck/actions/commonActions';
import { getChartPlotData } from '../../../../../../services/workSpaceServices';
import './styles.scss';

const { TabPane } = Tabs;
const chartComponent = (props) => {
	const [workspaceChartData, setWorkSpaceChartData] = useState([]);
	const [workspaceChartLayout, setWorkSpaceChartLayout] = useState([]);
	const [dataTable, setDataTable] = useState([]);
	const [dataTableColumns, setDataTableColumns] = useState([])
	const [violation, setViolation] = useState([]);
	const [violationColumns, setViolationColumns] = useState([])
	const [exclusion, setExclusion] = useState([]);
	const [exclusionColumns, setExclusionColumns] = useState([])
	const [activeTab, setActiveTab] = useState('Data Table')

	const dispatch = useDispatch();
	useEffect(() => {
		if (props.activeTab == props.current_tab) {
			getChartData();
		}
	}, [props.activeTab])

	const getColumns = (arr) => {

		let len_arr = arr.length
		if (len_arr > 0) {
			let s = arr[0]
			s = Object.keys(s)
			let res_arr = []
			s.map((i) => {
				let res = {
					title: i.toUpperCase().replace("_", " "),
					dataIndex: i,
					key: i,
				}
				return res_arr.push(res)
			})
			return res_arr
		}
		else {
			return []
		}


	}

	const getChartData = async () => {

		let chart_id = props.chartName.split('-')

		let req = { chartId: chart_id[0], save_image: true, chartVersion: chart_id[2] }
		let login_response = JSON.parse(sessionStorage.getItem('login_details'));

		const headers = {
			'content-type': 'application/json',
			'x-access-token': login_response.token ? login_response.token : '',
			'resource-name': 'REPORT_DESIGNER',
		};
		try {
			dispatch(showLoader());
			const chartResponse = await getChartPlotData(req, headers);
			if (chartResponse.data[0]) {
				setWorkSpaceChartData(chartResponse.data[0].data);
				if (chartResponse.data[0].violations) {
					setViolation(chartResponse.data[0].violations)
					setViolationColumns(getColumns(chartResponse.data[0].violations))
				}
				if (chartResponse.data[0].exclusions) {
					setExclusion(chartResponse.data[0].exclusions)
					setExclusionColumns(getColumns(chartResponse.data[0].exclusions))
				}
				const layout = {
					xaxis: chartResponse.data[0].layout.xaxis,
					yaxis: chartResponse.data[0].layout.yaxis,
					autosize: false,
					width: 550,
					height: 410,
					margin: {
						l: 60,
						r: 50,
						b: 75,
						t: 30,
						pad: 4
					},
				};
				setWorkSpaceChartLayout(layout)

			}
			if (chartResponse.data[0].extras.data_table) {
				setDataTable(chartResponse.data[0].extras.data_table)
				setDataTableColumns(getColumns(chartResponse.data[0].extras.data_table))
			}
			dispatch(hideLoader());
		} catch (error) {
			dispatch(hideLoader());
		}
	}
	const changeTab = activeKey => {
		setActiveTab(activeKey);
	};

	return (

		<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridGap: '10px' }}>
			<div >
				<Plot
					data={workspaceChartData}
					layout={workspaceChartLayout}
					style={{ marginLeft: '10px' }}
				/>
			</div>
			<div className='report-chart-tables'>
				<Tabs activeKey={activeTab} onChange={changeTab} >
					<TabPane tab="Exclusion" key="Exclusion"><Table style={{ height: '400px', width: '600px' }} scroll={{ x: 400 }} columns={exclusionColumns} dataSource={exclusion} size="small" pagination={{ pageSize: 5 }} bordered={false} /></TabPane>
					<TabPane tab="Violation" key="Violation"><Table style={{ height: '400px', width: '600px' }} scroll={{ x: 400 }} columns={violationColumns} dataSource={violation} size="small" pagination={{ pageSize: 5 }} bordered={false} /></TabPane>
					<TabPane tab="Data Table" key="Data Table"><Table style={{ height: '400px', width: '600px' }} scroll={{ x: 400 }} columns={dataTableColumns} dataSource={dataTable} size="small" pagination={{ pageSize: 5 }} bordered={false} /></TabPane>
				</Tabs>
			</div>
		</div>
	)
}

export default chartComponent;