/**
 * @author Ranjith <ranjith.k@mareana.com>
 * @Mareana - BMS PBR
 * @version 1
 * @Last Modified - 05 MAy, 2022
 * @Last Changed By - @ranjith
 */

import React, { useEffect, useState } from 'react';
import './styles.scss';

import {
    ArrowLeftOutlined,
    PlusOutlined,
    SearchOutlined,
} from '@ant-design/icons';
import {
    hideLoader,
    showLoader,
    showNotification,
} from '../../../../duck/actions/commonActions';
import {
    Card,
    Col,
    Row,
    Input,
    Divider,
    Table,
    Modal,
    Button,
    Form,
    Space,
    Radio,
    notification
} from 'antd';
import { useDispatch } from 'react-redux';
import Highlighter from 'react-highlight-words';
import illustrations from '../../../../assets/images/banner-pbr.svg';
import newTemplateModal from '../../../../assets/images/newTemplateModal.svg';
import pdfIcon from '../../../../assets/images/pdfIcon.svg';
import { getPbrTemplateData, getDataView } from '../../../../services/pbrService';
import { tableColumns } from '../../../../utils/TableColumns'
import { useHistory } from 'react-router-dom';
import { loadTemplateInfo } from '../../../../duck/actions/pbrAction';

const { Search } = Input;

