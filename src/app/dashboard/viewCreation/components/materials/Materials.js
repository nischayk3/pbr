import React, { useEffect, useState } from 'react';

import './styles.scss';
import { PlusSquareOutlined } from '@ant-design/icons';
import { Button, Collapse, message, Spin, Table, Tag, Tooltip } from 'antd';
const { Panel } = Collapse;

function Materials(props) {
    const {
        moleculeId,
        setMoleculeId,
        materialsList,
        setMaterialsList,
        filterdData,
        setFilterdData,
        dataLoadingState,
        setDataLoadingState,
        viewSummaryTable,
        setViewSummaryTable,
        viewSummaryColumns,
        setViewSummaryColumns,
        functionEditorViewState,
        setFunctionEditorViewState,
        parentBatches,
        setParentBatches,
        newBatchData,
        setNewBatchData,
    } = props;

    const columns = [
        {
            title: 'Parameter',
            key: 'param',
            dataIndex: 'param',
            render: (param) => (
                <Tooltip title={param}>
                    <Tag color='magenta' className='parameter-tag'>
                        {param}
                    </Tag>
                </Tooltip>
            ),
        },
        {
            title: 'Batch',
            key: 'coverage_metric_percent',
            dataIndex: 'coverage_metric_percent',
        },
        {
            title: 'Coverage',
            key: 'coverage_metric',
            dataIndex: 'coverage_metric',
        },
        {
            title: '',
            key: 'add',
            dataIndex: 'add',
            render: (text, record, index) => (
                <>
                    <span
                        className='material-addIcon'
                        onClick={() => {
                            parameterPassHandler(record, index);
                        }}
                    >
                        <PlusSquareOutlined />
                    </span>
                </>
            ),
        },
    ];

    const parameterPassHandler = (record, index) => {
        console.log('record materials', record, index);
        let rowData = {};
        let batchData = {};
        let newBatchData = {};
        // record.coverage_list.map((item, index) => {
        //     let item_key = item;
        //     batchData[`B${++index}`] = item_key;
        // });

        parentBatches.map((el, index) => {
            console.log(el, record.coverage_list.includes(el));
            if (record.coverage_list.includes(el)) {
                batchData[`B${++index}`] = true;
                newBatchData[`B${index}`] = true;
            } else {
                batchData[`B${++index}`] = false;
                newBatchData[`B${index}`] = false;
            }
        });

        //check for duplicate records
        const indexDuplicate = viewSummaryTable.findIndex(
            (x) => x.param == record.param
        );
        if (indexDuplicate === -1) {
            rowData = Object.assign(record, batchData);
            //delete rowData['coverage_list'];
            let data = [...viewSummaryTable];
            data.push(rowData);
            setNewBatchData(newBatchData);
            setViewSummaryTable([...data]);
            setFunctionEditorViewState(true);
        } else {
            // message.error('Function already exists');
        }
    };

    return (
        <div className='materials-wrapper'>
            <Collapse
                accordion
                className='materials-accordion'
                expandIconPosition='right'
            >
                {!dataLoadingState ? (
                    <div className='loadSpinner-block'>
                        <Spin />
                    </div>
                ) : filterdData != null ? (
                    filterdData.map((item, index) => {
                        return (
                            <Panel
                                className='materials-panel'
                                header={item.product}
                                key={index}
                            >
                                <Table
                                    className='viewSummary-table materialsList-table borderless-table'
                                    pagination={false}
                                    columns={columns}
                                    dataSource={item.parameters}
                                    rowKey={(record) => record.param}
                                />
                            </Panel>
                        );
                    })
                ) : (
                    materialsList.map((item, index) => {
                        return (
                            <Panel
                                className='materials-panel'
                                header={item.product}
                                key={index}
                            >
                                <Table
                                    className='viewSummary-table materialsList-table borderless-table'
                                    pagination={false}
                                    columns={columns}
                                    dataSource={item.parameters}
                                    rowKey={(record) => record.param}
                                />
                            </Panel>
                        );
                    })
                )}
            </Collapse>
        </div>
    );
}

export default Materials;
