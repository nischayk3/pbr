import React, { useEffect, useState } from 'react';

import './styles.scss';
import { PlusSquareOutlined } from '@ant-design/icons';
import { Button, Collapse, Spin, Table, Tag } from 'antd';
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
    } = props;

    const columns = [
        {
            title: 'Parameter',
            key: 'param',
            dataIndex: 'param',
            render: (param) => (
                <Tag color='magenta' className='parameter-tag'>
                    {param}
                </Tag>
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
            title: 'Add',
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
        let rowData = {};
        let batchData = {};
        record.coverage_list.map((item, index) => {
            let item_key = item;
            batchData[item_key] = item_key;
        });
        rowData = Object.assign(record, batchData);
        delete rowData['coverage_list'];
        let data = [...viewSummaryTable];
        data.push(rowData);
        setViewSummaryTable([...data]);
        setFunctionEditorViewState(true);
    };

    console.log('viewSummaryTable', viewSummaryTable);
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
