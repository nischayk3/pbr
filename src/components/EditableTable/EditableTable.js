import { Component } from 'react'
import { connect } from 'react-redux'
import { v1 as uuid } from 'uuid'
import { Table, Button, Select, Switch, Checkbox, Modal } from 'antd'
import { PlusOutlined, DeleteTwoTone } from '@ant-design/icons'
import {
    EditableRow,
    EditableCell,
    adjustColumnWidths,
    deleteRow,
    addRow,
    changeInput,
    changeSelectInput,
    changeToggleInput,
    deleteRowCheck,
    selectAllRowsForDeletion,
    checkDeleteButtonDisabledState
} from '../../utils/editableTableHelper'
import { showLoader, hideLoader, showNotification } from '../../duck/actions/commonActions'
import classes from './EditableTable.module.css'

const { Option } = Select

class EditableTable extends Component {
    state = {
        tableDataChanged: false,
        deleteActionColumnAdded: false,
        rowsMarkedForDeletion: false,
        visible: false,
        confirmLoading: false
    }

    componentDidMount() {
        this.loadTableData()
    }

    loadTableData = async () => {
        this.props.showLoader()
        try {
            const response = await this.props.getTableData()
            const { rowInitialData, dataSource, deleteActionColumn, columns } = response.data.message
            this.setState({ rowInitialData, dataSource, count: dataSource.length, deleteActionColumn, columns }, () => {
                this.initializeTableRender()
            })
        } catch (err) {
            this.props.showNotification('error', err.message)
        } finally {
            this.props.hideLoader()
        }
    }

    initializeTableRender() {
        const { dataSource, deleteActionColumn, deleteActionColumnAdded, columns: columnsCopy } = this.state
        dataSource.forEach(data => {
            data.key = uuid()
            data.deleteRowChecked = false
        })
        const columns = deleteActionColumn && !deleteActionColumnAdded ? this.addDeleteActionColumn(columnsCopy) : columnsCopy
        columns.forEach(data => data.key = uuid())
        adjustColumnWidths(columns)
        this.renderTableColumns(columns)
        this.setState({ columns })
    }

    renderTableColumns = columns => {
        columns.forEach(column => {
            switch (column.type) {
                case 'select':
                    return column.render = (_, record) => {
                        return <Select
                            key={record.key}
                            value={record[column.name]}
                            mode={column.mode}
                            style={{ width: '100%' }}
                            onChange={selectedValue => this.onChangeSelect(selectedValue, record, column)}>
                            {column.options.map((option, i) => <Option key={i} value={option.value}>{option.label}</Option>)}
                        </Select>
                    }
                case 'toggle':
                    return column.render = (_, record) => {
                        return <Switch
                            key={record.key}
                            checked={record[column.name]}
                            checkedChildren={column.toggleTextTrue}
                            unCheckedChildren={column.toggleTextFalse}
                            className="editable-table--switch__color"
                            onChange={selectedValue => this.onChangeToggle(selectedValue, record, column)} />
                    }
                case 'parent':
                    this.renderTableColumns(column.children)
            }
        })
    }

    addDeleteActionColumn = columns => {
        this.setState({ deleteActionColumnAdded: true })
        const actionColumn = {
            title: <Checkbox name="selectAll" key={uuid()} onChange={this.onSelectAllRowsForDeletion}></Checkbox>,
            dataIndex: 'action',
            align: 'center',
            type: 'action_delete',
            render: (_, record, i) => {
                return this.state.dataSource.length >= 1 ? (
                    <Checkbox name={record.key} checked={record.deleteRowChecked} key={i} onChange={this.onDeleteRowCheck}></Checkbox>
                ) : null
            }

        }
        columns.unshift(actionColumn)
        adjustColumnWidths(columns)
        return columns
    }

    onSelectAllRowsForDeletion = e => {
        const dataSource = selectAllRowsForDeletion(e.target.checked, this.state.dataSource)
        this.setState({ dataSource }, () => {
            const rowsMarkedForDeletion = checkDeleteButtonDisabledState(this.state.dataSource)
            this.setState({ rowsMarkedForDeletion })
        })
    }

    onDeleteRowCheck = e => {
        const { name, checked } = e.target
        const dataSource = deleteRowCheck(name, checked, this.state.dataSource)
        this.setState({ dataSource }, () => {
            const rowsMarkedForDeletion = checkDeleteButtonDisabledState(this.state.dataSource)
            this.setState({ rowsMarkedForDeletion })
        })
    }

