import React, { useState } from 'react';

import {
    ArrowLeftOutlined,
    CloudUploadOutlined,
    FileDoneOutlined,
    Loading3QuartersOutlined,
    SaveOutlined
} from '@ant-design/icons';
import {
    Form, Select,
    Button } from 'antd';

import ChartSelector from './reportDesignerFilter/chartSelector';
import ReportDesignerForm from './reportDesignerForm/reportDesignerForm';
import './stylesNew.scss';
// import Summary from "./reportDesignerSummary/summaryCard";
import ReportDesignerDynamicSections from './reportDesignerDynamicSections/reportDesignerDynamicSections';

function ReportDesignerNew() {
    const { Option } = Select;
    const [ formData, setFormData ] = useState({});
    const [form] = Form.useForm();

    const handleValuesChange = (changedValues, values) => 
    {
        setFormData(values);
    };
  
    console.log('formdata',formData);

    const [viewId, setViewId] = useState('');

    return (
        <div className="reportDesigner-container">
            <div className="viewCreation-block">
                <h1 className="reportDesigner-headline">
                    <ArrowLeftOutlined /> Admin User
                </h1>
                <div className="viewCreation-btns">
                    <Button
                        className="viewCreation-loadBtn"
                    >
                        <Loading3QuartersOutlined /> Load
                    </Button>
                    <Button
                        className="viewCreation-saveBtn"
                    >
                        <SaveOutlined /> Save
                    </Button>
                    <Button className="viewCreation-saveAsBtn">
                        <FileDoneOutlined /> Save As
                    </Button>
                    <Button
                        className="viewCreation-shareBtn"
                    >
                        <CloudUploadOutlined /> Publish
                    </Button>
                </div>
            </div>

            <Form
                className="report-form"
                name="report-generator-form"
                form={form}
                onValuesChange={handleValuesChange}
            >
                <ReportDesignerForm
                    viewId={viewId}
                    setViewId={setViewId}
                />
                <div className="reportDesigner-grid-tables">
                    <ChartSelector />
                    <ReportDesignerDynamicSections formData={formData} />
                </div>

            </Form>
        </div>
    );
}

export default ReportDesignerNew;
