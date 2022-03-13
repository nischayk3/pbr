
import React from 'react';
import { Table, Popconfirm, } from 'antd';
import { DeleteOutlined } from '@ant-design/icons'
import './exclusion.scss';

const ExclusionTable = ({exclusionTableData, setExclusionTableData}) => {
    const handleRowDelete = (record) => {
      const data = exclusionTableData.filter((ele) => ele.batch_num !==record.batch_num)
      setExclusionTableData(data);
    }
    const columns = [
        {
            title: 'Id',
            key: 'exclusionId',
            dataIndex: 'exclusionId',
            width: 100,
            fixed: 'left'
        },
        {
            title: 'Description',
            key: 'exclusionDesc',
            dataIndex: 'exclusionDesc',
            width: 100,
            fixed: 'left',
            render: (text, record) => (
                <span>{record.exclusionDesc ? record.exclusionDesc : '-'}</span>
              )
        },
        {
            title: 'Batch',
            key: 'batch_num',
            dataIndex: 'batch_num',
            width: 100,
            fixed: 'left'
        },
        {
            title: 'Temperature',
            key: 'Temperature',
            dataIndex: 'Temperature',
            width: 100,
            fixed: 'left'
        },
        {
            title: 'pH',
            key: 'pH',
            dataIndex: 'pH',
            width: 100,
            fixed: 'left'
        },
        {
            title: 'User',
            key: 'userId',
            dataIndex: 'userId',
            width: 100,
            fixed: 'left'
        },
        {
            title: 'Time',
            key: 'timeStamp',
            dataIndex: 'timeStamp',
            width: 100,
            fixed: 'left'
        },
        {
            title: '',
            key: 'action',
            width: 100,
            fixed: 'left',
            align:'center',
            render: (text, record, index) => (
                <Popconfirm
                    title='Sure to delete?'
                    className='deleteTableAction'
                    onConfirm={() => handleRowDelete(record)}
                >
                    <DeleteOutlined />
                </Popconfirm>
            ),
        },
    ]
    return (
        <div>
            <Table
                size='small'
                className='violation_table'
                columns={columns}
                dataSource={exclusionTableData}
                bordered
                pagination={false}
            />
        </div>
    )
}

export default ExclusionTable;
