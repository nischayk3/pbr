import React, { useEffect, useState } from 'react';
import './styles.scss';

import {
    CheckCircleOutlined,
    CheckOutlined,
    CloseOutlined,
} from '@ant-design/icons';
import { Form, Input, Space, Table, Tag } from 'antd';

const onClickTag = (item) => {
    // console.log('item', item)
};


function ViewSummary(props) {
    const {
        viewSummaryTable,
        setViewSummaryTable,
        parentBatches,
        setParentBatches,
        viewSummaryColumns,
        setViewSummaryColumns,
        newBatchData,
        setNewBatchData,
        functionEditorViewState,
        viewDisplayId,
        viewStatus,
        viewVersion,
        form,
        moleculeId,
    } = props;

    const onChangeColumnsHandler = () => {
        let columns = [];
        Object.entries(newBatchData).map(([key, value], index) => {
            let obj = {
                title: key,
                key: index,
                dataIndex: key,
                width: 100,
                render: (value) =>
                    value ? (
                        <span className='batchChecked'>
                            <CheckOutlined />
                        </span>
                    ) : (
                        <span className='batchClosed'>
                            <CloseOutlined />
                        </span>
                    ),
            };
            columns.push(obj);
        });

        if (viewSummaryColumns.length === 3) {
            let data = [...viewSummaryColumns, ...columns];
            setViewSummaryColumns(data);
        }
    };

    useEffect(() => {
        onChangeColumnsHandler();
    }, [newBatchData]);

    return (
        <div className='viewSummary-container'>
            <div className='viewSummary-FormBlock'>
                <Form.Item label='View ID' name='viewId'>
                    <Input placeholder='Enter View ID' disabled />
                </Form.Item>
                <Form.Item label='Name' name='viewName'>
                    <Input placeholder='Enter Name' />
                </Form.Item>
                <Form.Item label='Status' name='status'>
                    <Input placeholder='Status' disabled />
                </Form.Item>
                <Form.Item label='Version' name='version'>
                    <Input placeholder='Version' disabled />
                </Form.Item>
            </div>

            {functionEditorViewState && (
                <div className='viewSummary-TableBlock'>
                    <Table
                        className='viewSummary-table viewSummary-tablewidth'
                        pagination={false}
                        columns={viewSummaryColumns}
                        dataSource={viewSummaryTable}
                        scroll={{ x: 900 }}
                        rowKey={(record) => record.param}
                    />
                </div>
            )}
        </div>
    );
}

export default ViewSummary;
