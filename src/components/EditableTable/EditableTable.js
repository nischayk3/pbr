import { Component } from 'react'
import { connect } from 'react-redux'
import { v1 as uuid } from 'uuid'
import { Table, Button, Popconfirm, Select, Switch, Checkbox } from 'antd'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
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
import { showLoader, hideLoader } from '../../duck/actions/commonActions'
import tableData from '../../pages/UserRolesAndAccess/UserConfiguration/UserConfiguration.json'

const { Option } = Select

class EditableTable extends Component {
    state = {
        tableDataChanged: false,
        deleteActionColumnAdded: false,
        rowsMarkedForDeletion: false
    }

    componentDidMount() {
        this.loadTableData()
    }

    loadTableData = async () => {
        this.props.showLoader()
        try {
            // const response = await this.props.getTableData()
            // const { rowInitialData, dataSource, deleteActionColumn, columns } = response.data.message
            const { rowInitialData, dataSource, deleteActionColumn, columns } = tableData
            this.setState({ rowInitialData, dataSource, count: dataSource.length, deleteActionColumn, columns }, () => {
                this.initializeTableRender()
            })
            this.props.hideLoader()
        } catch (err) {
            console.log('err: ', err)
            this.props.hideLoader()
        }
    }

    initializeTableRender() {
        const { dataSource, deleteActionColumn, deleteActionColumnAdded, columns: columnsCopy } = this.state
        dataSource.map(data => {
            data.key = uuid()
            data.deleteRowChecked = false
        })
        const columns = deleteActionColumn && !deleteActionColumnAdded ? this.addDeleteActionColumn(columnsCopy) : columnsCopy
        adjustColumnWidths(columns)
        this.renderTableColumns(columns)
        this.setState({ columns })
    }

    renderTableColumns = (columns) => {
        columns.forEach(column => {
            switch (column.type) {
                case 'select':
                    return column.render = (_, record) => {
                        return <Select
                            value={record[column.name]}
                            mode={column.mode}
                            style={{ width: '100%' }}
                            onChange={selectedValue => this.onChangeSelect(selectedValue, record, column)}>
                            {column.options.map(option => <Option key={uuid()} value={option.value}>{option.label}</Option>)}
                        </Select>
                    }
                case 'toggle':
                    return column.render = (_, record) => {
                        return <Switch
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
            title: <Checkbox name="selectAll" onChange={this.onSelectAllRowsForDeletion} ></Checkbox>,
            dataIndex: 'action',
            align: 'center',
            type: 'action_delete',
            render: (_, record, i) => {
                return this.state.dataSource.length >= 1 ? (
                    <Checkbox name={record.key} checked={record.deleteRowChecked} key={record.key} onChange={this.onDeleteRowCheck}></Checkbox>
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

    onDeleteRows = async () => {
        const rowsToDelete = []
        this.state.dataSource.forEach(row => {
            if (row.deleteRowChecked) rowsToDelete.push(row)
        })

        const { dataSource, count } = deleteRow(rowsToDelete, this.state)
        this.setState({ dataSource, count, rowsMarkedForDeletion: false })

        // try {
        //     await this.props.deleteTableRow(data)
        //     const { dataSource, count } = deleteRow(rowsToDelete, this.state)
        //     this.setState({ dataSource, count, rowsMarkedForDeletion: false })
        // } catch (err) {
        //     console.log('delete err: ', err)
        // }
    }

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
            this.props.hideLoader()
        } catch (err) {
            console.log('err: ', err)
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
                <Button
                    type="primary"
                    onClick={this.onDeleteRows}
                    style={{ float: 'right', marginRight: '16px' }}
                    className="button-solid__primary"
                    disabled={!this.state.rowsMarkedForDeletion}
                >
                    Delete
                </Button>
                <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                    scroll={{ y: 300 }}
                />
            </div>
        )
    }
}

export default connect(null, { showLoader, hideLoader })(EditableTable)