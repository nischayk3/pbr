/**
 * @author Dinesh
 * @Mareana - CPV Product
 * @version  1
 * @Last Modified - 05 Aug, 2022
 * @Last Changed By - Dinesh
 */

import {
	Button,
	DatePicker,
	Dropdown,
	Input,
	Menu,
	Select, Table,
	Typography
} from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import BreadCrumbWrapper from "../../../../components/BreadCrumbWrapper";
import SelectSearchField from "../../../../components/SelectSearchField/SelectSearchField";
import { MDH_APP_PYTHON_SERVICE } from "../../../../constants/apiBaseUrl";
import {
	auditDataChange,
	auditFilter
} from "../../../../duck/actions/auditTrialAction";
import "./style.scss";



const UserTrail = () => {
	const { RangePicker } = DatePicker;
	const { Option } = Select;
	const { Text } = Typography;

	const userMenu = (
		<Menu>
			<Menu.Item key="1" onClick={() => getExcelFile("excel")}>
				Excel
			</Menu.Item>
			<Menu.Divider />
			<Menu.Item key="2" onClick={() => getExcelFile("csv")}>
				CSV
			</Menu.Item>
		</Menu>
	);

	const [initialColumns, setInitialColumns] = useState([]);
	const [userList, setUserList] = useState([]);
	const [eventList, setEventList] = useState([]);
	const [colSort, setColSort] = useState();
	const [tableData, setTableData] = useState();
	const [downloadData, setDownloadData] = useState();
	const [selectedLimit, setSelectedLimit] = useState();
	const [filterIng, setFilterIng] = useState();
	const [type, setType] = useState();
	const [user, setUser] = useState();
	const [filterPkg, setFilterPkg] = useState();
	const [filterTable, setFilterTable] = useState();
	const [daterange, setDaterange] = useState([]);
	const [eventType, setEventType] = useState("");
	const [loading, setLoading] = useState(false);
	const [selectedDate, setSelectedDate] = useState("");
	const [sortState, setSortState] = useState("DESC");

	const columns = [
		{
			title: "User",
			dataIndex: "user_id",
			key: "2",
			defaultSortOrder: "descend",
			sorter: (a, b) => a.user_id.localeCompare(b.user_id)
		},
		{
			title: "Event",
			dataIndex: "activity",
			key: "3",
			defaultSortOrder: "descend",
			sorter: (a, b) => a.activity.localeCompare(b.activity)
		},
		{
			title: "Old Value",
			dataIndex: "old_value",
			key: "3",
			defaultSortOrder: "descend",
			className: "old_value_class",
			sorter: (a, b) => a.old_value.localeCompare(b.old_value)
		},
		{
			title: "New Value",
			dataIndex: "new_value",
			key: "3",
			defaultSortOrder: "descend",
			className: "old_value_class",
			sorter: (a, b) => {
				return a.new_value === null ||
					a.new_value === undefined ||
					a.new_value === ""
					? -1
					: b.new_value == null ||
						b.new_value == undefined ||
						b.new_value == ""
						? 1
						: a.new_value.toString().localeCompare(b.new_value);
			},
		},
		{
			title: "Reason For Change",
			dataIndex: "reason",
			key: "2",
			defaultSortOrder: "descend",
			sorter: (a, b) => a.reason.localeCompare(b.reason)
		},
		{
			title: "Changed On",
			dataIndex: "entry_date",
			key: "1",
			width: 200,
			defaultSortOrder: "descend",
			sorter: (a, b) => new Date(a.entry_date) - new Date(b.entry_date),
			render: (text) => moment(text).format("YYYY-MM-DD")
		},
		{
			title: "Table Name",
			dataIndex: "table_name",
			key: "4",
			defaultSortOrder: "descend",
			sorter: (a, b) => a.table_name.localeCompare(b.table_name)
		}
	]

	useEffect(() => {
		setInitialColumns(columns)
		auditHighlight();
		onAuditUserAndEventFilter();
	}, [])

	const onAuditUserAndEventFilter = async () => {
		let login_response = JSON.parse(localStorage.getItem("login_details"));
		let req = {};
		let headers = {
			"content-type": "application/json",
			"x-access-token": login_response.token ? login_response.token : "",
			"resource-name": "AUDIT_REPORT"
		};

		let res = await auditFilter(req, headers);
		if (res.statuscode != 200) {
			this.props.showNotification("error", res.Message);
		} else {
			setUserList(res.data[0].userid)
			setEventList(res.data[0].activity)
		}
	};

	// const loadData = (column) => {
	// 	this.setState({ colSort: column }, () => this.auditHighlight());
	// };

	const getExcelFile = (value) => {
		var today = new Date();
		today.setDate(today.getDate() + 1);
		let endPoint = "/services/v1/audit-information?";
		let baseUrl = MDH_APP_PYTHON_SERVICE + endPoint;
		let startDate =
			selectedDate.length > 0
				? selectedDate[0]
				: "2021-09-01";
		let endDate =
			selectedDate.length > 0
				? selectedDate[1]
				: today.toISOString().slice(0, 10);
		let tableName = ["Parameter Data"];
		let activity = eventType.value;
		let userid = user.value;

		const myUrlWithParams = new URL(baseUrl);
		if (startDate == endDate) {
			myUrlWithParams.searchParams.append("startdate", startDate);
		} else {
			myUrlWithParams.searchParams.append("startdate", startDate);
			myUrlWithParams.searchParams.append("enddate", endDate);
		}

		if (activity) {
			myUrlWithParams.searchParams.append("activity", activity);
		}
		if (userid) {
			myUrlWithParams.searchParams.append("userid", userid);
		}
		myUrlWithParams.searchParams.append("table_name", tableName);

		if (value == "excel") {
			myUrlWithParams.searchParams.append("export_csv", false);
		}
		if (value == "csv") {
			myUrlWithParams.searchParams.append("export_csv", true);
		}

		let url = myUrlWithParams.href;
		window.open(url);
	};

	const disabledDate = (current) => {
		// Can not select days before today and today
		return current && current > moment().endOf("day");
	};

	const auditHighlight = (limit = 500) => {
		var today = new Date();
		today.setDate(today.getDate() + 1);
		let req = {
			identification: "10.10.16.30",
			source_system: "cpv",
			transactionid: "20200813161038.066",
			startdate:
				selectedDate.length > 0 && selectedDate[0]
					? selectedDate[0]
					: "2021-09-01",
			enddate:
				selectedDate.length > 0 && selectedDate[1]
					? selectedDate[1]
					: today.toISOString().slice(0, 10),
			order_by_col: colSort,
			order_by_type: sortState
		};

		if (limit != 'all') {
			req['limit'] = parseInt(limit)
		}
		if (eventType) {
			req["activity"] = eventType ? eventType.value : "";
		}
		if (user) {
			req["username"] = user ? user.value : "";
		}

		auditDataChange(req).then((res) => {
			let antdDataTable = [];
			res.data.forEach((item, key) => {
				let antdObj = {};
				let val11 = item.delta.toString();
				antdObj["key"] = key;
				antdObj["user_id"] = item.user_id;
				antdObj["activity"] = item.activity;
				antdObj["old_value"] = item.old_value;
				antdObj["entry_date"] = item.entry_date;
				antdObj["table_name"] = item.table_name;
				antdObj["reason"] = item.reason;
				if (val11 === item.new_value) {
					antdObj["new_value"] = (
						<p style={{ background: "yellow" }}>{item.new_value}</p>
					);
				} else if (item.activity === "U" && item.delta.length > 0) {
					let val = "";
					item.delta.forEach((item1) => {
						if (val.length > 0) {
							let val1 = val.replace(
								item1,
								`<span style='background-color:yellow'>${item1}</span>`
							);
							val = val1;
						} else {
							let val1 = item.new_value.replace(
								item1,
								`<span style='background-color:yellow'>${item1}</span>`
							);
							val = val1;
						}
					});
					antdObj["new_value"] = (
						<p dangerouslySetInnerHTML={{ __html: val }}></p>
					);
				} else {
					antdObj["new_value"] = item.new_value;
				}
				antdDataTable.push(antdObj);
			});
			setTableData(antdDataTable)
			setDownloadData(tableData)
		});
	};


	const search = (value) => {
		const filterTables = tableData.filter((o) =>
			Object.keys(o).some((k) =>
				String(o[k]).toLowerCase().includes(value.toLowerCase())
			)
		);
		setFilterTable(filterTables)
	};


	/* istanbul ignore next */
	const onlimitChange = (value) => {
		console.log("valueal", value)
		if (value != undefined) {
			setSelectedLimit(value.value == 'all' ? value.value : parseInt(value.value))
			auditHighlight(value.value)
		} else {
			setSelectedLimit(value)
		}

	}

	const onChangeIng = (e, value) => {
		if (value !== null) {
			let userarr = [];
			userarr.push({
				field: "user_id",
				operator: "IN",
				value: [value.value.trim()]
			});
			setFilterIng(userarr);
			setType("user")
			setUser(value)
		}
	};

	const onChangePkg = (value) => {
		if (value !== null) {
			let arr = [];
			arr.push({
				field: "entry_date",
				operator: "Between",
				value: value
			});
			setFilterPkg(arr)
		}
	};

	const handleFilter = () => {
		setFilterTable(null)
		auditHighlight();
	};


	const handleClear = () => {
		// this.setState(
		// 	{
		// 		selectedBrand: "",
		// 		selectedProduct: "",
		// 		selectedQuestion: "",
		// 		selectedAns: "",
		// 		user: "",
		// 		daterange: [],
		// 		selectedDate: [],
		// 		eventType: "",
		// 		filterTable: null
		// 	},
		// 	() => auditHighlight()
		// );
	};

	/* istanbul ignore next */
	// const handleAutoCompleteChange = (state, evt, value) => {
	// 	if (evt) {
	// 		if (value === null) {
	// 			value = { label: "", value: "" };
	// 		} else {
	// 			this.setState({
	// 				user: value
	// 			});
	// 		}
	// 	}
	// };

	const optionsUser = userList.map((item, index) => (
		<Select.Option key={index} value={item.value}>
			{item.value}
		</Select.Option>
	));
	return (
		<div className="custom-wrapper">
			<BreadCrumbWrapper />
			<div className='custom-content-layout'>
				<div className='filter-layout'>
					<div className='filter-drop'>
						<p>Date</p>
						<RangePicker
							value={daterange}
							onChange={(e, value) => {
								setSelectedDate(value);
								setType("date");
								setDaterange(e);
								// onChangePkg(e, value);
							}}
							disabledDate={disabledDate}
						/>
					</div>
					<div className='filter-drop'>
						<SelectSearchField
							showSearch
							label='User *'
							placeholder='Select'
							onChangeSelect={value => onChangeIng(value, 'user')}
							//onSearchSelect={type => onSearchParam(type, 'user')}
							options={optionsUser}
							//handleClearSearch={e => clearSearch(e, 'plant')}

							selectedValue={user}
						/>

					</div>
					<div className="filter-btn">
						<Button
							className="custom-primary-btn "
							type="primary"
							onClick={() => {
								handleFilter();
							}}
						>
							Filter
						</Button>
						<Button
							className="custom-secondary-btn"
							type="primary"
							onClick={() => {
								handleClear();
							}}
						>
							Clear
						</Button>
					</div>
				</div>
				<div className="custom-table-card" style={{ margin: "10px 0" }}>
					<div className="table-header">
						<div
							style={{
								display: "flex",
								flexDirection: "row"
							}}
						>
							<Input.Search
								className="table-search"
								placeholder="Search by..."
								enterButton
								onSearch={search}
							/>
						</div>
						<div
							style={{

								float: "right",
								marginRight: "10px"
							}}
							className="limitDropdown"
						>
							<Select
								style={{
									marginLeft: "20px",
									width: "160px",
									marginTop: "10px",
									padding: "0px"
								}}
								allowClear
								// defaultValue={selectedLimit}value = { company || undefined }
								value={selectedLimit || undefined}
								placeholder="Limit"
								onChange={(e, value) => { onlimitChange(e, value) }}

							>

								<Option value="100" key="100">
									100
								</Option>
								<Option value="500" key="500">
									500
								</Option>
								<Option value="1000" key="1000">
									1000
								</Option>
								<Option value="10000" key="10000">
									10000
								</Option>
								<Option value="all" key="all">
									ALL
								</Option>

							</Select>

						</div>
						<div
							style={{
								marginTop: "10px",
								float: "right",
								marginRight: "10px"
							}}
						>
							<Dropdown style={{ color: "#ffffff" }} overlay={userMenu}>
								<Button
									className="custom-secondary-btn"
									type="primary"
								>
									Export
								</Button>
							</Dropdown>

						</div>
					</div>
					<Table
						style={{ margin: "20px" }}
						loading={loading}
						size="small"
						columns={columns}
						dataSource={filterTable === null ? tableData : filterTable}
						scroll={{ x: 400 }}
						pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '50', '100', '200'] }}
						bordered
					/>
				</div>
			</div>
		</div >
	)
}

export default UserTrail;