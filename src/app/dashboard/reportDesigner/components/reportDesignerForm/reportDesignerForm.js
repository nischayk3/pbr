import React, { useState } from 'react';
import { Input, Select, Typography, Card } from 'antd';
import { getCharts } from '../../../../../services/reportDesignerServices';
import './styles.scss';

const { Option } = Select;
const { Text } = Typography;


function ReportDesignerForm(props) {
	const {
		setViewId,
		status,
		reportName,
		setReportName,
		mapViewList,
		setViewVersion,
		reportId,
		viewIdVersion,
		setViewIdVersion,
		setSelectedChartList,
		selectedChartList,
		isLoad
	} = props;
	const [chartsList, setChartList] = useState([])

	const handleChange = selectedItems => {
		setSelectedChartList(selectedItems);
	};

	//Get charts based on viewId-version
	const getChartsList = (version, viewId) => {
		if (viewId.length > 0)
			setSelectedChartList([])
		// message.success(`${version} selected`)
		let req = version;
		getCharts(req).then((res) => {

			if (res['status-code'] === 200)
				setChartList(res['data']);
			else
				setChartList([]);
		});
	};
	return (
		<Card className="reportInfoCard" title="Report Info" >
			<div className='reportDesigner-grid'>
				<div className='reportDesigner-block-design'>
					<div>
						<Text className='filter-text'> Report ID <span className="colon">:</span> {reportId ? reportId : "Unassigned"}</Text> <br />
						<Text className='filter-text-status'> Status <span className="status-colon">:</span> {status}</Text><br />
					</div>
					<div>
						<Text className='filter-text'>Report Name <b style={{ color: 'red' }}>*</b></Text><br />
						<Input
							className='filter-button'
							value={reportName}
							onChange={(e) => setReportName(e.target.value)}
							required={true}
							disabled={props.show}
							placeholder="Enter Report Name"
						/>
					</div>
					<div>
						<Text className='filter-text'>View <b style={{ color: 'red' }}>*</b></Text><br />
						<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }} >
							<Select
								placeholder="Select view"
								className='filter-button'
								defaultValue={viewIdVersion}
								showArrow={false}
								showSearch
								onChange={(e, value) => {

									let view_value = value.value;
									let split_view_id = view_value.split('-');
									setViewId(split_view_id[0]);
									setViewVersion(split_view_id[1]);
									setViewIdVersion(view_value);
									getChartsList(view_value, split_view_id[0]);
								}}
								value={viewIdVersion}
								disabled={props.show}
							>
								{mapViewList.map((item) => (
									<Option
										value={item.view} key={item.view}>{item.view}</Option>
								))}
							</Select>
						</div>
					</div>
					<div>
						<Text className='filter-text'>Chart ID <b style={{ color: 'red' }}>*</b></Text><br />
						<Select
							row={1}
							className="filter-button"
							mode="multiple"
							dropdownStyle={{ border: '10' }}
							notFoundContent="No Result"
							placeholder="Select Multiple Charts"
							disabled={props.show}
							value={selectedChartList}
							onChange={handleChange}
							style={{ width: '100%', position: 'relative', height: '75px', overflow: 'auto' }}
							maxTagCount="responsive"
						>
							{!isLoad ? chartsList.length > 0 ? chartsList.map(item => (
								<Option value={item} key={item}>
									{item}
								</Option>
							)) : <Option >

							</Option> : props.chartList.length > 0 ? props.chartList.map(i => (
								<Option value={i} key={i}>
									{i}
								</Option>
							)) : <Option >

							</Option>}
						</Select>
					</div>
				</div>
			</div>
		</Card>
	);
}

export default ReportDesignerForm;
