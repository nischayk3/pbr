/**
 * @author Dinesh
 * @Mareana - CPV Product
 * @version  1
 * @Last Modified - 05 Aug, 2022
 * @Last Changed By - Dinesh
 */

import {
	Button, Input,
	Menu,
	Select, Table
} from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import BreadCrumbWrapper from "../../../../components/BreadCrumbWrapper";
import SelectSearchField from "../../../../components/SelectSearchField/SelectSearchField";
import { MDH_APP_PYTHON_SERVICE } from "../../../../constants/apiBaseUrl";
import {
	auditFilter
} from "../../../../duck/actions/auditTrialAction";
import { getUserSessions } from "../../../../services/userTrail";
import "./style.scss";



const UserTrail = () => {

	const { Option } = Select;


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
	const [selectedLimit, setSelectedLimit] = useState("500");
	const [filterIng, setFilterIng] = useState();
	const [type, setType] = useState();
	const [filterPkg, setFilterPkg] = useState();
	const [filterTable, setFilterTable] = useState(null);
	const [daterange, setDaterange] = useState([]);
	const [eventType, setEventType] = useState("");
	const [loading, setLoading] = useState(false);
	const [selectedDate, setSelectedDate] = useState("");
	const [sortState, setSortState] = useState("DESC");
	const [user, setUser] = useState("");


	const columns = [
		{
			title: "ID",
			dataIndex: "id",
			key: "1",
			defaultSortOrder: "descend",
			//sorter: (a, b) => a.id.localeCompare(b.id)
		},
		{
			title: "User Id",
			dataIndex: "user_id",
			key: "2",
			defaultSortOrder: "descend",
			//sorter: (a, b) => a.user_id.localeCompare(b.user_id)
		},
		{
			title: "Session Type",
			dataIndex: "session_type",
			key: "3",
			defaultSortOrder: "descend",
			//sorter: (a, b) => a.session_type.localeCompare(b.session_type)
		},
		{
			title: "Date & Time",
			dataIndex: "session_timestamp",
			key: "4",
			defaultSortOrder: "descend",
			render: (text) => moment(text).format("DD-MM-YYYY HH:mm:ss")
			//sorter: (a, b) => a.session_timestamp.localeCompare(b.session_timestamp)
		},
		// {
		// 	title: "cust_key",
		// 	dataIndex: "cust_key",
		// 	key: "5",
		// 	defaultSortOrder: "descend",
		// 	sorter: (a, b) => a.cust_key.localeCompare(b.cust_key)
		// },

	]

	useEffect(() => {
		const _req = {
			limit: 500
		}
		setInitialColumns(columns)
		auditHighlight(_req);
		onAuditUserAndEventFilter();
	}, [])

	const onAuditUserAndEventFilter = async () => {
		let login_response = JSON.parse(localStorage.getItem("login_details"));
		let req = {};
		let headers = {
			"content-type": "application/json",
			"x-access-token": login_response.token ? login_response.token : "",
			"resource-name": "USER_REPORT"
		};

		let res = await auditFilter(req, headers);
		if (res.statuscode != 200) {
			showNotification("error", res.Message);
		} else {
			setUserList(res.data[0].userid)
			setEventList(res.data[0].activity)
		}
	};


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


	const auditHighlight = (_req) => {
		getUserSessions(_req).then((res) => {
			if (res.Status === 200) {
				let antdDataTable = [];

				res.Data.forEach((item) => {
					let antdObj = {};
					antdObj["user_id"] = item.user_id;
					antdObj["id"] = item.id;
					antdObj["cust_key"] = item.cust_key;
					antdObj["session_timestamp"] = item.session_timestamp;
					antdObj["session_type"] = item.session_type;
					antdDataTable.push(antdObj);
				});
				console.log("antdDataTable", antdDataTable);
				setTableData(antdDataTable)
				setDownloadData(tableData)
			} else {
				showNotification("error", res.Message);
			}

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
		if (value != undefined) {
			setSelectedLimit(value == 'all' ? value : parseInt(value))
			const _valueReq = {
				limit: value,
				user: user
			}
			auditHighlight(_valueReq)
		} else {
			setSelectedLimit(value)
		}

	}

	const onChangeIng = (value, filterType) => {
		if (value !== null) {
			let userarr = [];
			userarr.push({
				field: "user_id",
				operator: "IN",
				value: [value.trim()]
			});
			setFilterIng(userarr);
			setType(filterType)
			setUser(value)
		}
	};



	const handleFilter = () => {
		const _reqFilter = {
			limit: selectedLimit,
			user_id: user
		}
		setFilterTable(null)
		auditHighlight(_reqFilter);
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

	console.log("tableData", tableData);
	return (
		<div className="custom-wrapper">
			<BreadCrumbWrapper />
			<div className='custom-content-layout'>
				<div className='filter-layout'>

					<div className='filter-drop'>
						<SelectSearchField
							showSearch
							label='User *'
							placeholder='Select'
							onChangeSelect={value => onChangeIng(value, 'user')}
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
							className="child-1"
						>
							<Input.Search
								className="table-search"
								placeholder="Search by..."
								enterButton
								onSearch={search}
							/>
						</div>
						<div
							className="child-2"
						>
							<Select

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
						{/* <div
							className="child-3"
						>
							<Dropdown style={{ color: "#ffffff" }} overlay={userMenu}>
								<Button
									className="custom-secondary-btn"
									type="primary"
								>
									Export
								</Button>
							</Dropdown>
						</div> */}
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