import React, { useEffect, useState } from 'react';

import './styles.scss';
import { CheckCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { Checkbox, Form, Input, Select, Table, Tag } from 'antd';

const { Option } = Select;

const Editorcolumns = [
    {
        title: 'Math Editor',
        key: 'batch',
        dataIndex: 'batch',
    },
];

function FunctionEditor(props) {
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
        parentBatches,
        setParentBatches,
        functionEditorColumns,
        setFunctionEditorColumns,
        functionEditorRecord,
        setFunctionEditorRecord,
        newBatchData,
        setNewBatchData,
    } = props;

    const [checkboxChecked, setCheckboxChecked] = useState(false);

    const columnsHandler = () => {
        let columns = [];
        //parentBatches.map((item, index) => {
        //     let obj = {
        //         title: `B${++index}`,
        //         key: index,
        //         dataIndex: item,
        //         width: 100,
        //         render: value =>{
        //             return (
        //                 value ? (
        //                     <span className="batchChecked">
        //                         <Checkbox
        //                             checked={checkboxChecked}
        //                             onChange={onChange}
        //                         />
        //                     </span>
        //                 ) : (
        //                     <span className="batchClosed">
        //                         <CloseOutlined />
        //                     </span>
        //                 )
        //             );
        //         }

        //     };
        //     columns.push(obj);
        // });
        Object.entries(newBatchData).forEach(([key, value], index) => {
            let obj = {
                title: `B${++index}`,
                key: index,
                dataIndex: key,
                width: 100,
                render: (value) =>
                    value ? (
                        <Checkbox
                            checked={checkboxChecked}
                            onChange={onChange}
                        />
                    ) : (
                        <span className='batchClosed'>
                            <CloseOutlined />
                        </span>
                    ),
            };
            columns.push(obj);
        });
        let data = [...functionEditorColumns, ...columns];
        setFunctionEditorColumns(data);
    };

    const onChange = (e) => {
        // console.log('checked = ', e.target.checked);
        setCheckboxChecked(e.target.checked);
    };

    useEffect(() => {
        columnsHandler();
    }, [newBatchData]);

    return (
        <div className='viewSummary-container functionEditor-container'>
            <div className='viewSummary-FormBlock functionEditor-FormBlock'>
                <Form.Item label='ID' name='id'>
                    <Input placeholder='Enter ID' />
                </Form.Item>
                <Form.Item label='Function Name' name='functionName'>
                    <Input placeholder='Enter Function Name' />
                </Form.Item>
                <Form.Item label='Aggregation' name='aggregation'>
                    <Select placeholder='Select Aggregation'>
                        <Option value='1'>Min</Option>
                        <Option value='2'>Mean</Option>
                        <Option value='3'>Max</Option>
                        <Option value='3'>First</Option>
                        <Option value='5'>last</Option>
                    </Select>
                </Form.Item>
                <Form.Item label='Parameter' name='parameter'>
                    <Select placeholder='Select Parameter'>
                        <Option value='1'>1</Option>
                        <Option value='2'>2</Option>
                    </Select>
                </Form.Item>
                <Form.Item label='Function' name='function'>
                    <Select placeholder='Select Function'>
                        <Option value='1'>round</Option>
                        <Option value='2'>sin</Option>
                        <Option value='3'>cos</Option>
                        <Option value='4'>ln</Option>
                        <Option value='5'>exp</Option>
                        <Option value='6'>log</Option>
                    </Select>
                </Form.Item>
            </div>
            <div className='viewSummary-FormBlock MathEditor-FormBlock'>
                <div>
                    <Table
                        className='viewSummary-table functionBatch-table'
                        columns={Editorcolumns}
                        dataSource={[]}
                        pagination={false}
                    />
                </div>
                <div>
                    <Table
                        className='viewSummary-table MathEditor-table'
                        columns={functionEditorColumns}
                        dataSource={functionEditorRecord}
                        scroll={{ x: 900 }}
                        pagination={false}
                        rowKey={(record) => record.param}
                    />
                </div>
            </div>
        </div>
    );
}

export default FunctionEditor;
