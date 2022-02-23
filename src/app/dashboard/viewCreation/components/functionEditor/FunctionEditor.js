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


const FunctionEditor=(props) =>{
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
        setNewBatchData


    } = props;

    const [checkboxChecked, setCheckboxChecked] = useState(true);
    const [data, setData] = useState([]);



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
        Object.entries(newBatchData).forEach(([key, value1], index) => {
            let Index = 0;
            let obj = {
                title: `B${++index}`,
                key: index,
                dataIndex: key,
                width: 100,
                onCell: (record, rowIndex) => {
                    return {
                        onClick: () => { Index = rowIndex },

                    };

                },
                render: value => {

                    return (
                        value ? (
                            <Checkbox
                                checked={value}
                                onChange={(e) => onChange(e, key, value1, Index)}
                            />
                            
                        ) : (
                            <span className="batchClosed">
                                <CloseOutlined />
                            </span>
                        )
                    )
                }

            };
            columns.push(obj);
        });
        if (functionEditorColumns.length === 3) {
            let data = [...functionEditorColumns, ...columns];
            setFunctionEditorColumns(data);
        }

    };

    const onChange = (e, key, value, rowIndex) => {
        console.log(props);
        console.log('checked = ', e.target.checked, key, value);
        console.log(rowIndex);
        // let filteredRecord = [...functionEditorRecord];
        // filteredRecord[rowIndex]={...filteredRecord[rowIndex]}
        // filteredRecord[rowIndex][key] = e.target.checked;
        // console.log(filteredRecord);
        // setFunctionEditorRecord(filteredRecord)



    };

    const onChangeParameterHandler = value => {
        console.log("valuess", value);
        let filteredParameter = viewSummaryTable.filter((el) => el.param == value);
        setFunctionEditorRecord([...functionEditorRecord, ...filteredParameter]);

    };

    useEffect(() => {
        columnsHandler();
    });

    console.log('functionEditorColumns', functionEditorColumns);
    console.log('functionEditorRecord', functionEditorRecord);

    return (
        <div className="viewSummary-container functionEditor-container">
            <div className="viewSummary-FormBlock functionEditor-FormBlock">
                <Form.Item label="ID" name="id">
                    <Input placeholder="Enter ID" />
                </Form.Item>
                <Form.Item label="Function Name" name="functionName">
                    <Input placeholder="Enter Function Name" />
                </Form.Item>
                <Form.Item label="Aggregation" name="aggregation">
                    <Select placeholder="Select Aggregation">
                        <Option value="1">Min</Option>
                        <Option value="2">Mean</Option>
                        <Option value="3">Max</Option>
                        <Option value="4">First</Option>
                        <Option value="5">last</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Parameter" name="parameter">
                    <Select placeholder="Select Parameter"
                        onChange={onChangeParameterHandler}

                    >
                        {viewSummaryTable.map((item, i) => {
                            return (
                                <Option value={item.param} key={i}>
                                    {item.param}
                                </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
                <Form.Item label="Function" name="function">
                    <Select placeholder="Select Function">
                        <Option value="1">round</Option>
                        <Option value="2">sin</Option>
                        <Option value="3">cos</Option>
                        <Option value="4">ln</Option>
                        <Option value="5">exp</Option>
                        <Option value="6">log</Option>
                    </Select>
                </Form.Item>
            </div>
            <div className="viewSummary-FormBlock MathEditor-FormBlock">
                <div>
                    <Table
                        className="viewSummary-table functionBatch-table"
                        columns={Editorcolumns}
                        dataSource={[]}
                        pagination={false}
                    />
                </div>
                <div>
                    <Table
                        className="viewSummary-table MathEditor-table"
                        columns={functionEditorColumns}
                        dataSource={functionEditorRecord}
                        scroll={{ x: 900 }}
                        pagination={false}
                        rowKey={record => record.param}


                    />
                </div>
            </div>
        </div>
    );
}

export default FunctionEditor;
