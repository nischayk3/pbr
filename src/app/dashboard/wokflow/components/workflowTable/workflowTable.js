import { SearchOutlined } from "@ant-design/icons";
import { Avatar, Button, Input, Space, Table } from "antd";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { useHistory } from "react-router-dom";
import "./styles.scss";

const WorkflowTable = (props) => {
	const [searchText, setSearchText] = useState("");
	const [searchedColumn, setSearchedColumn] = useState("");
	const [newColumns, setNewColumns] = useState([]);

	const refSearchInput = useRef();
	const history = useHistory();

	useEffect(() => {
		updateTableColumns();
	}, [props.columns]);

	const getColumnSearchProps = (
		dataIndex,
		searchInput,
		searchText,
		setSearchText,
		searchedColumn,
		setSearchedColumn
	) => ({
		filterDropdown: ({
			setSelectedKeys,
			selectedKeys,
			confirm,
			clearFilters,
		}) => (
			<div style={{ padding: 8 }}>
				<Input
					ref={(node) => (searchInput = node)}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={(e) =>
						setSelectedKeys(e.target.value ? [e.target.value] : [])
					}
					onPressEnter={() =>
						handleSearch(
							selectedKeys,
							confirm,
							dataIndex,
							setSearchText,
							setSearchedColumn
						)
					}
					style={{ display: "block", marginBottom: 8, width: 240 }}
				/>
				<Space>
					<Button
						type="primary"
						onClick={() =>
							handleSearch(
								selectedKeys,
								confirm,
								dataIndex,
								setSearchText,
								setSearchedColumn
							)
						}
						icon={<SearchOutlined />}
						size="small"
						style={{ width: 90 }}
					>
						Search
					</Button>
					<Button
						onClick={() => handleReset(clearFilters, setSearchText)}
						size="small"
						style={{ width: 90 }}
					>
						Reset
					</Button>
					<Button
						type="link"
						size="small"
						onClick={() => {
							/* istanbul ignore next */
							confirm({ closeDropdown: false });
							/* istanbul ignore next */
							setSearchText(selectedKeys[0]);
							/* istanbul ignore next */
							setSearchedColumn(dataIndex);
						}}
					>
						Filter
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered) => (
			<SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
		),
		/* istanbul ignore next */
		onFilter: (value, record) =>
			record[dataIndex]
				? record[dataIndex]
					.toString()
					.toLowerCase()
					.includes(value.toLowerCase())
				: "",
		/* istanbul ignore next */
		onFilterDropdownVisibleChange: (visible) => {
			/* istanbul ignore next */
			if (visible) {
				/* istanbul ignore next */
				setTimeout(() => searchInput.select(), 100);
			}
		},
		render: (text) =>
			searchedColumn === dataIndex ? (
				<Highlighter
					highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
					searchWords={[searchText]}
					autoEscape
					textToHighlight={text ? text.toString() : ""}
				/>
			) : (
				text
			),
	});

	/* istanbul ignore next */
	const handleSearch = (
		selectedKeys,
		confirm,
		dataIndex,
		setSearchText,
		setSearchedColumn
	) => {
		/* istanbul ignore next */
		confirm();
		/* istanbul ignore next */
		setSearchText(selectedKeys[0]);
		/* istanbul ignore next */
		setSearchedColumn(dataIndex);
	};

	/* istanbul ignore next */
	const handleReset = (clearFilters, setSearchText) => {
		clearFilters();
		setSearchText("");
	};

	const getRandomColor = (index) => {
		let colors = ["#56483F", "#728C69", "#c04000", "#c19578"];
		return colors[index % 4];
	};

	const updateTableColumns = () => {
		let columns = [];
		if (props.activeTab === "1") {
			props.columns.map((i) => {
				let { display_name, field_name } = i;

				if (i.visible) {
					let obj = {
						dataIndex: field_name,
						key: i.field_name,
						width:
							field_name == "Id" || field_name == "event_id" || field_name == "version"
								? "90px" : field_name == "created_by" ? "200px" : "165px",
						...getColumnSearchProps(
							field_name,
							refSearchInput,
							searchText,
							setSearchText,
							searchedColumn,
							setSearchedColumn
						),
						sorter: (a, b) => {
							return a[field_name] === null ||
								a[field_name] === undefined ||
								a[field_name] === ""
								? -1
								: b[field_name] == null ||
									b[field_name] == undefined ||
									b[field_name] == ""
									? 1
									: a[field_name].toString().localeCompare(b[field_name]);
						},
						title: display_name,
					};

					if (i.field_name === "appl_url") {
						obj.fixed = "left";
						obj.render = (text, row, index) => {
							if (text == "/dashboard/chart_personalization") {
								return (
									<a
										onClick={() =>
											history.push(
												`${text}/${row.Id}&${row.version}?id=${row.Id}&version=${row.version}`
											)
										}
										className="review-submission"
									>
										Review Submission
									</a>
								);
							} else if (text == "/dashboard/view_creation") {
								return (
									<a
										onClick={() =>
											history.push(
												`${text}/${row.Id}&${row.version}?id=${row.Id}&version=${row.version}&fromScreen=Workflow`
											)
										}
										className="review-submission"
									>
										Review Submission
									</a>
								);
							} else if (text == "/dashboard/paper_batch_records") {

								return (
									<a
										onClick={() =>
											history.push(
												`${text}/${row.Id}?id=${row.Id}&temp_disp_id=${row.Id}&file=${row.filename}&fromScreen=Workflow&version=${row.version}&tempalteName=${row.pbr_template_name}`
											)
										}
										className="review-submission"
									>
										Review Submission
									</a>
								);
							}
							else if (text == "/dashboard/elog_book_template") {
								return (
									<a
										onClick={() =>
											history.push(
												`/dashboard/elog_book_data_entry/data_entry_forms?id=${row.template_disp_id}&molecule=${row.molecule}&version=${row.version}&template_disp_id=${row.template_disp_id}&site=${row.site}&recording_id=${row.recording_id}&publish=true&fromScreen=Workflow`
											)
										}
										className="review-submission"
									>
										Review Submission
									</a>
								);
							} else if (text == "/dashboard/analysis") {
								return (
									<a
										onClick={() =>
											history.push(
												history.push(
													`${text}/${row.Id}`
												)
											)
										}
										className="review-submission"
									>
										Review Submission
									</a>
								);
							} else if (text == "/dashboard/elog_book_template") {
								return (
									<a
										onClick={() =>
											history.push(
												history.push(
													`${text}/${row.template_disp_id}&${row.version}?id=${row.template_disp_id}&version=${row.version}`
												)
											)
										}
										className="review-submission"
									>
										Review Submission
									</a>
								);
							} else {
								return (
									<a
										onClick={() =>
											history.push(
												`${text}/${row.Id}?id=${row.Id}&version=${row.version ? row.version : "0"
												}`
											)
										}
										className="review-submission"
									>
										Review Submission
									</a>
								);
							}
						};
					}

					if (i.field_name === "created_by") {
						obj.render = (text, row, index) => {
							return (
								<div className="creator">
									<Avatar
										className="avatar-icon"
										style={{ backgroundColor: getRandomColor(index + 1) }}
									>
										{text.split("")[0].toUpperCase()}{" "}
									</Avatar>
									<span className="avatar-text">{text}</span>
								</div>
							);
						};
					}

					if (i.field_name === "created_on") {
						obj.render = (text, row, index) => {
							return <>{moment(text.split("T")[0]).format("DD/MM/YYYY")}</>;
						};
					}
					columns.push(obj);
				}
			});
		} else {
			props.columns.map((i) => {
				let { display_name, field_name } = i;

				if (i.visible) {
					let obj = {
						dataIndex: field_name,
						key: i.field_name,
						width: "165px",
						...getColumnSearchProps(
							field_name,
							refSearchInput,
							searchText,
							setSearchText,
							searchedColumn,
							setSearchedColumn
						),
						sorter: (a, b) => {
							return a[field_name] === null ||
								a[field_name] === undefined ||
								a[field_name] === ""
								? -1
								: b[field_name] == null ||
									b[field_name] == undefined ||
									b[field_name] == ""
									? 1
									: a[field_name].toString().localeCompare(b[field_name]);
						},
						title: display_name,
					};

					if (i.field_name === "created_by") {
						obj.render = (text, row, index) => {
							return (
								<div>
									<Avatar
										className="avatar-icon"
										style={{ backgroundColor: getRandomColor(index + 1) }}
									>
										{text.split("")[0].toUpperCase()}{" "}
									</Avatar>
									<span className="avatar-text">{text}</span>
								</div>
							);
						};
					}

					if (i.field_name === "created_on") {
						obj.render = (text, row, index) => {
							return <>{moment(text.split("T")[0]).format("DD/MM/YYYY")}</>;
						};
					}
					columns.push(obj);
				}
			});
		}
		setNewColumns(columns);
	};

	return (
		<div className="workflow-table">
			<Table
				className="approval-table"
				columns={newColumns}
				dataSource={props.dataSource}
				style={{ border: "1px solid #ececec", borderRadius: "2px" }}
				pagination={false}
				scroll={{ x: 500, y: 300 }}
			/>
		</div>
	);
}

export default WorkflowTable;
