import { PlusOutlined, DeleteTwoTone, EditOutlined } from "@ant-design/icons";
import { Button, Checkbox, Input, Select, Switch, Table, Drawer } from "antd";
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
import './first.scss'
import InputField from "../../../../../../components/InputField/InputField";
import { putFormData } from "../../../../../../services/eLogBookService";


const { Option } = Select;

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
		completeData: [],
		name: '',
		edit: false,
		open: false
	};

	showDrawer = () => {
		this.setState({ open: true });
	};
	onClose = () => {
		this.setState({ open: false });
	};




	inputChange = (a, b, c) => {
		var item = [...c]
		var val_ = a.target.value
		item.forEach((element, index) => {
			if (element.id === b) {
				item[index].value = val_;
			}
		});
		this.setState({ formDetails: item })
	}

	editClick = () => {
		this.setState({ edit: !this.state.edit })
		if (this.props.getTableData) {
			this.props.getTableData['edit_name'] = this.props.getTableData['edit_name'] ? false : true
		}
	}

	editName = (_name) => {
		if (this.props.getTableData) {
			this.props.getTableData['name'] = _name
		}
		this.setState({ name: _name })
	}

	componentDidMount() {
		this.loadTableData();
	}

	loadTableData = async () => {
		this.props.showLoader();
		try {
			const response = await this.props.getTableData;

			const { name } = response
			const { rowInitialData, dataSource, deleteActionColumn, columns } = response.table;
			const { formDetails } = response.form;
			this.setState(
				{
					rowInitialData,
					dataSource,
					count: dataSource.length,
					deleteActionColumn,
					columns,
					formDetails,
					name
				},
				() => {
					this.initializeTableRender();
				}
			);
			// this.props.showNotification("success", `${this.props.title} Loaded`);

		} catch (err) {
			this.props.showNotification("error", 'Data format is different');
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

	onChangeEdit = (record) => {
		const datasource = [...this.state.dataSource]
		const index = datasource.findIndex((item) => record.key === item.key)
		datasource[index]['edit'] = datasource[index]['edit'] ? false : true
		if (this.props.getTableData && this.props.getTableData.table) {
			this.props.getTableData.table.dataSource = datasource
		}

		this.setState({ datasource: datasource })
		const {
			columns
		} = this.state;
		this.renderTableColumns(columns);

	};

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
						return (record.edit ?
							<Input placeholder="Enter value" key={record.key} value={record[column.name]} onChange={(selectedValue) => this.onChangeInput(selectedValue, record, column)} /> : record[column.name]
						);
					});
				case "button":
					return (column.render = (_, record) => {

						return (
							<div className="table-btn">
								<Button
									type="link"
									className="custom-primary-edit-btn"
									onClick={() => this.onChangeEdit(record)}
								>
									{record.edit ? 'Save' : "Edit"}
								</Button>
								<Button
									type="link"
									onClick={() => this.handleOk(record.key)}
									className="custom-primary-delete-btn"
								>
									Delete
								</Button>
							</div >
						);
					}, column.fixed = 'right', column.width = '150px');


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
		if (this.props.getTableData && this.props.getTableData.table) {
			this.props.getTableData.table.dataSource = rowsToDelete
		}
		this.setState({
			dataSource: rowsToDelete
		})
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
		const datasource = [...this.state.dataSource]
		const index = datasource.findIndex((item) => record.key === item.key)
		datasource[index][column.name] = selectedValue.target.value
		if (this.props.getTableData && this.props.getTableData.table) {
			this.props.getTableData.table.dataSource = datasource
		}
		this.setState({ datasource: datasource })
		const {
			columns
		} = this.state;
		this.renderTableColumns(columns);

	};



	onChangeSelect = (selectedValue, record, column) => {
		const dataSource = changeSelectInput(
			selectedValue,
			record,
			column,
			this.state
		);
		if (this.props.getTableData && this.props.getTableData.table) {
			this.props.getTableData.table.dataSource = datasource
		}
		this.setState({ dataSource, tableDataChanged: true });
	};

	onChangeToggle = (selectedValue, record, column) => {
		const dataSource = changeToggleInput(
			selectedValue,
			record,
			column,
			this.state
		);
		if (this.props.getTableData && this.props.getTableData.table) {
			this.props.getTableData.table.dataSource = datasource
		}
		this.setState({ dataSource, tableDataChanged: true });
	};

	onChangeCurrentPage = (page) => {
		this.setState({ currentPage: page });
	}

	onSaveTable = async (boolean_value) => {

		let { formDetails } = this.state
		let { getTableData } = this.props


		var batch = formDetails.filter(function (el) {
			return el.id == 'batch'
		})
		var process = formDetails.filter(function (el) {
			return el.id == 'process'
		})

		let save_req = {
			"archive": boolean_value,
			"batch": batch && batch[0] && batch[0].value ? batch[0].value : '',
			"process_step": process && process[0] && process[0].value ? process[0].value : '',
			"readings": getTableData,
			"molecule": this.props.selectedMolecule,
			"template_id": this.props.template_disp_id,
			"version": this.props.form_version,
			"form_id": this.props.form_id,
		}
		if (this.props.recording_id)
			save_req['recording_id'] = this.props.recording_id


		this.props.showLoader();
		try {
			const resp = await putFormData(save_req);
			if (resp.Status === 200) {
				this.setState({ tableDataChanged: false });
				this.props.showNotification("success", 'Form Data Saved');
			}
			if (resp.status === 400) {
				this.props.showNotification("error", resp?.message);
			}
		} catch (err) {
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
		const { dataSource, formDetails, edit, name } = this.state;
		const components = {
			body: {
				row: EditableRow,
				cell: EditableCell,
			},
		};
		const { setDrawerVisible, drawervisible, getTableData } = this.props
		const columns = this.state.columns.map((column) => {
			if (column.editable) {
				return column;
			}
		});
		return (
			<div className="custom-table-wrapper">
				<div>
					<span className="form-head-ing">
						{this.props.title} [{this.props.size}]
					</span>
					<span >
						<span className="see-all" onClick={() => setDrawerVisible(!drawervisible)}>See all records  </span>
						<span className="buttons-head">
							<Button className="delete-btn" onClick={() => this.onSaveTable(true)} >Delete</Button>
							<Button className="publish-btn">Publish</Button>
							<Button className="publish-btn" onClick={() => this.onSaveTable(false)}>Save</Button>
						</span>
					</span>
				</div>
				<br />
				<hr className="divider" />

				<div className="form-details">
					<span>
						<span className="form-heading">Record {this.props.recording_id}  <span>&nbsp;&nbsp;&nbsp;&bull;</span> {this.props.status}</span>  </span>
				</div >
				<div className="form-details">

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
						{formDetails && formDetails.length > 0 && formDetails.map((item, i) =>
						(
							<div key={i} className="dynamic-form-input">
								<InputField value={item.value} label={item.label} onChangeInput={(e) => this.inputChange(e, item.id, formDetails)} />
							</div>
						))}
					</div>
					{columns && columns.length > 0 &&
						<div className="table-wrapper">
							<div className="table-head">
								<div >
									<p className="table-heading"><Button
										className="add_new_row"
										onClick={this.onAddRow}
										icon={<PlusOutlined />}
										// style={{ left: `${columns.length * 10 > 80 ? '66%' : columns.length * 8 + '%'}` }}
										id="editable-table-button-add-new-user"
									>
										Add new row
									</Button>
									</p>
								</div>
								<Table
									className="first-Table"
									rowClassName={() => "editable-row"}
									bordered
									dataSource={dataSource}
									columns={columns}
									style={{ width: columns.length * 200 }}
									pagination={{
										position: ['bottomRight'],
										size: 'small'
									}}
									scroll={dataSource.length > 0 && { x: 400 }}
								/>
							</div>
						</div>}



				</div>
			</div >
		);
	}
}

export default connect(null, { showLoader, hideLoader, showNotification })(
	DataFormFirst
);

