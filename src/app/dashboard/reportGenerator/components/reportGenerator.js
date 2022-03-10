// # Mihir Bagga
// # Mareana Software
// # Version 1
// # Last modified - 3 Mar 2022

import React, { useEffect, useState } from 'react';
import {
    Button,
    Card,
    Collapse,
    Typography,
    Checkbox,
    Modal,
    Radio,
    Space,
    Select,
} from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import ReportDesignerForm from '../components/reportGeneratorHeader';
import { screenChange } from '../../../../duck/actions/reportDesignerAction';
import { saveReportGenerator } from '../../../../services/reportGeneratorServices';
import SaveModal from '../../../../components/SaveModal/saveModal'
import { showNotification } from '../../../../duck/actions/commonActions';


const { Panel } = Collapse;
const { Text } = Typography;
const { Option } = Select


function ReportGenerator() {

    const repotData = useSelector(
        (state) => state.reportDesignerReducer.reportData
    );


    function onChange(checkedValues, i) {
        update_object(checkedValues, i)
    }


    const [visible, setVisible] = useState(false)
    const [ReportData, setReportData] = useState(repotData)
    const [chart, setCharts] = useState([])
    const [table, setTable] = useState([])
    const [schedule, setSchedule] = useState('')
    const [emailList, setEmailList] = useState([])
    const [isSave, setIsSave] = useState(false);    // const [selectedUser, setSelectedUser] = useState(false)
    const [reportId, setReportId] = useState('')
    const [reportName, setReportName] = useState('')
    const [reportStatus, setReportStatus] = useState('')
    // const [viewId, setViewId] = useState('')
    const dispatch = useDispatch();


    useEffect(() => {
        unloadTest(ReportData)
    }, [ReportData]
    );

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


    const getTableData = (obj) => {

        let headingList = []
        let allSections = []

        let titleHeading = obj['titlepage'] && obj['titlepage'].heading ? obj['titlepage'].heading : ''
        let titleObj = obj && obj['titlepage'] ? obj['titlepage'] : ''

        headingList.push(titleHeading)
        allSections.push(titleObj)

        let headingSection = obj['sections'] ? obj['sections'] : []
        allSections = [...allSections, ...headingSection]
        // console.log(allSections,headingSection)
        // headingSection.map((i) => {
        //     if (i.heading)
        //         headingList.push(i.heading)
        // })

        return allSections
    }

    const unloadTest = (ReportData) => 
    {
        setReportId(ReportData['rep_disp_id'] ? ReportData['rep_disp_id'] : '')
        setReportName(ReportData['rep_name'] ? ReportData['rep_name'] : '')
        setCharts(ReportData['chart_int_ids'] ? createArraObj(ReportData['chart_int_ids']) : [])
        setTable(ReportData['layout_info'] ? getTableData(ReportData['layout_info']) : {})
        setReportId(ReportData['rep_disp_id'] ? ReportData['rep_disp_id'] : '')
        setReportName(ReportData['rep_name'] ? ReportData['rep_name'] : '')
        setReportStatus(ReportData['rep_status'] ? ReportData['rep_status'] : '')
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
        share_obj['scheduled_start'] = '2022-03-01 09:55:22'
        share_obj['scheduled_end'] = '2022-03-03 09:50:22'
        share_obj['frequency'] = '1'


        let layout_obj = {}
        layout_obj['titlepage'] = table[0] ? table[0] : {}
        layout_obj['sections'] = table.length > 0 ? table.filter((item, index) => index > 0) : []

        obj['layout_info'] = layout_obj
        obj['share'] = share_obj

        let req = {}
        req['data'] = obj
        req['saveType'] = 'save'

        saveReportGenerator(req).then((res)=>
        {
           if(res.Status==200)
           {
              setIsSave(true)
           }
          else{
            dispatch(showNotification('Not Saved'))
          }

           
        })
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

    return (
        <div className='custom-wrapper'>
            <div className='sub-header'>
                <div className='sub-header-title'>
                    <ArrowLeftOutlined className='header-icon' />
                    <span className='header-title'>Report Generator</span>
                </div>

                <div className='sub-header-btns'>
                    <Button className='custom-primary-btn' onClick={() => dispatch(screenChange(false))}>
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
            <div className='custom-content-layout'>
                <ReportDesignerForm />
                <div className="chart-schedule-card">
                    <Card className="card-chart" title="Chart">
                        {chart && chart.map((i) => {
                            return (
                                <Collapse key={i.chart} accordion style={{ width: '500px' }}>
                                    <Panel header={i.chart} key={i.chart}>
                                        <Checkbox.Group style={{ width: '100%' }} defaultValue={i.default} onChange={(checkedValue) => onChange(checkedValue, i.chart)}>

                                            <table className="table" >
                                                <tbody>
                                                    <tr style={{ backgroundColor: '#F1F7FF' }} className="tr">
                                                        <th className="th">
                                                            Select
                                                        </th>
                                                        <th className="th">
                                                            Chart Data
                                                        </th>
                                                    </tr>
                                                    <tr className="tr">
                                                        <td className="td"><Checkbox value="excursion" checked={i.excursion} /></td>
                                                        <td className="td">Excursion/Shift/Trend</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="td"><Checkbox value="violation" /></td>
                                                        <td className="td">Rule Violation</td>
                                                    </tr>
                                                    <tr className="tr">
                                                        <td className="td"><Checkbox value="parameter" /></td>
                                                        <td className="td">Parameters</td>
                                                    </tr>
                                                    <tr className="tr">
                                                        <td className="td"><Checkbox value="exclusion" /></td>
                                                        <td className="td">Exclusions</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </Checkbox.Group>
                                    </Panel>
                                </Collapse>)
                        })}

                    </Card>
                    <Card title="Share" className="card-schedule">
                        <div className="schedule">
                            <div>
                                <Text>Schedule</Text><br /><br />
                                <Button onClick={() => { setVisible(true) }} >Click To Select Schedule</Button>
                            </div>
                            <div>
                                <Card title="Recipients">
                                    {emailList.map(function (item, i) {
                                        return <p>{item}</p>
                                    })}
                                </Card>
                            </div>
                        </div>

                    </Card>
                </div>
                <Card title="Table" className="table-card">
                    {table.length > 0 && table.map((i) =>

                        <Collapse key={i.heading} accordion>
                            <Panel header={i.heading} key={i.heading}>
                                <span class="Legend-colorBox" style={{ backgroundColor: '#BAE7FF', marginRight: '10px', marginLeft: '1070px', fontSize: '12px' }}>
                                </span>
                                <span class="Legend-label" style={{ marginBottom: '10px', fontSize: '12px' }}>
                                    Edit
                                </span>
                                <span class="Legend-colorBox" style={{ backgroundColor: '#F5F5F5', marginLeft: '20px', fontSize: '12px' }}>
                                </span>
                                <span class="Legend-label" style={{ marginLeft: '10px', fontSize: '12px' }}>
                                    View Only
                                </span>
                                <table className="table">
                                    <tbody>
                                        <tr className="tr-tr" >
                                            <th className="th">Key</th>
                                            <th className="th">Value</th>
                                        </tr>
                                        {i['content'] && i['content'].map((item, j) =>
                                            // return Object.entries(item).map((k, value) => {

                                            <tr className="tr">
                                                <td className="td">{item.key}</td>
                                                <td className="td">{item.editable == false || item.editable == undefined ? <textarea defaultValue={item.value} onChange={(e) => handleEdit(e.target.value, i.heading, item.key)} /> : item.value} </td>
                                            </tr>
                                            // })

                                        )}

                                    </tbody>
                                </table>
                            </Panel>
                        </Collapse>
                    )}
                </Card>
                <Card title="Charts" style={{ marginTop: '10px' }}>
                </Card>
                <Card title="Data" style={{ marginTop: '10px' }}>
                    <Collapse accordion>
                        <Panel header="Excrusion Shift Trend" key="3">
                            <p></p>
                        </Panel>
                        <Panel header="Parameters" key="1">
                            <p></p>
                        </Panel>
                        <Panel header="Exclusion" key="2">
                            <p></p>
                        </Panel>
                    </Collapse>
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
                        mode="multiple"
                        style={{ width: '50%', marginTop: '10px' }}
                        placeholder="Select Users"
                        optionLabelProp="label"
                        value={emailList}
                        onChange={handleChange}
                    >
                        <Option value="a@gmail.com" label="a@gmail.com">
                            a@gmail.com
                        </Option>
                        <Option value="c@gmail.com" label="c@gmail.com">
                            c@gmail.com
                        </Option>
                        <Option value="b@gmail.com" label="b@gmail.com">
                            b@gmail.com
                        </Option>
                        <Option value="m@gmail.com" label="m@gmail.com">
                            m@gmail.com
                        </Option>
                    </Select>
                </Modal>
            </div>
            <SaveModal isSave={isSave} setIsSave={setIsSave} id={''} />
        </div>

    );
}

export default ReportGenerator;