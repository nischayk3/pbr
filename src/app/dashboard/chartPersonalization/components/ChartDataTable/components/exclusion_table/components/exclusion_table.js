
import React from 'react';
import { Table } from 'antd';
import './exclusion.scss';

const ExclusionTable = ({exclusionTableData}) => {
    console.log(exclusionTableData, 'exclusionTableData');
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
            fixed: 'left'
        },
        {
            title: 'Batch',
            key: 'batch_num',
            dataIndex: 'batch_num',
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
