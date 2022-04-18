import React, { useEffect, useState } from 'react';
import DesignCharts from './components/reportDesignerNew';
import ReportGenerator from '../reportGenerator/components/reportGenerator';
import { useSelector, useDispatch } from 'react-redux';
import Landing from './components/reportLanding';

function Report() {
	const screen = useSelector(state => state.reportDesignerReducer.screen);
	const [screenChange, setScreenChange] = useState(false);
	const [getData, setData] = useState({});

	useEffect(() => {}, []);

	const changeScreen = () => {
		setScreenChange(true);
	};

	const getReportData = data => {
		setData(data);
	};
	return (
		<div>
			{!screenChange ? (
				<Landing changeScreen={changeScreen} getReportData={getReportData} />
			) : (
				<>
					{' '}
					{screen ? (
						<div>
							<ReportGenerator />
						</div>
					) : (
						<div>
							<DesignCharts loadData={getData} />
						</div>
					)}{' '}
				</>
			)}
		</div>
	);
}
export default Report;
