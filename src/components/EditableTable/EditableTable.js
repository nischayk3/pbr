import { Component } from 'react';
import { Table, Button, Popconfirm } from 'antd';
import { EditableRow, EditableCell, deleteRow, addRow, changeInput, changeSelectInput } from '../../utils/editableTable'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Select } from 'antd';

class EditableTable extends Component {
    state = {}

    static getDerivedStateFromProps(props, state) {
        if (!state.dataSource) {
            return { dataSource: props.dataSource, count: props.dataSource.length }
        }
        return null
    }

    componentDidMount() {
        const columns = this.addDeleteActionColumn([...this.props.columns])
        this.setState({ columns })
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
        const newRowData = {
            user: 'not_edward@mareana.com',
            role: 'cmo',
            molecule: ['molecule1'],
            site: ['111'],
            approved: true,
            unapproved: true,
            lock_user: true
        }
        const { dataSource, count } = addRow(newRowData, this.state)
        this.setState({ dataSource, count })
    }

    onChangeSelect = (selectedValue, record, type) => {
        const dataSource = changeSelectInput(selectedValue, record, type, this.state)
        this.setState({ dataSource })
    }

    onChangeInput = row => {
        const dataSource = changeInput(row, this.state)
        this.setState({ dataSource })
    }

    render() {
        if (!this.state.dataSource || !this.state.columns) {
            return null
        }
        const { dataSource } = this.state;
        const components = {
            body: {
                row: EditableRow,
                cell: EditableCell,
            },
        }
        const columns = this.state.columns.map((col) => {
            if (!col.editable) {
                return col;
            }

            return {
                ...col,
                onCell: (record) => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    onChangeInput: this.onChangeInput,
                }),
            };
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
                />
            </>
        )
    }
}

export default EditableTable