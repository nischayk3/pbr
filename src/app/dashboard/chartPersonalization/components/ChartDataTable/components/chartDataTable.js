import React, { Component } from 'react';
import { Card, Table, Tabs } from 'antd';
import ExclusionTable from './exclusion_table';
import ShiftTable from './shift_table';
import TrendTable from './trend_table';
import ViolationTable from './violation';
import ParameterTable from './parameter_table';
import 'antd/dist/antd.css';
import './chartTableStyles.scss';

class ChartDataTable extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { TabPane } = Tabs;
		return (
			<div>
				<div>
					<Card bordered={false} style={{ width: 500, height: 285 }}>
						<Tabs defaultActiveKey='1'>
							<TabPane tab='Exclusion' key='1'>
								<ExclusionTable />
							</TabPane>
							<TabPane tab='Shift' key='2'>
								<ShiftTable />
							</TabPane>
							<TabPane tab='Trends' key='3'>
								<TrendTable />
							</TabPane>
							<TabPane tab='Violation' key='4'>
								<ViolationTable />
							</TabPane>
							<TabPane tab='Data Table' key='5'>
								<ParameterTable />
							</TabPane>
						</Tabs>
					</Card>
				</div>
			</div>
		);
	}
}

export default ChartDataTable;
