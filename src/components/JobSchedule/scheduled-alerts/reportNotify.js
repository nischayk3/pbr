/**
 * @author Mihir Bagga <mihir.bagga@mareana.com>
 * @Mareana - CPV Product
 * @version 1
 * @Last Modified - 22 April, 2022
 * @Last Changed By - @Mihir 
 */

import React, { useState } from 'react';
import { Row, Col, Button, Tabs, DatePicker, TimePicker, Radio, Select, Divider, Space, Table } from 'antd';
import SelectField from '../../SelectField/SelectField';
import InputField from '../../InputField/InputField';
import './reportNotify.scss';
import { useDispatch } from 'react-redux';
import { showLoader, hideLoader, showNotification } from '../../../duck/actions/commonActions';
import { putJob } from '../../../services/jobScheduleService';
import { PaperClipOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
const { Option } = Select

// const { RangePicker } = DatePicker;

const alertList = ['Limits', 'Rules', 'Threshold']
const scheduleList = ['Repeat Once', 'Daily', 'Weekly', 'Monthly']
const timeRange = ['Hour', 'Minutes', 'Seconds'];


const ReportNotify = (props) => {
    const [selectedAlert, setSelectedAlert] = useState('');
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
    const [frequency, setFrequency] = useState('')
    const [everyDayValue, setEveryDayValue] = useState('')


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

    const onChangeEnd = (date, dateString) => {
        setScheduleEndDate(dateString);
        // setendTimeIso(moment(date).toISOString());
    };

    const handleSelectChange = (e) => {
        setSelectedAlert(e);
    }
    const handleSelectScheduleChange = (e) => {
        setSelectedSchedule(e);
    }
    const handleSelectEmailScheduleChange = (e) => {
        setSelectedEmailSchedule(e);
    }

    const onChangeTimePicker = (time, timeString) => {
        console.log(time, timeString);
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

    const SaveData = async () => {
        let req = {}
        let login_response = JSON.parse(localStorage.getItem('login_details'));

        let request_headers = {
            'content-type': 'application/json',
            'x-access-token': login_response.token ? login_response.token : '',
            'resource-name': 'DASHBOARD',
        };

        req['app_data'] = props.appType
        req['dag_id'] = ''
        req['created_by'] = localStorage.getItem('username') ? localStorage.getItem('username') : ''
        req['app_type'] = props.appType
        req['app_id'] = props.id ? props.id : 'R262'

        let email_config = {}
        email_config['subject'] = `Update For Report`
        email_config['scheduled_start'] = scheduleEmailStartDate
        email_config['scheduled_time'] = scheduleEmailTime
        email_config["frequency_unit"] = selectedSchedule,
            email_config["email_list"] = emailList

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
        req["frequency_unit"] = selectedSchedule,
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
            dispatch(showNotification('error', 'Unable to save'))

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

    return (
        <div className="report-notify">
            <Tabs className='evaluation-tabs' onChange={changeTab} tabBarExtraContent={<div className="tab-btns" >
                <Button className='schedule-evalutaion-button' onClick={() => SaveData()}>Schedule</Button>
                <Button className='clear-schedule'>Clear</Button>
            </div>} >
                <TabPane tab='Email draft' key="email_draft">
                    <Select
                        mode="tags"
                        style={{ width: '90%', marginTop: '10px' }}
                        placeholder={<span className="email-recipients">Recipients      (Optional)</span>}
                        optionLabelProp="label"
                        value={emailList}
                        bordered={false}
                        onChange={handleChange}
                    >
                        <Option value="mihir.bagga@mareana.com" label="mihir.bagga@mareana.com">
                            mihir.bagga@mareana.com
                        </Option>
                    </Select>
                    <hr style={{ backgroundColor: '#dbdbdb' }} />
                    <span>
                        <p className="email-subject">Subject <span className="email-sub">Update For  </span>  </p>
                    </span>
                    <hr style={{ backgroundColor: '#dbdbdb' }} />
                    <br />
                    <p className="email-content"> Hey,<br /><br />

                        This is to inform you of the recept update to [report variant name]. Check the attachment for details.<br /><br />
                        Visit <a>www.cpv-mareana.com/alert-dashboard</a> to know more.<br />
                        <br /><br />
                        Regards,<br />
                        [variant_username]</p>

                    <div className="attachment-report"> <span><PaperClipOutlined style={{ marginLeft: '10px' }} /><span className="attachment-report-text"> Report_name.pdf</span></span></div>
                    {/* {emailList.length > 0 && ( */}
                    {/* )} */}
                    <Divider />
                </TabPane>
                <TabPane tab='Email schedule' key="email_schedule">
                    <div style={{ margin: '24px' }}>
                        <div style={{ width: '200px' }}>
                            <ClockCircleOutlined />  <DatePicker placeholder="Start Date" bordered={false} onChange={onChangeEmailStart} />
                            <Divider />
                        </div>
                        <div style={{ marginTop: '40px' }}>
                            <Row gutter={[16, 24]}>
                                <Col className='gutter-row' span={4}>
                                    <div style={{ width: '187px' }} >
                                        <SelectField
                                            placeholder='Schedule'
                                            onChangeSelect={(e) => handleSelectScheduleChange(e)}
                                            selectList={scheduleList}
                                            value={selectedSchedule}
                                        />
                                    </div>
                                </Col>
                                <Col className='gutter-row' span={4}>
                                    <div >
                                        <TimePicker style={{ width: '187px', marginLeft: '35px' }} onChange={onChangeEmailTime} />
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
                                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridGap: '0px' }}>
                                                        <Radio value={3} className='alerts-radio'>Every</Radio> <span style={{ width: '100px', marginRight: '20px' }}>
                                                            <InputField value={everyDayValue} onChangeInput={(e) => setEveryDayValues(e.target.value)} className='alerts-radio' />
                                                        </span>
                                                        <SelectField
                                                            className='alerts-radio'
                                                            placeholder='Select HH/MM/SS'
                                                            selectList={timeRange}
                                                            value={selectedTimeRange}
                                                            onChangeSelect={(e) => handleSelectTimeChange(e)}
                                                        />

                                                    </div>

                                                </Space>
                                            </Radio.Group>
                                        </Col>
                                    </Row>
                                </div>
                            ) : ''}
                            {selectedSchedule == 'Weekly' ? (
                                <div className="select-days">
                                    <Button className={selectedDays['Sunday'] ? "selected-day-buttons" : "day-buttons"} onClick={() => updateDays('Sunday')} >S</Button>
                                    <Button className={selectedDays['Monday'] ? "selected-day-buttons" : "day-buttons"} onClick={() => updateDays('Monday')} >M</Button>
                                    <Button className={selectedDays['Tuesday'] ? "selected-day-buttons" : "day-buttons"} onClick={() => updateDays('Tuesday')}>T</Button>
                                    <Button className={selectedDays['Wednesday'] ? "selected-day-buttons" : "day-buttons"} onClick={() => updateDays('Wednesday')} >W</Button>
                                    <Button className={selectedDays['Thursday'] ? "selected-day-buttons" : "day-buttons"} onClick={() => updateDays('Thursday')} >T</Button>
                                    <Button className={selectedDays['Friday'] ? "selected-day-buttons" : "day-buttons"} onClick={() => updateDays('Friday')} >F</Button>
                                    <Button className={selectedDays['Saturday'] ? "selected-day-buttons" : "day-buttons"} onClick={() => updateDays('Saturday')} >S</Button>
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
                        {/* {selectedSchedule && (
                            <div style={{ marginTop: '40px' }}>
                                <Button className='schedule-evalutaion-button' onClick={() => SaveData()}>Schedule</Button>
                                <Button className='clear-schedule'>Clear</Button>
                            </div>
                        )} */}
                    </div>
                </TabPane>

            </Tabs>
        </div>

    )
}

export default ReportNotify;