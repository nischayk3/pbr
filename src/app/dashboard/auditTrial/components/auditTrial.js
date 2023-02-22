import {
	Button,
	DatePicker,
	Dropdown,
	Input,
	Menu, Modal, Select, Table
} from "antd";
import axios from "axios";
import moment from "moment";
import React from "react";
import { connect } from "react-redux";
import BreadCrumbWrapper from "../../../../components/BreadCrumbWrapper";
import { BMS_APP_PYTHON_SERVICE } from "../../../../constants/apiBaseUrl";
import {
	auditDataChange,
	auditFilter, eSignDetails, reportDownload
} from "../../../../duck/actions/auditTrialAction";
import { showNotification } from "../../../../duck/actions/commonActions";
import "./styles.scss";

const { Option } = Select;

class AuditTrials extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			resData: {},
			dates: [],
			hackValue: [],
			esignDetailsData: [],
			setValue: [],
			brandList: [],
			eventType: "",
			productList: [],
			columnConfig: [],
			questionList: [],
			eventList: [],
			brandListPkg: [],
			productListPkg: [],
			questionListPkg: [],
			selectedLimit: "500",
			esignOpen: false,
			orderSort: {
				old_value: 0,
				activity: 0,
				user_id: 0,
				entry_date: 0,
				table_name: 0,
				esign_id: 0
			},
			sortState: "DESC",
			tableData: [],
			userList: [],
			filterIng: [],
			filterPkg: [],
			type: "",
			dataGrid: {
				columns: [],
				rows: [],
				totalRecord: null,
				pageNumber: 0,
				pageOffset: null,
				selectedIndexes: []
			},
			tableDataPackaging: [],
			ansList: [
				{ value: "Yes", label: "Yes" },
				{ value: "No", label: "No" }
			],
			ansListPkg: [
				{ value: "Yes", label: "Yes" },
				{ value: "No", label: "No" }
			],
			selectedBrand: "",
			selectedProduct: "",
			selectedQuestion: "",
			selectedBrandPkg: "",
			selectedProductPkg: "",
			selectedQuestionPkg: "",
			selectedAns: "",
			selectedAnsPkg: "",
			searchText: "",
			colSort: "entry_date",
			searchedColumn: "",
			filterTable: null,
			searchText1: "",
			searchedColumn1: "",
			filterTable1: null,
			value: false,
			checkedColumns: [],
			visibleMenuSettings: false,
			user: "",
			daterange: [],
			downloadData: [],
			esignColumns: [
				{
					title: "Application Screen",
					dataIndex: "application_screen",
					key: "1",
					sorter: (a, b) => a.application_screen.localeCompare(b.application_screen)
				},
				{
					title: "Created By",
					dataIndex: "created_by",
					key: "1",
					sorter: (a, b) => a.created_by.localeCompare(b.created_by)
				}, {
					title: "First Name",
					dataIndex: "first_name",
					key: "1",
					sorter: (a, b) => a.first_name.localeCompare(b.first_name)
				},
				{
					title: "Last Name",
					dataIndex: "last_name",
					key: "1",
					sorter: (a, b) => a.last_name.localeCompare(b.last_name)
				}, {
					title: "User",
					dataIndex: "user_id",
					key: "1",
					sorter: (a, b) => a.user_id.localeCompare(b.user_id)
				}, {
					title: "Sign Date",
					dataIndex: "sign_date",
					key: "1",
					sorter: (a, b) => a.user_id.localeCompare(b.user_id),
					render: (text) => moment(text).format("DD-MM-YYYY HH:mm:ss")

				},
			],
			columns: [
				{
					title: "User",
					dataIndex: "user_id",
					key: "1",
					sorter: (a, b) => a.user_id.localeCompare(b.user_id)
				},
				{
					title: "Event",
					dataIndex: "activity",
					key: "2",
					sorter: (a, b) => a.activity.localeCompare(b.activity)
				},
				{
					title: "Old Value",
					dataIndex: "old_value",
					key: "3",
					className: "old_value_class",
					sorter: (a, b) => a.old_value.localeCompare(b.old_value)
				},
				{
					title: "New Value",
					dataIndex: "new_value",
					key: "4",
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
					title: "Changed Fields",
					dataIndex: "changed_fields",
					key: "9",
					sorter: (a, b) => a?.changed_fields?.localeCompare(b.changed_fields)
				},
				{
					title: "Reason For Change",
					dataIndex: "reason",
					key: "5",
					sorter: (a, b) => a.reason.localeCompare(b.reason)
				},
				{
					title: "Changed On",
					dataIndex: "entry_date",
					key: "6",
					width: 200,
					sorter: (a, b) => new Date(b.entry_date) - new Date(a.entry_date),
					render: (text) => moment(text).format("DD-MM-YYYY HH:mm:ss")
				},
				{
					title: "Table Name",
					dataIndex: "table_name",
					key: "7",
					sorter: (a, b) => a.table_name.localeCompare(b.table_name)
				}, {
					title: "Table Id",
					dataIndex: "table_disp_key",
					key: "8",
					sorter: (a, b) => a.table_disp_key.localeCompare(b.table_disp_key)
				},
				{
					title: "Esign ID",
					dataIndex: "esign_id",
					key: "8",
					sorter: (a, b) => a.esign_id.localeCompare(b.esign_id),
					render: (text) => text == "None" ? text : <Button style={{
						backgroundColor: "#093185",
						color: "#ffffff",
						borderRadius: '4px',
						border: '1px solid #093185'
					}}
						type="primary"
						onClick={() => this.getEsignDetail(text)}
					>Esign details</Button>
				}
			],
			initialColumns: []
		};
	}

	componentDidMount() {
		this.setState({ initialColumns: this.state.columns });
		this.auditHighlight();
		this.onAuditUserAndEventFilter();
	}

	onAuditUserAndEventFilter = async () => {
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
			this.setState({
				userList: res.data[0].userid,
				eventList: res.data[0].activity
			});
		}
	};

	loadData = (column) => {
		this.setState({ colSort: column }, () => this.auditHighlight());
	};

	reportDownloadExcel = (reportType) => {
		let _reportReq = {
			type: reportType,
			data: this.state.resData
		}

		if (reportType === "CSV") {
			reportDownload(_reportReq).then((res) => {
				const url = window.URL.createObjectURL(new Blob([res]));
				const a = document.createElement('a');
				a.href = url;
				a.download = "download.csv"
				document.body.appendChild(a);
				a.click();
				window.URL.revokeObjectURL(url);
			})
		} else if (reportType === "Excel") {
			axios
				.post(BMS_APP_PYTHON_SERVICE + '/report_download', _reportReq, {
					responseType: 'arraybuffer',
				})
				.then(response => {
					const blob = new Blob([response.data], { type: 'application/octet-stream' });
					const url = window.URL.createObjectURL(blob);
					const a = document.createElement('a');
					a.href = url;
					a.download = "report.xlsx"
					document.body.appendChild(a);
					a.click();
					window.URL.revokeObjectURL(url);
				});
		} else if (reportType === "PDF") {
			axios
				.post(BMS_APP_PYTHON_SERVICE + '/report_download', _reportReq, {
					responseType: 'arraybuffer',
				})
				.then(response => {
					const blob = new Blob([response.data], { type: 'application/pdf' });
					const url = window.URL.createObjectURL(blob);
					const a = document.createElement('a');
					a.href = url;
					a.download = "report.pdf"
					document.body.appendChild(a);
					a.click();
					window.URL.revokeObjectURL(url);
				});
		} else {
			console.log(reportType);
		}


	}

	disabledDate = (current) => {
		if (!this.state.dates) {
			return false;
		}
		const tooLate = this.state.dates[0] && current.diff(this.state.dates[0], 'days') > 90;
		const tooEarly = this.state.dates[1] && this.state.dates[1].diff(current, 'days') > 90;
		return !!tooEarly || !!tooLate;
	};

	getEsignDetail = async (esign_id_req) => {
		this.setState({ esignOpen: true })
		let login_response = JSON.parse(localStorage.getItem("login_details"));
		let headers = {
			"content-type": "application/json",
			"x-access-token": login_response.token ? login_response.token : "",
			"resource-name": "AUDIT_REPORT"
		};
		let req = {
			esign_id: esign_id_req
		}
		let esign_details_data = await eSignDetails(req, headers)
		if (esign_details_data.statuscode == 200) {
			this.setState({ esignDetailsData: [esign_details_data.message] })
		}
		else {
			this.setState({ esignDetailsData: [] })
		}
	}
	onOpenChange = (open) => {
		if (open) {
			this.setState({
				dates: [null, null],
				hackValue: [null, null]
			})
		} else {
			this.setState({ hackValue: [null] })
		}
	};

	auditHighlight = (limit = 500) => {
		var today = new Date();
		today.setDate(today.getDate() + 1);
		let req = {
			identification: "10.10.16.30",
			source_system: "cpv",
			transactionid: "20200813161038.066",
			startdate:
				this.state.setValue.length > 0 && this.state.setValue[0]
					? moment(this.state.setValue[0]).format("YYYY-MM-DD")
					: "2022-09-01",
			enddate:
				this.state.setValue.length > 0 && this.state.setValue[1]
					? moment(this.state.setValue[1]).format("YYYY-MM-DD")
					: today.toISOString().slice(0, 10),
			order_by_col: this.state.colSort,
			order_by_type: this.state.sortState
		};

		if (limit != 'all') {
			req['limit'] = parseInt(limit)
		}
		if (this.state.eventType) {
			req["activity"] = this.state.eventType ? this.state.eventType.value : "";
		}
		if (this.state.user) {
			req["username"] = this.state.user ? this.state.user.value : "";
		}

		auditDataChange(req).then((res) => {
			let antdDataTable = [];
			this.setState({
				resData: res.data
			})
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
				antdObj["table_disp_key"] = item.table_disp_key;
				antdObj["esign_id"] = item.esign_id;
				antdObj["changed_fields"] = item.changed_fields;
				if (val11 === item.new_value) {
					antdObj["new_value"] = (
						<p className="highlight">{item.new_value}</p>
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
			this.setState({
				tableData: antdDataTable,
				downloadData: this.state.tableData
			});
		});
	};



	search = (value) => {
		const { tableData } = this.state;
		const filterTable = tableData.filter((o) =>
			Object.keys(o).some((k) =>
				String(o[k]).toLowerCase().includes(value.toLowerCase())
			)
		);
		this.setState({ filterTable });
	};

	/* istanbul ignore next */
	onlimitChange = (e, value) => {
		if (value != undefined) {
			this.setState({
				selectedLimit: value.value == 'all' ? value.value : parseInt(value.value)
			})
			this.auditHighlight(value.value)
		} else {
			this.setState({
				selectedLimit: value
			})
		}
	}

	onChangeIng = (e, value) => {
		if (value !== null) {
			let userarr = [];
			userarr.push({
				field: "user_id",
				operator: "IN",
				value: [value.value.trim()]
			});
			this.setState({
				filterIng: userarr,
				type: "user",
				user: value
			})

		}
	};

	onChangePkg = (e, value) => {
		if (value !== null) {
			let arr = [];

			arr.push({
				field: "entry_date",
				operator: "Between",
				value: value
			});
			this.setState({ filterPkg: arr });
		}
	};

	handleFilter = () => {
		this.setState({ filterTable: null });
		this.auditHighlight();
	};


	handleClear = () => {
		this.setState(
			{
				selectedBrand: "",
				selectedProduct: "",
				selectedQuestion: "",
				selectedAns: "",
				user: "",
				daterange: [],
				eventType: "",
				filterTable: null,
				dates: [],
				hackValue: [],
				setValue: [],
			},
			() => this.auditHighlight()
		);
	};

	render() {
		console.log("esignOpen", this.state.esignOpen);
		const { RangePicker } = DatePicker;
		const { filterTable, tableData, columns } = this.state;
		const { esignColumns, esignDetailsData } = this.state;


		const userMenu = (
			<Menu>

				<Menu.Item key="1" onClick={() => this.reportDownloadExcel("Excel")}>
					Excel
				</Menu.Item>
				<Menu.Divider />
				<Menu.Item key="2" onClick={() => this.reportDownloadExcel("CSV")}>
					CSV
				</Menu.Item>
				<Menu.Item key="3" onClick={() => this.reportDownloadExcel("PDF")}>
					PDF
				</Menu.Item>
			</Menu>
		);
		return (
			<div className="custom-wrapper">
				<BreadCrumbWrapper />
				<div className='custom-content-layout'>
					<div className="divFilterDrop bg-white">
						<div className="filter-header"  >
							<div className="divFilter">
								<div>
									<p>Date</p>
									<RangePicker
										value={this.state.setValue}
										onChange={(value) => {
											this.setState({
												setValue: value
											});
											this.onChangePkg(value);
										}}
										disabledDate={this.disabledDate}
										onOpenChange={this.onOpenChange}
										onCalendarChange={(val) => this.setState({ dates: val })}
										renderExtraFooter={() => 'User can view maximum 3month data'}
									/>
								</div>
								<div>
									<p>User</p>
									<Select
										showSearch
										style={{
											width: "100%",

										}}
										placeholder="User"
										onChange={(e, value) => { this.onChangeIng(e, value, "user") }}
										value={this.state.user}
									>
										{this.state.userList &&
											this.state.userList.map((item, i) => {
												return (
													<Option value={item.value} key={i}>
														{item.value}
													</Option>
												);
											})}
									</Select>
								</div>
								<div>
									<p>Event Type</p>
									<Select
										style={{ width: "100%" }}
										placeholder="Event"
										onChange={(e, value) => {
											return this.setState({
												eventType: value
											});
										}}
										value={this.state.eventType}
									>
										{this.state.eventList &&
											this.state.eventList.map((item, i) => {
												return (
													<Option value={item.value} key={i}>
														{item.value}
													</Option>
												);
											})}
									</Select>
								</div>

								<Button
									className="custom-primary-btn "
									type="primary"
									onClick={() => {
										this.handleFilter();
									}}
								>
									Run
								</Button>
								<Button
									className="custom-secondary-btn"
									type="primary"
									onClick={() => {
										this.handleClear();
									}}
								>
									Clear
								</Button>
							</div>
						</div>

						<div className="custom-table-card" style={{ margin: "10px 0" }}>
							<div className="table-header">
								<div>
									<p>Audit Trail Report</p>
								</div>
								<div
									style={{
										// marginLeft: "100px",
										display: "flex",
										flexDirection: "row"
									}}
								>
									<Input.Search
										className="table-search"
										placeholder="Search by..."
										enterButton
										onSearch={this.search}
									/>
								</div>
								<div
									style={{
										// marginTop: "10px",
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
										// defaultValue={this.state.selectedLimit}value = { this.state.company || undefined }
										value={this.state.selectedLimit || undefined}
										placeholder="Limit"
										onChange={(e, value) => { this.onlimitChange(e, value) }}

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
									<Dropdown style={{ color: "#ffffff" }} overlay={userMenu} disabled={tableData.length > 0 ? false : true} >
										<Button
											type="primary"
										>
											Export
										</Button>
									</Dropdown>

								</div>
							</div>
							<Table
								style={{ margin: "20px" }}
								loading={this.state.loading}
								size="small"
								columns={columns}
								dataSource={filterTable === null ? tableData : filterTable}
								scroll={{ x: 400 }}
								pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '50', '100', '200'] }}
								bordered
							/>
							<Modal
								className="dinesh"
								open={this.state.esignOpen}
								title="Esign Details"
								onCancel={() => this.setState({ esignOpen: false })}
								footer={false}
							>{esignDetailsData && esignDetailsData.length > 0 ?
								<Table
									columns={esignColumns}
									size="small"
									dataSource={esignDetailsData}
									scroll={{ x: 400 }}
									pagination={false}
									bordered
								/> : (<></>)}

							</Modal>
						</div>
					</div>
				</div>
			</div >
		);
	}
}

const mapDispatchToProps = {
	showNotification
};

export default connect(null, mapDispatchToProps)(AuditTrials);
