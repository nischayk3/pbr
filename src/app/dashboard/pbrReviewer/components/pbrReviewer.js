import { SearchOutlined, FilterOutlined } from '@ant-design/icons';
import { Button, Card, DatePicker, Col, Input, Row, Popover, Space, Table, Tooltip, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import Highlighter from 'react-highlight-words';
import Plot from 'react-plotly.js';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import BreadCrumbWrapper from '../../../../components/BreadCrumbWrapper';
import DateFilter from "../../chartPersonal/components/viewPage/viewChart/DateFilter";
import Signature from "../../../../components/ElectronicSignature/signature";
import moment from "moment";
import {
	hideLoader,
	showLoader,
	showNotification
} from '../../../../duck/actions/commonActions';
import { geTemplateDropdown, getPbrReviewerData, getPieChartData, updateApprove } from '../../../../services/pbrService';
import './styles.scss';
const { Search } = Input;
const { RangePicker } = DatePicker;
/* istanbul ignore next */
function PbrReviewer() {
	const dispatch = useDispatch();
	const [templateData, setTemplateData] = useState([])
	const [tableLoading, setTableLoading] = useState(false)
	const [searchedColumn, setSearchedColumn] = useState('');
	const [arr, setArr] = useState([]);
	const [searchedLanding, setSearchedLanding] = useState(false);
	const [approveReject, setApproveReject] = useState("");
	const [filterTableLanding, setFilterTableLanding] = useState(null);
	const [isPublish, setIsPublish] = useState(false);
	const [statusreq, setStatusReq] = useState({});
	const [pieChartData, setPieChartData] = useState([0, 0]);
	const [pieChartData1, setPieChartData1] = useState([0, 0, 0]);
	const [searchText, setSearchText] = useState("");
	const [showReset, setShowReset] = useState(false);
	const [showResetConfidence, setShowResetConfidence] = useState(false);
	const [templateArray, setTemplateArray] = useState([]);
	const [selectedTemplateArray, setSelectedTemplateArray] = useState([]);
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const [reviewerReq, setReviewerReq] = useState({
		confidence: null,
		createdBy: null,
		id: null,
		limit: null,
		status: null,
		template_id: [],
		date_range: null
	});
	const [batchFilters, setBatchFilters] = useState({
		site: null,
		startDate: moment().subtract(3, 'd'),
		endDate: moment(),
		time: "",
		duration: null,
		unApproved: 0,
	});
	const [isDatePopupVisible, setIsDatePopupVisible] = useState(false);
	const [appchart1, setAppChart1] = useState([{
		values: pieChartData1,
		labels: ["High", "Medium", "Low"],
		marker: {
			colors: ['#2ca02c', '#ff7f0e', '#1f77b4'],
			line: {
				color: 'white',
				width: 2
			},
			layout: {

				x: 1,
				xanchor: 'right',
				y: 1

			}

		},
		hole: .7,
		type: 'pie',
	}])
	const [appchart, setAppChart] = useState([{
		values: pieChartData,
		labels: ["Approved", "Unapproved"],
		marker: {
			colors: ['#2ca02c', '#ff7f0e'],
			line: {
				color: 'white',
				width: 2
			},
			layout: {
				x: 1,
				xanchor: 'right',
				y: 1
			}
		},
		hole: .7,
		type: 'pie',

	}])
	const dateFormat = "YYYY-MM-DD";
	let [filteredData] = useState();

	const history = useHistory();
	useEffect(() => {
		cardTableData()
		getTemplateID()
	}, []);

	const cardTableData = async (val) => {
		try {
			dispatch(showLoader());
			let req = {
				...reviewerReq,
				template_id: selectedTemplateArray,
				date_range: batchFilters.startDate
					? new Date(batchFilters.startDate).toISOString() +
					"/" +
					new Date(batchFilters.endDate).toISOString()
					: null
			}
			setTableLoading(true)
			const tableResponse = await getPbrReviewerData(val ? val : req);
			if (tableResponse['status-code'] === 200) {
				let arr = tableResponse.Data.map((item, index) => ({ ...item, key: index }))
				setTemplateData(arr);
				setTableLoading(false)
				dispatch(hideLoader());
			}
			/* istanbul ignore next */
			else if (tableResponse['status-code'] === 404) {
				dispatch(hideLoader());
				setTemplateData(tableResponse.Data);
				setTableLoading(false)
				dispatch(showNotification('error', tableResponse.Message));
				/* istanbul ignore next */
			} else {
				dispatch(hideLoader());
			}
		}
		/* istanbul ignore next */
		catch (error) {
			setTableLoading(false)
			dispatch(hideLoader());
			dispatch(showNotification('error', error.Message));
		}
	};

	const getTemplateID = async () => {
		dispatch(showLoader());
		try {
			let res = await geTemplateDropdown()
			if (res['status-code'] == 200) {
				setTemplateArray(res?.Data)
				dispatch(hideLoader());
			} else {
				dispatch(hideLoader());
				dispatch(showNotification('error', res.Message));
			}
		} catch (error) {
			dispatch(hideLoader());
			dispatch(showNotification('error', error.Message));
		}
	}
	/* istanbul ignore next */
	const showfilterData = async (value) => {
		dispatch(showLoader());
		setShowReset(true)
		let obj = {
			...reviewerReq, status: value.toLowerCase(), template_id: selectedTemplateArray, date_range: batchFilters.startDate
				? new Date(batchFilters.startDate).toISOString() +
				"/" +
				new Date(batchFilters.endDate).toISOString()
				: null
		}
		setTableLoading(true)
		let res = await getPbrReviewerData(obj)
		let arr = res.Data.map((item, index) => ({ ...item, key: index }))
		setTemplateData(arr);
		setTableLoading(false)
		setReviewerReq(obj)
		dispatch(hideLoader());
	};
	/* istanbul ignore next */
	const showfilters = async (value) => {
		dispatch(showLoader());
		setShowResetConfidence(true)
		let obj = {
			...reviewerReq, confidence: value, template_id: selectedTemplateArray, date_range: batchFilters.startDate
				? new Date(batchFilters.startDate).toISOString() +
				"/" +
				new Date(batchFilters.endDate).toISOString()
				: null
		}
		setTableLoading(true)
		let res = await getPbrReviewerData(obj)
		let arr = res.Data.map((item, index) => ({ ...item, key: index }))
		setTemplateData(arr);
		setTableLoading(false)
		setReviewerReq(obj)
		dispatch(hideLoader());

	};
	/* istanbul ignore next */
	const updateStatus = (e, record) => {
		let resp = [...arr];
		if (resp.includes(record.id)) {
			const newArr = resp.filter(e => e !== record.id)
			setArr(newArr);
		} else {
			resp.push(record.id);
			setArr(resp);
		}


	};
	/* istanbul ignore next */
	const eSignId = async (esign) => {
		dispatch(showLoader());
		let login_response = JSON.parse(localStorage.getItem('login_details'));
		let req = {
			changed_by: login_response?.email_id,
			id: arr,
			recorded_date: null,
			recorded_time: null,
			snippet_value: null,
			status: "approved",
			uom: null,
			table_value: null,
			esign_id: `${esign}`
		}
		if (esign) {
			let res = await updateApprove(req)

			if (res.Status == "202") {
				setArr([])
				setSelectedRowKeys([]);
				dispatch(hideLoader());
				dispatch(showNotification("success", "Approved Successfully"))
				cardTableData()
				getTemplateID()
				chart();
				// chart1();
			} else {
				dispatch(hideLoader());
				dispatch(showNotification("error", res?.Message))
			}
		}

	};
	/* istanbul ignore next */
	const handleClose = () => {
		setIsPublish(false);
	};
	/* istanbul ignore next */
	const showApproved = async () => {
		setIsPublish(true);
		setApproveReject("A");
	};

	const chart = async (val) => {
		let req = {
			date_range: batchFilters.startDate
				? new Date(batchFilters.startDate).toISOString() +
				"/" +
				new Date(batchFilters.endDate).toISOString()
				: null, id: selectedTemplateArray
		}
		let obj = await getPieChartData(val ? val : req);
		let jsondata = obj.status_data;
		let approved = 0
		let unapproved = 0
		jsondata.forEach(item => {
			if (item.status == "approved") {
				approved = item.count
			} else if (item.status == "unapproved") {
				unapproved = item.count
			}
		})
		setPieChartData([approved, unapproved]);
		setAppChart([{ ...appchart[0], values: [approved, unapproved] }])
		let jsondata1 = obj.confidence_data;
		let High = 0
		let Medium = 0
		let Low = 0
		jsondata1.forEach(item => {
			if (item.confidence == "High") {
				High = item.count
			} else if (item.confidence == "Low") {
				Low = item.count
			} else if (item.confidence == "Medium") {
				Medium = item.count
			}
		})
		setPieChartData1([High, Medium, Low]);
		setAppChart1([{ ...appchart1[0], values: [High, Medium, Low] }])

	};

	// let appchart1 = [{
	// 	values: pieChartData1,
	// 	labels: ["High", "Medium", "Low"],
	// 	marker: {
	// 		colors: ['#2ca02c', '#ff7f0e', '#1f77b4'],
	// 		line: {
	// 			color: 'white',
	// 			width: 2
	// 		},
	// 		layout: {

	// 			x: 1,
	// 			xanchor: 'right',
	// 			y: 1

	// 		}

	// 	},
	// 	hole: .7,
	// 	type: 'pie',
	// }]

	// let appchart = [{
	// 	values: pieChartData,
	// 	labels: ["Approved", "Unapproved"],
	// 	marker: {
	// 		colors: ['#2ca02c', '#ff7f0e'],
	// 		line: {
	// 			color: 'white',
	// 			width: 2
	// 		},
	// 		layout: {
	// 			x: 1,
	// 			xanchor: 'right',
	// 			y: 1
	// 		}
	// 	},
	// 	hole: .7,
	// 	type: 'pie',

	// }]

	useEffect(() => {
		chart();
		// chart1();
	}, []);
	/* istanbul ignore next */
	const columns2 = [
		{
			title: 'ID',
			key: 'id',
			dataIndex: 'id',
			...getColumnSearchProps('id'),
			sorter: (a, b) => a.id - b.id,
			sortDirections: ['descend', 'ascend'],
			width: "5%"
		},
		{
			title: 'Template Id',
			key: 'template_id',
			dataIndex: 'template_id',
			...getColumnSearchProps('template_id'),
			sorter: (a, b) => {
				return a.template_id === null ||
					a.template_id === undefined ||
					a.template_id === ""
					? -1
					: b.template_id == null ||
						b.template_id == undefined ||
						b.template_id == ""
						? 1
						: a.template_id.toString().localeCompare(b.template_id);
			},
			// sortDirections: ['descend', 'ascend'],
		},
		{
			title: 'Template Version',
			key: 'template_version',
			dataIndex: 'template_version',
			...getColumnSearchProps('template_version'),
			sorter: (a, b) => {
				return a.template_version === null ||
					a.template_version === undefined ||
					a.template_version === ""
					? -1
					: b.template_version == null ||
						b.template_version == undefined ||
						b.template_version == ""
						? 1
						: a.template_version.toString().localeCompare(b.template_version);
			},
			// sortDirections: ['descend', 'ascend'],
		},
		{
			title: 'Template Name',
			key: 'template_name',
			dataIndex: 'template_name',
			...getColumnSearchProps('template_name'),
			sorter: (a, b) => {
				return a.template_name === null ||
					a.template_name === undefined ||
					a.template_name === ""
					? -1
					: b.template_name == null ||
						b.template_name == undefined ||
						b.template_name == ""
						? 1
						: a.template_name.toString().localeCompare(b.template_name);
			},
			// sortDirections: ['descend', 'ascend'],
		},
		{
			title: 'Parameter Name',
			key: 'param_name',
			dataIndex: 'param_name',
			...getColumnSearchProps('param_name'),
			sorter: (a, b) => {
				return a.param_name === null ||
					a.param_name === undefined ||
					a.param_name === ""
					? -1
					: b.param_name == null ||
						b.param_name == undefined ||
						b.param_name == ""
						? 1
						: a.param_name.toString().localeCompare(b.param_name);
			},
			// sortDirections: ['descend', 'ascend'],
		},
		{
			title: 'Attribute Name',
			key: 'anchor_key',
			dataIndex: 'anchor_key',
			...getColumnSearchProps('anchor_key'),
			sorter: (a, b) => {
				return a.anchor_key === null ||
					a.anchor_key === undefined ||
					a.anchor_key === ""
					? -1
					: b.anchor_key == null ||
						b.anchor_key == undefined ||
						b.anchor_key == ""
						? 1
						: a.anchor_key.toString().localeCompare(b.anchor_key);
			},
			// sortDirections: ['descend', 'ascend'],
		},

		{
			title: 'Value',
			key: 'snippet_value',
			dataIndex: 'snippet_value',
			...getColumnSearchProps('snippet_value'),
			sorter: (a, b) => {
				return a.snippet_value === null ||
					a.snippet_value === undefined ||
					a.snippet_value === ""
					? -1
					: b.snippet_value == null ||
						b.snippet_value == undefined ||
						b.snippet_value == ""
						? 1
						: a.snippet_value.toString().localeCompare(b.snippet_value);
			},
			// sortDirections: ['descend', 'ascend'],
		},
		{
			title: 'Snippet Value',
			key: 'snippet_image',
			dataIndex: 'snippet_image',
			width: "8%",
			render: (text, record, index) => {
				return (
					<img src={`data:image/png;base64,${text}`} width="130px" height="40px" />
				)
			}
		},
		{
			title: 'Confidence',
			key: 'confidence',
			dataIndex: 'confidence',
			...getColumnSearchProps('confidence'),
			sorter: (a, b) => {
				return a.confidence === null ||
					a.confidence === undefined ||
					a.confidence === ""
					? -1
					: b.confidence == null ||
						b.confidence == undefined ||
						b.confidence == ""
						? 1
						: a.confidence.toString().localeCompare(b.confidence);
			},
			// sortDirections: ['descend', 'ascend'],
		},
		{
			title: 'File Path',
			key: 'file_path',
			dataIndex: 'file_path',
			// width:"17%",
			...getColumnSearchProps('file_path'),
			sorter: (a, b) => {
				return a.file_path === null ||
					a.file_path === undefined ||
					a.file_path === ""
					? -1
					: b.file_path == null ||
						b.file_path == undefined ||
						b.file_path == ""
						? 1
						: a.file_path.toString().localeCompare(b.file_path);
			},
			// sortDirections: ['descend', 'ascend'],
		},
		{
			title: 'Page Name',
			key: 'page_name',
			dataIndex: 'page_name',
			// width:"17%",
			...getColumnSearchProps('page_name'),
			sorter: (a, b) => {
				return a.page_name === null ||
					a.page_name === undefined ||
					a.page_name === ""
					? -1
					: b.page_name == null ||
						b.page_name == undefined ||
						b.page_name == ""
						? 1
						: a.page_name.toString().localeCompare(b.page_name);
			},
			// sortDirections: ['descend', 'ascend'],
		},
		{
			title: 'Page Number',
			key: 'page_num',
			dataIndex: 'page_num',
			// width:"17%",
			...getColumnSearchProps('page_num'),
			sorter: (a, b) => {
				return a.page_num === null ||
					a.page_num === undefined ||
					a.page_num === ""
					? -1
					: b.page_num == null ||
						b.page_num == undefined ||
						b.page_num == ""
						? 1
						: a.page_num.toString().localeCompare(b.page_num);
			},
			// sortDirections: ['descend', 'ascend'],
		},
		{
			title: 'Status',
			key: 'status',
			dataIndex: 'status',
			...getColumnSearchProps('status'),
			sorter: (a, b) => {
				return a.status === null ||
					a.status === undefined ||
					a.status === ""
					? -1
					: b.status == null ||
						b.status == undefined ||
						b.status == ""
						? 1
						: a.status.toString().localeCompare(b.status);
			},
			// sortDirections: ['descend', 'ascend'],
		},
		{
			title: 'Site',
			key: 'site_code',
			dataIndex: 'site_code',
			...getColumnSearchProps('site_code'),
			sorter: (a, b) => {
				return a.site_code === null ||
					a.site_code === undefined ||
					a.site_code === ""
					? -1
					: b.site_code == null ||
						b.site_code == undefined ||
						b.site_code == ""
						? 1
						: a.site_code.toString().localeCompare(b.site_code);
			},
			// sortDirections: ['descend', 'ascend'],
		},
		{
			title: 'Product',
			key: 'product_num',
			dataIndex: 'product_num',
			...getColumnSearchProps('product_num'),
			sorter: (a, b) => {
				return a.product_num === null ||
					a.product_num === undefined ||
					a.product_num === ""
					? -1
					: b.product_num == null ||
						b.product_num == undefined ||
						b.product_num == ""
						? 1
						: a.product_num.toString().localeCompare(b.product_num);
			},
			// sortDirections: ['descend', 'ascend'],
		},
		{
			title: 'Batch',
			key: 'batch_num',
			dataIndex: 'batch_num',
			...getColumnSearchProps('batch_num'),
			sorter: (a, b) => {
				return a.batch_num === null ||
					a.batch_num === undefined ||
					a.batch_num === ""
					? -1
					: b.batch_num == null ||
						b.batch_num == undefined ||
						b.batch_num == ""
						? 1
						: a.batch_num.toString().localeCompare(b.batch_num);
			},
			// sortDirections: ['descend', 'ascend'],
		},
		{
			title: 'created By',
			key: 'created_by',
			dataIndex: 'created_by',
			// width:"10%",
			...getColumnSearchProps('created_by'),
			sorter: (a, b) => {
				return a.created_by === null ||
					a.created_by === undefined ||
					a.created_by === ""
					? -1
					: b.created_by == null ||
						b.created_by == undefined ||
						b.created_by == ""
						? 1
						: a.created_by.toString().localeCompare(b.created_by);
			},
			// sortDirections: ['descend', 'ascend'],
		},
		{
			title: 'Action',
			key: 'operation',
			fixed: 'right',
			width: 100,
			render: (text, record, index) => {
				return (
					<a
						disabled={record.status === "approved"}
						style={{ color: "#1890ff" }}
						onClick={() => {
							if (record?.table_value === null) {
								window.open(`/#/dashboard/pbr_update?id=${record.id}&temp_disp_id=${record.template_id}&version=${record.template_version
									}&param_name=${record.param_name}`)
							} else {
								window.open(`/#/dashboard/pbr_table_reviewer?id=${record.id}&temp_disp_id=${record.template_id}&version=${record.template_version
									}&param_name=${record.param_name}`)
							}

						}}

					>
						Review
					</a>
				)
			}
		},
	]
	/* istanbul ignore next */
	function getColumnSearchProps(dataIndex) {
		return {
			filterDropdown: ({
				setSelectedKeys,
				selectedKeys,
				confirm,
				clearFilters,
			}) => (
				<div style={{ padding: 8 }}>
					<Input
						placeholder={`Search ${dataIndex}`}
						value={selectedKeys[0]}
						onChange={(e) =>
							setSelectedKeys(
								e.target.value ? [e.target.value] : []
							)
						}
						onPressEnter={() =>
							handleSearch(selectedKeys, confirm, dataIndex)
						}
						style={{
							marginBottom: 8,
							display: 'block',
						}}
					/>
					<Space>
						<Button
							type='primary'
							onClick={() =>
								handleSearch(selectedKeys, confirm, dataIndex)
							}
							icon={<SearchOutlined />}
							size='small'
							style={{ width: 90 }}
						>
							Search
						</Button>
						<Button
							onClick={() => handleReset(clearFilters)}
							size='small'
							style={{ width: 90 }}
						>
							Reset
						</Button>
						<Button
							type='link'
							size='small'
							onClick={() => {
								confirm({ closeDropdown: false });
								setSearchText(selectedKeys[0]);
								setSearchedColumn(dataIndex);
							}}
						>
							Filter
						</Button>
					</Space>
				</div>
			),
			filterIcon: (filtered) => (
				<SearchOutlined
					style={{ color: filtered ? '#1890ff' : undefined }}
				/>
			),
			onFilter: (value, record) =>
				record[dataIndex]
					? record[dataIndex]
						.toString()
						.toLowerCase()
						.includes(value.toLowerCase())
					: "",
			onFilterDropdownVisibleChange: (visible) => {
				if (visible) {
					// setTimeout(() => this.searchInput.select());
				}
			},
			render: (text) =>
				searchedColumn === dataIndex ? (
					<Highlighter
						highlightStyle={{
							backgroundColor: '#ffc069',
							padding: 0,
						}}
						searchWords={[searchText]}
						autoEscape
						textToHighlight={text.toString()}
					/>
				) : (
					text
				),
		};

	};
	/* istanbul ignore next */
	function handleSearch(selectedKeys, confirm, dataIndex) {
		confirm();
		setSearchText(selectedKeys[0]);
		setSearchedColumn(dataIndex);
	}
	/* istanbul ignore next */
	function handleReset(clearFilters) {
		clearFilters();
		setSearchText("");
	}
	/* istanbul ignore next */
	const landingSearch = value => {
		if (value == "") {
			setFilterTableLanding(null);
		} else {
			setSearchedLanding(true);
			const tableData = templateData;
			const newArray = tableData.map(({ created_on, changed_on, snippet_image, recorded_date, recorded_time, ...keepAttrs }) => keepAttrs)
			const filterTable = newArray.filter(o =>
				Object.keys(o).some(k => {
					return String(o[k]).toLowerCase().includes(String(value).toLowerCase())
				}
				)
			);
			setFilterTableLanding(filterTable);
		}

	};
	/* istanbul ignore next */
	const resetConfidence = async () => {
		dispatch(showLoader());
		let obj = {
			...reviewerReq, confidence: null, date_range: batchFilters.startDate
				? new Date(batchFilters.startDate).toISOString() +
				"/" +
				new Date(batchFilters.endDate).toISOString()
				: null
		}
		setTableLoading(true)
		let res = await getPbrReviewerData(obj)
		let arr = res.Data.map((item, index) => ({ ...item, key: index }))
		setTemplateData(arr);
		setTableLoading(false)
		setReviewerReq(obj)
		setShowResetConfidence(false)
		dispatch(hideLoader());

	}
	/* istanbul ignore next */
	const resetStatus = async () => {
		dispatch(showLoader());
		let obj = {
			...reviewerReq, status: null, date_range: batchFilters.startDate
				? new Date(batchFilters.startDate).toISOString() +
				"/" +
				new Date(batchFilters.endDate).toISOString()
				: null
		}
		setTableLoading(true)
		let res = await getPbrReviewerData(obj)
		let arr = res.Data.map((item, index) => ({ ...item, key: index }))
		setTemplateData(arr);
		setTableLoading(false)
		setReviewerReq(obj)
		setShowReset(false)
		// setShowResetConfidence(false)
		//cardTableData()
		dispatch(hideLoader());

	}
	/* istanbul ignore next */
	const handleTemplateChange = (val) => {
		if (val.length == 0) {
			let req = {
				...reviewerReq, template_id: [], date_range: batchFilters.startDate
					? new Date(batchFilters.startDate).toISOString() +
					"/" +
					new Date(batchFilters.endDate).toISOString()
					: null
			}
			let req1 = {
				date_range: batchFilters.startDate
					? new Date(batchFilters.startDate).toISOString() +
					"/" +
					new Date(batchFilters.endDate).toISOString()
					: null, id: []
			}
			let req2 = {
				date_range: batchFilters.startDate
					? new Date(batchFilters.startDate).toISOString() +
					"/" +
					new Date(batchFilters.endDate).toISOString()
					: null, id: []
			}
			setSelectedTemplateArray([])
			// cardTableData(req)
			// chart(req1)
			// chart1(req2)
		}
		setSelectedTemplateArray(val)
	}
	/* istanbul ignore next */
	const applyTemplateFilter = () => {
		cardTableData()
		chart()
		// chart1()
	}

	const rowSelection = {
		selectedRowKeys,
		onChange: (selectedRowKeys, selectedRows) => {
			setSelectedRowKeys(selectedRowKeys);
			let arr = selectedRows.map(item => item.id)
			setArr(arr)
		},
		getCheckboxProps: (record) => ({
			disabled: record.status === 'approved',
			// Column configuration not to be checked
			//   name: record.name,
		}),
	};

	const handledatechange = (e) => {
		if (e) {
			setBatchFilters({
				...batchFilters,
				startDate: e[0].format("YYYY-MM-DD"),
				endDate: e[1].format("YYYY-MM-DD"),
			});
		}
		else {
			setBatchFilters({
				...batchFilters,
				startDate: null,
				endDate: null,
			});
			// let req = {
			// 	...reviewerReq, date_range: null
			// }
			// let req1 = {
			// 	date_range: null, id: selectedTemplateArray
			// }
			// cardTableData(req)
			// chart(req1)
		}
	};

	const handleVisibleChange = (visible) => {
		setIsDatePopupVisible(visible);
	};

	return (
		<>
			<BreadCrumbWrapper />
			<div className='custom-wrapper'>
				<div className='custom-content-layout' style={{ overflowY: "hidden" }}>
					<div className="background"
					// style={{
					//   display: 'block', width: '100%',
					//   padding: 30, height: 220,
					//   scrollBehavior: 'auto'
					// }}
					>
						<Row gutter={16}>
							<Col span={12}>
								<Card className="review-card1" >
									<div id="my-div" style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", height: 150 }}>
										<h3 className="status_pos">Status</h3>
										{showReset && (
											<p className="status-approved" onClick={resetStatus}>Reset</p>
										)}
										<Plot
											data={appchart}
											onClick={(e) => showfilterData(e.points[0].label)}
											layout={{
												showlegend: true,
												legend: {
													x: 1.3,
													xanchor: 'left',
													y: 0.5

												}, paper_bgcolor: "rgba(0,0,0,0)", width: 390, title: ''
											}} />

									</div>
								</Card>
							</Col>
							<Col span={12}>
								<Card className="review-card2">
									<div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", height: 150 }}>
										<h3 className="status_pos">Confidence</h3>
										{showResetConfidence && (
											<p className="status-confi" onClick={resetConfidence}>Reset</p>
										)}

										<Plot
											data={appchart1}
											onClick={(e) => showfilters(e.points[0].label)}
											layout={{
												showlegend: true,
												legend: {
													x: 1.3,
													y: 0.5

												}, paper_bgcolor: "rgba(0,0,0,0)", width: 350, title: ''
											}} />
									</div>
								</Card>
							</Col>
						</Row>
					</div>
					<div className='review-wrapper'>
						<div className='content_section' style={{ height: "100vh" }} >
							<div className="scrollable-container" >
								<div>
									<Row >
										<Col span={10} >
											<Button id="pbr-approve" style={{
												margin: "7px 20px",
												right: 8,
												borderRadius: "5px",
												textTransform: "none",
												background: "#ffffff",
												borderColor: "#303f9f",
												color: "#303f9f"

											}}
												onClick={showApproved}
												disabled={arr?.length == 0 ? true : false}
											>Approve</Button>
											<Search
												placeholder="Find"
												allowClear
												onSearch={landingSearch}
												style={{ width: 300, marginTop: 7 }}
											/>
										</Col>
										<Col span={14} style={{ display: "flex", justifyContent: 'space-between' }}>
											<Select className='templateIDDropdown' mode='multiple' maxTagCount={1} id="templateDrop" placeholder="Select Template ID" allowClear options={templateArray} onChange={handleTemplateChange} style={{ width: 160, marginLeft: 25 }} />
											<div>
												<RangePicker
													className='dateFilter'
													value={
														batchFilters.startDate
															? [
																moment(batchFilters.startDate, dateFormat),
																moment(batchFilters.endDate, dateFormat),
															]
															: ''
													}
													format={dateFormat}
													onChange={(dateString) => handledatechange(dateString)}
												/>
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
														<FilterOutlined style={{ marginLeft: 5, fontSize: 20 }} />
													</Tooltip>
												</Popover>

											</div>
											<Button id="applyFilter" style={{
												margin: "7px 20px",
												right: 8,
												borderRadius: "5px",
												textTransform: "none",
												background: "#ffffff",
												borderColor: "#303f9f",
												color: "#303f9f"

											}}
												onClick={applyTemplateFilter}
												disabled={selectedTemplateArray?.length == 0 ? batchFilters.startDate == null ? true : false : false}
											>Apply</Button>
										</Col>

									</Row>
								</div>
								<div >
									<Table
										loading={tableLoading}
										size="small"
										rowSelection={{
											...rowSelection,
										}}
										columns={columns2}
										className="pbr_reviewer_table"
										dataSource={filterTableLanding === null
											? templateData
											: filterTableLanding}
										pagination={{ defaultPageSize: 1000, showSizeChanger: true, pageSizeOptions: ["1000", '2000', '5000', '100000'] }}
										scroll={{
											x: 2300,
											y: 'calc(100vh - 460px)',
										}}
										style={{ border: '1px solid #ececec', borderRadius: '2px' }}
									/>

								</div>
							</div>
						</div>
					</div>



				</div>
			</div>
			<Signature
				isPublish={isPublish}
				status={approveReject}
				handleClose={handleClose}
				eSignId={eSignId}
				screenName="Pbr Creation"
				appType="PBR_TEMPLATE"
			/>
		</>
	)
}

export default PbrReviewer