import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import './styles.scss';
import { CheckCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { Checkbox, Form, Input, Select, Table, Tag, Card } from 'antd';
import { functionTextName } from '../../../../../duck/actions/viewCreationAction';

const { Option } = Select;

const Editorcolumns = [
    {
        title: 'Math Editor',
        key: 'batch',
        dataIndex: 'batch',
    },
];

const FunctionEditor = (props) => {
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
        functionName,
        setFunctionName,
        form,
        functionText,
        setFunctionText,
        passStateFunc
    } = props;

    const dispatch = useDispatch();
    const [mathFunction, setMathFunction] = useState();
    const [data, setData] = useState([]);
    const functionData = useRef();
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
                        onClick: () => {
                            Index = rowIndex;
                        },
                    };
                },
                render: (value) => {
                    return typeof (value) === 'boolean' ? value ? (
                        <Checkbox
                            checked={value}
                            onChange={(e) => onChange(e, key, value1, Index)}
                        />
                    ) : (
                        <span className='batchClosed'>
                            <CloseOutlined />
                        </span>
                    ) : (
                        <Checkbox
                            checked={false}
                            onChange={(e) => onChange(e, key, value1, Index)}
                        />
                    );
                },
            };
            columns.push(obj);
        });
        if (functionEditorColumns.length === 2) {
            let data = [...functionEditorColumns, ...columns];
            setFunctionEditorColumns(data);
        }
    };

    const onChange = (e, key, value, rowIndex) => {
        console.log('checked = ', e.target.checked, key, value);
        console.log(rowIndex);
        console.log(functionData.current);
        let filteredRecord = [...functionData.current];
        //filteredRecord[rowIndex] = { ...filteredRecord[rowIndex] }
        filteredRecord[rowIndex][key] = e.target.checked == false ? "" : e.target.checked;
        console.log(filteredRecord);
        setFunctionEditorRecord(filteredRecord)



    };

    const onChangeParameterHandler = (value) => {
        console.log('valuess', value);
        let indexDuplicate = functionEditorRecord.findIndex(
            (x) => x.param == value
        );
        let filteredParameter = viewSummaryTable.filter(
            (el) => el.param == value
        );

        if (indexDuplicate < 0) {
            setFunctionEditorRecord([
                ...functionEditorRecord,
                ...filteredParameter,
            ]);
            setFunctionName(value)
        }




    };

    const mathEditorFunction = (value) => {
        setMathFunction(value);
        let data= [...functionEditorRecord];
        let obj={},count=1;
        if(value!='round'|| value!='union'){
           data.forEach((item,i)=>{
               if(i==0){
                   obj={...item};
               }else{
                   Object.entries(item).forEach(([key,value],index)=>{
                    if(key.includes("B")){
                       // console.log(key,value);
                        obj[key]=obj[key]&& item[key]
                        obj.param=item.param
                        
                    }
                   })
                       
                   }
                   
           })
           console.log(obj);
        }
        
    }

    

    useEffect(() => {
        form.setFieldsValue({ function_name: functionName, parameter: functionName })
    },[functionName]);

    useEffect(()=>{
        columnsHandler();
    },[])

    useEffect(() => {
        functionData.current = functionEditorRecord;
    }, [functionEditorRecord])

    const handlePassState=(e)=>{
        passStateFunc(e.target.value)
    }
    console.log('functionEditorColumns', functionEditorColumns);
    console.log('functionEditorRecord', functionEditorRecord);
    

    return (
        <div className='viewSummary-container functionEditor-container'>
            <div className='viewSummary-FormBlock functionEditor-FormBlock'>
                <Form.Item label='ID' name='id'>
                    <Input placeholder='Enter ID' />
                </Form.Item>
                <Form.Item label='Function Name' name='function_name'>
                    <Input placeholder='Enter Function Name' 
                    onChange={(e)=>handlePassState(e)}
                    //onChange={(e) => functionName ? setFunctionText(`${functionName}${e.target.value}`):setFunctionText(e.target.value)} 
                />
                </Form.Item>
                <Form.Item label='Aggregation' name='aggregation'>
                    <Select placeholder='Select Aggregation'>
                        <Option value='Min'>Min</Option>
                        <Option value='Mean'>Mean</Option>
                        <Option value='Max'>Max</Option>
                        <Option value='First'>First</Option>
                        <Option value='last'>last</Option>
                    </Select>
                </Form.Item>
                <Form.Item label='Parameter' name='parameter'>
                    <Select
                        placeholder='Select Parameter'
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
                <Form.Item label='Function' name='function'>
                    <Select placeholder='Select Function' onChange={mathEditorFunction}>
                        <Option value='round'>round</Option>
                        <Option value='sin'>add</Option>
                        <Option value='cos'>multiply</Option>
                        <Option value='ln'>ln</Option>
                        <Option value='exp'>exp</Option>
                        <Option value='log'>log</Option>
                    </Select>
                </Form.Item>
            </div>
            <div className='viewSummary-FormBlock MathEditor-FormBlock'>
                <div className="viewSummary-table functionBatch-table site-card-border-less-wrapper">
                    <Card title="Math Editor" bordered >
                        {mathFunction ?
                            mathFunction == 'round' ?
                                <p>{`=${mathFunction}(${functionName},`} <input type="text" style={{ height: '20px', width: '20px' }} />)</p>
                                : `=${mathFunction}(${functionName})`
                            : ''}

                    </Card>
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
};

export default FunctionEditor;
