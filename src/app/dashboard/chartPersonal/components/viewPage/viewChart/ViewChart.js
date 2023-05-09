import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "./viewChartStyles.scss";
//antd imports
import { ArrowRightOutlined, FilterOutlined } from "@ant-design/icons";
import {
	Button, Col, DatePicker, Divider, Empty, Input, Popover, Row, Select, Switch, Table, Tag,
	Tooltip
} from "antd";
import EmptyImg from "../../../../../../assets/icons/empty.svg";
//components
import StatusCorrect from "../../../../../../assets/statusCorrect.svg";
import StatusWrong from "../../../../../../assets/statusWrong.svg";
import Modal from "../../../../../../components/Modal/Modal";
import SelectField from "../../../../../../components/SelectField/SelectField";
import DateFilter from "./DateFilter";
import ViewSearchTable from "./viewSearchTable";
import ViewTable from "./ViewTable";
//redux
import { useDispatch } from "react-redux";
import {
	hideLoader, showLoader, showNotification
} from "../../../../../../duck/actions/commonActions";
//services
import moment from "moment";
import {
	getSiteId, postChartPlotData
} from "../../../../../../services/chartPersonalizationService";
import { getViewTable } from "../../../../../../services/commonService";
import CJson from "../chartObj.json";

//unpacking antd components
const { Search } = Input;
const { RangePicker } = DatePicker;

