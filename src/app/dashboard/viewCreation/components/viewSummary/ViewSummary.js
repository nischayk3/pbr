import React, { useEffect, useState } from 'react';
import './styles.scss';

import {
    CheckCircleOutlined,
    CheckOutlined,
    CloseOutlined,
} from '@ant-design/icons';
import { Form, Input, Space, Table, Tag } from 'antd';
import emptyIcon from '../../../../../assets/icons/empty.svg';


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
        setViewFunctionName,
        viewFunctionName,
        saveResponseView
    } = props;

    useEffect(() => {
        onChangeColumnsHandler();
    }, [newBatchData]);

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

    const handleFunctionNameChange = (e) => {
        setViewFunctionName(e.target.value)
    }
 
    useEffect(() => {
        form.setFieldsValue({ viewId: saveResponseView.viewId, status: saveResponseView.viewStatus, version: saveResponseView.version })
    }, [saveResponseView]);


    return (
        <div className='viewSummary-container'>
            <div className='viewSummary-FormBlock'>
                <Form.Item label='View ID' name='viewId'>
                    <Input placeholder='Enter View ID' value={saveResponseView.viewId} disabled />
                </Form.Item>
                <Form.Item label='Name' name='viewName'>
                    <Input placeholder='Enter Name' value={viewFunctionName} onChange={handleFunctionNameChange} />
                </Form.Item>
                <Form.Item label='Status' name='status'>
                    <Input placeholder='Status' value={saveResponseView.viewStatus} disabled />
                </Form.Item>
                <Form.Item label='Version' value={saveResponseView.version} name='version'>
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
                        style={{ border: '1px solid #ececec', borderRadius: '2px' }}
                        rowKey={(record) => record.id}
                    />
                </div>
            )}
        </div>
    );
}

export default ViewSummary;
