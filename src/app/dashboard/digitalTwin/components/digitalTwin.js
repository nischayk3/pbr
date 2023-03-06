import React, { useState } from 'react'
import { Row, Col, Divider, Input, Empty } from "antd";
import DataAccessTabs from './tabs/tabsList'
import DataAccessContainer from './dataAccess/dataAccessContainer'
import {
	RiseOutlined,
	RadarChartOutlined,
	BoxPlotOutlined
} from '@ant-design/icons';
import './styles.scss'
function DigitalTwin() {
	const [preData, setPreData] = useState({})
	const [tabsList, setTabsList] = useState([
		{
			title: "Pre-Compression force and Main Compression force",
			// icon: <RadarChartOutlined style={{ color: "#162154" }} />,
			selected: true
		},
		{
			title: "Tablet weight and Tablet hardness",
			// icon: <BoxPlotOutlined style={{ color: "#162154" }} />,
			selected: false
		},
		{
			title: "Turret Speed",
			// icon: <RiseOutlined style={{ color: "#162154" }} />,
			selected: false
		},
	]);

	const handlePreData = (val) => {
		setPreData(val)
	}

	return (
		<div className='digital-container'>
			<div className="chart-container">
				<Row>
					<Col span={24} className="header">
						<h3>Digital Twin - Calculator</h3>
					</Col>
				</Row>
				<div className="rows">
					<Row >
						<Col span={6}> <DataAccessTabs setTabsList={setTabsList} tabsList={tabsList} preData={preData} /></Col>
						<Col span={1}><Divider className="divider" type="vertical" /></Col>
						<Col span={17}><DataAccessContainer tabsList={tabsList} handlePreData={handlePreData} /></Col>
					</Row>
				</div>
			</div>
		</div>


	)
}

export default DigitalTwin