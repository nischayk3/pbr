/**
 * @author Mihir Bagga <mihir.bagga@mareana.com>
 * @Mareana - CPV Product
 * @version 1
 * @Last Modified - 22 April, 2022
 * @Last Changed By - @Mihir 
 */

import React, { useState, useEffect } from 'react';
import { Input,Row, Col, Button, Tabs, DatePicker, TimePicker, Radio, Select, Divider, Space, Table, Avatar } from 'antd';
import SelectField from '../../SelectField/SelectField';
import InputField from '../../InputField/InputField';
import './chartNotify.scss';
import { useDispatch } from 'react-redux';
import { showLoader, hideLoader, showNotification } from '../../../duck/actions/commonActions';
import { putJob } from '../../../services/jobScheduleService';
import { PaperClipOutlined, ClockCircleOutlined } from '@ant-design/icons';
import moment from 'moment';

const { TabPane } = Tabs;
const { Option } = Select

// const { RangePicker } = DatePicker;

const alertList = ['Limits', 'Rules', 'Threshold']
const scheduleList = ['Repeat Once', 'Daily', 'Weekly', 'Monthly']
const timeRange = ['Hour', 'Minutes', 'Seconds'];

const tableColumns = [
    {
        title: 'Chart Name',
        dataIndex: 'chart',
        align: 'center',
        render: (text, rcrd) => {
            return {
                children: <div className="email-contents">{text}</div>,
            }
        }
    },
    {
        title: 'Event Name',
        dataIndex: 'event',
        align: 'center',

        render: (text, rcrd) => {
            return {
                children: <div className="email-contents">{text}</div>,
            }
        }
    },
    {
        title: 'Parameter ID',
        dataIndex: 'id',
        align: 'center',

        render: (text, rcrd) => {
            return {
                children: <div className="email-contents">{text}</div>,
            }
        }
    },
    {
        title: 'Date & time',
        dataIndex: 'date',
        align: 'center',

        render: (text, rcrd) => {
            return {
                children: <div className="email-contents">{text}</div>,
            }
        }
    },
    {
        title: 'Creator',
        dataIndex: 'creator',
        align: 'center',

        render: (text, rcrd) => {
            return {
                children: <div className="email-contents"><Avatar style={{ backgroundColor: '#87d068' }}>S</Avatar> {text}</div>,
            }
        }
    }
]
const data = [
    {
        chart: 'Sample Chart',
        event: 'Nelson Rule 1',
        id: 'ID00001288',
        date: ' 11/4/2022 21:00',
        creator: 'Sharus'
    }
]



