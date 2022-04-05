/**
 * @author Mihir Bagga <mihir.bagga@mareana.com>
 * @Mareana - CPV Product
 * @version 1
 * @Last Modified - 14 March, 2022
 * @Last Changed By - @Mihir 
*/

import React, { useEffect, useState } from 'react';
import {
    Button,
    Card,
    Collapse,
    Typography,
    Modal,
    Radio,
    Space,
    Select,
    message,
    Input,
    Table,
    DatePicker,
    Divider,
    Popconfirm,
    Tag
} from 'antd';
import { ArrowLeftOutlined, BlockOutlined, DeleteOutlined, SendOutlined, ReloadOutlined, DeleteTwoTone, ClockCircleTwoTone } from '@ant-design/icons';
import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getReports } from '../../../../services/reportDesignerServices';
import ReportDesignerForm from '../components/reportGeneratorHeader';
import { sendReport, screenChange } from '../../../../duck/actions/reportDesignerAction';
import { saveReportGenerator, getReportGenerator } from '../../../../services/reportGeneratorServices';
import SaveModal from '../../../../components/SaveModal/saveModal'
import {
    hideLoader,
    showLoader,
    showNotification
} from '../../../../duck/actions/commonActions';
import { Tabs } from 'antd';
import Chart from '../../reportDesigner/components/reportChart/chartComponent/chartComponent'


const { Panel } = Collapse;
const { Text } = Typography;
const { Option } = Select
const { TabPane } = Tabs;

const columns = [
    {
        title: 'Report ID',
        dataIndex: 'rep_disp_id',
        key: 'rep_disp_id',
        render: (text, record) => {
            return {
                props: {
                    style: { background: record.color },
                },
                children: <div>{text}</div>,
            };
        },
    },
    {
        title: 'Report Name',
        dataIndex: 'rep_name',
        key: 'rep_name',
        render: (text, record) => {
            return {
                props: {
                    style: { background: record.color },
                },
                children: <div>{text}</div>,
            };
        },

    },
    {
        title: 'Report Status',
        dataIndex: 'rep_status',
        key: 'rep_status',
        render: (text, record) => {
            return {
                props: {
                    style: { background: record.color },
                },
                children: <div>{text}</div>,
            };
        },
    },
    {
        title: 'Created By',
        dataIndex: 'created_by',
        key: 'created_by',
        render: (text, record) => {
            return {
                props: {
                    style: { background: record.color },
                },
                children: <div>{text}</div>,
            };
        },
    },
];


