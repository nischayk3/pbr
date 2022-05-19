import { Component } from 'react'
import { connect } from 'react-redux'
import { v1 as uuid } from 'uuid'
import { Table, Button, Popconfirm, Select, Switch } from 'antd'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import {
    EditableRow,
    EditableCell,
    adjustColumnWidths,
    deleteRow,
    addRow,
    changeInput,
    changeSelectInput,
    changeToggleInput
} from '../../utils/editableTableHelper'
import { showLoader, hideLoader } from '../../duck/actions/commonActions'

const { Option } = Select

class EditableTable extends Component {
    state = {
        tableDataChanged: false
    }

    // static getDerivedStateFromProps(props, state) {
    //     if (!state.dataSource) {
    //         const { rowInitialData, dataSource, deleteActionColumn } = props.tableData
    //         return { rowInitialData, dataSource, count: dataSource.length, deleteActionColumn }
    //     }

    //     return null
    // }

    componentDidMount() {
        this.loadTable()
    }

    loadTable = async () => {
        this.props.showLoader()
        try {
            const response = await this.props.getTableData()
            const { rowInitialData, dataSource, deleteActionColumn, columns } = response.data.message
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
        this.state.dataSource.map(data => data.key = uuid())
        const columnsCopy = [...this.state.columns]
        const columns = this.state.deleteActionColumn ? this.addDeleteActionColumn(columnsCopy) : columnsCopy
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
        const actionColumn = {
            title: 'Action',
            dataIndex: 'action',
            align: 'center',
            type: 'action_delete',
            render: (_, record) =>
                this.state.dataSource.length >= 1 ? (
                    <Popconfirm title="Sure to delete?" onConfirm={() => this.onDeleteRow(record.key)}>
                        <DeleteOutlined style={{ color: 'red' }} />
                    </Popconfirm>

                ) : null,
        }
        columns.unshift(actionColumn)
        adjustColumnWidths(columns)
        return columns
    }

    onDeleteRow = async key => {
        const data = []
        this.state.dataSource.forEach(row => {
            if (key === row.key) {
                data.push(row)
            }
        })

        try {
            await this.props.deleteTableRow(data)
            const { dataSource, count } = deleteRow(key, this.state)
            this.setState({ dataSource, count })
        } catch (err) {
            console.log('delete err: ', err)
        }
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