function PaperBatchRecords() {
    let history = useHistory();
    const dispatch = useDispatch();
    const initialTableDataSource = [
        {
            key: '1',
            name: 'Template001',
            id: 'ID00001',
            creator: 'Nelson',
            createdOn: '30 March 2022',
        },
        {
            key: '2',
            name: 'Template002',
            id: 'ID00002',
            creator: 'Derek',
            createdOn: '1 November 2021',
        },
        {
            key: '3',
            name: 'Template003',
            id: 'ID00003',
            creator: 'Nelson',
            createdOn: '1 March 2021',
        },
        {
            key: '4',
            name: 'Template004',
            id: 'ID00004',
            creator: 'Derek',
            createdOn: '1 November 2021',
        },
        {
            key: '5',
            name: 'Template005',
            id: 'ID00005',
            creator: 'Derek',
            createdOn: '1 March 2021',
        },
    ];

    const [resultDate, setResultDate] = useState('');
    const [newTemplateModalVisible, setNewTemplateModalVisible] =
        useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [tableDataSource, setTableDataSource] = useState([]);
    const [tableDataSourceFiltered, setTableDataSourceFiltered] =
        useState(null);
    const [form] = Form.useForm();
    const [templateData, setTemplateData] = useState([])
    const [templateColumns, setTemplateColumns] = useState([])
    const [dataView, setDataView] = useState([])
    const [fileName, setFileName] = useState("")
    const [templateName, seTemplateName] = useState("")
    const [matBatch, setMatBatch] = useState({
        material_num:"",
        batch:""
    })

    useEffect(() => {
        updateDate();
        getTemplateData();
        getViewData();
        setTableDataSource(initialTableDataSource);
    }, []);

    const getTemplateData = async () => {
        let req = ``
        try {
            dispatch(showLoader());
            const tableResponse = await getPbrTemplateData(req);
            const tableColumn = tableColumns(tableResponse?.Data)
            let newArray1 = tableColumn.filter(item => item.dataIndex != 'changed_by' && item.dataIndex != 'changed_on' && item.dataIndex != 'created_by' && item.dataIndex != 'created_on' && item.dataIndex != 'cust_key' && item.dataIndex != 'pbr_template_info')
            let columns = [];
            newArray1.map(item => {
                let { title, dataIndex } = item;
                let obj = {
                    title: title,
                    dataIndex: dataIndex,
                    key: dataIndex,
                    // ...getColumnSearchProps(dataIndex, refSearchInput, searchText, setSearchText, searchedColumn, setSearchedColumn),
                    sorter: (a, b) => {

                        return a.dataIndex === null || a.dataIndex === undefined || a.dataIndex === "" ? -1 : b.dataIndex == null || b.dataIndex == undefined || b.dataIndex == "" ? 1 : a.dataIndex.toString().localeCompare(b.dataIndex)

                    },

                };
                if (item.dataIndex === "pbr_template_disp_id") {
                    obj.render = (text, row, index) => {
                        return (
                            <a onClick={() => {
                                console.log("rowww",row.pbr_template_info[0].filename)
                                history.push(`/dashboard/pbr_template?file=${row.pbr_template_info[0].filename}&temp_disp_id=${row.pbr_temp_int_id}&tempalteName=${row.pbr_template_name}`)
                                dispatch(loadTemplateInfo(row.pbr_template_info))
                            }} className='review-submission'>{text}</a>
                        )

                    }
                }
                columns.push(obj)
            })
            console.log("newArray1", tableColumn)
            console.log("newArray1", columns)
            if (tableResponse['status-code'] === 200) {
                setTemplateColumns(columns)
                setTemplateData(tableResponse.Data);
                dispatch(hideLoader());
            }
            else if (tableResponse['status-code'] === 404) {
                setTemplateData(tableResponse.Data);
                dispatch(hideLoader());
                dispatch(showNotification('error', tableResponse.Message));
            }
        }
        catch (error) {
            dispatch(hideLoader());
            dispatch(showNotification('error', error.Message));
        }
    }

    const getViewData = async () => {
        let res = await getDataView()
        setDataView(res.Data)
        setFileName(res?.Data[0]?.filename)
        setMatBatch({
            material_num:res?.Data[0]?.product_num,
            batch:res?.Data[0].batch_num
        })

    }

    function getColumnSearchProps(dataIndex) {
        return {
            filterDropdown: ({
                setSelectedKeys,
                selectedKeys,
                confirm,
                clearFilters,
            }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        // ref={node => {
                        //   this.searchInput = node;
                        // }}
                        placeholder={`Search ${dataIndex}`}
                        value={selectedKeys[0]}
                        onChange={(e) =>
                            setSelectedKeys(
                                e.target.value ? [e.target.value] : []
                            )
                        }
                        onPressEnter={() =>
                            handleSearch(selectedKeys, confirm, dataIndex)
                        }
                        style={{
                            marginBottom: 8,
                            display: 'block',
                        }}
                    />
                    <Space>
                        <Button
                            type='primary'
                            onClick={() =>
                                handleSearch(selectedKeys, confirm, dataIndex)
                            }
                            icon={<SearchOutlined />}
                            size='small'
                            style={{ width: 90 }}
                        >
                            Search
                        </Button>
                        <Button
                            onClick={() => handleReset(clearFilters)}
                            size='small'
                            style={{ width: 90 }}
                        >
                            Reset
                        </Button>
                        <Button
                            type='link'
                            size='small'
                            onClick={() => {
                                confirm({ closeDropdown: false });
                                setSearchText(selectedKeys[0]);
                                setSearchedColumn(dataIndex);
                            }}
                        >
                            Filter
                        </Button>
                    </Space>
                </div>
            ),
            filterIcon: (filtered) => (
                <SearchOutlined
                    style={{ color: filtered ? '#1890ff' : undefined }}
                />
            ),
            onFilter: (value, record) =>
                record[dataIndex]
                    .toString()
                    .toLowerCase()
                    .includes(value.toLowerCase()),
            onFilterDropdownVisibleChange: (visible) => {
                if (visible) {
                    // setTimeout(() => this.searchInput.select());
                }
            },
            render: (text) =>
                searchedColumn === dataIndex ? (
                    <Highlighter
                        highlightStyle={{
                            backgroundColor: '#ffc069',
                            padding: 0,
                        }}
                        searchWords={[searchText]}
                        autoEscape
                        textToHighlight={text.toString()}
                    />
                ) : (
                    text
                ),
        };
    }

    function handleSearch(selectedKeys, confirm, dataIndex) {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    }

    function handleReset(clearFilters) {
        clearFilters();
        setSearchText('');
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            ...getColumnSearchProps('name'),
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            ...getColumnSearchProps('id'),
            sorter: (a, b) => a.id.length - b.id.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Creator',
            dataIndex: 'creator',
            key: 'creator',
            ...getColumnSearchProps('creator'),
            sorter: (a, b) => a.creator.length - b.creator.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Created on',
            dataIndex: 'createdOn',
            key: 'createdOn',
            ...getColumnSearchProps('createdOn'),
            sorter: (a, b) => a.createdOn.length - b.createdOn.length,
            sortDirections: ['descend', 'ascend'],
        },
    ];

    const updateDate = () => {
        const date = new Date();
        const month = date.toLocaleString('default', { month: 'long' });
        const latestDate = date.getDate();
        const year = date.getFullYear();
        const resultDate = month + ' ' + latestDate + ',' + ' ' + year;
        setResultDate(resultDate);
    };

    const newTemplateModalHandler = () => {
        setNewTemplateModalVisible(true);
        dispatch(loadTemplateInfo([]))
    };

    const handleCancel = () => {
        setNewTemplateModalVisible(false);
    };

    const handleTemplateSubmit = () => {
        if (templateName == "") {
            openNotification()
        } else {
            history.push(`/dashboard/pbr_template?file=${fileName}&tempalteName=${templateName}`);
        }

    };

    function globalTemplateSearch(value) {
        const filterdDataArr = tableDataSource.filter((o) =>
            Object.keys(o).some((k) =>
                String(o[k]).toLowerCase().includes(value.toLowerCase())
            )
        );
        setTableDataSourceFiltered(filterdDataArr);
    }
    console.log("form", form.getFieldValue())
    const handleValuesChange = (changedValues, values) => {

        // setMainJson(convertToJson(values));
        console.log("changedValues", changedValues, values)
        seTemplateName(changedValues?.templateName)

    };
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const close = () => {
        console.log(
            'Notification was closed. Either the close button was clicked or duration time elapsed.',
        );
    };
    const openNotification = () => {
        const key = `open${Date.now()}`;
        const btn = (
            <Button type="primary" size="small" onClick={() => notification.close(key)}>
                Confirm
            </Button>
        );
        notification.open({
            message: 'Error',
            description:
                'Please Enter Template Name.',
            btn,
            key,
            type: "error",
            placement: "top",
            onClose: close,
        });
    };
    const onRadioChange = (val) => {
        console.log("vall",val)
        let arr = dataView.filter(item => item.filename === val)
        console.log("arrr",arr)
        setMatBatch({
            material_num:arr[0].product_num,
            batch:arr[0].batch_num
        })
    }
    

    return (
        <div className='pbr-container'>
            <div className='custom-wrapper pbr-wrapper'>
                <div className='sub-header'>
                    <div className='sub-header-title'>
                        <ArrowLeftOutlined className='header-icon' />
                        <span className='header-title'>
                            Paper Batch Records
                        </span>
                    </div>
                </div>
            </div>
            <Row className='p-28'>
                <Col span={24} className='banner'>
                    <Card bordered={false}>
                        <div className='card-body-div'>
                            <div className='text-descp'>
                                <h2>
                                    Howdy {localStorage.getItem('username')},
                                </h2>
                                <p>
                                    In the mood to draw up some snippets today?
                                </p>
                            </div>
                            <img src={illustrations} alt='banner' />
                            <h6>{resultDate}</h6>
                        </div>
                    </Card>
                </Col>
            </Row>
            <Row className='landing-content p-28'>
                <Col span={24}>
                    <Card bordered={false}>
                        <Row>
                            <Col span={6} />
                            <Col span={12} className='p36'>
                                <Search
                                    placeholder='Search by template ID, name, creator or date of creation'
                                    allowClear
                                    enterButton='Search'
                                    size='large'
                                    onSearch={globalTemplateSearch}
                                />
                            </Col>
                            <Col span={6} />
                        </Row>
                        <Row>
                            <Col span={6} />
                            <Col span={12} className='p36'>
                                <div
                                    className='create-new'
                                    onClick={newTemplateModalHandler}
                                >
                                    <PlusOutlined />
                                    <p>Create new template</p>
                                </div>
                            </Col>
                            <Col span={6} />
                        </Row>
                        <Row className='recent-charts'>
                            {/* <Col span={6} /> */}
                            <Col span={24} className='p36'>
                                <h3>Recently created templates</h3>
                                <Divider />
                                <div className='pbrTemplates-tableBlock'>
                                    <Table
                                        className='pbrTemplates-table'
                                        columns={templateColumns}
                                        dataSource={
                                            // tableDataSourceFiltered === null
                                            //     ? tableDataSource
                                            //     : tableDataSourceFiltered
                                            templateData
                                        }
                                    />
                                </div>
                            </Col>
                            {/* <Col span={6} /> */}
                        </Row>
                    </Card>
                </Col>
            </Row>

            <Modal
                className='newTemplateModal'
                title='Create new template'
                centered
                visible={newTemplateModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button
                        key='submit'
                        type='primary'
                        className='templateSubmitBtn'
                        onClick={handleTemplateSubmit}
                        onValuesChange={handleValuesChange}
                    >
                        Lets Go!
                    </Button>,
                ]}
                width={750}
            >
                <div className='newTemplate-modalBody'>
                    <Row className='recent-charts'>
                        <Col span={12} className='newTemplate-imgBlock'>
                            <img src={newTemplateModal} alt='banner' style={{ height: 150 }} />
                        </Col>
                        <Col span={12} className='newTemplate-contentBlock'>
                            <Form
                                layout='vertical'
                                form={form}
                                className='formNewTemplate'
                                name="basic"
                                onValuesChange={handleValuesChange}
                                onFinish={onFinish}
                            >
                                <div className='formNewTemplateDiv'>
                                    <Form.Item
                                        label='Template name'
                                        name='templateName'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your password!',
                                            },
                                        ]}

                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label='Status' name='status'>
                                        <Input placeholder='Draft' disabled />
                                    </Form.Item>
                                    <Form.Item
                                        label='Material number'
                                        // name='materialNumber'
                                    >
                                        <Input value={matBatch?.material_num}/>
                                    </Form.Item>
                                    <Form.Item
                                        label='Batch number'
                                        // name='batchNumber'
                                    >
                                        <Input value={matBatch?.batch}/>
                                    </Form.Item>
                                </div>

                                {/* <Radio.Group
                                    // onChange={onChange}
                                    defaultValue={dataView[0]?.filename}
                                    className='radioPdfBlock'
                                    onChange={(e) => setFileName(e.target.value)}
                                >
                                    {dataView.map((item, index) => (
                                        <Radio.Button value={`${item.filename}`} >
                                            <div className='pdfListBlock'>
                                                <img src={pdfIcon} alt='pdfIcon' />
                                                <span>{item.filename.substring(0, 15) + '...'}</span>
                                            </div>
                                        </Radio.Button>
                                    ))} */}
                                {/* <Radio.Button value='a'>
                                        <div className='pdfListBlock'>
                                            <img src={pdfIcon} alt='pdfIcon' />
                                            <span>loremipsum23.pdf</span>
                                        </div>
                                    </Radio.Button>
                                    <Radio.Button value='b'>
                                        <div className='pdfListBlock'>
                                            <img src={pdfIcon} alt='pdfIcon' />
                                            <span>loremipsum23.pdf</span>
                                        </div>
                                    </Radio.Button>
                                    <Radio.Button value='c'>
                                        <div className='pdfListBlock'>
                                            <img src={pdfIcon} alt='pdfIcon' />
                                            <span>loremipsum23.pdf</span>
                                        </div>
                                    </Radio.Button>
                                    <Radio.Button value='d'>
                                        <div className='pdfListBlock'>
                                            <img src={pdfIcon} alt='pdfIcon' />
                                            <span>loremipsum23.pdf</span>
                                        </div>
                                    </Radio.Button> */}
                                {/* </Radio.Group> */}
                            </Form>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={24} className='newTemplate-contentBlock'>
                            <Radio.Group
                                // onChange={onChange}
                                defaultValue={dataView[0]?.filename}
                                className='radioPdfBlock'
                                onChange={(e) => {
                                    setFileName(e.target.value)
                                    onRadioChange(e.target.value)
                                }}
                            >
                                {dataView.map((item, index) => (
                                    <Radio.Button value={`${item.filename}`} >
                                        <div className='pdfListBlock'>
                                            <img src={pdfIcon} alt='pdfIcon' />
                                            <span>{item.filename.split('_')[0]}</span>
                                        </div>
                                    </Radio.Button>
                                ))}
                            </Radio.Group>
                        </Col>
                    </Row>

                </div>
            </Modal>
        </div>
    );
}

export default PaperBatchRecords;
