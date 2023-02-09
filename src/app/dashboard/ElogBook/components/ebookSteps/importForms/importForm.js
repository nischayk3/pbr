import React, { useState, useEffect } from 'react';
import {
    Button, Modal, Select, Table, Avatar, Divider, Tooltip
} from 'antd';
import './importForms.scss';
import { getFormList } from '../../../../../../../src/services/eLogBookService';
import * as moment from 'moment'

function ImportForm({ isTemplateModal, sendDataToParent }) {
    const [formList, setFormList] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { Option } = Select;
    const [selectedLimit, setSelectedLimit] = useState("Newest first");
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [data, setData] = useState([])
    const [selectedRowData, setSelectedRowData] = useState([]);


    useEffect(() => {
        getFormLists()
    }, [])

    const getFormLists = async () => {
        let req = {
            data: {},
            parameters: {}
        }
        let form_list = await getFormList(req)
        setFormList(form_list.Data)
    }


    useEffect(() => {
        setIsModalVisible(isTemplateModal)
    }, [isTemplateModal])

    useEffect(() => {

    }, [data])

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const onSelectChange = (newSelectedRowKeys, selectedRows) => {
        setSelectedRowKeys(newSelectedRowKeys);
        setSelectedRowData(selectedRows)
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const columns = [
        {
            title: "Date of creation",
            dataIndex: "dateofcreation",
            key: "1",
            defaultSortOrder: "descend",
            width: '25%',
            render: (text, record) => {
                return (<p>{moment(record.created_on).format("DD MMM YYYY")}</p>)
            }
        },
        {
            title: "Form name",
            dataIndex: "form_name",
            key: "2",
            defaultSortOrder: "descend",
            width: '25%',
        },
        {
            title: "Creator",
            dataIndex: "creator",
            key: "3",
            defaultSortOrder: "descend",
            width: '50%',
            render: (text, record) => {
                return (
                    <Avatar
                        style={{
                            backgroundColor: "#0CE7CC",
                        }}

                    >
                        {record.created_by.split("")[0]?.toUpperCase()}
                    </Avatar>
                )
            }
        },

    ]

    const handleTemplate = () => {
        // var filteredArray = formList.filter(function (item) {
        //     return selectedRowKeys.indexOf(item.form_disp_id) !== -1;
        // });
        sendDataToParent(selectedRowData);
        setIsModalVisible(false)
    }
    const handleBack = () => {
        setIsModalVisible(false)
    }


    return (
        <Modal
            className="landing-modal"
            title="Form library"
            visible={isModalVisible}
            onCancel={handleCancel}
            width={1000}
            centered
            footer={null}
        >
            <div className="main-form">
                <div className="import-modal-left">
                    <p className='paragraph-text'>Select the forms you want to add to the template.</p>
                </div>

                <div className="import-modal-right">

                    <Button
                        className="custom-primary-btn back-button"
                        onClick={handleBack}
                        id='back-btn'
                    >
                        Back
                    </Button>

                    <Button
                        type='primary'
                        className='custom-secondary-btn temp-button'
                        onClick={handleTemplate}
                        id="next-btn"
                    >
                        Add to template
                    </Button>
                </div>
            </div>
            <div className="custom-table-card" style={{ margin: "10px 0" }}>
                <div className="table-header">
                    <div className="child-2">
                        <label className='filter-label'>Filter</label>
                        <Select
                            className='filter-select'
                            allowClear
                            value={selectedLimit || undefined}
                            placeholder="Select"
                        // onChange={(e, value) => { onlimitChange(e, value) }}
                        >
                            <Option value="Nevest first" key="100">
                                Newest first
                            </Option>

                        </Select>
                        <Button
                            className="custom-primary-btn "
                            type="primary"
                            onClick={() => {
                                handleFilter();
                            }}
                        >
                            Go
                        </Button>
                    </div>
                </div>
                <Table
                    style={{ color: "#F0F0F0" }}
                    size="small"
                    columns={columns}
                    dataSource={formList}
                    scroll={{ y: 200 }}
                    rowKey="form_disp_id"
                    rowSelection={rowSelection}
                    pagination={{
                        total: 85,
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                        defaultPageSize: 20,
                        defaultCurrent: 1, position: ['topRight']
                    }}

                    bordered
                />
            </div>
        </Modal >
    )
}

export default ImportForm
