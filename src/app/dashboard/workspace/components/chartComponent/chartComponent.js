import { Alert } from 'antd';
import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { useDispatch } from 'react-redux';
import {
	showNotification
} from '../../../../../duck/actions/commonActions';
import { getChartPlotData } from '../../../../../services/workSpaceServices';
import './styles.scss';

const chartComponent = (props) => {
	const [workspaceChartData, setWorkSpaceChartData] = useState([]);
	const [workspaceChartLayoutXAxis, setWorkSpaceChartLayoutXAxis] = useState([]);
	const [workspaceChartLayoutYAxis, setWorkSpaceChartLayoutYAxis] = useState([]);
	const dispatch = useDispatch();
	useEffect(() => {
		if (props.activeTab == props.current_tab) {
			getChartData();
		}
	}, [props.activeTab])

	const getChartData = async () => {
		let req = { chartId: props.chartId }
		let login_response = JSON.parse(localStorage.getItem('login_details'));
		let headers = {
			'content-type': 'application/json',
			'x-access-token': login_response.token ? login_response.token : '',
			'resource-name': 'WORKITEMS',
		}
		try {
			const chartResponse = await getChartPlotData(req, headers);
			setWorkSpaceChartData(chartResponse.data[0].data);
			setWorkSpaceChartLayoutXAxis(chartResponse.data[0].layout.xaxis)
			setWorkSpaceChartLayoutYAxis(chartResponse.data[0].layout.yaxis)
		} catch (error) {
			dispatch(showNotification('error', error.Message));
		}
	}
	const layout = {
		xaxis: workspaceChartLayoutXAxis,
		yaxis: workspaceChartLayoutYAxis,
		autosize: false,
		width: 800,
		height: 300,
		title: {
			text: ""
		}
	};
	return (
		<div className='workspace-plot'>
			<Plot
				data={workspaceChartData}
				layout={layout}
			/>
			<Alert
				style={{ marginTop: '-10px' }}
				message="Alert"
				description={`Voilation  has triggered an alert for Chart ID ${props.chartId}`}
				type="warning"
				showIcon
			/>
		</div>
	)
}

export default chartComponent;