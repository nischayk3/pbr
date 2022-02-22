import React, { useEffect, useState } from 'react';
import {
    ArrowLeftOutlined,
    BuildTwoTone
} from '@ant-design/icons';
import {
    Form, Select,
    Button, Modal, Table} from 'antd';
import ChartSelector from './reportDesignerFilter/chartSelector';
import ReportDesignerForm from './reportDesignerForm/reportDesignerForm';
import ReportDesignerDynamicSections from './reportDesignerDynamicSections/reportDesignerDynamicSections'
import './stylesNew.scss';
import example_json from './example.json'
import { getViews } from '../../../../services/reportDesignerServices';


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
    useEffect(()=>
    {
        getViewsList();
    },[] 
    );
    const { Option } = Select;
    const [loading, setLoading] = useState(false);
    const [isLoad, setIsLoad] = useState(false);
    const [isNew, setIsNew] = useState(false);
    const [visible, setVisible] = useState(false);
    const [popvisible, setPopVisible] = useState(false);
    const [filterTable, setFilterTable] = useState(null);
    const [viewId, setViewId] = useState('');
    const [ status, setStatus ] = useState('')
    const [viewList, setViewList] = useState('');
    const [chartId, setChartId] = useState([]);
    const [ formData, setFormData ] = useState({});
    const [form] = Form.useForm();

    const handleValuesChange = (changedValues, values) => 
    {
        setFormData(JSON.stringify(values));
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


    console.log('example_json',example_json);
    return (
        <div className="reportDesigner-container">
            <div className="reportDesigner-block">
                <h1 className="reportDesigner-headline">
                    <ArrowLeftOutlined /> Report Designer
                </h1>
                <div className="reportDesigner-btns">
                    <Button
                        className="reportDesigner-loadBtn"
                        onClick={()=>setVisible(true)}
                    >
                        Load
                    </Button>
                    <Button
                        className="reportDesigner-saveBtn"
                        
                    >
                        New
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
            />
            { isLoad ?
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
