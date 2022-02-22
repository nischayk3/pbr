import React, { useEffect, useState } from 'react';
import {
    ArrowLeftOutlined,
    BuildTwoTone,
} from '@ant-design/icons';
import {
    Form,
    Select,
    Button,
    Modal,
    Table,
} from 'antd';
import ChartSelector from './reportDesignerFilter/chartSelector';
import ReportDesignerForm from './reportDesignerForm/reportDesignerForm';
import ReportDesignerDynamicSections from './reportDesignerDynamicSections/reportDesignerDynamicSections'
import './stylesNew.scss';
import example_json from './example.json'
import { getViews, getCharts } from '../../../../services/reportDesignerServices';


const columns = [
    {
        title: 'Product Num',
        dataIndex: 'product_num',
        key: 'name',
    },
    {
        title: 'View ID',
        dataIndex: 'view_disp_id',
        key: 'view_disp_id',
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

function ReportDesignerNew() {

    const { Option } = Select;
    const [loading, setLoading] = useState(false);
    const [isLoad, setIsLoad] = useState(false);
    const [reportName, setReportName] = useState('');
    const [isNew, setIsNew] = useState(false);
    const [visible, setVisible] = useState(false);
    const [popvisible, setPopVisible] = useState(false);
    const [filterTable, setFilterTable] = useState(null);
    const [viewId, setViewId] = useState('');
    const [viewVersion, setViewVersion] = useState('');
    const [ chartList, setChartList ] = useState([]);
    const [ status, setStatus ] = useState('');
    const [viewList, setViewList] = useState('');
    const [chartId, setChartId] = useState([]);
    const [ formData, setFormData ] = useState({});
    const [ mainJson, setMainJson] = useState({
        view:viewId,
        chartIdList:[],
        reportName:reportName
    });
    const [form] = Form.useForm();

    useEffect(()=>
    {
        getViewsList();
    },[] 
    );

    const handleValuesChange = (changedValues, values) => 
    {
        setFormData(convertToJson(values));
    };
    
    const getViewsList = () =>
    {
        let req={};
        getViews(req).then((res)=>
        {
            console.log(res);
            setViewList(res['Data']);
        });
    };
   
    const getChartsList = () =>
    {
        let req=viewId;
        getCharts(req).then((res)=>
        {
            console.log(res);
            setChartList(res['Data']);
        });
    };


    
    const convertToJson = (jay) =>
    { 
        let arr={};
        let section_arr=[];

        jay=jay['response'];
        jay.map((item,index)=>{
            let obj={};
            obj['heading']=item.sectionName;
            if(index==0)
                obj['numbered']=true;
            else
                obj['numbered']=false;
            let content_arr=[];
            content_arr=item.dymamic_rows.map((i)=>
            {
                let objj={};
                objj[i.keyName]=i.value;

                return objj;
            });
            obj['content']=[Object.assign({}, ...content_arr)];

            if(index==0)
                arr['titlepage']=obj;
            else
                section_arr.push(obj);
        });
        arr['sections'] = section_arr;

        return arr;
    };

    const search = (value) => 
    {
        console.log(value);
        const tableData = viewList;
        const filterTable = tableData.filter((o) =>
            Object.keys(o).some((k) =>
                String(o[k]).toLowerCase().includes(value.toLowerCase())
            )
        );
        setFilterTable(filterTable);
    };


    console.log('example_json',formData);
    return (
        <div className="reportDesigner-container">
            <div className="reportDesigner-block">
                <h1 className="reportDesigner-headline">
                    <ArrowLeftOutlined /> Report Designer
                </h1>
                <div className="reportDesigner-btns">
                    
                    <Button
                        className="reportDesigner-saveBtn"
                        onClick={()=>{ setIsNew(true); setIsLoad(false); }}                   
                    >
                        New
                    </Button>
                    <Button
                        className="reportDesigner-loadBtn"
                        onClick={()=> {setVisible(true); setIsNew(false); setIsLoad(true);}}
                    >
                        Load
                    </Button>
                    <Button
                        className="reportDesigner-loadBtn"
                        onClick={()=>setVisible(true)}
                    >
                        Save
                    </Button>
                    <Button
                        className="reportDesigner-loadBtn"
                        onClick={()=>setVisible(true)}
                    >
                        Save As
                    </Button>
                    <Button
                        className="reportDesigner-loadBtn"
                        onClick={()=>setVisible(true)}
                    >
                        Test
                    </Button>
                    <Button
                        className="reportDesigner-shareBtn"
                        type="primary"
                        style={{backgroundColor:'#093185',color:'white'}}
                    >
                        Publish
                    </Button>
                </div>
            </div>

           
            <ReportDesignerForm
                viewId={viewId}
                setViewId={setViewId}
                viewList={viewList}
                setViewList={setViewList}
                setStatus={setStatus}
                status={status}
                isLoad={isLoad}
                setIsLoad={setIsLoad}
                reportName={reportName}
                setReportName={setReportName}
                isNew={isNew}
                setIsNew={setIsNew}
            />

            { isLoad || isNew ?
                <div className="reportDesigner-grid-tables">
                    <ChartSelector 
                        chartId={chartId}
                        setChartId={setChartId}
                    />
                    <Form
                        className="report-form"
                        name="report-generator-form"
                        form={form}
                        onValuesChange={handleValuesChange}
                        // initialValues={example_json}
                    >
                        <ReportDesignerDynamicSections formData={formData} />
                    </Form>
                    
                </div> : <></>}


            <Modal
                title="Select View"
                visible={visible}
                onOk={() =>{ setVisible(false);
                    setIsLoad(true);
                }}
                onCancel={() => setVisible(false)}
                width={500}
                style={{marginRight:'800px'}}
            >  
                <Select className="filter-button" defaultValue={viewId} onChange={(e, value) => {
                    return setViewId(value);
                }}
                value={viewId}
                >

                </Select>
                <Button onClick={() => setPopVisible(true)}><BuildTwoTone twoToneColor="#093185" /></Button>
            </Modal>
            <Modal
                title="Select View"
                visible={popvisible}
                onOk={() => setPopVisible(false)}
                onCancel={() => setPopVisible(false)}
                width={500}
                style={{marginLeft:'700px'}}
                bodyStyle={{height: 400}}
            >  
                <Table
                    dataSource={filterTable === null ? viewList : filterTable}
                    columns={columns}
                    onRow={record => ({
                        onClick: e => {
                            setViewId(record.view_disp_id);
                            setStatus(record.view_status);
                        }
                    })}
                    loading={loading}
                    scroll={{y:200}}
                    style={{ height: '200px' }}
                    pagination={false}
                />
            </Modal>
        </div>
    );
}

export default ReportDesignerNew;
