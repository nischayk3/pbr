import { Button, Col, DatePicker, Input, Row, Select, Switch } from 'antd';
import moment from 'moment';
import queryString from "query-string";
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from "react-router-dom";
import SelectField from '../../../../../components/SelectField/SelectField';
import ChartTable from '../landingPage/chartTableLoad';
import './styles.scss';

export default function chartFilter(props) {
	const { Search } = Input;
	const location = useLocation();
	const params = queryString.parse(location.search);
	const [chartSearch, setChartSearch] = useState(false);
	const [searchTableData, setSearchTableData] = useState(props.rawTableData);
	const [viewData, setViewData] = useState({ chartName: '', status: '', chartDispId: '', searchValue: props?.chartId, chartVersion: 0 });
	const ref = useRef(null);
	useEffect(() => {
		document.addEventListener('mousedown', closeTableView);
	}, [])
	const focus = () => {
		setChartSearch(true);
	}
	const onFocusRemove = (value) => {
		setChartSearch(value);
	}
	const closeTableView = (e) => {
		if (ref.current && !ref.current.contains(e.target)) {
			setChartSearch(false);

		}
	}

	//function to handle search
	const searchTable = (value) => {
		const filterData = props.rawTableData.filter((o) =>
			Object.keys(o).some((k) =>
				String(o[k]).toLowerCase().includes(viewData.searchValue.toLowerCase())
			)
		);
		setSearchTableData(filterData)
	};

	//on search value changes
	const onSearchChange = (e) => {
		if (e.target.value === '') {
			setSearchTableData(props.rawTableData);
		}
		setViewData({ ...viewData, searchValue: e.target.value });
	}

	return (
		<div style={{ padding: '12px 18px' }}>
			<Row gutter={[16, 24]}>
				<Col className="gutter-row" span={8}>
					<SelectField
						id='chart_types'
						label='Type of Charts'
						placeholder='Select Charts'
						selectedValue={props.typeChartValue}
						onChangeSelect={props.onChangeTypeCharts}
						selectList={props.typeOfChartsOptions}
						disabled={params['share']}
					/>

				</Col>
				<Col className="gutter-row" span={16} ref={ref}>
					<p className='import-chart'>Import chart</p>
					<Search placeholder="Search"
						id='import_chart'
						onFocus={focus}
						value={viewData.searchValue}
						onChange={onSearchChange}
						onSearch={searchTable}
						disabled={params['share']}
					/>
					{chartSearch && <ChartTable style={{ position: 'absolute', zIndex: 999 }}
						searchTableData={searchTableData}
						viewData={viewData}
						setViewData={setViewData}
						setChartSearch={onFocusRemove}
						parentCallback={props.searchCallback}
						disabled={params['share']}
					/>}
				</Col>
			</Row>
			<Row gutter={[16, 24]} style={{ marginTop: '20px' }}>
				<Col className="gutter-row" span={8}>
					<div className='show-data'>
						<p style={{ color: '#777777' }}>Show Unapproved data</p>
						<Switch id='show_unapproved' type='primary' size='small' checked={props.checked} onChange={props.checkboxChange} disabled={params['share']}
						/>

					</div>
				</Col>
				<Col className="gutter-row" span={6}>

					<Select
						id='site'
						placeholder="Site"
						value={props.siteValue}
						onChange={props.onSiteChange}
						style={{ width: "100%", margin: "0px" }}
						allowClear
						disabled={params['share']}
					>
						{props.siteOption &&
							props.siteOption.map((ele, index) => {
								return (
									<Select.Option key={index} value={Object.values(ele)[0]}>
										{Object.keys(ele)[0]}
									</Select.Option>
								);
							})}
					</Select>

				</Col>
				<Col className="gutter-row" span={5}>
					<DatePicker
						id='start_date_1'
						value={props.dateRange.split("/")[0] ? moment(props.dateRange.split("/")[0], "YYYY-MM-DD") : ''}
						onChange={props.onInnerStart}
						disabled={params['share']}
					/>
				</Col>
				<Col className="gutter-row" span={5}>
					<DatePicker
						id='end_date_1'
						value={props.dateRange.split("/")[1] ? moment(props.dateRange.split("/")[1], "YYYY-MM-DD") : ''}
						onChange={props.onInnerEnd}
						disabled={params['share']}
					/>
				</Col>
			</Row>
			<Row style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
				<Col>
					<Button className='show-preview-btns' onClick={props.showPreview} disabled={params['share']}
					>Show preview
					</Button>
				</Col>
			</Row>

		</div>
	)
}
