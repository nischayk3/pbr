import React from 'react';
const { Option } = Select;
import { Select, Switch } from 'antd';

import BreadCrumbWrapper from '../../../components/BreadCrumbWrapper/index'
import GoBack from '../../../components/GoBack/GoBack';
import EditableTable from '../../../components/EditableTable/EditableTable'
import dataSource from './UserConfiguration.json'

class UserConfiguration extends React.Component {
  columns = [
    {
        type: 'input',
        name: 'user',
        label: 'User',
        editable: true,
        align: 'center',

        dataIndex: 'user',
        title: 'User',
    }
    // ,
    // {
    //     type: 'select',
    //     name: 'role',
    //     label: 'Role',
    //     align: 'center',

    //     dataIndex: 'role',
    //     title: 'Role',

    //     render: (_, record) => {
    //         return <Select defaultValue={record.role} style={{ width: 120 }}>
    //             <Option value="cmo">CMO</Option>
    //             <Option value="admin">Admin</Option>
    //             <Option value="approvar">Approvar</Option>
    //         </Select>
    //     }
    // },
    // {
    //     title: 'Restricted access to',
    //     dataIndex: 'restricted_access_to',
    //     align: 'center',
    //     children: [
    //         {
    //             title: 'Molecule',
    //             dataIndex: 'molecule',
    //             key: 'molecule',
    //             align: 'center',
    //             width: 150,
    //             render: (_, record) => {
    //                 // console.log(record)
    //             }
    //         },
    //         {
    //             title: 'Site',
    //             dataIndex: 'site',
    //             key: 'site',
    //             align: 'center',
    //             width: 150,
    //             render: (_, record) => {
    //                 return <Select value={record.site} onChange={value => this.onChangeSelect(value, record, 'site')} mode="multiple" style={{ width: 180 }}>
    //                     <Option value="111">111</Option>
    //                     <Option value="222">222</Option>
    //                 </Select>
    //             }
    //         },
    //         {
    //             title: 'Data Access',
    //             dataIndex: 'data_access',
    //             children: [
    //                 {
    //                     title: 'Approved',
    //                     dataIndex: 'approved',
    //                     key: 'approved',
    //                     align: 'center',
    //                     width: 100,
    //                     render: (_, record) => {
    //                         return <Switch defaultChecked={record.approved} />
    //                     }
    //                 },
    //                 {
    //                     title: 'Unapproved',
    //                     dataIndex: 'unapproved',
    //                     key: 'unapproved',
    //                     align: 'center',
    //                     // width: 100,
    //                     render: (_, record) => {
    //                         return <Switch defaultChecked={record.unapproved} />
    //                     }
    //                 },
    //             ],
    //         }
    //     ]
    // }
]

  onSaveUserConfiguration = data => {
    console.log(data)
  }


  render() {
    console.log('dataSource:', dataSource)
    return (
      <div className='custom-wrapper'>
        <BreadCrumbWrapper />
        <GoBack currentPage="User configuration" />
        <div style={{ position: 'relative' }}>
          <EditableTable
            dataSource={dataSource}
            columns={this.columns}
            onSaveTable={this.onSaveUserConfiguration}
          />
        </div>
      </div>
    );
  }
}

export default UserConfiguration