import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Menu, Dropdown, message, Modal, Tabs, DatePicker, TimePicker, Radio, Select, Divider, Space, Table } from 'antd';
import SelectField from '../../SelectField/SelectField';
import InputField from '../../InputField/InputField';
import { ArrowRightOutlined, ReloadOutlined } from '@ant-design/icons';
import moment from 'moment';
import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { showLoader, hideLoader } from '../../../duck/actions/commonActions';

const { TabPane } = Tabs;
const { Option } = Select
// const { RangePicker } = DatePicker;
const alertList = ['Limits', 'Rules', 'Threshold']
const scheduleList = ['Repeat Once', 'Daily', 'Weekly', 'Monthly']
const timeRange = ['Hour', 'Minutes', 'Seconds'];

const alertEvaluation = () => {
    const [selectedAlert, setSelectedAlert] = useState('');
    const [selectedSchedule, setSelectedSchedule] = useState('');
    const [selectedTimeRange, setSelectedTimeRange] = useState('');
    const [showReceipients, setShowReceipients] = useState(false);
    const [radioValue, setRadioValue] = useState(null);
    const [emailList, setEmailList] = useState([])
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
    const onChangeTimePicker = (time, timeString) => {
        console.log(time, timeString);
    }
    const onChangeRadioButton = (e) => {
        console.log('radio checked', e.target.value);
        setRadioValue(e.target.value);
    };
    const handleSelectTimeChange = (e) => {
        setSelectedTimeRange(e);
    }
    const handleReceipientsChange = (value) => {
        setEmailList(value);
    }
    return (
        <div>
            <Tabs className='evaluation-tabs'>
                <TabPane tab='Schedule Evaluation' key="1">
                    <div style={{ margin: '24px' }}>
                        <div style={{ width: '200px' }}>
                            <DatePicker bordered={false} />

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
                                        <TimePicker />
                                    </div>
                                </Col>
                                {/* <Col className='gutter-row' span={6}>
                                    {selectedSchedule && (
                                        <div>
                                            <TimePicker onChange={() => onChangeTimePicker()} />
                                        </div>
                                    )}
                                </Col> */}
                            </Row>
                            {selectedSchedule == 'Daily' ? (
                                <div style={{ marginTop: '30px' }}>
                                    <Row>
                                        <Col>
                                            <Radio.Group onChange={onChangeRadioButton} value={radioValue} >
                                                <Space direction="vertical" >
                                                    <Radio value={1} className='alerts-radio'>Every Day</Radio>
                                                    <Radio value={2} className='alerts-radio'>Every WeekDay</Radio>
                                                    <Radio value={3} className='alerts-radio'>Every <span style={{ width: '100px', marginRight: '20px' }}>
                                                        <InputField className='alerts-radio' />
                                                    </span>

                                                        <SelectField
                                                            className='alerts-radio'
                                                            placeholder='Select HH/MM/SS'
                                                            selectList={timeRange}
                                                            value={selectedTimeRange}
                                                            onChangeSelect={(e) => handleSelectTimeChange(e)}
                                                        /></Radio>
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
                                    {/* <div className="end-date">
                                  Occures every {Object.keys(selectedDays).filter(k => selectedDays[k] === true).map((i) => (<span>,{i} </span>))}
                                  <p className="end-dates" >Choose an end date  <DatePicker bordered={false} onChange={onChangeEnd} /></p>
                                  {scheduleEndDate.length > 0 ? <><span className="end-dates" onClick={() => setScheduleEndDate('')}>Remove end date </span> <span>{scheduleEndDate}</span></> : <></>}
                              </div> */}
                                </div>
                            ) : ''}

                        </div>
                        <div>
                            {/* {selectedSchedule && (
                                <p className='share-to-workspace'><a onClick={() => setShowReceipients(true)}>Share to Workspace</a><ArrowRightOutlined style={{ marginLeft: '10px', color: '#093185' }} /></p>
                            )} */}
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
                        {selectedSchedule && (
                            <div style={{ marginTop: '40px' }}>
                                <Button className='schedule-evalutaion-button'>Schedule Evaluation</Button>
                                <Button className='clear-schedule'>Clear</Button>
                            </div>
                        )}
                    </div>
                </TabPane>
                <TabPane tab='Email' key="2">
                    <Tabs>
                        <TabPane tab='Email Draft' key="Email Draft">
                            <Select
                                mode="tags"
                                style={{ width: '90%', marginTop: '10px' }}
                                placeholder={<span className="email-recipients">Recipients</span>}
                                optionLabelProp="label"
                                value={emailList}
                                bordered={false}
                            // onChange={handleChange}
                            >

                                <Option value="mihir.bagga@mareana.com" label="mihir.bagga@mareana.com">
                                    mihir.bagga@mareana.com
                                </Option>
                            </Select>
                            <Divider />
                            <span>
                                <p className="email-subject">Subject <span className="email-sub">Update For  </span>  </p>
                                {/* <SelectField
                                    placeholder='Schedule'
                                    onChangeSelect={(e) => handleSelectScheduleChange(e)}
                                    selectList={scheduleList}
                                    value={selectedSchedule}
                                /> */}
                            </span>
                            <Divider />
                            <p className="email-content"> Hey,<br /><br />

                                This is to inform you of the recept update to [report variant name]. Check the attachment for details.<br />
                                Visit www.cpv-mareana.com/alert-dashboard to know more.<br />
                                <br />
                                <Table /> <br />
                                Regards,<br />
                                [variant_username]</p>
                            <Divider />
                        </TabPane>
                        <TabPane tab='Email Schedule' key="Email Schedule">
                            <div style={{ margin: '24px' }}>
                                <div style={{ width: '200px' }}>
                                    <DatePicker placeholder="Start Date" bordered={false} />

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
                                                <TimePicker />
                                            </div>
                                        </Col>
                                        {/* <Col className='gutter-row' span={6}>
                                    {selectedSchedule && (
                                        <div>
                                            <TimePicker onChange={() => onChangeTimePicker()} />
                                        </div>
                                    )}
                                </Col> */}
                                    </Row>
                                    {selectedSchedule == 'Daily' ? (
                                        <div style={{ marginTop: '30px' }}>
                                            <Row>
                                                <Col>
                                                    <Radio.Group onChange={onChangeRadioButton} value={radioValue} >
                                                        <Space direction="vertical" >
                                                            <Radio value={1} className='alerts-radio'>Every Day</Radio>
                                                            <Radio value={2} className='alerts-radio'>Every WeekDay</Radio>
                                                            <Radio value={3} className='alerts-radio'>Every <span style={{ width: '100px', marginRight: '20px' }}>
                                                                <InputField className='alerts-radio' />
                                                            </span>

                                                                <SelectField
                                                                    className='alerts-radio'
                                                                    placeholder='Select HH/MM/SS'
                                                                    selectList={timeRange}
                                                                    value={selectedTimeRange}
                                                                    onChangeSelect={(e) => handleSelectTimeChange(e)}
                                                                />
                                                            </Radio>

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
                                            {/* <div className="end-date">
                                  Occures every {Object.keys(selectedDays).filter(k => selectedDays[k] === true).map((i) => (<span>,{i} </span>))}
                                  <p className="end-dates" >Choose an end date  <DatePicker bordered={false} onChange={onChangeEnd} /></p>
                                  {scheduleEndDate.length > 0 ? <><span className="end-dates" onClick={() => setScheduleEndDate('')}>Remove end date </span> <span>{scheduleEndDate}</span></> : <></>}
                              </div> */}
                                        </div>
                                    ) : ''}

                                </div>
                                <div>
                                    {/* {selectedSchedule && (
                                <p className='share-to-workspace'><a onClick={() => setShowReceipients(true)}>Share to Workspace</a><ArrowRightOutlined style={{ marginLeft: '10px', color: '#093185' }} /></p>
                            )} */}
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
                                {selectedSchedule && (
                                    <div style={{ marginTop: '40px' }}>
                                        <Button className='schedule-evalutaion-button'>Schedule Evaluation</Button>
                                        <Button className='clear-schedule'>Clear</Button>
                                    </div>
                                )}
                            </div>
                        </TabPane>
                    </Tabs>
                </TabPane>

            </Tabs>
        </div>
    )
}

export default alertEvaluation;