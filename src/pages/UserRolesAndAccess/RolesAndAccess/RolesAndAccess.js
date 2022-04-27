import React from 'react';
import { Table, Button, Popconfirm, Select, Switch } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

import BreadCrumbWrapper from '../../../components/BreadCrumbWrapper/index'
import GoBack from '../../../components/GoBack/GoBack';
import { EditableRow, EditableCell } from '../../../utils/editableTable'

const { Option } = Select;

class RolesAndAccess extends React.Component {
    columns = [
        {
            title: 'Action',
            dataIndex: 'action',
            align: 'center',
            render: (_, record) =>
                this.state.dataSource.length >= 1 ? (
                    <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                        <DeleteOutlined style={{ color: 'red' }} />
                    </Popconfirm>

                ) : null,
        },
        {
            title: 'Roles',
            dataIndex: 'roles',
            align: 'center',
            render: (_, record) => {
                return <Select defaultValue={record.roles} style={{ width: 120 }}>
                    <Option value="cmo">CMO</Option>
                    <Option value="admin">Admin</Option>
                    <Option value="approvar">Approvar</Option>
                    <Option value="user">User</Option>
                </Select>
            }
        },
        {
            title: 'Resources',
            dataIndex: 'resources',
            align: 'center',
            render: (_, record) => {
                return <Select defaultValue={record.resources} mode="multiple" style={{ width: 180 }}>
                    <Option value="chart">Chart</Option>
                    <Option value="report">Report</Option>
                </Select>
            }
        },
        {
            title: 'Visibility',
            dataIndex: 'visibility',
            align: 'center',
            render: (_, record) => {
                return <Select defaultValue={record.visibility} mode="multiple" style={{ width: 180 }}>
                    <Option value="approved">Approved</Option>
                    <Option value="draft">Draft</Option>
                    <Option value="awaiting_approval">Awaiting approval</Option>
                </Select>
            }
        },
        {
            title: 'Access',
            dataIndex: 'access',
            align: 'center',
            render: (_, record) => {
                return <Select defaultValue={record.access} mode="multiple" style={{ width: 180 }}>
                    <Option value="read">Read</Option>
                    <Option value="main">Main</Option>
                </Select>
            }
        }
    ]
    state = {
        dataSource: [
            {
                key: 0,
                roles: 'cmo',
                resources: 'chart',
                visibility: 'approved',
                access: 'read'
            },
            {
                key: 1,
                roles: 'admin',
                resources: 'report',
                visibility: 'draft',
                access: 'main'
            },
            {
                key: 2,
                roles: 'user',
                resources: 'chart',
                visibility: 'awaiting_approval',
                access: 'read'
            },
        ],
        count: 3,
    }

    handleDelete = (key) => {
        const dataSource = [...this.state.dataSource];
        this.setState({
            dataSource: dataSource.filter((item) => item.key !== key),
            count: this.state.count - 1
        });
    }

    handleAdd = () => {
        const { count, dataSource } = this.state;
        const newData = {
            key: count,
            roles: 'cmo',
            resources: 'chart',
            visibility: 'approved',
            access: 'read'
        }
        this.setState({ dataSource: [newData, ...dataSource], count: count + 1 })
    }

    handleSave = (row) => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        this.setState({
            dataSource: newData,
        });
    }

    onSaveRolesAndAccess = () => {
        console.log(this.state)
    }

    render() {
        const { dataSource } = this.state;
        const components = {
            body: {
                row: EditableRow,
                cell: EditableCell,
            },
        };
        const columns = this.columns.map((col) => {
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
                    handleSave: this.handleSave,
                }),
            };
        });
        return (
            <div className='custom-wrapper'>
                <BreadCrumbWrapper />
                <GoBack currentPage="Roles" />
                <div style={{ position: 'relative' }}>
                    <Button type="primary"  onClick={this.onSaveRolesAndAccess} style={{ position: 'absolute', right: 0, top: 0 }}>Save</Button>
                    <Button
                        onClick={this.handleAdd}
                        type="dashed"
                        icon={<PlusOutlined />}
                        style={{ marginBottom: 16 }}
                    >
                        Add new role
                    </Button>
                    <Table
                        components={components}
                        rowClassName={() => 'editable-row'}
                        bordered
                        dataSource={dataSource}
                        columns={columns}
                    />
                </div>
            </div>
        );
    }
}

export default RolesAndAccess