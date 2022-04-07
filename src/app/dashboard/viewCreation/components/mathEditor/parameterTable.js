import React, { useState } from 'react';
import { Table, Empty } from 'antd';

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows
    );
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === 'Disabled User',
    // Column configuration not to be checked
    name: record.name,
  }),
};
const ParameterTable = (props) => {
  const [selectionType, setSelectionType] = useState('checkbox');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  // const paramColumns = [
  //   { title: 'Parameter', dataIndex: 'Parameter', key: '1' },
  //   { title: 'Primary', dataIndex: 'Primary', key: '2' },
  //   { title: 'Aggregation', dataIndex: 'Aggregation', key: '3' },
  //   { title: 'B1', dataIndex: 'B1', key: '4' },
  //   { title: 'B2', dataIndex: 'B2', key: '5' },
  //   { title: 'B3', dataIndex: 'B3', key: '6' },
  //   { title: 'B4', dataIndex: 'B4', key: '7' },
  // ];

  const selectRow = (record) => {
    const selectedRowKey = [...selectedRowKeys];
    if (selectedRowKey.indexOf(record.key) >= 0) {
      selectedRowKey.splice(selectedRowKey.indexOf(record.key), 1);
    } else {
      selectedRowKey.push(record.key);
    }
    setSelectedRowKeys(selectedRowKey);
  };

  const onSelectedRowKeysChange = (selectedRowKey) => {
    setSelectedRowKeys(selectedRowKey);
  };

  return (
    <Table
      rowClassName={(index) =>
        index % 2 === 0 ? 'table-row-light' : 'table-row-dark'
      }
      locale={{
        emptyText: (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <span>Add parameters from under the Process Hierarchy</span>
            }
          />
        ),
      }}
      // rowSelection={{
      //   type: selectionType,
      //   ...rowSelection,
      // }}
      rowKey='id'
      rowSelection={{
        selectedRowKeys,
        onChange: () => {
          onSelectedRowKeysChange();
        },
      }}
      columns={props.selectedParamColumn}
      dataSource={props.selectedParamData}
      size='small'
      scroll={{ y: 450 }}
      pagination={false}
      onRow={(record) => ({
        onClick: () => {
          selectRow(record);
        },
      })}
    />
  );
};

export default ParameterTable;
