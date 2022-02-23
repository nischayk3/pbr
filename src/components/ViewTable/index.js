import { Modal, Button, Table } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendViewId } from '../../duck/actions/chartPersonalizationAction';
import './style.scss';

const ViewTable = (props) => {
  console.log('props view table', props);
  const [selectedKeys, setselectedKeys] = useState([]);
  const [selectedViewId, setselectedViewId] = useState('');

  const dispatch = useDispatch();

  const columns = [
    {
      title: 'Product Number',
      dataIndex: 'product_num',
      key: 'product_num',
    },
    {
      title: 'View ',
      dataIndex: 'view_disp_id',
      key: 'view',
    },
    {
      title: 'View Name',
      dataIndex: 'view_name',
      key: 'view_name',
    },
    {
      title: 'Created By',
      dataIndex: 'created_by',
      key: 'created_by',
    },
  ];
  const data = props.data;

  const handleClose = () => {
    props.handleCloseModal();
    dispatch(sendViewId(selectedViewId));
  };

  return (
    <Modal
      visible={props.isModal}
      title='View Table'
      width={600}
      // mask={true}
      onCancel={props.handleCloseModal}
      centered={true}
      footer={[
        <Button
          onClick={props.handleCloseModal}
          className='custom-primary-btn'
          key='cancel'
        >
          Cancel
        </Button>,
        <Button
          onClick={handleClose}
          className='custom-secondary-btn'
          key='link'
          type='primary'
        >
          Ok
        </Button>,
      ]}
    >
      <div className='custom-table-antd'>
        <Table
          size='small'
          columns={columns}
          rowSelection={() => ({
            onChange: (selectedRowKeys, selectedRows) => {
              console.log(
                `selectedRowKeys: ${selectedRowKeys}`,
                'selectedRows: ',
                selectedRows
              );
              setselectedKeys({ selectedRowKeys });
            },
          })}
          rowKey='key'
          onRow={(record) => ({
            onClick: () => {
              //selectRow(record);
              setselectedViewId(record);
              console.log('selectedKeys', selectedKeys);
              const selectedRowKeys = [...selectedKeys];
              if (selectedRowKeys.indexOf(record.key) >= 0) {
                selectedRowKeys.splice(selectedRowKeys.indexOf(record.key), 1);
                dispatch(sendViewId(record.view_disp_id));
              } else {
                selectedRowKeys.push(record.key);
                dispatch(sendViewId(record.view_disp_id));
              }
              console.log('selectedRowKeys111', selectedRowKeys);
              setselectedKeys({ selectedRowKeys });
            },
          })}
          dataSource={data}
          pagination={{ pageSizeOptions: ['5', '10', '15'] }}
        />
      </div>
    </Modal>
  );
};

export default ViewTable;