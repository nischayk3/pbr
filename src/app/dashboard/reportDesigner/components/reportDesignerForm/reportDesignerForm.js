import React, { useState } from 'react';
import { Button, Input, Select, Typography, Modal, Table } from 'antd';
import { BuildTwoTone } from '@ant-design/icons';
import './styles.scss';
// import { getCharts } from '../../../../../services/reportDesignerServices';

const { Option } = Select;
const { Text } = Typography;

const columns = [
    {
        title: 'Product Num',
        dataIndex: 'product_num',
        key: 'name',
    },
    {
        title: 'View',
        dataIndex: 'view',
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
function ReportDesignerForm(props) {
    const {
        viewId,
        setViewId,
        viewList,
        setViewList,
        status,
        setStatus,
        isLoad,
        reportName,
        setReportName,
        mapViewList,
        setViewVersion,
        reportId,
        viewIdVersion,
        setViewIdVersion,
        getChartsList,
    } = props;

    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [filterTable, setFilterTable] = useState(null);
    const [viewListviewListForm, setViewListForm] = useState(viewList);

    const search = (value) => {
        const tableData = viewList;
        const filterTable = tableData.filter((o) =>
            Object.keys(o).some((k) =>
                String(o[k]).toLowerCase().includes(value.toLowerCase())
            )
        );

        setFilterTable(filterTable);
    };

    return (
        <div className='reportDesigner-grid bg-white'>
            <div className='reportDesigner-block-left bg-white'>
                <Text className='filter-text'> Report ID </Text>
                <Text className='filter-text'>Report Name</Text>
                <Text className='filter-text'>View</Text>
                <Text className='filter-text'>Status</Text>
                <Input className='filter-button' value={reportId} disabled />
                <Input
                    className='filter-button'
                    value={reportName}
                    disabled={isLoad}
                    onChange={(e) => setReportName(e.target.value)}
                />
                <div
                    style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}
                >
                    <Select
                        className='filter-button'
                        defaultValue={viewIdVersion}
                        onChange={(e, value) => {
                            let view_value = value.value;
                            let split_view_id = view_value.split('-');
                            setViewId(split_view_id[0]);
                            setViewVersion(split_view_id[1]);
                            setViewIdVersion(view_value);
                            getChartsList(view_value);
                        }}
                        value={viewIdVersion}
                        disabled={isLoad}
                    >
                        {mapViewList.map((item) => (
                            <Option value={item.view}>{item.view}</Option>
                        ))}
                    </Select>
                    <Button
                        disabled={isLoad}
                        style={{ width: '40px' }}
                        onClick={() => setVisible(true)}
                    >
                        <BuildTwoTone
                            style={{ marginRight: '5px' }}
                            twoToneColor='#093185'
                        />
                    </Button>
                </div>
                <Input className='filter-button' value={status} disabled />
            </div>
            <Modal
                title={
                    <span>
                        Select View{' '}
                        <Input.Search
                            className='table-search'
                            placeholder='Search by...'
                            enterButton
                            onSearch={search}
                        />
                    </span>
                }
                centered
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                width={600}
            >
                <Table
                    dataSource={filterTable === null ? viewList : filterTable}
                    columns={columns}
                    pagination={false}
                    size='small'
                    onRow={(record) => ({
                        onClick: (e) => {
                            setViewId(record.view_disp_id);
                            setStatus('NEW');
                            setViewVersion(record.view_version);
                            setViewIdVersion(record.view);
                            getChartsList(record.view);
                        },
                    })}
                    scroll={{ y: 200 }}
                    // style={{ height: '200px' }}
                />
            </Modal>
        </div>
    );
}

export default ReportDesignerForm;
