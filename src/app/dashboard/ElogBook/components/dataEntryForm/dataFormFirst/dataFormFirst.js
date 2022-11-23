import { DeleteTwoTone, PlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, Input, Modal, Select, Switch, Table } from "antd";
import { Component } from "react";
import { connect } from "react-redux";
import { v1 as uuid } from "uuid";
import {
	hideLoader, showLoader, showNotification
} from "../../../../../../duck/actions/commonActions";
import {
	addRow, adjustColumnWidths, changeInput,
	changeSelectInput,
	changeToggleInput, checkDeleteButtonDisabledState, deleteRow, deleteRowCheck, EditableCell, EditableRow, selectAllRowsForDeletion
} from "../../../../../../utils/editableTableHelper";
import { DynamicFormComponent } from "../../dynamicForm/dynamicFormComponent";


const { Option } = Select;
const { Search } = Input;

class DataFormFirst extends Component {
	state = {
		tableDataChanged: false,
		deleteActionColumnAdded: false,
		rowsMarkedForDeletion: false,
		visible: false,
		confirmLoading: false,
		currentPage: 1,
		dataSourcePer: [],
		searchValue: '',
		tableColumns: [
			{
				"align": "center",
				"dataIndex": "key",
				"editable": false,
				"label": "Key",
				"name": "key",
				"title": "key",
				"type": "parent"
			},
			{
				"align": "center",
				"dataIndex": "value",
				"editable": false,
				"label": "Value",
				"name": "value",
				"title": "Value",
				"type": "input",
				render: (_, record) => {
					return (
						<Input placeholder="Enter " key={record.key} value={record.name} onChange={this.onChangeTable} />
					);

				}
			},
			{
				"align": "center",
				"dataIndex": "sub_value",
				"editable": false,
				"label": "Sub value",
				"name": "sub_value",
				"title": "Sub value",
				"type": "parent"
			}
		],
		tableDataSource: [
			{
				"key": "Batch",
				"value": "",
				"sub_value": "Sub_value",
			},
			{
				"key": "Process Step",
				"value": "",
				"sub_value": "Sub_value",

			}
		]
	};

	componentDidMount() {
		this.loadTableData();
	}

	loadTableData = async () => {
		this.props.showLoader();
		try {
			// const response = await this.props.getTableData();
			const response = await this.props.getTableData;
			const { rowInitialData, dataSource, deleteActionColumn, columns } = response.table;
			const { formDetails } = response.form;
			this.setState(
				{
					rowInitialData,
					dataSource,
					count: dataSource.length,
					deleteActionColumn,
					columns,
					formDetails
				},
				() => {
					this.initializeTableRender();
				}
			);
		} catch (err) {
			this.props.showNotification("error", err.message);
		} finally {
			this.props.hideLoader();
		}
	};

	initializeTableRender() {
		const {
			dataSource,
			deleteActionColumn,
			deleteActionColumnAdded,
			columns: columnsCopy,

		} = this.state;
		dataSource.forEach((data) => {
			data.key = uuid();
			data.deleteRowChecked = false;
		});
		this.setState({ dataSourcePer: JSON.parse(JSON.stringify(dataSource)) });
		const columns =
			deleteActionColumn && !deleteActionColumnAdded
				? this.addDeleteActionColumn(columnsCopy)
				: columnsCopy;
		columns.forEach((data) => (data.key = uuid()));
		adjustColumnWidths(columns);

		this.renderTableColumns(columns);
		this.setState({ columns });
	}

	setFormData = (data) => {
		this.setState({ formDetails: data })
	}

	//function to handle search
	// searchTable = (value) => {
	// 	const filterData = this.state.dataSourcePer.filter((o) =>
	// 		Object.keys(o).some((k) =>
	// 			String(o[k]).toLowerCase().includes(this.state.searchValue.toLowerCase())
	// 		)
	// 	);
	// 	this.setState({ dataSource: filterData })
	// };

	// onChangeSearchValue = (e) => {
	// 	if (!e.target.value) {
	// 		this.setState({ dataSource: JSON.parse(JSON.stringify(this.state.dataSourcePer)) })
	// 	}
	// 	this.setState({ searchValue: e.target.value })
	// }



