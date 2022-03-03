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
import ex_json from './object.json'

const { Panel } = Collapse;
const { Text } = Typography;
const { Option } = Select


function ReportGenerator() {

    const repotData = useSelector(
        (state) => state.reportDesignerReducer.reportData
    );
    console.log(repotData)

    function onChange(checkedValues, i) {
        console.log(checkedValues, i)
        update_object(checkedValues, i)
        console.log(JSON.stringify(chart))
    }



    const [visible, setVisible] = useState(false)
    const [ReportData, setReportData] = useState(repotData)
    const [chart, setCharts] = useState([])
    const [selectedUser, setSelectedUser] = useState(false)
    const [reportId, setReportId] = useState('')
    const [reportName, setReportName] = useState('')
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

    const unloadTest = (ReportData) => {
        console.log("REPORT_DATA", ReportData)
        setReportId(ReportData['rep_disp_id'] ? ReportData['rep_disp_id'] : '')
        setReportName(ReportData['rep_name'] ? ReportData['rep_name'] : '')
        setCharts(ReportData['chart_int_ids'] ? createArraObj(ReportData['chart_int_ids']) : [])
    }
    const update_object = (arr, i) => {
        let objIndex = chart.findIndex((chart => chart.name == i));
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
    console.log(ex_json, 'charts')
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
                    <Button className='custom-primary-btn' onClick={() => dispatch(screenChange(false))}>
                        Save
                    </Button>
                    <Button className='custom-secondary-btn' onClick={() => dispatch(screenChange(false))}>
                        Generate
                    </Button>
                    {/* <Button onClick={() => dispatch(screenChange(false))}>
                        Cancel
                    </Button> */}
                </div>
            </div>
            <div className='custom-content-layout'>
            <ReportDesignerForm />
            <div className="chart-schedule-card">
                <Card className="card-chart" title="Chart">
                    {ex_json && ex_json.map((i) => {
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
                                                    <td className="td"><Checkbox value="excursion" checked={i.excursion}/></td>
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

                            </Collapse>
                        )
                    })}

                </Card>
                <Card title="Share" className="card-schedule">
                    <div className="schedule">
                        <div>
                            <Text>Schedule</Text><br /><br />
                            <Button onClick={() => { setVisible(true) }} >Click To Select Schedule</Button>
                        </div>
                        <div>
                            <Card title="Recipients"></Card>
                        </div>
                    </div>

                </Card>
                </div>
            <Card title="Table" className="table-card">
                <Collapse accordion>
                    <Panel header="CPV REPORT" key="1">
                        <p></p>
                    </Panel>
                    <Panel header="SUMMARY" key="2">
                        <p></p>
                    </Panel>


                </Collapse>
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
            >
                <Radio.Group >
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
                    defaultValue={['a@gmail.com']}
                    optionLabelProp="label"
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
        </div>

    );
}

export default ReportGenerator;
