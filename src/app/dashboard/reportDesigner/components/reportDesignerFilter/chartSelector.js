import React from 'react';
import {
    Card,
    Select,
    Table,
    Typography,
    DatePicker,
    Checkbox,
    Input,
} from 'antd';
import './styles.scss';

const { Option } = Select;
const { Text } = Typography;

const columns = [
    {
        title: 'Multi Select',
        dataIndex: 'multi',
        render: (item) => (
            <>
                {item === 'yes' ? (
                    <Checkbox checked={true} />
                ) : (
                    <Checkbox checked={false} />
                )}
            </>
        ),
    },
    {
        title: 'Chart ID',
        dataIndex: 'chart_id',
        key: 'age',
    },
    {
        title: 'ID Name',
        dataIndex: 'id_name',
        key: 'address',
    },
];

const data = [
    {
        key: '1',
        multi: 'yes',
        chart_id: 'Exclusion/Shift/Trend',
        id_name: '',
    },
    {
        key: '1',
        multi: 'no',
        chart_id: 'Rule Violation',
        id_name: '',
    },
    {
        key: '1',
        multi: 'yes',
        chart_id: 'Parameters',
        id_name: '',
    },
    {
        key: '1',
        multi: 'no',
        chart_id: 'Exclusions',
        id_name: '',
    },
];

function ChartSelector() {
    return (
        <div>
            <Card className = "chartid-main">
                <p className = "chartid-text">Chart ID</p>
                <Select className = "chartid-select" defaultValue="ChartId 1">
                    <Option>chartid1</Option>
                </Select>
                <Table
                    className = "chartid-table"
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                />
            </Card>
            <Card className = "site-main">
                <div className = "site-filter">
                    <Text>Site</Text>
                    <Text>Date Range</Text>
                    <Select className = "site-select" defaultValue="Site 1">
                        <Option>Site 1</Option>
                        <Option>Site 2</Option>
                    </Select>
                    <DatePicker />
                    <div>
                        <Text>Unapproved Data</Text> <Checkbox className = "site-checkbox" />
                    </div>
                </div>
            </Card>
            <Card className = "schedule-main">
                <div className = "schedule-filter">
                    <Text>Report ID</Text>
                    <Text>Schedule</Text>
                    <Input value="12345" />
                    <Select className = "site-select" defaultValue="Site 1">
                        <Option>Site 1</Option>
                        <Option>Site 2</Option>
                    </Select>
                </div>
            </Card>
        </div>
    );
}

export default ChartSelector;
