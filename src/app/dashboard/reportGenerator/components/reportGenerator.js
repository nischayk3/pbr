/**
 * @author Mihir Bagga <mihir.bagga@mareana.com>
 * @Mareana - CPV Product
 * @version 1
 * @Last Modified - 14 March, 2022
 * @Last Changed By - @Mihir 
*/

import './styles.scss';
import React, { useEffect, useState } from 'react';
import {
    Button,
    Card,
    Collapse,
    Input,
    Tag,
    Dropdown,
    Menu
} from 'antd';
import { FileTextOutlined, EllipsisOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getReports } from '../../../../services/reportDesignerServices';
import ReportDesignerForm from '../components/reportGeneratorHeader';
import { sendReport } from '../../../../duck/actions/reportDesignerAction';
import { saveReportGenerator, getReportGenerator, latexReport, latexBuilder } from '../../../../services/reportGeneratorServices';
import SaveModal from '../../../../components/SaveModal/saveModal'
import {
    hideLoader,
    showLoader,
    showNotification
} from '../../../../duck/actions/commonActions';
import Chart from '../../reportDesigner/components/reportChart/chartComponent/chartComponent'
import BreadCrumbWrapper from '../../../../components/BreadCrumbWrapper';
import JobSchedule from '../../../../components/JobSchedule';
import FileSaver from 'file-saver';
import axios from 'axios';

const { Panel } = Collapse;

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