function ReportGenerator() {

    const repotData = useSelector(
        (state) => state.reportDesignerReducer.reportData
    );

    function onChange(checkedValues, i) {
        update_object(checkedValues, i)
    }

    const [visible, setVisible] = useState(false)
    const [isvisible, setIsVisible] = useState(false)
    const [ReportData, setReportData] = useState(repotData)
    const [chart, setCharts] = useState([])
    const [table, setTable] = useState([])
    const [schedule, setSchedule] = useState('')
    const [emailList, setEmailList] = useState([])
    const [isSave, setIsSave] = useState(false);    // const [selectedUser, setSelectedUser] = useState(false)
    const [reportId, setReportId] = useState('')
    const [reportName, setReportName] = useState('')
    const [reportStatus, setReportStatus] = useState('')
    const [reportList, setReportList] = useState('')
    const [popvisible, setPopVisible] = useState(false);
    const [filterTable, setFilterTable] = useState(null);
    const [openSchedule, setOpenSchedule] = useState(false);
    const [chartLayout, setChartLayout] = useState({});
    const [viewId, setViewId] = useState('')
    // const [ sectionCharts,setSectionCharts] = 
    const dispatch = useDispatch();

    useEffect(() => {
        unloadTest(ReportData)
    }, [ReportData]
    );

    useEffect(() => {
        getReportList()
    }, []
    );

    const getReportList = () => {
        let req = { rep_status: 'all' };
        getReports(req).then((res) => {
            setReportList(res['Data']);
        });
    };

    const mapReportList = reportList && reportList.length > 0 ? reportList : []

    const createArraObj = (arr) => {
        let res = []
        arr.map((i) => {
            let chart = {}
            chart['chart'] = i
            chart['excursion'] = false
            chart['violation'] = false
            chart['parameter'] = false
            chart['exclusion'] = false

            res.push(chart)
        })
        return res
    }

    const radioSchedule = (e) => {
        setSchedule(e.target.value);
    };

    const handleChange = selectedItems => {
        setEmailList(selectedItems);
    };


    const getTableData = (obj, rep_layout) => {

        let headingList = []
        let allSections = []
        let titleHeading = obj['titlepage'] && obj['titlepage'].heading ? obj['titlepage'].heading : ''
        let titleObj = obj && obj['titlepage'] ? obj['titlepage'] : ''

        headingList.push(titleHeading)
        allSections.push(titleObj)

        let headingSection = obj['sections'] ? obj['sections'] : []
        allSections = [...allSections, ...headingSection]

        for (let i = 0; i < allSections.length; i++) {
            allSections[i].charts = rep_layout[i + 1]
        }

        return allSections
    }

    // const convertToList =  (a) =>
    // {   if(a.length > 0)
    //     {
    //     let b= a.replace("{",'')
    //     b= b.replace("}",'')
    //     b=b.split(',')
    //     if(b.length>0)
    //     return b
    //     else
    //     return []
    //     }
    // }

    const unloadTest = (ReportData) => {
        console.log(ReportData)
        dispatch(showLoader())
        setReportId(ReportData['rep_disp_id'] ? ReportData['rep_disp_id'] : '')
        setChartLayout(ReportData.charts_layout ? ReportData.charts_layout : {})
        setReportName(ReportData['rep_name'] ? ReportData['rep_name'] : '')
        setCharts(ReportData['chart_int_ids'] ? createArraObj(ReportData['chart_int_ids']) : [])
        setTable(ReportData['layout_info'] ? getTableData(ReportData['layout_info'], ReportData.charts_layout ? ReportData.charts_layout : {}) : {})
        setReportId(ReportData['rep_disp_id'] ? ReportData['rep_disp_id'] : '')
        setReportName(ReportData['rep_name'] ? ReportData['rep_name'] : '')
        setReportStatus(ReportData['rep_status'] ? ReportData['rep_status'] : '')
        setEmailList(ReportData.share ? ReportData.share.email_list : [])
        setSchedule(ReportData.share ? ReportData.share.frequency_unit : '')

        dispatch(hideLoader());
        // setViewId(ReportData['view_disp_id'] && ReportData['view_version'] ? ReportData['view_disp_id'] + '-' + ReportData['view_version'] : '')
    }

    const update_object = (arr, i) => {

        let objIndex = chart.findIndex((chart => chart.chart == i));
        if (arr.includes('excursion'))
            chart[objIndex].excursion = true
        else
            chart[objIndex].excursion = false
        if (arr.includes('violation'))
            chart[objIndex].violation = true
        else
            chart[objIndex].violation = false
        if (arr.includes('parameter'))
            chart[objIndex].parameter = true
        else
            chart[objIndex].parameter = false
        if (arr.includes('exclusion'))
            chart[objIndex].exclusion = true
        else
            chart[objIndex].exclusion = false

        let object = chart
        setCharts(object)

        // obj.forEach((item, i) => {
        //     let res=[]
        //         for(let key in item) {
        //           if(item[key]==true)
        //             res.push(key)
        //         }
        //     item['default']=res
        //      });

    }

    const prepareJson = () => {

        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        let time_today = h + ":" + m + ":" + s;

        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        let date_today = year + '-' + month + "-" + day

        let obj = {}
        let user_details = JSON.parse(localStorage.getItem('user_details'))
        let user = user_details["username"] ? user_details["username"] : ''

        obj['rep_disp_id'] = reportId
        obj['rep_name'] = reportName
        obj['rep_status'] = reportStatus
        obj['user'] = user
        obj['variant_name'] = user + '_variant'
        obj['chart_info'] = { charts: chart }


        let share_obj = {}
        share_obj['frequency_unit'] = schedule
        share_obj['email_list'] = emailList
        share_obj['scheduled_start'] = date_today + ' ' + time_today
        share_obj['scheduled_end'] = '2022-04-03 09:50:22'
        share_obj['frequency'] = '1'


        let layout_obj = {}
        layout_obj['titlepage'] = table[0] ? table[0] : {}
        layout_obj['sections'] = table.length > 0 ? table.filter((item, index) => index > 0) : []

        obj['layout_info'] = layout_obj
        obj['share'] = share_obj

        let req = {}
        req['data'] = obj
        req['saveType'] = 'save'

        saveReportGenerator(req).then((res) => {
            if (res.Status == 200) {
                setIsSave(true)
            }
            else {
                dispatch(showNotification('Not Saved'))
            }
        })
    }

    const search = (value) => {
        const tableData = reportList;
        const filterTable = tableData.filter((o) =>
            Object.keys(o).some((k) =>
                String(o[k]).toLowerCase().includes(value.toLowerCase())
            )
        );
        setFilterTable(filterTable);
    };


    const getReportData = async (rep_id) => {

        message.success(`${rep_id} selected`)
        dispatch(showLoader());
        let user_details = JSON.parse(localStorage.getItem('user_details'))
        let user = user_details["username"] ? user_details["username"] : ''
        let req = { username: user, report_id: rep_id };
        try {

            let response = await getReportGenerator(req)
            if (response.Status == 404) {
                dispatch(showNotification("error", 'No Data for this variant'))
                dispatch(hideLoader());
            }
            else {
                dispatch(sendReport(response))
                unloadTest(response)
                dispatch(hideLoader());
            }

        }
        catch (err) {
            dispatch(hideLoader());
            dispatch(showNotification('error', err));
        }
    }



    const handleEdit = (value, heading, k) => {
        let objIndex = table.findIndex((t => t.heading == heading));

        if (objIndex >= 0) {
            if (table[objIndex].content.length > 0) {
                let cntnt_Index = table[objIndex].content.findIndex((t => t.key == k));
                table[objIndex].content[cntnt_Index].value = value
            }
        }
    }

    console.log(table)

    return (

        <div className='custom-wrapper'>
            <div className='sub-header'>
                <div className='sub-header-title'>
                    <ArrowLeftOutlined className='header-icon' />
                    <span className='header-title'>Report Generator</span>
                </div>

                <div className='sub-header-btns'>
                    <Button className='custom-primary-btn' onClick={() => { setOpenSchedule(true); }}>
                        Notify Report
                    </Button>
                    <Button className='custom-primary-btn' onClick={() => { setIsVisible(true); }}>
                        Load
                    </Button>
                    <Button className='custom-primary-btn' onClick={() => prepareJson()}>
                        Save
                    </Button>
                    <Button className='custom-secondary-btn' onClick={() => dispatch(screenChange(false))}>
                        Generate
                    </Button>
                </div>
            </div>
            <Card title="Generate new report variant" className="table-card">
                <div className='custom-content-layout'>
                    <ReportDesignerForm />
                    <Card title="Report Table Data" className="table-card">
                        {table.length > 0 && table.map((i) =>
                            <Collapse key={i.heading} accordion bordered={false} expandIconPosition='right'>
                                <Panel header={<span className="chart-names">{i.heading} {i.charts && i.charts.length > 0 && i.charts.map((i) => (<span className="chart-tags">
                                    {i}
                                </span>))}</span>} key={i.heading} className="chart-panel">
                                    <table className="table">
                                        <tr className="tr" >
                                            <th className="th-key">
                                                Key
                                            </th>
                                            <th className="th-value">
                                                Value
                                            </th>
                                        </tr>
                                        <tbody>
                                            {i['content'] && i['content'].map((item, j) =>
                                                <tr className="tr" >
                                                    <td className="td" >{item.key}</td>
                                                    <td className="td">{item.editable == false || item.editable == undefined ? <Input.TextArea defaultValue={item.value} onChange={(e) => handleEdit(e.target.value, i.heading, item.key)} /> : <p style={{ width: '1000px' }}>{item.value}</p>} </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                    {i.charts && i.charts.length > 0 && i.charts.map((i) =>
                                    (
                                        <div>
                                            <p className="chart-name">{i} <Tag className="chart-tag" closable>Violation</Tag> <Tag className="chart-tag" closable>Exclusion</Tag> <Tag className="chart-tag" closable>Data Table</Tag> </p>
                                            <Chart />
                                        </div>
                                    ))}
                                </Panel>
                            </Collapse>
                        )}
                    </Card>
                    <Modal
                        title="Schedule"
                        visible={visible}
                        onCancel={() => setVisible(false)}
                        onOk={() => setVisible(false)}
                    >
                        <Radio.Group onChange={radioSchedule} >
                            <Space direction="vertical">
                                <Radio value="Hourly">Hourly</Radio>
                                <Radio value="Monthly">Monthly</Radio>
                                <Radio value="Daily">Daily</Radio>
                            </Space>
                        </Radio.Group> <br /> <br />

                        <Text>Users</Text> <br />
                        <Select
                            mode="tags"
                            style={{ width: '50%', marginTop: '10px' }}
                            placeholder="Select Users"
                            optionLabelProp="label"
                            value={emailList}
                            onChange={handleChange}

                        >
                            <Option value="mihir.bagga@mareana.com" label="mihir.bagga@mareana.com">
                                mihir.bagga@mareana.com
                            </Option>
                            <Option value="muskan.gupta@mareana.com" label="muskan.gupta@mareana.com">
                                muskan.gupta@mareana.com
                            </Option>
                            <Option value="binkita.tiwari@mareana.com" label="binkita.tiwari@mareana.com">
                                binkita.tiwari@mareana.com
                            </Option>
                            <Option value="someswara.rao@mareana.com" label="someswara.rao@mareana.com">
                                someswara.rao@mareana.com
                            </Option>
                            <Option value="ramaa.rao@mareana.com" label="ramaa.rao@mareana.com">
                                ramaa.rao@mareana.com
                            </Option>
                            <Option value="rahul.neogi@mareana.com" label="rahul.neogi@mareana.com">
                                rahul.neogi@mareana.com
                            </Option>
                            <Option value="vishal@mareana.com" label="vishal@mareana.com">
                                vishal@mareana.com
                            </Option>
                        </Select>
                    </Modal>

                    <Modal
                        title="Select Report"
                        visible={isvisible}
                        onCancel={() => setIsVisible(false)}
                        width={500}
                        style={{ marginRight: '800px' }}
                        footer={[<Button style={{ backgroundColor: '#093185', color: 'white', borderRadius: '4px' }} onClick={() => setIsVisible(false)} key="1">OK</Button>,]}
                    >
                        <Select className="filter-button" defaultValue={reportId} onChange={(e, value) => {
                            let view_value = value.value ? value.value : ''
                            setReportId(view_value)
                            getReportData(view_value)

                        }}
                            value={reportId}
                            showSearch
                            showArrow
                            style={{ backgroundColor: 'white', borderRadius: '4px' }}
                        >
                            {mapReportList && mapReportList.length >= 0 ? mapReportList.map((item) =>

                                <Option value={item.rep_disp_id} key={item.rep_disp_id}>{item.rep_disp_id}</Option>
                            ) : <></>}

                        </Select>
                        <Button onClick={() => setPopVisible(true)}><BlockOutlined twoToneColor="#093185" /></Button>
                    </Modal>
                    <Modal
                        title="Select Report"
                        visible={popvisible}
                        onCancel={() => setPopVisible(false)}
                        width={600}
                        title={<p>Select Report Variant  <Input.Search
                            className='table-search'
                            placeholder='Search by...'
                            enterButton
                            onSearch={search}
                            style={{ borderRadius: '4px' }}
                        /></p>}
                        centered
                        width={500}
                        footer={[<Button style={{ backgroundColor: '#093185', color: 'white', borderRadius: '4px' }} onClick={() => { setIsVisible(false); setPopVisible(false) }} key="1">OK</Button>,]}
                    >
                        <Table
                            // rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}
                            // rowHighlightTest={isStyledDifferently}
                            dataSource={filterTable === null ? reportList : filterTable}
                            columns={columns}
                            onRow={record => ({
                                onClick: e => {
                                    record['color'] = '#D3D3D3'
                                    setReportId(record.rep_disp_id)
                                    getReportData(record.rep_disp_id, record.rep_status)
                                    // onOk()
                                }
                            })}
                            scroll={{ y: 200 }}
                            size='small'
                            pagination={false}
                        />
                    </Modal>
                    <Modal
                        title={<span >Notify Report  <span style={{ marginLeft: '70%' }}><Popconfirm title="Sure to delete?" >
                            <DeleteTwoTone twoToneColor="red" />
                        </Popconfirm> <Button className="schedule-btn"><SendOutlined />Schedule</Button></span></span>}
                        visible={openSchedule}
                        onCancel={() => setOpenSchedule(false)}
                        footer={[<Button className="schedule-btn" onClick={() => { setOpenSchedule(false) }} key="1">  <SendOutlined />Schedule</Button>, <Button style={{ backgroundColor: '#093185', color: 'white', borderRadius: '4px' }} onClick={() => { setOpenSchedule(false) }} key="1">  <DeleteOutlined />Discard</Button>,]}
                        width="60%"

                    >
                        {/* <UserOutlined /> */}
                        <u>
                            <Select
                                mode="tags"
                                style={{ width: '90%', marginTop: '10px' }}
                                placeholder={<span className="email-recipients">Recipients</span>}
                                optionLabelProp="label"
                                value={emailList}
                                bordered={false}
                                onChange={handleChange}
                            >

                                <Option value="mihir.bagga@mareana.com" label="mihir.bagga@mareana.com">
                                    mihir.bagga@mareana.com
                                </Option>
                            </Select>
                        </u> <Divider />
                        <p className="email-subject">Subject <span className="email-sub">Update For  </span>{reportName}</p>
                        <Divider />
                        <p className="email-content"> Hey,<br /><br />

                            This is to inform you of the recept update to [report variant name]. Check the attachment for details.<br />
                            Visit www.cpv-mareana.com/alert-dashboard to know more.<br />
                            <br />
                            Regards,<br />
                            [variant_username]</p>
                        <Divider />
                        <span>
                            <DatePicker bordered={false} prefixIcon={<ClockCircleTwoTone />} />
                            <span className="email-freq">
                                <ReloadOutlined />
                                <Select defaultValue="1" style={{ width: 60 }} onChange={handleChange} bordered={false}>
                                    <Option value="1">1</Option>
                                    <Option value="2">2</Option>
                                    <Option value="3">3</Option>
                                    <Option value="4">4</Option>
                                </Select>
                                <Select defaultValue="week" style={{ width: 100 }} onChange={handleChange} bordered={false}>
                                    <Option value="week">week</Option>
                                    <Option value="monthly">monthly</Option>
                                    <Option value="daily">daily</Option>
                                </Select>
                            </span>
                        </span><br />

                        <Radio.Group defaultValue="Sunday">
                            <Radio.Button value="Sunday" className="radio-button">S</Radio.Button>
                            <Radio.Button value="Monday" className="radio-button">M</Radio.Button>
                            <Radio.Button value="Tuesday" className="radio-button">T</Radio.Button>
                            <Radio.Button value="Wednesday" className="radio-button">W</Radio.Button>
                            <Radio.Button value="Thursday" className="radio-button">T</Radio.Button>
                            <Radio.Button value="Friday" className="radio-button">F</Radio.Button>
                            <Radio.Button value="Saturday" className="radio-button">S</Radio.Button>
                        </Radio.Group>




                    </Modal>
                </div>
            </Card>

            <SaveModal isSave={isSave} setIsSave={setIsSave} id={''} />
        </div>



    );
}

export default ReportGenerator;
