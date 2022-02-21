import React from 'react';

import { Form, Input, Select } from 'antd';

import './styles.scss';

const { Option } = Select;

function ReportDesignerForm() {
    const [form] = Form.useForm();

    const handleValuesChange = (changedValues, values) => {
        console.log('changedValues', changedValues);
        console.log('values', values);
    };

    return (
        <div className="reportDesigner-grid">
            <Form
                className="report-form"
                name="report-generator-form"
                form={form}
                onValuesChange={handleValuesChange}
            >
                <div className="reportDesigner-block-left bg-white">
                    <Form.Item label="Report ID" name="reportId">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Report Name" name="reportName">
                        <Input />
                    </Form.Item>
                    <Form.Item label="View" name="view">
                        <Select placeholder="Select View">
                            <Option value="1">1</Option>
                            <Option value="2">2</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Status" name="status">
                        <Input />
                    </Form.Item>
                </div>
                <div className="reportDesigner-block-right bg-white">
                    <Form.Item label="Sharing" name="sharing">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Schedule" name="schedule">
                        <Select placeholder="Select Schedule">
                            <Option value="1">1</Option>
                            <Option value="2">2</Option>
                        </Select>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
}

export default ReportDesignerForm;