	renderTableColumns = (columns) => {
		columns.forEach((column) => {
			switch (column.type) {
				case "select":
					return (column.render = (_, record) => {
						return (
							<Select
								key={record.key}
								value={record[column.name]}
								mode={column.mode}
								style={{ width: "100%" }}
								onChange={(selectedValue) =>
									this.onChangeSelect(selectedValue, record, column)
								}
							>
								{column.options.map((option, i) => (
									<Option key={i} value={option.value}>
										{option.label}
									</Option>
								))}
							</Select>
						);
					});
				case "toggle":
					return (column.render = (_, record) => {
						return (
							<Switch
								key={record.key}
								checked={record[column.name]}
								checkedChildren={column.toggleTextTrue}
								unCheckedChildren={column.toggleTextFalse}
								className="editable-table--switch__color"
								onChange={(selectedValue) =>
									this.onChangeToggle(selectedValue, record, column)
								}
							/>
						);
					});

				case "input":
					return (column.render = (_, record) => {
						return (
							<Input placeholder="Enter value" key={record.key} value={record[column.name]} onChange={this.onChangeTable} />
						);
					});

				case "parent":
					this.renderTableColumns(column.children);
			}
		});
	};



	addDeleteActionColumn = (columns) => {
		this.setState({ deleteActionColumnAdded: true });
		const actionColumn = {
			title: (
				<Checkbox
					name="selectAll"
					key={uuid()}
					onChange={this.onSelectAllRowsForDeletion}
				></Checkbox>
			),
			dataIndex: "action",
			align: "center",
			type: "action_delete",
			render: (_, record, i) => {
				return this.state.dataSource.length >= 1 ? (
					<Checkbox
						name={record.key}
						checked={record.deleteRowChecked}
						key={i}
						onChange={this.onDeleteRowCheck}
					></Checkbox>
				) : null;
			},
		};
		columns.unshift(actionColumn);
		adjustColumnWidths(columns);
		return columns;
	};

	onSelectAllRowsForDeletion = (e) => {
		const dataSource = selectAllRowsForDeletion(
			e.target.checked,
			this.state.dataSource
		);
		this.setState({ dataSource }, () => {
			const rowsMarkedForDeletion = checkDeleteButtonDisabledState(
				this.state.dataSource
			);
			this.setState({ rowsMarkedForDeletion });
		});
	};

	onDeleteRowCheck = (e) => {
		const { name, checked } = e.target;
		const dataSource = deleteRowCheck(name, checked, this.state.dataSource);
		this.setState({ dataSource }, () => {
			const rowsMarkedForDeletion = checkDeleteButtonDisabledState(
				this.state.dataSource
			);
			this.setState({ rowsMarkedForDeletion });
		});
	};

	handleOk = async () => {
		this.setState({ visible: false });
		const rowsToDelete = [];
		this.state.dataSource.forEach((row) => {
			if (row.deleteRowChecked) rowsToDelete.push(row);
		});
		this.props.showLoader();
		try {
			await this.props.deleteTableRow(rowsToDelete);
			const { dataSource, count } = deleteRow(rowsToDelete, this.state);
			this.setState({ dataSource, count, rowsMarkedForDeletion: false });
		} catch (err) {
			this.props.showNotification("error", err.message);
		} finally {
			this.props.hideLoader();
		}
	};

	handleCancel = () => this.setState({ visible: false });

	onDeleteRows = () => this.setState({ visible: true });

	onAddRow = () => {
		const { dataSource, count } = addRow(this.state);
		console.log("dataSource", dataSource, this.state.tableDataChanged);
		this.setState({ currentPage: 1 });
		this.setState({ dataSource, count }, () => {
			this.initializeTableRender();
			this.setState({ tableDataChanged: true });
		});
	};

	onChangeInput = (row) => {
		console.log("rowwwwwwwwwww", row);
		const dataSource = changeInput(row, this.state);
		console.log("dataSource", dataSource);
		this.setState({ dataSource, tableDataChanged: true });
	};

	onChangeTable = (row) => {
		console.log("rowwwwwwwwwww", row.target);
		const dataSource = changeInput(row, this.state);
		console.log("dataSource", dataSource);
		this.setState({ dataSource, tableDataChanged: true });
	};

	onChangeSelect = (selectedValue, record, column) => {
		const dataSource = changeSelectInput(
			selectedValue,
			record,
			column,
			this.state
		);
		this.setState({ dataSource, tableDataChanged: true });
	};

	onChangeToggle = (selectedValue, record, column) => {
		const dataSource = changeToggleInput(
			selectedValue,
			record,
			column,
			this.state
		);
		this.setState({ dataSource, tableDataChanged: true });
	};

	onChangeCurrentPage = (page) => {
		this.setState({ currentPage: page });
	}