const ViewChart = ({ postChartData, setPostChartData }) => {
	//redux variables
	const dispatch = useDispatch();
	const { id } = useParams();
	//state variables
	const [viewSearch, setViewSearch] = useState(false);
	const [searchTableData, setSearchTableData] = useState([]);
	const [coverageTableData, setCoverageTableData] = useState([]);
	const [deepSearch, setDeepSearch] = useState(false);
	const [versionList, setVersionList] = useState([0]);
	const [siteList, setSiteList] = useState([]);
	const [isDatePopupVisible, setIsDatePopupVisible] = useState(false);
	const deepSearch1 = useRef(false);
	const searchViewData = useRef([]);
	const postChartView = useRef({});
	const ref = useRef(null);
	const dateFormat = "YYYY-MM-DD";
	const [viewData, setViewData] = useState({
		viewName: "",
		status: "",
		viewDispId: " ",
		searchValue: "",
		chartVersion: 0,
	});
	// sgtate for batch filters
	const [batchFilters, setBatchFilters] = useState({
		site: null,
		startDate: null,
		endDate: null,
		time: "",
		duration: null,
		is_gxp: null,
		unApproved: 0,
	});

	const columns = [
		{
			title: "Status",
			key: "param",
			dataIndex: "param",
			render: (text, record, index) => (
				<>
					{record.coverage_metric_percent === "100.0%" ||
						record.coverage_metric_percent === "100%" ? (
						<span>
							<img src={StatusCorrect} />
						</span>
					) : (
						<span>
							<img src={StatusWrong} />
						</span>
					)}
				</>
			),
		},
		{
			title: "Parameter",
			key: "function_name",
			dataIndex: "function_name",
			render: (function_name) => (
				<Tooltip title={function_name}>
					<Tag color="geekblue" className="parameter-tag">
						{function_name}
					</Tag>
				</Tooltip>
			),
		},
		{
			title: "Batch Coverage",
			key: "coverage_metric" + "coverage_metric_percent",
			dataIndex: "coverage_metric_percent",
			align: "right",
			render: (text, record) => (
				<span>
					{record.batchstats}({record.coverage_metric_percent})
				</span>
			),
		},
	];
	const onDeepSearch = () => {
		setDeepSearch(!deepSearch);
	};
	//function for getting viewdata list
	const getViewTableData = async () => {
		let reqView = { vew_status: "APRD" };
		let antdDataTable = [];
		try {
			dispatch(showLoader());
			const viewRes = await getViewTable(reqView);
			dispatch(hideLoader());
			if (viewRes['status-code'] === 200) {
				viewRes.Data.forEach((item, key) => {
					let antdObj = {};
					antdObj["key"] = key;
					antdObj["created_by"] = item.created_by;
					antdObj["created_on"] = item.created_on;
					antdObj["product_num"] = item.product_num;
					antdObj["view_disp_id"] = item.view_disp_id;
					antdObj["view_info"] = item.view_info;
					antdObj["view_name"] = item.view_name;
					antdObj["view_status"] = item.view_status;
					antdObj["view_version"] = item.view_version;
					antdObj["view"] = item.view;
					antdDataTable.push(antdObj);
				});
				searchViewData.current = JSON.parse(JSON.stringify(antdDataTable));
				setSearchTableData(antdDataTable);
				// setviewTableData(antdDataTable);
			} else if (viewRes?.Status === 403) {
				/* istanbul ignore next */
				dispatch(showNotification("error", 'You are not authorized', "It seems like you don't have permission to use this service."));
			}
		} catch (error) {
			/* istanbul ignore next */
			dispatch(hideLoader());
			dispatch(showNotification("error", error.message));
		}
	};

	//function to handle search
	const searchTable = (value) => {
		const filterData = searchViewData.current.filter((o) =>
			Object.keys(o).some((k) =>
				String(o[k]).toLowerCase().includes(viewData.searchValue.toLowerCase())
			)
		);
		setSearchTableData(filterData);
	};

	const setData = async () => {
		let errorMsg = "";
		try {
			dispatch(showLoader());
			const req = JSON.parse(JSON.stringify(postChartData));
			const selectedId = req.data[0].view_id;
			const selectedViewName = req.data[0].view_name;
			const reqBody = JSON.parse(JSON.stringify(CJson));
			reqBody.data[0].view_id = selectedId;
			reqBody.data[0].view_name = selectedViewName;
			const viewRes = await postChartPlotData(reqBody);
			errorMsg = viewRes?.message;
			getSites(viewRes.data[0].view_id);
			let newArr = [...postChartData.data];
			newArr[0] = viewRes.data[0];
			setPostChartData({ ...postChartData, data: newArr });
			dispatch(hideLoader());
		} catch (error) {
			/* istanbul ignore next */
			dispatch(hideLoader());
			if (errorMsg) {
				dispatch(showNotification("error", errorMsg));
			}
		}
	};

	/* istanbul ignore next */
	const getFilterData = async () => {
		try {
			dispatch(showLoader());
			const viewRes = await postChartPlotData(postChartData);
			if (viewRes.data && viewRes.data.length > 0) {
				let newArr = [...postChartData.data];
				newArr[0] = viewRes.data[0];
				setPostChartData({ ...postChartData, data: newArr });
			} else {
				dispatch(showNotification("error", viewRes.message));
				let newArr = [...postChartData.data];
				newArr[0].data_filter = {
					date_range: "",
					unapproved_data: 1,
					site: "",
				};
				setPostChartData({ ...postChartData, data: newArr });
			}
			dispatch(hideLoader());
		} catch {
			/* istanbul ignore next */
			dispatch(hideLoader());
		}
	};

	//on search value changes
	const onSearchChange = (e) => {
		if (e.target.value === "") {
			setSearchTableData(searchViewData.current);
		}
		setViewData({ ...viewData, searchValue: e.target.value });
	};

	//on focus of input field showing table results.
	const onFocus = () => {
		setViewSearch(true);
	};

	//function for closing view table result on click of outside.
	const closeTableView = (e) => {
		if (
			ref.current &&
			!ref.current.contains(e.target) &&
			!deepSearch1.current
		) {
			setViewSearch(false);
			setSearchTableData(searchViewData.current);
		}
	};
	useEffect(() => {
		document.addEventListener("mousedown", closeTableView);
	}, []);

	//function for handle version change
	const handleVersionChange = (e) => {
		setViewData({ ...viewData, chartVersion: e });
		if (e !== viewData.chartVersion) {
			const newArr = [...postChartData.data];
			newArr.forEach((item) => {
				item.view_version = e;
			});
			setPostChartData({ ...postChartData, data: newArr });
			setData();
		}
	};
	//function for getting site-ids
	const getSites = async (id) => {
		const obj = { view_id: id };
		try {
			const siteRes = await getSiteId(obj);
			setSiteList(siteRes.Data);
		} catch (error) {
			/* istanbul ignore next */
			dispatch(showNotification("error", "Unable to fetch sites"));
		}
	};

	const handledatechange = (e) => {
		if (e) {
			setBatchFilters({
				...batchFilters,
				startDate: e[0].format("YYYY-MM-DD"),
				endDate: e[1].format("YYYY-MM-DD"),
			});
		} else {
			setBatchFilters({
				...batchFilters,
				startDate: null,
				endDate: null,
			});
		}
	};

	const handleVisibleChange = (visible) => {
		setIsDatePopupVisible(visible);
	};

	const onSelectedView = (record) => {
		let tempVersionList = [0];
		searchViewData.current.forEach((ele) => {
			if (ele.view_disp_id === record.view_disp_id) {
				tempVersionList.push(ele.view_version);
				tempVersionList = tempVersionList.sort((a, b) => a - b);
				setVersionList(tempVersionList);
			}
		});
		setViewData({
			...viewData,
			viewName: record.view_name,
			viewDispId: record.view_disp_id,
			status: record.view_status,
			searchValue: record.view_disp_id,
			chartVersion: record.view_version,
		});
		let newArr = [...postChartData.data];
		newArr.forEach((ele) => {
			(ele.view_id = record.view_disp_id), (ele.view_name = record.view_name);
		});
		setPostChartData({ ...postChartData, data: newArr });
		setDeepSearch(false);
		deepSearch1.current = false;
		setData();
	};

	//function for handle batch filter change
	const handleBatchFilterChange = () => {
		const newArr = [...postChartData.data];
		const annotations = [
			{
				text: "This chart contains unapproved data",
				font: {
					size: 13,
					color: "rgb(116, 101, 130)",
				},
				showarrow: false,
				align: "left",
				x: 0,
				y: 1.16,
				xref: "paper",
				yref: "paper",
			},
		];
		newArr.forEach((ele) => {
			if (batchFilters.unApproved === 1) {
				ele.layout.annotations = annotations;
			} else {
				ele.layout.annotations = [];
			}
			ele.data_filter.unapproved_data = batchFilters.unApproved;
			ele.data_filter.date_range = batchFilters.startDate
				? new Date(batchFilters.startDate).toISOString() +
				"/" +
				new Date(batchFilters.endDate).toISOString()
				: "";
			ele.data_filter.site = batchFilters.site ? batchFilters.site : "";
			// setting up gxp value while sending in the chart json
			ele.is_gxp = batchFilters.is_gxp;
		});
		setPostChartData({ ...postChartData, data: newArr });
		getFilterData();
	};

	//useEffect for calling view list.
	useEffect(() => {
		getViewTableData();
	}, []);

	useEffect(() => {
		postChartData.data &&
			postChartData.data.forEach((ele) => {
				setViewData({
					...viewData,
					viewName: ele.view_name,
					viewDispId: ele.view_id,
					status: ele.view_status,
					searchValue: ele.view_id,
					chartVersion: ele.view_version,
				});
				setBatchFilters({
					...batchFilters,
					unApproved: ele.data_filter.unapproved_data,
					// setting up gxp value
					is_gxp: ele?.is_gxp
				});
				setCoverageTableData(ele.extras.coverage);
			});
	}, [postChartData]);

	useEffect(() => {
		if (viewData.viewDispId && viewData.viewDispId.length > 1) {
			getSites(viewData.viewDispId);
		}
	}, [viewData.viewDispId]);

	return (
		<div className="view-container">
			<Row>
				<Col ref={ref} span={24} className="search-table">
					<p>View ID</p>
					<Search
						className="viewSearch"
						placeholder="Search"
						onFocus={onFocus}
						value={viewData.searchValue}
						onChange={onSearchChange}
						onSearch={searchTable}
						disabled={Number(id) === 0 ? false : true}
					/>
					{viewSearch && (
						<ViewSearchTable
							getSites={getSites}
							postChartView={postChartView}
							setVersionList={setVersionList}
							searchViewData={searchViewData}
							postChartData={postChartData}
							setPostChartData={setPostChartData}
							setData={setData}
							setViewSearch={setViewSearch}
							searchTableData={searchTableData}
							viewData={viewData}
							setViewData={setViewData}
							setDeepSearch={setDeepSearch}
							deepSearch1={deepSearch1}
						/>
					)}
				</Col>
			</Row>
			<Row className="view-details">
				<Col span={19}>
					<Row gutter={16}>
						<Col span={8}>
							<label>View name</label>
						</Col>
						<Col span={14}>
							<p>: {viewData.viewName}</p>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col span={8}>
							<p>Status</p>
						</Col>
						<Col span={8}>
							<p>: {viewData.status}</p>
						</Col>
					</Row>
				</Col>
				{/* <Col span={3} /> */}
				<Col span={5} className="pb">
					<p>Version</p>
					<SelectField
						selectList={versionList}
						selectedValue={viewData.chartVersion}
						onChangeSelect={handleVersionChange}
						disabled={Number(id) === 0 ? false : true}
					/>
				</Col>
			</Row>
			{postChartData && postChartData.data && postChartData.data[0].view_id && (
				<Row className="batch">
					<Col span={12}>
						<p>Batch Coverage</p>
					</Col>
					<Col className="arrow-right" span={12}>
						<Button
							id="side-view-batch-coverage-apply-button"
							onClick={handleBatchFilterChange}
						>
							Apply
						</Button>
						<ArrowRightOutlined />
					</Col>
				</Row>
			)}
			<Divider />
			{postChartData && postChartData.data && postChartData.data[0].view_id ? (
				<>
				<Row gutter={24} className="filter">
						<Col span={11}>
							<Select
								placeholder="Site"
								value={batchFilters.site}
								onChange={(e) => setBatchFilters({ ...batchFilters, site: e })}
								style={{ width: "100%", margin: "0px" }}
								allowClear
							>
								{siteList &&
									siteList.map((ele, index) => {
										return (
											<Select.Option key={index} value={Object.values(ele)[0]}>
												{Object.keys(ele)[0]}
											</Select.Option>
										);
									})}
							</Select>
						</Col>
					</Row>
					<Row gutter={24} className="filter">
						<Col span={17} className="unapproved">
							<label>Show unapproved data</label>&nbsp;&nbsp;
							<Switch
								type="primary"
								size="small"
								checked={batchFilters.unApproved === 1}
								onChange={(e) =>
									setBatchFilters({
										...batchFilters,
										unApproved: e === true ? 1 : 0,
									})
								}
							/>
						</Col>
						<Col span={7} className="unapproved">
							<label>GXP</label>&nbsp;&nbsp;
							<Switch
								type="primary"
								size="small"
								checked={batchFilters.is_gxp}
								onChange={(e) =>
									setBatchFilters({
										...batchFilters,
										is_gxp: e,
									})
								}
							/>
						</Col>
					</Row>
					<Row gutter={16} className="filter">
						<Col span={22}>
							<RangePicker
								value={
									batchFilters.startDate
										? [
											moment(batchFilters.startDate, dateFormat),
											moment(batchFilters.endDate, dateFormat),
										]
										: ""
								}
								format={dateFormat}
								onChange={(dateString) => handledatechange(dateString)}
							/>
						</Col>
						<Col
							span={1}
							className={
								batchFilters.time || batchFilters.duration
									? "date date-active"
									: "date"
							}
						>
							<Popover
								overlayClassName="cppopup-over"
								placement="bottomLeft"
								title="Search quick time range"
								visible={isDatePopupVisible}
								onVisibleChange={handleVisibleChange}
								content={
									<DateFilter
										batchFilters={batchFilters}
										setBatchFilters={setBatchFilters}
										setIsDatePopupVisible={setIsDatePopupVisible}
									/>
								}
								trigger="click"
							>
								<Tooltip title="Advanced Filters">
									<FilterOutlined />
								</Tooltip>
							</Popover>
						</Col>
					</Row>
					<Row className="table-cont">
						<Col span={24}>
							<Table
								pagination={false}
								columns={columns}
								dataSource={coverageTableData}
								rowKey={(record) => record.function_name}
							/>
						</Col>
					</Row>
				</>
			) : (
				<Empty
					className="empty-chart"
					image={EmptyImg}
					description={<span>Please select View ID to see this data</span>}
				/>
			)}
			<Modal
				isModalVisible={deepSearch}
				handleCancel={onDeepSearch}
				width={700}
				closable={false}
				title={
					<div className="header-title">
						<h4>Views</h4>
						<Input.Search
							placeholder="Search by..."
							onSearch={searchTable}
							value={viewData.searchValue}
							onChange={onSearchChange}
						/>
					</div>
				}
			>
				<ViewTable
					searchTableData={searchTableData}
					setDeepSearch={setDeepSearch}
					deepSearch1={deepSearch1}
					onSelectedView={onSelectedView}
				/>
			</Modal>
		</div>
	);
};

export default ViewChart;
