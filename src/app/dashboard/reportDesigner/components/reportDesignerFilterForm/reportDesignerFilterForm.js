import React from 'react';
import { DatePicker, Form, Select } from 'antd';

import './styles.scss';
import Checkbox from 'antd/lib/checkbox/Checkbox';

const { Option } = Select;

function ReportDesignerFilterForm() {
    return (
        <div className="reportDesigner-filter-grid">
            <div className="reportDesigner-form-left">
                <Form.Item label="Site" name="site">
                    <Select placeholder="Select Site">
                        <Option value="1">1</Option>
                        <Option value="2">2</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Last X days" name="lastdays">
                    <Select placeholder="Select days">
                        <Option value="1">1</Option>
                        <Option value="2">2</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="From Date" name="fromDate">
                    <DatePicker />
                </Form.Item>
                <Form.Item label="To Date" name="toDate">
                    <DatePicker />
                </Form.Item>
            </div>

            <div className="reportDesigner-form-right">
                <span className="checkbox-label">Unapproved data</span>
                <Checkbox></Checkbox>
            </div>
        </div>
    );
}

export default ReportDesignerFilterForm;
