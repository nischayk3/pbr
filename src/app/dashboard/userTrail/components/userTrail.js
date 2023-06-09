/**
 * @author Dinesh
 * @Mareana - CPV Product
 * @version  1
 * @Last Modified - 05 Aug, 2022
 * @Last Changed By - Dinesh
 */

import {
	Button, Input, Select, Table
} from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import BreadCrumbWrapper from "../../../../components/BreadCrumbWrapper";
import SelectSearchField from "../../../../components/SelectSearchField/SelectSearchField";
import {
	auditFilter
} from "../../../../duck/actions/auditTrialAction";
import { showNotification } from "../../../../duck/actions/commonActions";
import { getUserSessions } from "../../../../services/userTrail";
import "./style.scss";



const UserTrail = () => {
	const { Option } = Select;
	const [userList, setUserList] = useState([]);
	const [tableData, setTableData] = useState([]);
	const [selectedLimit, setSelectedLimit] = useState("500");
	const [filterTable, setFilterTable] = useState(null);
	const [user, setUser] = useState("");

	const columns = [
		{
			title: "ID",
			dataIndex: "id",
			key: "1",
			defaultSortOrder: "descend",
		},
		{
			title: "User Id",
			dataIndex: "user_id",
			key: "2",
			defaultSortOrder: "descend",
		},
		{
			title: "Session Type",
			dataIndex: "login_type",
			key: "3",
			defaultSortOrder: "descend",
		},
		{
			title: "Date & Time",
			dataIndex: "login_timestamp",
			key: "4",
			defaultSortOrder: "descend",
			render: (text) => moment(text).format("DD-MM-YYYY HH:mm:ss")
		},
		{
			title: "TimeSpent(in min)",
			dataIndex: "TimeSpent",
			key: "5",
			defaultSortOrder: "descend",
		},
	]

	useEffect(() => {
		const _req = {
			limit: 500
		}
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
		if (res?.statuscode != 200) {
			showNotification("error", res.Message);
		} else {
			setUserList(res.data[0].userid)
		}
	};

	const auditHighlight = (_req) => {
		getUserSessions(_req).then((res) => {
			if (res.Status === 200) {
				let antdDataTable = [];
				res.Data.forEach((item) => {
					let antdObj = {};
					antdObj["user_id"] = item.user_id;
					antdObj["id"] = item.id;
					antdObj["TimeSpent"] = item.TimeSpent;
					antdObj["login_timestamp"] = item.login_timestamp;
					antdObj["login_type"] = item.login_type;
					antdDataTable.push(antdObj);
				});
				setTableData(antdDataTable)
				// setDownloadData(tableData)
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
			// setFilterIng(userarr);
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
		const _req = {
			limit: 500
		}
		setUser("")
		setSelectedLimit("500")
		auditHighlight(_req);
	};

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
						<div className="child-1">
							<Input.Search
								className="table-search"
								placeholder="Search by..."
								enterButton
								onSearch={search}
							/>
						</div>
						<div className="child-2">
							<Select
								allowClear
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
					</div>
					<Table
						style={{ margin: "20px" }}
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