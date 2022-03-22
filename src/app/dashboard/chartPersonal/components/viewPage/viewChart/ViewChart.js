import React from 'react';
import './viewChartStyles.scss';
//antd imports
import { Row, Col, Input, Select, Divider, Switch, Tag, Tooltip, Table } from 'antd';
//components
import InputField from '../../../../../../components/InputField/InputField';
import SelectField from '../../../../../../components/SelectField/SelectField';

//unpacking antd components
const { Search } = Input;
const { Option } = Select;

const ViewChart = () => {

    const columns = [
        {
            title: 'Status',
            key: 'param',
            dataIndex: 'param',
            // render: (param) => (
            //     <Tooltip title={param}>
            //         <Tag color="geekblue" className='parameter-tag'>
            //             {param}
            //         </Tag>
            //     </Tooltip>
            // ),
        },
        {
            title: 'Parameter',
            key: 'param',
            dataIndex: 'param',
            render: (param) => (
                <Tooltip title={param}>
                    <Tag color="geekblue" className='parameter-tag'>
                        {param}
                    </Tag>
                </Tooltip>
            ),
        },
        {
            title: 'Batch Coverage',
            key: 'coverage_metric' + 'coverage_metric_percent',
            dataIndex: 'coverage_metric_percent',
            render: (text, record) => (
                <span>{record.coverage_metric}({record.coverage_metric_percent})</span>
            )
        }
    ];
    return (
        <div className='view-container'>
            <Row>
                <Col span={24}>
                    <label>View ID</label>
                    <Search placeholder="Search" />
                </Col>
            </Row>
            <Row className='view-details'>
                <Col span={19}>
                    <Row gutter={16}>
                        <Col span={8}>
                            <p>View Name</p>
                        </Col>
                        <Col span={8}>
                            <p>:View Name1</p>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8}>
                            <p>Status</p>
                        </Col>
                        <Col span={8}>
                            <p>:Draft</p>
                        </Col>
                    </Row>
                </Col>
                {/* <Col span={3} /> */}
                <Col span={5} className='pb'>
                    <p>Version</p>
                    <Select>
                        <Option value="1">1</Option>
                        <Option value="2">2</Option>
                    </Select>
                </Col>
            </Row>
            <Row className='batch'>
                <Col span={24} className='pb'>
                    <p>Batch Coverage</p>
                    <Divider />
                </Col>
            </Row>
            <Row gutter={8} className='filter'>
                <Col span={6}>
                    <InputField
                        placeholder='Select Date Range'
                    // onChangeClick={(e) => handleDateClick(e)}
                    // value={selectedDateRange}
                    />
                </Col>
                <Col span={6}>
                    <SelectField
                        placeholder='Site'
                    // label='Site'
                    // onChangeSelect={(e) => handleSelectChange(e)}
                    // selectList={siteList}
                    // selectedValue={selectedSite}
                    />
                </Col>
                <Col span={12} className='unapproved'>
                    <label>Show Unapproved data</label>&nbsp;
                    <Switch type='primary' size='small' />
                </Col>
            </Row>
            <Row className='table-cont'>
                <Col span={24}>
                    <Table
                        pagination={false}
                        columns={columns}
                    // dataSource={item.parameters}
                    // rowKey={(record) => record.param}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default ViewChart