import React from 'react';
import { Table, Button, Popconfirm, Select, Switch } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

import BreadCrumbWrapper from '../../../components/BreadCrumbWrapper/index'
import GoBack from '../../../components/GoBack/GoBack';
import { EditableRow, EditableCell, deleteRow, addRow, changeInput, changeSelectInput } from '../../../utils/editableTable'
import EditableTable from '../../../components/EditableTable/EditableTable'
const { Option } = Select;

class RolesAndAccess extends React.Component {
    columns = [
        {
            title: 'Action',
            dataIndex: 'action',
            align: 'center',
            render: (_, record) =>
                this.state.dataSource.length >= 1 ? (
                    <Popconfirm title="Sure to delete?" onConfirm={() => this.onDeleteRow(record.key)}>
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

    onSaveRolesAndAccess = () => {
        console.log(this.state)
    }

    render() {
        return (
            <div className='custom-wrapper'>
                <BreadCrumbWrapper />
                <GoBack currentPage="Roles" />
                <div style={{ position: 'relative' }}>
                     <EditableTable 
                        dataSource={this.state.dataSource} 
                        columns={this.columns} 
                        onSaveTable={this.onSaveRolesAndAccess}
                    />
                </div>
            </div>
        );
    }
}

export default RolesAndAccess