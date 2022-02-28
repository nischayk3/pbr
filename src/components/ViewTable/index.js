import './style.scss';

import { Button, Input, Modal, Table } from 'antd';
import React, { useState } from 'react';

import { SearchOutlined } from '@ant-design/icons';
import { sendView } from '../../duck/actions/chartPersonalizationAction';
import { useDispatch } from 'react-redux';

const ViewTable = (props) => {
  console.log('props view table', props);
  const [selectedKeys, setselectedKeys] = useState([]);
  const [selectedViewId, setselectedViewId] = useState('');

  const [filterData, setfilterData] = useState(null);

  const dispatch = useDispatch();

  const columns = [
    {
      title: 'Product',
      dataIndex: 'product_num',
      key: 'product_num',
    },
    {
      title: 'View ',
      dataIndex: 'view',
      key: 'view',
    },
    {
      title: 'View Name',
      dataIndex: 'view_name',
      key: 'view_name',
    },
    {
      title: 'Status',
      dataIndex: 'view_status',
      key: 'view_status',
    },
    {
      title: 'Created By',
      dataIndex: 'created_by',
      key: 'created_by',
    },
  ];
  const data = props.data;

  const handleOk = () => {
    let selectedId = selectedViewId.view_disp_id;
    let selectedVersion = selectedViewId.view_version;
    props.handleCloseModal(selectedId, selectedVersion);
    dispatch(sendView(selectedViewId));
  };

  const handleClose = () => {
    props.handleCloseModal();
  };

  const searchTable = (value) => {
    const tableData = data;
    const filterData = tableData.filter((o) =>
      Object.keys(o).some((k) =>
        String(o[k]).toLowerCase().includes(value.toLowerCase())
      )
    );

    setfilterData(filterData);
  };

  return (
    <Modal
      visible={props.isModal}
      title='View Table'
      width={600}
      closable={false}
      onCancel={handleClose}
      centered={true}
      footer={[
        <Button
          onClick={handleClose}
          className='custom-primary-btn'
          key='cancel'
        >
          Cancel
        </Button>,
        <Button
          onClick={handleOk}
          className='custom-secondary-btn'
          key='link'
          type='primary'
        >
          Ok
        </Button>,
      ]}
    >
      <div className='modal-search-bar'>
        <Input.Search
          className='modal-table-search'
          placeholder='Search by...'
          enterButton
          onSearch={searchTable}
          allowClear
          // prefix={
          //   <SearchOutlined style={{ fontSize: '16px', color: '#D7D7D7' }} />
          // }
        />
      </div>
      <div className='custom-table-antd'>
        <Table
          columns={columns}
          // rowSelection={() => ({
          //   onChange: (selectedRowKeys, selectedRows) => {
          //     console.log(
          //       `selectedRowKeys: ${selectedRowKeys}`,
          //       'selectedRows: ',
          //       selectedRows
          //     );
          //     setselectedKeys({ selectedRowKeys });
          //   },
          // })}
          rowKey='key'
          onRow={(record) => ({
            onClick: () => {
              //selectRow(record);
              setselectedViewId(record);
              console.log('selectedKeys', selectedKeys);
              const selectedRowKeys = [...selectedKeys];
              if (selectedRowKeys.indexOf(record.key) >= 0) {
                selectedRowKeys.splice(selectedRowKeys.indexOf(record.key), 1);
                dispatch(sendView(record.view_disp_id));
              } else {
                selectedRowKeys.push(record.key);
                dispatch(sendView(record.view_disp_id));
              }
              console.log('selectedRowKeys111', selectedRowKeys);
              setselectedKeys({ selectedRowKeys });
            },
          })}
          dataSource={filterData === null ? data : filterData}
          size='small'
          scroll={{ y: 300 }}
          pagination={false}
        />
      </div>
    </Modal>
  );
};

export default ViewTable;