	onSaveTable = async () => {

		const tableData = JSON.parse(JSON.stringify(this.state.dataSource));
		tableData.forEach((obj) => {
			if ('updated' in obj)
				obj.updated = true
			delete obj.key;
		});
		this.props.showLoader();
		try {
			const resp = await this.props.saveTableData(tableData);
			if (resp.status === 200) {
				this.setState({ tableDataChanged: false });
				this.props.showNotification("success", 'Saved');

			}
			if (resp.status === 400) {
				this.props.showNotification("error", resp?.message);
			}
		} catch (err) {
			if (err.message.includes("400")) {
				this.props.showNotification("error", "User already registered");
			}
			if (err.message.includes("403")) {
				this.props.showNotification("error", "ACCESS DENIED ! User is not having valid email_address");
			}
			if (err.message.includes("500")) {
				this.props.showNotification("error", "Error while saving");
			}
		} finally {
			this.props.hideLoader();
		}
	};



	render() {
		if (!this.state.dataSource || !this.state.columns) {
			return null;
		}
		const { dataSource, tableDataSource, tableColumns, formDetails } = this.state;
		const components = {
			body: {
				row: EditableRow,
				cell: EditableCell,
			},
		};
		const columns = this.state.columns.map((column) => {
			if (column.editable) {
				return column;
			}
			return {
				...column,
				onCell: (record) => ({
					record,
					editable: column.editable,
					dataIndex: column.dataIndex,
					title: column.title,
					onChangeInput: this.onChangeInput,
				}),
			};
		});
		console.log("columnsssssssss", formDetails, dataSource, columns);


		return (
			<div className="custom-table-wrapper">
				<div className="form-details">
					<p className="form-heading">BU Form</p>
					{/* <Search
					placeholder="Search"
					onSearch={this.searchTable}
					value={this.state.searchValue}
					onChange={(e) => this.onChangeSearchValue(e)}
					allowClear
					style={{ width: 200, float: 'right', marginLeft: '15px' }} /> */}
					<div className="form-btn">
						<Button
							type="primary"
							onClick={this.onSaveTable}
							className="custom-primary-btn"
							id="editable-table-button-save"
						>
							Clear
						</Button>
						<Button
							type="primary"
							onClick={this.onSaveTable}
							className="custom-secondary-btn"
							id="editable-table-button-save"
						>
							Save form
						</Button>
					</div>
					{this.state.deleteActionColumnAdded && (
						<Button
							type="primary"
							onClick={this.onDeleteRows}
							className="button--delete"
							id="editable-table-button-delete"
							disabled={!this.state.rowsMarkedForDeletion}
						>
							Delete
						</Button>
					)}
					{/* <div className={classes["keypair__table"]}>
					<Table
						className="borderedTable"
						bordered
						dataSource={tableDataSource}
						columns={tableColumns}
						pagination={false}
					/>
				</div> */}
					<div className="dynamic-form-wrapper">
						{formDetails.map((item, i) => (
							<div key={i} className="dynamic-form-input">
								<DynamicFormComponent {...item} formDetails={formDetails} setFormData={this.setFormData} />
							</div>
						))}

					</div>

					<div className="table-wrapper">
						<div className="table-head">
							<p className="table-heading">Batch 11081204X- BU individual values</p>
							<Button
								type="dashed"
								className="custom-secondary-btn"
								onClick={this.onAddRow}
								icon={<PlusOutlined />}
								id="editable-table-button-add-new-user"
							>
								Add new row
							</Button>
						</div>
						<Table
							className="borderedTable"
							components={components}
							rowClassName={() => "editable-row"}
							bordered
							dataSource={dataSource}
							columns={columns}
							pagination={{ current: this.state.currentPage, onChange: (page) => this.onChangeCurrentPage(page) }}
							scroll={this.props.screens === "Roles" ? { y: 400 } : { y: 300 }}
						/>

					</div>

					<Modal
						visible={this.state.visible}
						onOk={this.handleOk}
						onCancel={this.handleCancel}
						closable={false}
						centered={true}
						wrapClassName="editable--modal"
						style={{ minWidth: "30%" }}
						footer={[
							<Button
								key="cancel"
								className="editable__table-cancel"
								id="editable-modal-button-cancel"
								onClick={this.handleCancel}
							>
								Cancel
							</Button>,
							<Button
								key="delete"
								className="button-solid__primary"
								id="editable-modal-button-delete"
								onClick={this.handleOk}
							>
								Delete
							</Button>,
						]}
					>
						<div className="editable__modal-content">
							<DeleteTwoTone
								twoToneColor="#FF2828"
								style={{ fontSize: "22px", marginRight: "8px" }}
							/>
							<div>
								<p className="editable__modal-text">
									{" "}
									Are you sure you want to delete the selected items?
								</p>
								<small className="editable__modal-small-text">
									This action is irreversible.
								</small>
							</div>
						</div>
					</Modal>
				</div>

			</div>
		);
	}
}

export default connect(null, { showLoader, hideLoader, showNotification })(
	DataFormFirst
);
