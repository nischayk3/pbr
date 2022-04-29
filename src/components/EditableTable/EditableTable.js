import { Component } from 'react'
import { Table, Button, Popconfirm, Select, Switch } from 'antd'
import { EditableRow, EditableCell, deleteRow, addRow, changeInput, changeSelectInput, changeToggleInput } from '../../utils/editableTableHelper'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
const { Option } = Select

class EditableTable extends Component {
    state = {}

    static getDerivedStateFromProps(props, state) {
        if (!state.dataSource) {
            return {
                dataSource: props.tableData.dataSource,
                count: props.tableData.dataSource.length,
                rowInitialData: props.tableData.rowInitialData
            }
        }
        return null
    }

    componentDidMount() {
       this.initializeTableRender()
    }

    initializeTableRender() {
        const columnsCopy = [...this.props.tableData.columns]
        const columns = this.props.tableData.deleteActionColumn ? this.addDeleteActionColumn(columnsCopy) : columnsCopy
        this.renderTable(columns)
        this.setState({ columns })
    }

    renderTable = (columns) => {
        columns.forEach(column => {
            switch (column.type) {
                case 'select':
                    return column.render = (_, record) => {
                        return <Select value={record[column.name]} onChange={selectedValue => this.onChangeSelect(selectedValue, record, column)} style={{ width: 120 }} mode={column.mode}>
                            {column.options.map(option => <Option key={option.value} value={option.value}>{option.label}</Option>)}
                        </Select>
                    }
                case 'toggle':
                    return column.render = (_, record) => {
                        return <Switch checked={record[column.name]} onChange={selectedValue => this.onChangeToggle(selectedValue, record, column)} />
                    }
                case 'parent':
                    this.renderTable(column.children)
            }
        })
    }

    addDeleteActionColumn = columns => {
        const actionColumn = {
            title: 'Action',
            dataIndex: 'action',
            align: 'center',
            render: (_, record) =>
                this.state.dataSource.length >= 1 ? (
                    <Popconfirm title="Sure to delete?" onConfirm={() => this.onDeleteRow(record.key)}>
                        <DeleteOutlined style={{ color: 'red' }} />
                    </Popconfirm>

                ) : null,
        }
        columns.unshift(actionColumn)
        return columns
    }

    createSelect = (record, type, mode) => {
        return (
            <Select value={record.value} onChange={selectedValue => this.onChangeSelect(selectedValue, record, type)} mode={mode} style={{ width: 180 }}>
                {record.options.map(rec => <Option value={rec.value} key={rec.value}>{rec.label}</Option>)}
            </Select>
        )
    }

    onDeleteRow = (key) => {
        const { dataSource, count } = deleteRow(key, this.state)
        this.setState({ dataSource, count })
    }

    onAddRow = () => {
        const { dataSource, count } = addRow(this.state)
        this.setState({ dataSource, count }, () => {
            this.initializeTableRender()
        })
    }

    onChangeInput = row => {
        const dataSource = changeInput(row, this.state)
        this.setState({ dataSource })
    }

    onChangeSelect = (selectedValue, record, column) => {
        const dataSource = changeSelectInput(selectedValue, record, column, this.state)
        this.setState({ dataSource })
    }

    onChangeToggle = (selectedValue, record, column) => {
        const dataSource = changeToggleInput(selectedValue, record, column, this.state)
        this.setState({ dataSource })
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
                    onChangeInput: this.onChangeInput,
                }),
            }
        })

        return (
            <>
                <Button
                    onClick={this.onAddRow}
                    type="dashed"
                    icon={<PlusOutlined />}
                    style={{ marginBottom: 16 }}
                >
                    Add new user
                </Button>
                <Button type="primary" onClick={() => this.props.onSaveTable(this.state.dataSource)} style={{ position: 'absolute', right: 0, top: 0 }}>Save</Button>
                <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                    scroll={{ y: 300 }}
                />
            </>
        )
    }
}

export default EditableTable