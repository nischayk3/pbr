import React, { useEffect, useRef, useState } from 'react';

import {
    ArrowLeftOutlined,
    CloudUploadOutlined,
    FileDoneOutlined,
    Loading3QuartersOutlined,
    SaveOutlined,
    ShareAltOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    BuildTwoTone,
} from '@ant-design/icons';
import {
    Button,
    Collapse,
    Form,
    Popconfirm,
    Space,
    Tag,
    Modal,
    Select,
    Input,
    Table,
    Radio,
    Tooltip,
    message,
} from 'antd';
import StatusWrong from '../../../../assets/statusWrong.svg';
import StatusCorrect from '../../../../assets/statusCorrect.svg';

import FileUpload from './fileUpload/FileUpload';
import FunctionEditor from './functionEditor/FunctionEditor';
import Materials from './materials/Materials';
import ParameterLookup from './parameterLookup/ParameterLookup';
import ViewSummary from './viewSummary/ViewSummary';
import './styles.scss';
import {
    getViewConfig,
    getViews,
} from '../../../../services/viewCreationPublishing';

const { Panel } = Collapse;

const columns = [
    {
        title: 'Product Num',
        dataIndex: 'product_num',
        key: 'product_num',
    },
    {
        title: 'View',
        dataIndex: 'view',
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

function ViewCreation() {
    const [moleculeList, setMoleculeList] = useState([]);
    const [functionEditorRecord, setFunctionEditorRecord] = useState([]);
    const [moleculeId, setMoleculeId] = useState();
    const [materialsList, setMaterialsList] = useState([]);
    const [paramText, setParamText] = useState();
    const [filterdData, setFilterdData] = useState(null);
    const [dataLoadingState, setDataLoadingState] = useState(false);
    const [isNew, setIsNew] = useState(false);
    const [visible, setVisible] = useState(false);
    const [popvisible, setPopVisible] = useState(false);
    const [isLoad, setIsLoad] = useState(false);
    const [obj, setObj] = useState();
    const [functionEditorViewState, setFunctionEditorViewState] =
        useState(false);
    const [parentBatches, setParentBatches] = useState([]);
    const [functionName, setFunctionName] = useState("");
    const [newBatchData, setNewBatchData] = useState([]);
    const [viewList, setViewList] = useState([]);
    const [viewDisplayId, setViewDisplayId] = useState('');
    const [viewStatus, setViewStatus] = useState('');
    const [viewVersion, setViewVersion] = useState('');
    const [filterTable, setFilterTable] = useState(null);
    const [viewSummaryTable, setViewSummaryTable] = useState([]);
    const tableData = useRef();
    const [viewSummaryColumns, setViewSummaryColumns] = useState([
        {
            title: 'Action',
            key: 'action',
            width: 100,
            fixed: 'left',
            render: (text, record, index) => (
                <Popconfirm
                    title='Sure to delete?'
                    className='deleteTableAction'
                    onConfirm={() => handleRowDelete(record.param)}
                >
                    <a>Delete</a>
                </Popconfirm>
            ),
        },
        {
            title: 'Function',
            key: 'param',
            dataIndex: 'param',
            width: 150,
            fixed: 'left',
            render: (param, record, index) => (
                <Tooltip title={param}>
                    <Tag
                        color='magenta'
                        className='parameter-tag'
                        onClick={() => {
                            functionPassHandler(record, index);
                        }}
                    >
                        {param}
                    </Tag>
                </Tooltip>
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
                    {record.coverage_metric_percent === '100 %' ||
                        record.coverage_metric_percent === '100%' ? (
                        <span className='statusIcon-summary'>
                            <img src={StatusCorrect} />
                        </span>
                    ) : (
                        <span className='statusIcon-summary'>
                            <img src={StatusWrong} />
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
            dataIndex: 'param',
            width: 150,
            fixed: 'left',
            render: (text, record, index) => {
                return (
                    <input type="radio" 
                    id={text} 
                    name="a" 
                    value={text} 
                    onChange={()=>passTableData(record)}/>
                )





            }
        },
        // {
        //     title: 'Action',
        //     key: 'action',
        //     dataIndex: 'action',
        //     width: 100,
        //     fixed: 'left',
        //     render: (text, record, index) => (
        //         <>
        //             <Space size='middle'>Lock</Space>
        //         </>
        //     ),
        // },
    ]);

    //for not emptying state on rendering this component
    tableData.current = viewSummaryTable;

    const handleRowDelete = (param) => {
        const updatedSummaryTable = tableData.current.filter(
            (item) => item.param !== param
        );
        setViewSummaryTable(updatedSummaryTable);
        message.success('Function deleted successfully');
    };

    const functionPassHandler = (record, index) => {
        // console.log('row data', record, index);
        setFunctionEditorRecord((prevState) => [...prevState, record]);
        setFunctionName(record.param);

    };

    const [form] = Form.useForm();

    const handleValuesChange = (changedValues, values) => {
        // console.log('changedValues', changedValues)
        //console.log('values', JSON.stringify(values));

    };

    const saveFunctionData=()=>{
        console.log("hello");
        setViewSummaryTable([...viewSummaryTable,paramText])
    }

    const passTableData=(record)=>{
        //record.param=functionName;
        console.log(record);
        setParamText(record);
    }


    console.log('record',  viewSummaryTable);
    //Get view table data for load popup
    const getViewsList = () => {
        let req = {};
        getViews(req).then((res) => {
            setViewList(res['Data']);
        });
    };

    const loadSearchHandler = (value) => {
        const tableData = viewList;
        const filterTable = tableData.filter((o) =>
            Object.keys(o).some((k) =>
                String(o[k]).toLowerCase().includes(value.toLowerCase())
            )
        );

        setFilterTable(filterTable);
    };

    const ViewRowClicked = (record) => {
        setViewDisplayId(record.view_disp_id);
        setViewStatus(record.view_status);
        setViewVersion(record.view_version);
        message.success(`${record.view_disp_id} selected`);
    };

    const newButtonHandler = () => {
        setMoleculeList([]);
    };

    const onOkHandler = () => {
        setVisible(false);
        setIsLoad(true);
        let req = { view_disp_id: 'V5' };
        getViewConfig(req).then((res) => {
            console.log('res', res.material_id);
            setMoleculeId(res.material_id);
        });
    };

    useEffect(() => {
        getViewsList();
        form.setFieldsValue({ functionName: 'ARSENIC' });
    }, []);

    console.log('record', functionEditorRecord);
    console.log('viewList', viewList);
    return (
        <div className='reportDesigner-container viewCreation-container'>
            <div className='viewCreation-block'>
                <h1 className='reportDesigner-headline'>
                    <ArrowLeftOutlined /> Create View
                </h1>
                <div className='viewCreation-btns'>
                    <Button
                        type='text'
                        className='viewCreation-newBtn'
                        onClick={() => {
                            newButtonHandler();
                        }}
                    >
                        New
                    </Button>
                    <Button type='text' className='viewCreation-clearBtn'>
                        Clear
                    </Button>
                    <Button className='viewCreation-loadBtn' onClick={() => { setVisible(true); setIsNew(false); }}>
                        Load
                    </Button>
                    <Button className='viewCreation-saveBtn'>
                        Save
                    </Button>
                    <Button className='viewCreation-saveAsBtn'>
                        Save As
                    </Button>
                    <Button className='viewCreation-shareBtn'>
                        Share
                    </Button>
                    <Button className='viewCreation-publishBtn'>
                        Publish
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
                                                <FileUpload
                                                    viewSummaryTable={
                                                        viewSummaryTable
                                                    }
                                                    setViewSummaryTable={
                                                        setViewSummaryTable
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
                                                    functionEditorViewState={
                                                        functionEditorViewState
                                                    }
                                                    setFunctionEditorViewState={
                                                        setFunctionEditorViewState
                                                    }
                                                />
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
                                        functionEditorViewState={
                                            functionEditorViewState
                                        }
                                        viewDisplayId={viewDisplayId}
                                        viewStatus={viewStatus}
                                        viewVersion={viewVersion}
                                        formViewSummary={form}
                                    />
                                </div>
                            )}
                            {functionEditorViewState && (
                                <div className='viewCreation-functionEditor bg-white'>
                                    <h4 className='viewCreation-blockHeader'>
                                        Function Editor
                                        <div className='viewCreation-btns'>
                                        <Button className='viewCreation-saveBtn' onClick={()=>{saveFunctionData}}>
                                            Save
                                        </Button>
                                        <Button className='viewCreation-saveAsBtn'>
                                            Save As
                                        </Button>
                                    </div>
                                    </h4>
                                    <FunctionEditor
                                        form={form}
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
                                        functionName={functionName}
                                        setFunctionName={setFunctionName}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Form>
            <div>
                <Modal
                    title='Select View'
                    visible={visible}
                    onOk={() => {
                        onOkHandler();
                    }}
                    onCancel={() => setVisible(false)}
                    width={500}
                    style={{ marginRight: '800px' }}
                >
                    <Select
                        className='filter-button'
                        style={{ width: '140px' }}
                        defaultValue={viewDisplayId}
                        onChange={(e, value) => {
                            let view_value = value.value ? value.value : '';
                            let split_view_id = view_value
                                ? view_value.split('-')
                                : [];
                            setViewDisplayId(split_view_id[0]);
                        }}
                        value={viewDisplayId}
                    >
                        {viewList.map((item) => {
                            return (
                                <Option value={item.view} key={item.view}>
                                    {item.view}
                                </Option>
                            );
                        })}
                    </Select>
                    <Button onClick={() => setPopVisible(true)}>
                        <BuildTwoTone twoToneColor='#093185' />
                    </Button>
                </Modal>
                <Modal
                    title='Select View'
                    visible={popvisible}
                    onOk={() => setPopVisible(false)}
                    onCancel={() => setPopVisible(false)}
                    width={800}
                    title={
                        <span>
                            Select View
                            <Input.Search
                                className='table-search'
                                placeholder='Search by...'
                                enterButton
                                onSearch={loadSearchHandler}
                                style={{ marginBottom: '40px' }}
                            />
                        </span>
                    }
                    centered
                    // bodyStyle={{height: 400}}
                    width={600}
                >
                    <Table
                        dataSource={
                            filterTable === null ? viewList : filterTable
                        }
                        columns={columns}
                        onRow={(record) => ({
                            onClick: (e) => {
                                ViewRowClicked(record);
                            },
                        })}
                        //loading={loading}
                        scroll={{ y: 200 }}
                        size='small'
                        pagination={false}
                        rowKey={(record) => record.view}
                    />
                </Modal>
            </div>
        </div>
    );
}

export default ViewCreation;
