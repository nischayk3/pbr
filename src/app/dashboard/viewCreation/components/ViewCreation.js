import React, { useEffect, useState } from 'react';

import {
    ArrowLeftOutlined,
    CloudUploadOutlined,
    FileDoneOutlined,
    Loading3QuartersOutlined,
    SaveOutlined,
    ShareAltOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
} from '@ant-design/icons';
import { Button, Collapse, Form, Space, Tag } from 'antd';

import FileUpload from './fileUpload/FileUpload';
import FunctionEditor from './functionEditor/FunctionEditor';
import Materials from './materials/Materials';
import ParameterLookup from './parameterLookup/ParameterLookup';
import ViewSummary from './viewSummary/ViewSummary';
import './styles.scss';

const { Panel } = Collapse;

function ViewCreation() {
    const [moleculeList, setMoleculeList] = useState([]);
    const [functionEditorRecord, setFunctionEditorRecord] = useState([]);
    const [moleculeId, setMoleculeId] = useState();
    const [materialsList, setMaterialsList] = useState([]);
    const [filterdData, setFilterdData] = useState(null);
    const [dataLoadingState, setDataLoadingState] = useState(false);
    const [functionEditorViewState, setFunctionEditorViewState] =
        useState(false);
    const [parentBatches, setParentBatches] = useState([]);
    const [newBatchData, setNewBatchData] = useState([]);
    const [viewSummaryTable, setViewSummaryTable] = useState([]);
    const [viewSummaryColumns, setViewSummaryColumns] = useState([
        {
            title: 'Action',
            key: 'action',
            width: 100,
            fixed: 'left',
            render: (text, record) => (
                <Space size='middle' className='deleteTableAction'>
                    Delete
                </Space>
            ),
        },
        {
            title: 'Function',
            key: 'param',
            dataIndex: 'param',
            width: 150,
            fixed: 'left',
            render: (param, record, index) => (
                <Tag
                    color='magenta'
                    className='parameter-tag'
                    onClick={() => {
                        functionPassHandler(record, index);
                    }}
                >
                    {param}
                </Tag>
            ),
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            width: 100,
            fixed: 'left',
            render: (text, record, index) => (
                <>
                    {record.coverage_metric_percent === '100 %' ? (
                        <span className='statusIcon-summary'>
                            <CheckCircleOutlined />
                        </span>
                    ) : (
                        <span className='statusIcon-summary'>
                            <CloseCircleOutlined />
                        </span>
                    )}
                </>
            ),
        },
    ]);
    const [functionEditorColumns, setFunctionEditorColumns] = useState([
        {
            title: 'Parameter',
            key: 'param',
            dataIndex: 'param',
            width: 100,
            fixed: 'left',
            render: (param, record, index) => (
                <Tag color='magenta' className='parameter-tag'>
                    {param}
                </Tag>
            ),
        },
        {
            title: 'Primary',
            key: 'primary',
            dataIndex: 'primary',
            width: 150,
            fixed: 'left',
        },
        {
            title: 'Action',
            key: 'action',
            dataIndex: 'action',
            width: 100,
            fixed: 'left',
            render: (text, record, index) => (
                <>
                    <Space size='middle'>Lock</Space>
                </>
            ),
        },
    ]);

    const functionPassHandler = (record, index) => {
        console.log('row data', record, index);
        setFunctionEditorRecord((prevState) => [...prevState, record]);
    };

    const [form] = Form.useForm();

    const handleValuesChange = (changedValues, values) => {
        // console.log('changedValues', changedValues)
        // console.log('values', values)
    };

    return (
        <div className='reportDesigner-container viewCreation-container'>
            <div className='viewCreation-block'>
                <h1 className='reportDesigner-headline'>
                    <ArrowLeftOutlined /> View
                </h1>
                <div className='viewCreation-btns'>
                    <Button type='text' className='viewCreation-clearBtn'>
                        Clear
                    </Button>
                    <Button className='viewCreation-loadBtn'>
                        <Loading3QuartersOutlined /> Load
                    </Button>
                    <Button className='viewCreation-saveBtn'>
                        <SaveOutlined /> Save
                    </Button>
                    <Button className='viewCreation-saveAsBtn'>
                        <FileDoneOutlined /> Save As
                    </Button>
                    <Button className='viewCreation-shareBtn'>
                        <ShareAltOutlined /> Share
                    </Button>
                    <Button className='viewCreation-publishBtn'>
                        <CloudUploadOutlined /> Publish
                    </Button>
                </div>
            </div>

            <Form
                className='viewSummary-form'
                name='viewSummary-form'
                layout='vertical'
                form={form}
                onValuesChange={handleValuesChange}
            >
                <div className='reportDesigner-gridBlocks viewCreation-grids'>
                    <div className='reportDesigner-grid-tables viewCreation-blocks'>
                        <div className='viewCreation-leftBlocks bg-white'>
                            <div className='viewCreation-parameterLookup'>
                                <h4 className='viewCreation-blockHeader'>
                                    Parameter Lookup
                                </h4>
                                <ParameterLookup
                                    moleculeList={moleculeList}
                                    setMoleculeList={setMoleculeList}
                                    moleculeId={moleculeId}
                                    setMoleculeId={setMoleculeId}
                                    materialsList={materialsList}
                                    setMaterialsList={setMaterialsList}
                                    filterdData={filterdData}
                                    setFilterdData={setFilterdData}
                                    dataLoadingState={dataLoadingState}
                                    setDataLoadingState={setDataLoadingState}
                                    parentBatches={parentBatches}
                                    setParentBatches={setParentBatches}
                                    viewSummaryTable={viewSummaryTable}
                                    setViewSummaryTable={setViewSummaryTable}
                                />
                            </div>
                            <div className='viewCreation-materials'>
                                <Collapse
                                    className='viewCreation-accordian'
                                    defaultActiveKey={['1']}
                                    expandIconPosition='right'
                                >
                                    {moleculeId && (
                                        <>
                                            <Panel
                                                className='viewCreation-materialsPanel'
                                                header='Materials'
                                                key='1'
                                            >
                                                <Materials
                                                    moleculeId={moleculeId}
                                                    setMoleculeId={
                                                        setMoleculeId
                                                    }
                                                    materialsList={
                                                        materialsList
                                                    }
                                                    setMaterialsList={
                                                        setMaterialsList
                                                    }
                                                    filterdData={filterdData}
                                                    setFilterdData={
                                                        setFilterdData
                                                    }
                                                    dataLoadingState={
                                                        dataLoadingState
                                                    }
                                                    setDataLoadingState={
                                                        setDataLoadingState
                                                    }
                                                    viewSummaryTable={
                                                        viewSummaryTable
                                                    }
                                                    setViewSummaryTable={
                                                        setViewSummaryTable
                                                    }
                                                    viewSummaryColumns={
                                                        viewSummaryColumns
                                                    }
                                                    setViewSummaryColumns={
                                                        setViewSummaryColumns
                                                    }
                                                    functionEditorViewState={
                                                        functionEditorViewState
                                                    }
                                                    setFunctionEditorViewState={
                                                        setFunctionEditorViewState
                                                    }
                                                    parentBatches={
                                                        parentBatches
                                                    }
                                                    setParentBatches={
                                                        setParentBatches
                                                    }
                                                    newBatchData={newBatchData}
                                                    setNewBatchData={
                                                        setNewBatchData
                                                    }
                                                />
                                            </Panel>
                                            <Panel
                                                className='viewCreation-filesPanel'
                                                header='Files'
                                                key='2'
                                            >
                                                <FileUpload />
                                            </Panel>
                                        </>
                                    )}
                                </Collapse>
                            </div>
                        </div>

                        <div className='viewCreation-rightBlocks'>
                            {moleculeId && (
                                <div className='viewCreation-viewSummary bg-white'>
                                    <h4 className='viewCreation-blockHeader'>
                                        View Summary
                                    </h4>
                                    <ViewSummary
                                        viewSummaryTable={viewSummaryTable}
                                        setViewSummaryTable={
                                            setViewSummaryTable
                                        }
                                        parentBatches={parentBatches}
                                        setParentBatches={setParentBatches}
                                        viewSummaryColumns={viewSummaryColumns}
                                        setViewSummaryColumns={
                                            setViewSummaryColumns
                                        }
                                        newBatchData={newBatchData}
                                        setNewBatchData={setNewBatchData}
                                    />
                                </div>
                            )}
                            {functionEditorViewState &&(
                                <div className='viewCreation-functionEditor bg-white'>
                                    <h4 className='viewCreation-blockHeader'>
                                        Function Editor
                                    </h4>
                                    <FunctionEditor
                                        parentBatches={parentBatches}
                                        setParentBatches={setParentBatches}
                                        functionEditorColumns={
                                            functionEditorColumns
                                        }
                                        setFunctionEditorColumns={
                                            setFunctionEditorColumns
                                        }
                                        functionEditorRecord={
                                            functionEditorRecord
                                        }
                                        setFunctionEditorRecord={
                                            setFunctionEditorRecord
                                        }
                                        newBatchData={newBatchData}
                                        setNewBatchData={setNewBatchData}
                                        viewSummaryTable={viewSummaryTable}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Form>
        </div>
    );
}

export default ViewCreation;
