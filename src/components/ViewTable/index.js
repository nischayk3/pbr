import { Modal, Button, Table } from 'antd';
import React from 'react';

const ViewTable = (props) => {
    console.log('props view table', props);
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
    return (
        <Modal
            visible={props.isModal}
            title='View Table'
            width={600}
            // mask={true}
            onCancel={props.handleCloseModal}
            centered={true}
            footer={[
                <Button className='custom-primary-btn' key='cancel'>
                    Cancel
                </Button>,
                <Button
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
                    dataSource={data}
                    pagination={{ pageSizeOptions: ['5', '10', '15'] }}
                />
            </div>
        </Modal>
    );
};

export default ViewTable;
