/**
 * @author Mihir Bagga <mihir.bagga@mareana.com>
 * @Mareana - CPV Product
 * @version 1
 * @Last Modified - 22 April, 2022
 * @Last Changed By - @Mihir 
 */

import React, { useState,useEffect } from 'react';
import { Row, Col, Button, Tabs, DatePicker, TimePicker, Radio, Select, Divider, Space, Table, Modal } from 'antd';
import SelectField from '../../SelectField/SelectField';
import InputField from '../../InputField/InputField';
import './styles.scss';
import { useDispatch } from 'react-redux';
import { showLoader, hideLoader, showNotification } from '../../../duck/actions/commonActions';
import { putJob } from '../../../services/jobScheduleService';
import { PaperClipOutlined, ClockCircleOutlined, ExclamationCircleTwoTone } from '@ant-design/icons';

const { TabPane } = Tabs;
const { Option } = Select

const alertList = ['Limits', 'Rules', 'Threshold']
const scheduleList = ['Repeat Once', 'Daily', 'Weekly', 'Monthly']
const timeRange = ['Hour', 'Minutes', 'Seconds'];


const alertEvaluation = (props) => {

    const [selectedAlert, setSelectedAlert] = useState('');
    const [selectedSchedule, setSelectedSchedule] = useState('');
    const [selectedEmailSchedule, setSelectedEmailSchedule] = useState('');
    const [selectedTimeRange, setSelectedTimeRange] = useState('');
    const [showReceipients, setShowReceipients] = useState(false);
    const [radioValue, setRadioValue] = useState(null);
    const [emailList, setEmailList] = useState([])
    const [scheduleStartDate, setScheduleStartDate] = useState('')
    const [scheduleEmailStartDate, setScheduleEmailStartDate] = useState('')
    const [scheduleTime, setScheduleTime] = useState('')
    const [scheduleEndDate, setScheduleEndDate] = useState('')
    const [modal,setModal] = useState(false)
    const [selectedDays, setSelectedDays] = useState({
        Sunday: false,
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false,
    })
    const [selectedEmailDays, setSelectedEmailDays] = useState({
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
    const [everyDayEmailValue, setEveryDayEmailValue] = useState('')
    const [selectedEmailTimeRange, setSelectedEmailTimeRange] = useState('');


    useEffect(()=>
    {
        if(activeTab=='email')
        {
            setModal(true)
        }
 
    })

    const dispatch = useDispatch();
    const updateEmailDays = (day) => {
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
    }
    const onChangeRadioButton = (e) => {
        setRadioValue(e.target.value);
    };
    const handleSelectTimeChange = (e) => {
        setSelectedTimeRange(e);
    }
    const handleEmailSelectTimeChange = (e) => {
        setSelectedEmailTimeRange(e);
    }
    const handleReceipientsChange = (value) => {
        setEmailList(value);
    }
    const setEveryDayValues = (value) => {
        setEveryDayValue(value)
    }
    const setEveryEmailDayValues = (value) => {
        setEveryDayEmailValue(value)
    }
    const handleModalClose = ()=>
    {
        setModal(false)
        setActiveTab('')
    }
    const SaveData = async () => {
        let req = {}
        let login_response = JSON.parse(localStorage.getItem('login_details'));

        let request_headers = {
            'content-type': 'application/json',
            'x-access-token': login_response.token ? login_response.token : '',
            'resource-name': 'JOB',
        };


        req['app_data'] = props.appType
        req['dag_id'] = ''
        req['created_by'] = localStorage.getItem('username') ? localStorage.getItem('username') : ''
        req['app_type'] = props.appType
        req['app_id'] = ''

        let email_config = {}

        email_config['subject'] = `Update For Report`
        email_config['scheduled_start'] = scheduleEmailStartDate
        email_config['scheduled_time'] = scheduleEmailTime
        email_config["frequency_unit"] = selectedEmailSchedule,
            email_config["email_list"] = emailList,
            email_config["frequency_unit"] = selectedEmailSchedule,
            email_config["selected_days"] = emailList,

            req['email_config'] = email_config
        req['frequency'] = radioValue
        req["frequency_unit"] = selectedSchedule,
            req["job_status"] = "scheduled",
            req["job_type"] = activeTab,
            req['notify_emails'] = emailList,
            req["scheduled_time"] = scheduleTime,
            req["scheduled_start"] = scheduleStartDate

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
    // const onChangeEnd = (date, dateString) => {
    //     setScheduleEndDate(dateString);
    //     // setendTimeIso(moment(date).toISOString());
    // };


    console.log(activeTab)
    const handleChange = selectedItems => {
        setEmailList(selectedItems);
    };

    return (
        <div className="chart-notify">
            <Tabs className='evaluation-tabs' onChange={changeTab} tabBarExtraContent={activeTab == 'schedule_evaluation' ? <div>  <Button className='schedule-evalutaion-button' onClick={() => SaveData()}>Schedule Evaluation</Button>
                <Button className='clear-schedule'>Clear</Button></div> : <></>}>
                <TabPane tab='Schedule evaluation' key="schedule_evaluation">
                    <div style={{ margin: '24px' }}>
                        <div style={{ width: '300px' }}>
                            <ClockCircleOutlined />  <DatePicker style={{ width: '260px' }} onChange={onChangeStart} bordered={false} />
                            <hr style={{ borderTop: '1px solid #dbdbdb' }} />
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
                                        <TimePicker style={{ width: '187px', marginLeft: '35px' }} onChange={onChangeTime} />
                                    </div>
                                </Col>
                            </Row>
                            {selectedSchedule == 'Daily' ? (
                                <div style={{ marginTop: '30px' }}>
                                    <Row>
                                        <Col>
                                            <Radio.Group onChange={onChangeRadioButton} value={radioValue} >
                                                <Space direction="vertical" >
                                                    <Radio value="Every Day" className='alerts-radio'>Every Day</Radio>
                                                    <Radio value="Every WeekDay" className='alerts-radio'>Every WeekDay</Radio>
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
                                <div>
                                    <div className="select-days">
                                        <Button className={selectedDays['Sunday'] ? "selected-day-buttons" : "day-buttons"} onClick={() => updateDays('Sunday')} >S</Button>
                                        <Button className={selectedDays['Monday'] ? "selected-day-buttons" : "day-buttons"} onClick={() => updateDays('Monday')} >M</Button>
                                        <Button className={selectedDays['Tuesday'] ? "selected-day-buttons" : "day-buttons"} onClick={() => updateDays('Tuesday')}>T</Button>
                                        <Button className={selectedDays['Wednesday'] ? "selected-day-buttons" : "day-buttons"} onClick={() => updateDays('Wednesday')} >W</Button>
                                        <Button className={selectedDays['Thursday'] ? "selected-day-buttons" : "day-buttons"} onClick={() => updateDays('Thursday')} >T</Button>
                                        <Button className={selectedDays['Friday'] ? "selected-day-buttons" : "day-buttons"} onClick={() => updateDays('Friday')} >F</Button>
                                        <Button className={selectedDays['Saturday'] ? "selected-day-buttons" : "day-buttons"} onClick={() => updateDays('Saturday')} >S</Button>
                                    </div>
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
                                <Button className='schedule-evalutaion-button' onClick={() => SaveData()} >Schedule Evaluation</Button>
                                <Button className='clear-schedule'>Clear</Button>
                            </div>
                        )} */}
                    </div>
                </TabPane>

                <TabPane tab='Email' key="email" onClick={()=>setModal(true)}>
                    <Tabs tabBarExtraContent={<div>  <Button className='schedule-evalutaion-button' onClick={() => SaveData()}>Schedule</Button>
                        <Button className='clear-schedule'>Clear</Button></div>} >
                        <TabPane tab='Email Draft' key="email_draft">
                            <Select
                                mode="tags"
                                style={{ width: '90%', marginTop: '10px' }}
                                placeholder={<span className="email-recipients">Recipients <span className="email-recipients-opt">(Optional)</span></span>}
                                optionLabelProp="label"
                                value={emailList}
                                bordered={false}
                                onChange={handleChange}
                            >
                                <Option value="mihir.bagga@mareana.com" label="mihir.bagga@mareana.com">
                                    mihir.bagga@mareana.com
                                </Option>
                            </Select>
                            <Divider />
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr' }}>
                                <span>
                                    <p className="email-subject">Subject <span className="email-sub">Update For  </span>  </p>
                                    <Divider />
                                </span>
                                <div style={{ width: '200px', marginLeft: '70%' }}
                                >
                                    <SelectField
                                        placeholder='Pick the type of alert'
                                        onChangeSelect={(e) => handleSelectEmailScheduleChange(e)}
                                        selectList={alertList}
                                        value={selectedSchedule}
                                    />
                                </div>
                            </div>

                            <p className="email-content"> Hey,<br /><br />

                                This is to inform you of the recept update to [report variant name]. Check the attachment for details.<br />
                                Visit <a>www.cpv-mareana.com/alert-dashboard</a> to know more.<br />
                                <br />
                                <Table /> <br />
                                Regards,<br />
                                [variant_username]</p>

                            <p className="email-attach">Select to Attach</p>
                            <div className="attachment-report-chart"> <span><PaperClipOutlined style={{ marginLeft: '10px' }} /><span className="attachment-report-text"> Report_name.pdf</span> </span></div>
                            <div className="attachment-report-chart"> <span><PaperClipOutlined style={{ marginLeft: '10px' }} /><span className="attachment-report-text"> Data_table</span> </span></div>


                            {/* {emailList.length > 0 && (
                                <div style={{ marginTop: '50px' }}>
                                    <Button className='schedule-evalutaion-button' onClick={() => SaveData()}>Schedule Evaluation</Button>
                                    <Button className='clear-schedule'>Clear</Button>
                                </div>
                            )} */}
                            <Divider />

                        </TabPane>
                        <TabPane tab='Email Schedule' key="email_schedule">
                            <div style={{ margin: '24px' }}>
                                <div style={{ width: '200px' }}>
                                    <ClockCircleOutlined />   <DatePicker placeholder="Start Date" bordered={false} onChange={onChangeEmailStart} />
                                    <Divider />
                                </div>
                                <div style={{ marginTop: '40px' }}>
                                    <Row gutter={[16, 24]}>
                                        <Col className='gutter-row' span={4}>
                                            <div >
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
                                                <TimePicker onChange={onChangeEmailTime} />
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
                                                                    <InputField value={everyDayEmailValue} onChangeInput={(e) => setEveryEmailDayValues(e.target.value)} className='alerts-radio' />
                                                                </span>
                                                                <SelectField
                                                                    className='alerts-radio'
                                                                    placeholder='Select HH/MM/SS'
                                                                    selectList={timeRange}
                                                                    value={selectedEmailTimeRange}
                                                                    onChangeSelect={(e) => handleEmailSelectTimeChange(e)}
                                                                />

                                                            </div>

                                                        </Space>
                                                    </Radio.Group>
                                                </Col>
                                            </Row>
                                        </div>
                                    ) : ''}
                                    {selectedSchedule == 'Weekly' ? (
                                        <div>
                                            <div className="select-days">
                                                <Button className={selectedEmailDays['Sunday'] ? "selected-day-buttons" : "day-buttons"} onClick={() => updateDays('Sunday')} >S</Button>
                                                <Button className={selectedDays['Monday'] ? "selected-day-buttons" : "day-buttons"} onClick={() => updateDays('Monday')} >M</Button>
                                                <Button className={selectedDays['Tuesday'] ? "selected-day-buttons" : "day-buttons"} onClick={() => updateDays('Tuesday')}>T</Button>
                                                <Button className={selectedDays['Wednesday'] ? "selected-day-buttons" : "day-buttons"} onClick={() => updateDays('Wednesday')} >W</Button>
                                                <Button className={selectedDays['Thursday'] ? "selected-day-buttons" : "day-buttons"} onClick={() => updateDays('Thursday')} >T</Button>
                                                <Button className={selectedDays['Friday'] ? "selected-day-buttons" : "day-buttons"} onClick={() => updateDays('Friday')} >F</Button>
                                                <Button className={selectedDays['Saturday'] ? "selected-day-buttons" : "day-buttons"} onClick={() => updateDays('Saturday')} >S</Button>
                                            </div>
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
                                        <Button className='schedule-evalutaion-button' onClick={() => SaveData()}>Schedule Evaluation</Button>
                                        <Button className='clear-schedule'>Clear</Button>
                                    </div>
                                )} */}
                            </div>
                        </TabPane>
                    </Tabs>
                </TabPane>
            </Tabs>
            <Modal visible={modal} footer={false} onCancel={handleModalClose} >
                <div>
                <ExclamationCircleTwoTone twoToneColor="red" />  Notify
                </div>
                <div>
                    Do you want to notify with same schedule or different ?
                </div>
                <Button className="custom-primary-btn">Different</Button>
                <Button className="custom-primary-btn">Same</Button>

            </Modal>
        </div>
    )
}

export default alertEvaluation;