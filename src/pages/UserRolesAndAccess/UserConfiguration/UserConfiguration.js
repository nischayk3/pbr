import React from 'react';
import { Table, Button, Popconfirm, Select, Switch } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

import BreadCrumbWrapper from '../../../components/BreadCrumbWrapper/index'
import GoBack from '../../../components/GoBack/GoBack';
import { EditableRow, EditableCell } from '../../../utils/editableTable'

const { Option } = Select;

class UserConfiguration extends React.Component {
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
      title: 'User',
      dataIndex: 'user',
      align: 'center',
      width: '20%',
      editable: true,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      align: 'center',
      render: (_, record) => {
        return <Select defaultValue={record.role} style={{ width: 120 }}>
          <Option value="cmo">CMO</Option>
          <Option value="admin">Admin</Option>
          <Option value="approvar">Approvar</Option>
        </Select>
      }
    },
    {
      title: 'Restricted access to',
      dataIndex: 'restricted_access_to',
      align: 'center',
      children: [
        {
          title: 'Molecule',
          dataIndex: 'molecule',
          key: 'molecule',
          align: 'center',
          width: 150,
          render: (_, record) => {
            return <Select value={record.restricted_access_to.molecule} onChange={value => this.onChangeSelect(value, record, 'molecule')} mode="multiple" style={{ width: 180 }}>
              <Option value="molecule1" key="1">Molecule 1</Option>
              <Option value="molecule2" key="2">Molecule 2</Option>
              <Option value="molecule3" key="3">Molecule 3</Option>
              <Option value="molecule4" key="4">Molecule 4</Option>
              <Option value="molecule5" key="5">Molecule 5</Option>
            </Select>
          }
        },
        {
          title: 'Site',
          dataIndex: 'site',
          key: 'site',
          align: 'center',
          width: 150,
          render: (_, record) => {
            return <Select value={record.restricted_access_to.site} onChange={value => this.onChangeSelect(value, record, 'site')} mode="multiple" style={{ width: 180 }}>
              <Option value="111">111</Option>
              <Option value="222">222</Option>
            </Select>
          }
        },
        {
          title: 'Data Access',
          children: [
            {
              title: 'Approved',
              dataIndex: 'approved',
              key: 'approved',
              align: 'center',
              width: 100,
              render: (_, record) => {
                return <Switch defaultChecked={record.restricted_access_to.data_access.approved} />
              }
            },
            {
              title: 'Unapproved',
              dataIndex: 'unapproved',
              key: 'unapproved',
              align: 'center',
              // width: 100,
              render: (_, record) => {
                return <Switch defaultChecked={record.restricted_access_to.data_access.unapproved} />
              }
            },
          ],
        }
      ]
    },
    {
      title: 'Lock User',
      dataIndex: 'lock_user',
      align: 'center',
      render: (_, record) => {
        return <Switch checkedChildren="Lock" unCheckedChildren="Lock" defaultChecked={record.lock_user} />
      }
    },
  ]
  state = {
    dataSource: [
      {
        key: 0,
        user: 'edward@mareana.com',
        role: 'cmo',
        restricted_access_to: {
          molecule: ['molecule1'],
          site: ['111'],
          data_access: {
            approved: true,
            unapproved: true
          }
        },
        lock_user: true
      },
      {
        key: 1,
        user: 'kristine@mareana.com',
        role: 'admin',
        restricted_access_to: {
          molecule: ['molecule2'],
          site: ['222'],
          data_access: {
            approved: true,
            unapproved: true
          }
        },
        lock_user: false
      },
      {
        key: 2,
        user: 'jennie@mareana.com',
        role: 'approvar',
        restricted_access_to: {
          molecule: ['molecule3', 'molecule5'],
          site: ['222'],
          data_access: {
            approved: true,
            unapproved: true
          }
        },
        lock_user: false
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
      user: 'edward@mareana1.com',
      role: 'CMO',
      restricted_access_to: 'Report designer',
      allowed_to_approve: 'Select',
      lock_user: 'lock'
    }
    this.setState({ dataSource: [newData, ...dataSource], count: count + 1 })
  }

  onChangeSelect = (value, record, type) => {
    const newData = JSON.parse(JSON.stringify(this.state.dataSource))
    const index = newData.findIndex(item => record.key === item.key)
    newData[index]['restricted_access_to'][type] = value
    this.setState({ dataSource: newData })
  }

  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    this.setState({ dataSource: newData })
  }

  onSaveUserConfiguration = () => {
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
        <GoBack currentPage="User configuration" />
        <div style={{ position: 'relative' }}>
          <Button type="primary" onClick={this.onSaveUserConfiguration} style={{ position: 'absolute', right: 0, top: 0 }}>Save</Button>
          <Button
            onClick={this.handleAdd}
            type="dashed"
            icon={<PlusOutlined />}
            style={{ marginBottom: 16 }}
          >
            Add new user
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

export default UserConfiguration