    handleOk = async () => {
        this.setState({ visible: false })
        const rowsToDelete = []
        this.state.dataSource.forEach(row => {
            if (row.deleteRowChecked) rowsToDelete.push(row)
        })
        this.props.showLoader()
        try {
            await this.props.deleteTableRow(rowsToDelete)
            const { dataSource, count } = deleteRow(rowsToDelete, this.state)
            this.setState({ dataSource, count, rowsMarkedForDeletion: false })
        } catch (err) {
            this.props.showNotification('error', err.message)
        } finally {
            this.props.hideLoader()
        }
    }

    handleCancel = () => this.setState({ visible: false })

    onDeleteRows = () => this.setState({ visible: true })

    onAddRow = () => {
        const { dataSource, count } = addRow(this.state)
        this.setState({ dataSource, count }, () => {
            this.initializeTableRender()
            this.setState({ tableDataChanged: true })
        })
    }

    onChangeInput = row => {
        const dataSource = changeInput(row, this.state)
        this.setState({ dataSource, tableDataChanged: true })
    }

    onChangeSelect = (selectedValue, record, column) => {
        const dataSource = changeSelectInput(selectedValue, record, column, this.state)
        this.setState({ dataSource, tableDataChanged: true })
    }

    onChangeToggle = (selectedValue, record, column) => {
        const dataSource = changeToggleInput(selectedValue, record, column, this.state)
        this.setState({ dataSource, tableDataChanged: true })
    }

    onSaveTable = async () => {
        const tableData = JSON.parse(JSON.stringify(this.state.dataSource))
        tableData.forEach(obj => delete obj.key)
        this.props.showLoader()
        try {
            await this.props.saveTableData(tableData)
            this.setState({ tableDataChanged: false })
        } catch (err) {
            this.props.showNotification('error', err.message)
        } finally {
            this.props.hideLoader()
        }
    }

    render() {
        if (!this.state.dataSource || !this.state.columns) {
            return null
        }
        const { dataSource } = this.state
        const components = {
            body: {
                row: EditableRow,
                cell: EditableCell,
            },
        }
        const columns = this.state.columns.map((column) => {
            if (!column.editable) {
                return column
            }
            return {
                ...column,
                onCell: (record) => ({
                    record,
                    editable: column.editable,
                    dataIndex: column.dataIndex,
                    title: column.title,
                    onChangeInput: this.onChangeInput
                }),
            }
        })

        return (
            <div className="custom-table-wrapper">
                <Button
                    type="dashed"
                    className="button-dashed__primary"
                    onClick={this.onAddRow}
                    icon={<PlusOutlined />}
                    style={{ marginBottom: 16 }}
                >
                    Add new user
                </Button>
                <Button
                    type="primary"
                    onClick={this.onSaveTable}
                    style={{ float: 'right' }}
                    className="button-solid__primary"
                    disabled={!this.state.tableDataChanged}
                >
                    Save
                </Button>
                {this.state.deleteActionColumnAdded && <Button
                    type="primary"
                    onClick={this.onDeleteRows}
                    className="button--delete"
                    disabled={!this.state.rowsMarkedForDeletion}
                >
                    Delete
                </Button>}
                <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                    scroll={{ y: 300 }}
                />

                <Modal
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    closable={false}
                    centered={true}
                    wrapClassName="editable--modal"
                    style={{ minWidth: '30%' }}
                    footer={[
                        <Button
                            key="cancel"
                            className={classes['editable__table-cancel']}
                            onClick={this.handleCancel}>Cancel</Button>,
                        <Button
                            key="delete"
                            className="button-solid__primary"
                            onClick={this.handleOk}>Delete</Button>
                    ]}
                >
                    <div>
                        <p className={classes['editable__modal-text']}><DeleteTwoTone twoToneColor="#FF2828" style={{ fontSize: '22px', marginRight: '8px' }} /> Are you sure you want to delete the selected items?</p>
                        <small className={classes['editable__modal-small-text']}>This action is irreversible.</small>
                    </div>
                </Modal>


            </div>
        )
    }
}

export default connect(null, { showLoader, hideLoader, showNotification })(EditableTable)