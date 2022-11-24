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
							<Input placeholder="Enter value" key={record.key} value={record[column.name]} onChange={(selectedValue) => this.onChangeInput(selectedValue, record, column)} />
						);
					});
				case "button":
					return (column.render = (_, record) => {

						return (
							<div className="table-btn">
								<Button
									type="link"
									className="custom-primary-edit-btn"
								>
									Edit
								</Button>
								<Button
									type="link"
									onClick={() => this.handleOk(record.key)}
									className="custom-primary-delete-btn"
								>
									Delete
								</Button>
							</div>
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

	handleOk = async (key) => {
		const rowsToDelete = this.state.dataSource.filter((row) => row.key !== key)
		this.setState({
			dataSource: rowsToDelete
		})

		// this.props.showLoader();
		// try {
		// 	await this.props.deleteTableRow(rowsToDelete);
		// 	const { dataSource, count } = deleteRow(rowsToDelete, this.state);
		// 	this.setState({ dataSource, count, rowsMarkedForDeletion: false });
		// } catch (err) {
		// 	this.props.showNotification("error", err.message);
		// } finally {
		// 	this.props.hideLoader();
		// }
	};

	onDeleteRows = () => this.setState({ visible: true });

	onAddRow = () => {
		const { dataSource, count } = addRow(this.state);
		this.setState({ currentPage: 1 });
		this.setState({ dataSource, count }, () => {
			this.initializeTableRender();
			this.setState({ tableDataChanged: true });
		});
	};

	onChangeInput = (selectedValue, record, column) => {
		const dataSource = changeInput(record, this.state);
		this.setState({ dataSource, tableDataChanged: true });
	};

	// onChangeTable = (selectedValue, record, column) => {
	// 	console.log("selectedValue, record, column", selectedValue, record, column);
	// 	const dataSource = changeInput(record, this.state);
	// 	this.setState({ dataSource, tableDataChanged: true });
	// };

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
		const { dataSource, formDetails } = this.state;
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
			// return {
			// 	...column,
			// 	onCell: (record) => ({
			// 		record,
			// 		editable: column.editable,
			// 		dataIndex: column.dataIndex,
			// 		title: column.title,
			// 		onChangeInput: this.onChangeInput,
			// 	}),
			// };
		});
		console.log("columns", columns);

		return (
			<div className="custom-table-wrapper">
				<div className="form-details">
					<p className="form-heading">BU Form</p>

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


				</div>

			</div>
		);
	}
}

export default connect(null, { showLoader, hideLoader, showNotification })(
	DataFormFirst
);
