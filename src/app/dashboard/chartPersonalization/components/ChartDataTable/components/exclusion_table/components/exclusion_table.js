
import React from 'react';
import { Table, Popconfirm, } from 'antd';
import { DeleteOutlined } from '@ant-design/icons'
import './exclusion.scss';

const ExclusionTable = ({exclusionTableData, setExclusionTableData, dataTable}) => {
    const columns=[];
    const handleRowDelete = (record) => {
      const data = exclusionTableData.filter((ele) => ele.batch_num !==record.batch_num)
      setExclusionTableData(data);
    }
    const newColumns = [
        {
            title: 'Id',
            key: 'exclusionId',
            dataIndex: 'exclusionId',
            width: 50,
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
        }
    ]
    newColumns.forEach((ele) => {
        columns.push(ele);
    })
    const uniqueArr = (value, index, self) => {
        return self.indexOf(value) === index;
      };
      const objkeys = dataTable !== undefined && dataTable.length > 0
          ? Object.keys(dataTable[0])
          : [];
    
      const filterColumn = objkeys.filter(uniqueArr);
      filterColumn.map((item, i) => {
         if(item !== 'recorded_date' && item !== 'batch_num') {
            columns.push({
                title: item.toUpperCase(),
                dataIndex: item,
                key: `${item}-${i}`,
                width: 100,
              }); 
         }
      });
      const deleteColumn =  {
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
    }
    if(columns) {
        columns.push(deleteColumn)
    }

    return (
        <div>
            <Table
                size='small'
                columns={columns}
                dataSource={exclusionTableData}
                pagination={false}
                rowKey={(record) => record.id}
            />
        </div>
    )
}

export default ExclusionTable;