const ChartNotify = (props) => {

    const [selectedAlert, setSelectedAlert] = useState(['Limits']);
    const [selectedSchedule, setSelectedSchedule] = useState('Repeat Once');
    const [selectedEmailSchedule, setSelectedEmailSchedule] = useState('');
    const [selectedTimeRange, setSelectedTimeRange] = useState('');
    const [showReceipients, setShowReceipients] = useState(false);
    const [radioValue, setRadioValue] = useState(null);
    const [emailList, setEmailList] = useState([])
    const [scheduleStartDate, setScheduleStartDate] = useState('')
    const [scheduleEmailStartDate, setScheduleEmailStartDate] = useState('')
    const [scheduleTime, setScheduleTime] = useState('')
    const [scheduleEndDate, setScheduleEndDate] = useState('')
    const [selectedDays, setSelectedDays] = useState({
        Sunday: false,
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false,
    })
    const [activeTab, setActiveTab] = useState("schedule_evaluation");
    const [scheduleEmailTime, setScheduleEmailTime] = useState('')
    const [everyDayValue, setEveryDayValue] = useState('')
    const [png, setPng] = useState(false)
    const [pdf, setpdf] = useState(false)
    const [subject, setSubject] = useState('')
    const [subjectContent, setSubjectContent] = useState('')



    const handlePng = (value) => {
        setPng(!value)
    }
    const handlePdf = (value) => {
        setpdf(!value)
    }
    useEffect(() => {
        if (props.data) {
            unLoad(props.data)
        }
    }, [props.data])



    const dispatch = useDispatch();
    const updateDays = (day) => {
        dispatch(showLoader())
        if (selectedDays[day]) {
            selectedDays[day] = false
            setSelectedDays(selectedDays)
        }
        else {
            selectedDays[day] = true
            setSelectedDays(selectedDays)
        }
        dispatch(hideLoader())
    }
    const handleSubject = (subject) => {
        setSubject(!subject)
    }
    const unLoad = (data) => {
        if (data) {
            setEmailList(data.notify_emails)
            setSelectedSchedule(data.frequency_unit)

            if(data.email_config)
            {

            if (data.email_config.scheduled_start)
                setScheduleStartDate(data.email_config.scheduled_start)
            if (data.email_config.scheduled_time)
                setScheduleEmailTime(data.email_config.scheduled_time)
            setRadioValue(data.email_config.daily_frequency)
            if (data.email_config.selected_days_obj)
                setSelectedDays(data.email_config.selected_days_obj)
            if (data.email_config.data_table)
                setpdf(data.email_config.data_table)
            if (data.email_config.selected_alert)
                setSelectedAlert(data.email_config.selected_alert)
            if (data.email_config.scheduled_start)
                setScheduleEmailStartDate(data.email_config.scheduled_start)
            if (data.email_config.selected_days_obj)
                setSelectedDays(data.email_config.selected_days_obj)
            }    
        }
    }



    const handleSelectScheduleChange = (e) => {
        setSelectedSchedule(e);
    }
    const handleSelectAlertChange = (e) => {
        setSelectedAlert(e);
    }

    const onChangeRadioButton = (e) => {
        setRadioValue(e.target.value);
    };
    const handleSelectTimeChange = (e) => {
        setSelectedTimeRange(e);
    }
    const handleReceipientsChange = (value) => {
        setEmailList(value);
    }
    const onClear = () => {
        setEmailList([])
        setSelectedSchedule('')
        setScheduleEmailStartDate('')
        setScheduleEmailTime('')
        setRadioValue('')
        setSelectedAlert([])
        setSelectedDays({
            Sunday: false,
            Monday: false,
            Tuesday: false,
            Wednesday: false,
            Thursday: false,
            Friday: false,
            Saturday: false,
        })
    }

    const SaveData = async () => {
        let req = {}
        let login_response = JSON.parse(localStorage.getItem('login_details'));

        let request_headers = {
            'content-type': 'application/json',
            'x-access-token': login_response.token ? login_response.token : '',
            'resource-name': 'DASHBOARD',
        };

        req['app_data'] = props.appType
        req['dag_id'] = ' '
        req['created_by'] = localStorage.getItem('username') ? localStorage.getItem('username') : ''
        req['app_type'] = props.appType
        req['app_id'] = props.id ? props.id : 'C222'

        let email_config = {}
        email_config['subject'] = subjectContent.length >0  ? subjectContent :   `Update For ${props.id}`
        email_config['scheduled_start'] = scheduleEmailStartDate
        email_config['scheduled_time'] = scheduleEmailTime
        email_config["frequency_unit"] = selectedSchedule == 'Repeat Once' ? 'Once' : selectedSchedule
        email_config["email_list"] = emailList
        email_config["selected_alert"] = selectedAlert
        email_config["attachment"] = ''
        email_config["data_table"] = pdf
        email_config['created_by'] = localStorage.getItem('username') ? localStorage.getItem('username') : ''
        email_config['selected_days_obj'] = selectedDays



        if (selectedSchedule == 'Weekly') {
            email_config['selected_days'] = Object.keys(selectedDays).filter(k => selectedDays[k] === true);
        }
        if (selectedSchedule == "Daily") {
            if (radioValue == 3) {
                email_config['daily_frequency'] = 'Every' + ' ' + everyDayValue + ' ' + selectedTimeRange
            }
            else {
                email_config['daily_frequency'] = radioValue
            }
        }

        req['email_config'] = email_config
        req['frequency'] = 1
        req["frequency_unit"] = selectedSchedule == 'Repeat Once' ? 'Once' : selectedSchedule
        req["job_status"] = "NEW",
        req["job_type"] = 'email',
        req['notify_emails'] = emailList,
        req["scheduled_end"] = '2030-12-31'
        req["scheduled_start"] = scheduleEmailStartDate

        let res = await putJob(req, request_headers)

        if (res.Status == 200) {
            dispatch(showNotification('success', 'Saved'))
        }
        else {
            dispatch(showNotification('error', res.Message ? res.Message : res.detail))

        }



    }
    const changeTab = activeKey => {
        setActiveTab(activeKey);
    };

    const onChangeStart = (date, dateString) => {
        setScheduleStartDate(dateString);
        // setstartTimeIso(moment(date).toISOString());
    };

    const onChangeEmailStart = (date, dateString) => {
        setScheduleEmailStartDate(dateString);
        // setstartTimeIso(moment(date).toISOString());
    };
    const onChangeTime = (date, dateString) => {
        setScheduleTime(dateString);
        // setstartTimeIso(moment(date).toISOString());
    };
    const onChangeEmailTime = (date, dateString) => {
        setScheduleEmailTime(dateString);
        // setstartTimeIso(moment(date).toISOString());
    };
    const setEveryDayValues = (value) => {
        setEveryDayValue(value)
    }
    // const onChangeEnd = (date, dateString) => {
    //     setScheduleEndDate(dateString);
    //     // setendTimeIso(moment(date).toISOString());
    // };


    const handleChange = selectedItems => {
        setEmailList(selectedItems);
    };

    console.log(props.data)

    return (
        <div className="chart_notify-notify">
            <Tabs className='evaluation-tabs' onChange={changeTab} tabBarExtraContent={<div className="tab-btns" >
                <Button className='schedule-evalutaion-button' onClick={() => SaveData()}>Schedule</Button>
                <Button className='clear-schedule' onClick={() => onClear()}>Clear</Button>
            </div>} >
                <TabPane tab='Email draft' key="email_draft">
                    <Select
                        mode="tags"
                        style={{ width: '90%', marginTop: '10px' }}
                        placeholder={<><span className="email-recipients">Recipients</span>   <span className="email-recipients-chart" >(Optional)</span></>}
                        optionLabelProp="label"
                        value={emailList}
                        bordered={false}
                        onChange={handleChange}
                    >
                        <Option value="mihir.bagga@mareana.com" label="mihir.bagga@mareana.com">
                            mihir.bagga@mareana.com
                        </Option>
                    </Select>
                    <hr style={{ borderTop: '0.5px solid #d9d9d9' }} />
                    <div style={{ display: 'grid', gridTemplateColumns: '7fr 3fr' }}>
                        <span>
                        <p onDoubleClick={()=>handleSubject(subject)} className="email-subject">Subject {subject ? <Input.TextArea  style={{width:'500px',marginLeft:'30px'}}  autoSize={true} defaultValue={subjectContent} onChange={(e)=>setSubjectContent(e.target.value)} onSubmit={()=>handleSubject(subject)}/> : <><span className="email-sub">{subjectContent.length > 0 ? subjectContent :<> Update For {props.id}</> }</span> </>} </p>
                            <hr style={{ borderTop: '0.5px solid #d9d9d9' }} />
                        </span>
                        <div style={{ width: '200px', marginTop: '22px', marginLeft: '90px', borderRadius: '4px' }}>
                            <Select
                                row={1}
                                className="filter-button"
                                mode="multiple"
                                allowClear
                                dropdownStyle={{ border: '10' }}
                                notFoundContent="No Result"
                                placeholder="Pick the type of alert"
                                value={selectedAlert}
                                onChange={handleSelectAlertChange}
                                style={{ width: '100%', borderRadius: '4px' }}
                            >
                                {alertList.length > 0 ? alertList.map(item => (
                                    <Option draggable="true" value={item} key={item}>
                                        {item}
                                    </Option>
                                )) : <Option >

                                </Option>}
                            </Select>
                        </div>
                    </div>
                    <br />
                    <p className="email-content"> Hey,<br /><br />

                        This is to inform you of the recept chart.
                        Visit <a>www.cpv-mareana.com/alert-dashboard</a> to know more.<br /><br />
                        <Table style={{ width: '98%' }} dataSource={data} columns={tableColumns} pagination={false} />
                    </p> <br />
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '350px' }}>
                        <p className="email-content">
                            Regards,<br />
                            {localStorage.getItem('username') ? localStorage.getItem('username') + '_variant' : ''}
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'row', gap: '17px', marginRight: '20px' }}>
                            <p className="email-attach-chart">Select to Attach</p>
                            <div className={png ? "attachment-report-chart-select" : "attachment-report-chart"} onClick={() => handlePng(png)} ><span><PaperClipOutlined style={{ marginLeft: '20px', marginTop: '5px', color: png ? 'white' : '' }} /></span><span className={png ? "attachment-report-text-chart-select" : "attachment-report-text-chart"}>Chartname</span> </div>
                            <div className={pdf ? "attachment-report-chart-select" : "attachment-report-chart"} onClick={() => handlePdf(pdf)} ><span><PaperClipOutlined style={{ marginLeft: '40px', marginTop: '5px', color: pdf ? 'white' : '' }} /></span><span className={pdf ? "attachment-report-text-chart-select" : "attachment-report-text-chart"}> Datatable</span></div>
                        </div>
                    </div>
                    {/* {emailList.length > 0 && ( */}
                    {/* )} */}
                    <Divider />
                </TabPane>
                <TabPane tab='Email schedule' key="email_schedule">
                    <div style={{ margin: '24px' }}>
                        <div style={{ width: '300px' }}>
                            <ClockCircleOutlined style={{ color: "#093185",fontSize:'18px' }} />  <DatePicker style={{ width: '260px' }} placeholder="Start Date" bordered={false} onChange={onChangeEmailStart} value={scheduleEmailStartDate.length > 0 ? moment(scheduleEmailStartDate, "YYYY/MM/DD HH:mm:ss") : ''} />
                            <hr style={{ borderTop: '1px solid #dbdbdb' }} />
                        </div>
                        <div style={{ marginTop: '40px' }}>
                            <Row gutter={[16, 24]}>
                                <Col className='gutter-row' span={4}>
                                    <div className="select-report-antd" >
                                        <Select
                                            placeholder='Schedule'
                                            value={selectedSchedule}
                                            onChange={(e) => handleSelectScheduleChange(e)}
                                            style={{ width: "100%", margin: "0px" }}
                                            allowClear={true}
                                            defaultValue="Repeat Once"
                                            className="antd-selectors"
                                        >
                                            {scheduleList &&
                                                scheduleList.map((item) => (
                                                    <Select.Option key={item} value={item}>
                                                        {item}
                                                    </Select.Option>
                                                ))}
                                        </Select>
                                    </div>
                                </Col>
                                <Col className='gutter-row' span={4}>
                                    <div >
                                        <TimePicker style={{ width: '187px', marginLeft: '35px', height: '36px' }} onChange={onChangeEmailTime} value={scheduleEmailTime.length > 0 ? moment(scheduleEmailTime, "HH:mm:ss") : ''} />
                                    </div>
                                </Col>
                            </Row>
                            {selectedSchedule == 'Daily' ? (
                                <div style={{ marginTop: '30px' }}>
                                    <Row>
                                        <Col>
                                            <Radio.Group onChange={onChangeRadioButton} value={radioValue} >
                                                <Space direction="vertical" >
                                                    <Radio value='Every Day' className='alerts-radio'>Every Day</Radio>
                                                    <Radio value='Every WeekDay' className='alerts-radio'>Every WeekDay</Radio>
                                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                        <Radio value={3} className='alerts-radio'>Every</Radio> <span style={{ width: '40px', marginRight: '20px', marginTop: '18px' }}>
                                                            <InputField value={everyDayValue} onChangeInput={(e) => setEveryDayValues(e.target.value)} className='alerts-radio' />
                                                        </span>
                                                        <div style={{ width: '100px', marginTop: '18px' }}>
                                                            <SelectField
                                                                className='alerts-radio'
                                                                placeholder=''
                                                                selectList={timeRange}
                                                                value={selectedTimeRange}
                                                                onChangeSelect={(e) => handleSelectTimeChange(e)}
                                                            />
                                                        </div>
                                                    </div>

                                                </Space>
                                            </Radio.Group>
                                        </Col>
                                    </Row>
                                </div>
                            ) : ''}
                            {selectedSchedule == 'Weekly' ? (
                                <div className="select-days">
                                    <Button className={selectedDays['Sunday'] ? "selected-day-buttons-chart-one" : "day-buttons-chart-one"} onClick={() => updateDays('Sunday')} >S</Button>
                                    <Button className={selectedDays['Monday'] ? "selected-day-buttons-chart" : "day-buttons-chart"} onClick={() => updateDays('Monday')} >M</Button>
                                    <Button className={selectedDays['Tuesday'] ? "selected-day-buttons-chart" : "day-buttons-chart"} onClick={() => updateDays('Tuesday')}>T</Button>
                                    <Button className={selectedDays['Wednesday'] ? "selected-day-buttons-chart" : "day-buttons-chart"} onClick={() => updateDays('Wednesday')} >W</Button>
                                    <Button className={selectedDays['Thursday'] ? "selected-day-buttons-chart" : "day-buttons-chart"} onClick={() => updateDays('Thursday')} >T</Button>
                                    <Button className={selectedDays['Friday'] ? "selected-day-buttons-chart" : "day-buttons-chart"} onClick={() => updateDays('Friday')} >F</Button>
                                    <Button className={selectedDays['Saturday'] ? "selected-day-buttons-chart" : "day-buttons-chart"} onClick={() => updateDays('Saturday')} >S</Button>
                                </div>
                            ) : ''}

                        </div>
                        <div>
                            {
                                showReceipients && (
                                    <>
                                        <Select
                                            mode="tags"
                                            style={{ width: '90%', marginTop: '10px' }}
                                            placeholder={<span style={{ fontSize: '16px' }}>Recipients</span>}
                                            optionLabelProp="label"
                                            value={emailList}
                                            bordered={false}
                                            onChange={handleReceipientsChange}
                                        >
                                            <Option value="binkita.tiwari@mareana.com" label="binkita.tiwari@mareana.com">
                                                binkita.tiwari@mareana.com
                                            </Option>
                                        </Select>
                                        <Divider />
                                    </>
                                )
                            }
                        </div>
                    </div>
                </TabPane>

            </Tabs>
        </div>

    )
}

export default ChartNotify;