function ReportGenerator(props) {

    const repotData = useSelector(
        (state) => state.reportDesignerReducer.reportData
    );

    function onChange(checkedValues, i) {
        update_object(checkedValues, i)
    }

    const menu = (
        <Menu>
            <Menu.Item >
                Save As
            </Menu.Item>
        </Menu>
    );

    const handleCancel = () => {
        setAlertVisible(false)
    }

    const [ReportData, setReportData] = useState(repotData)
    const [chart, setCharts] = useState([])
    const [table, setTable] = useState([])
    const [isSave, setIsSave] = useState(false);
    const [reportId, setReportId] = useState('')
    const [reportName, setReportName] = useState('')
    const [reportStatus, setReportStatus] = useState('')
    const [reportList, setReportList] = useState('')
    const [chartLayout, setChartLayout] = useState({});
    const [selectedDays, setSelectedDays] = useState({
        Sunday: false,
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false,
    })
    const [alertVisible, setAlertVisible] = useState(false)
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

    const makeArrayOfObject = (ar) => {
        let res = []
        if (ar && ar.length > 0) {
            for (let i = 0; i < ar.length; i++) {
                let res_obj = {}
                res_obj['chart'] = ar[i]
                res_obj['violation'] = true
                res_obj['exclusion'] = true
                res_obj['data_table'] = true
                res_obj['layout'] = {}
                res_obj['data'] = {}
                res_obj['chartType'] = ''
                res.push(res_obj)
            }
            return res
        }
        else
            return res
    }
    const createChartRecord = (arr) => {
        let res = {}
        for (let key in arr) {
            res[`${key}`] = makeArrayOfObject(arr[key])
        }
        return res
    }

    const updateChartLayout = (chart, section, param) => {
        section = section + 1
        let objIndex = chartLayout[section].findIndex((obj => obj.chart == chart));
        chartLayout[section][objIndex][`${param}`] = false
    }


    const getTableData = (obj, rep_layout) => {
        obj = obj.layout_info
        let headingList = []
        let allSections = []
        let titleHeading = obj['titlepage'] && obj['titlepage'].heading ? obj['titlepage'].heading : ''
        let titleObj = obj && obj['titlepage'] ? obj['titlepage'] : ''

        headingList.push(titleHeading)
        allSections.push(titleObj)

        let headingSection = obj['sections'] ? obj['sections'] : []
        allSections = [...allSections, ...headingSection]

        console.log(rep_layout)

        for (let i = 0; i < allSections.length; i++) {
            allSections[i].charts = rep_layout[i + 1] ? rep_layout[i + 1] : []
        }
        return allSections
    }

    const unloadTest = (ReportData) => {

        dispatch(showLoader())
        setReportId(ReportData['rep_disp_id'] ? ReportData['rep_disp_id'] : '')
        if (ReportData.layout_info && ReportData.layout_info.charts_layout)
            setChartLayout(ReportData.layout_info.charts_layout ? createChartRecord(ReportData.layout_info.charts_layout) : {})
        else
            setChartLayout(ReportData.charts_layout ? ReportData.charts_layout : {})
        setReportName(ReportData['rep_name'] ? ReportData['rep_name'] : '')
        setCharts(ReportData['chart_int_ids'] ? createArraObj(ReportData['chart_int_ids']) : [])
        setTable(ReportData['layout_info'] ? getTableData(ReportData['layout_info'], ReportData.layout_info.charts_layout ? ReportData.layout_info.charts_layout : {}) : {})
        setReportId(ReportData['rep_disp_id'] ? ReportData['rep_disp_id'] : '')
        setReportName(ReportData['rep_name'] ? ReportData['rep_name'] : '')
        setReportStatus(ReportData['rep_status'] ? ReportData['rep_status'] : '')
        dispatch(hideLoader());
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

    }
    const generateReport = async () => {
        dispatch(showNotification('success', 'Generating Report'))
        let generate_obj = {}
        let title_page = table[0] ? table[0] : {}
        let sections = table.length > 0 ? table.filter((item, index) => index > 0) : []

        generate_obj['titlepage'] = title_page
        generate_obj['sections'] = sections

        let final_obj = {}
        final_obj['layout_info'] = generate_obj
        final_obj['charts_layout'] = chartLayout

        let rjson = {}
        rjson['data'] = final_obj

        let data = { rjson: rjson }

        let json_response = await latexBuilder(data)
        if (json_response.statuscode == 200) {
            dispatch(showNotification('success', 'Downloading Report'))

            axios.post('/latex_report', json_response.latex_json, { responseType: 'arraybuffer' })
                .then((response) => {
                    var blob = new Blob([response.data], { type: 'application/pdf' });
                    FileSaver.saveAs(blob, `${reportId}.pdf`);
                });
        }
        else {
            dispatch(showNotification('error', 'Failed to generate report'))
        }
    }

    const prepareJson = () => {

        let obj = {}
        let user_details = localStorage.getItem('username')
        let user = user_details ? user_details : ''

        obj['rep_disp_id'] = reportId
        obj['rep_name'] = reportName
        obj['rep_status'] = reportStatus
        obj['user'] = user
        obj['variant_name'] = user + '_variant'
        obj['chart_info'] = chartLayout
        obj['charts_layout'] = chartLayout
        obj['days_layout'] = selectedDays

        let layout_obj = {}
        layout_obj['titlepage'] = table[0] ? table[0] : {}
        layout_obj['sections'] = table.length > 0 ? table.filter((item, index) => index > 0) : []

        obj['layout_info'] = layout_obj

        let req = {}
        req['data'] = obj
        req['saveType'] = 'save'

        saveReportGenerator(req).then((res) => {
            if (res.Status == 200) {
                setIsSave(true)
            }
            else {
                dispatch(showNotification('error', 'Not Saved'))
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
                    <BreadCrumbWrapper />
                </div>
                <div className='sub-header-btns'>
                    {!props.screenChange ?
                        <>
                            <Button className='custom-primary-btn' onClick={() => { setAlertVisible(true); }}>
                                Notify Report
                            </Button>
                            <Button className='custom-primary-btn' onClick={() => prepareJson()}>
                                Save
                            </Button>
                        </> : <></>
                    }
                    <Button className='custom-secondary-btn' onClick={() => generateReport()}>
                        <FileTextOutlined />   Generate Report
                    </Button>
                    <Dropdown overlay={menu} placement="bottomLeft" arrow={{ pointAtCenter: true }}>
                        <EllipsisOutlined style={{ transform: 'rotate(-90deg)', fontSize: '20px', marginLeft: '5px' }} />
                    </Dropdown>
                </div>
            </div>
            <div className='custom-content-layout'>
                <div className="report-card">
                    <Card title="Generate new report variant" className="generator-card">
                        <ReportDesignerForm />
                        <div className="table-card">
                            {table.length > 0 && table.map((i) =>
                                <Collapse key={i.heading} accordion className="collapse-generate" bordered={true}>
                                    <Panel header={<span className="chart-names">{i.heading} {i.charts && i.charts.length > 0 && i.charts.map((i) => (<span className="chart-tags">
                                        {i}
                                    </span>))}</span>} key={i.heading} className="chart-panel">
                                        {i['content'] && i['content'].length > 0  ?
                                        <div className="generator-table">
                                            <table className="table" cellspacing="0" cellpadding="0">
                                                <tr className="tr" >
                                                    <th className="th-key" colspan={5}>
                                                        Key
                                                    </th>
                                                    <th className="th-value" colspan={15}>
                                                        Value
                                                    </th>
                                                </tr>
                                                <tbody>
                                                    {i['content'] && i['content'].map((item, j) =>
                                                        <tr className="tr" >
                                                            <td className="td-key" colspan={5} >{item.key}</td>
                                                            <td className="td" colspan={15}>{item.editable == false || item.editable == undefined ? <Input.TextArea autoSize={true} defaultValue={item.value} onChange={(e) => handleEdit(e.target.value, i.heading, item.key)} /> : <span>{item.value}</span>} </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table> 
                                            </div>: <></>
                                        }
                                        {i.charts && i.charts.length > 0 && i.charts.map((j) =>
                                        (
                                            <div >
                                                <p className="chart-name-rep">{j} <span className="tag-div"> <Tag className="chart-tag" closable onClose={() => updateChartLayout(j, i.id, 'violation')}>Violation</Tag> <Tag className="chart-tag" closable onClose={() => updateChartLayout(j, i.id, 'exclusion')}>Exclusion</Tag> <Tag className="chart-tag" closable onClose={() => updateChartLayout(j, i.id, 'data_table')}>Data Table</Tag></span> </p>
                                                <Chart chartName={j} />
                                            </div>
                                        ))}
                                    </Panel>
                                </Collapse>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
            <SaveModal isSave={isSave} setIsSave={setIsSave} id={''} />
            <JobSchedule visible={alertVisible} app_type='REPORT' handleCancel={handleCancel} id={reportId} name={reportName} />
        </div>



    );
}

export default ReportGenerator;
