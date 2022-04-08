import React, { useState, useEffect } from 'react';
import { Row, Col, Input, Button, Card, Select, Switch, Slider, DatePicker, Typography } from 'antd';
import SelectField from '../../../../../components/SelectField/SelectField';
import InputField from '../../../../../components/InputField/InputField';
import ChartFilter from '../chartFilter/chartFilter';
import Plot from 'react-plotly.js';
import { SyncOutlined, PlusOutlined, EditOutlined, CloseOutlined, CheckCircleOutlined, UndoOutlined } from '@ant-design/icons';
import moment from 'moment';
import './styles.scss';


const ViewChart = (props) => {
    const { Text } = Typography;
    const { Search } = Input;
    const [visible, setVisible] = useState(false);
    const [addNewChartFilter, setAddNewChartFilter] = useState(false);
    const [unapprovedData, setunapprovedData] = useState(false);
    const [unapprovedInnerData, setunapprovedInnerData] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [isDisabled, setisDisabled] = useState(true);
    const [startTimeIso, setstartTimeIso] = useState('');
    const [endTimeIso, setendTimeIso] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [selectedDateRange, setSelectedDateRange] = useState('');
    const range = [
        { key: 'Last 5 minutes', value: 5 },
        { key: 'Last 10 minutes', value: 10 },
        { key: 'Last 15 minutes', value: 15 },
        { key: 'Last 20 minutes', value: 20 },
        { key: 'Last 25 minutes', value: 25 },
        { key: 'Last 30 minutes', value: 30 },
    ];
    const options = range.map((item, i) => (
        <Option key={i} value={item.value}>
            {item.key}
        </Option>
    ));

    const onChangeCheckbox = (checked) => {
        const isChecked = checked;
        setunapprovedData(isChecked);
        setisDisabled(false);
    };

    const onChangeInnerCheckbox = (checked) => {
        const isChecked = checked;
        setunapprovedInnerData(isChecked);

    };
    const showModal = () => {
        setVisible(true);
    };
    const handleDateClick = () => {
        showModal();
        setisDisabled(false);
    };
    const onChangeStart = (date, dateString) => {
        console.log('setStartTime', date, dateString);
        console.log('forment', moment(date).toISOString());
        setStartTime(dateString);
        setstartTimeIso(moment(date).toISOString());
    };
    const onChangeEnd = (date, dateString) => {
        console.log('setEndTime', dateString);
        console.log('forment', moment(date).toISOString());
        setEndTime(dateString);
        setendTimeIso(moment(date).toISOString());
    };
    const onClickTimeRange = () => {
        console.log(
            '`${startTime} / ${endTime}`',
            `${startTimeIso} / ${endTimeIso}`
        );
        setSelectedDateRange(`${startTimeIso}/${endTimeIso}`);
        setVisible(false);
    };
    const generateISO = (val) => {
        let endDate = new Date();
        let startdate = new Date();
        let durationInMinutes = val;
        startdate.setMinutes(endDate.getMinutes() - durationInMinutes);
        let isoVar = startdate.toISOString().replace(/[^\d]/g, '').slice(0, -9);
        let format = moment.duration(isoVar).toISOString();

        let dateFormate = moment(isoVar).format('YYYY-MM-DD');
        // setselectedPeriodDate(dateFormate);
        setSelectedDateRange(dateFormate);
        setVisible(false);
    };
    const layout = {
        xaxis: {},
        yaxis: {},
        autosize: false,
        width: 550,
        height: 250,
        margin: {
            l: 50,
            r: 50,
            b: 75,
            t: 30,
            pad: 4
        },
        title: {
            text: ""
        }
    };
    return (
        <div>
            <Card title={props.dashboardName}>
                {/* <Row>
                    <Col span={4}>
                        <div>
                            <SyncOutlined />
                        </div>
                    </Col>
                    <Col span={2}>
                        <div>
                            <Select defaultValue="lucy" style={{ width: 120 }}>
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>


                            </Select>
                        </div>
                    </Col>
                    <Col span={4}>
                        <div className='show-data'>
                            <p>Show Unapproved data</p>
                            <Switch type='primary' size='small' onChange={onChangeCheckbox} />

                        </div>
                    </Col>
                    <Col span={6}>

                    </Col>
                    <Col span={6}>

                    </Col>
                    <Col span={2}>
                        <div>
                            <Button  type='primary'>Apply</Button>
                        </div>
                    </Col>
                </Row> */}
                <div className='global-filters'>
                    <div>
                        <SyncOutlined />
                    </div>
                    <div>
                        <Select defaultValue="lucy" style={{ width: 120 }}>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>


                        </Select>
                    </div>
                    <div className='show-data'>
                        <p>Show Unapproved data</p>
                        <Switch type='primary' size='small' onChange={onChangeCheckbox} />

                    </div>
                    <div style={{ width: '345px' }}>
                        <InputField
                            placeholder='Select Time Range'
                            onChangeClick={(e) => handleDateClick(e)}

                        />
                        {
                            visible && (
                                <div className='dashboard-timerange'>
                                    <h4>Absolute Time Range</h4>
                                    <div className='grid-2-columns'>
                                        <div>
                                            <Text>From</Text>
                                            <br />
                                            <DatePicker
                                                onChange={onChangeStart}
                                                style={{ marginTop: '10px', marginBottom: '10px' }}
                                            />
                                            <br />
                                            <Text style={{ marginTop: '10px' }}>To</Text>
                                            <br />
                                            <DatePicker onChange={onChangeEnd} style={{ marginTop: '8px' }} />
                                            <br />
                                            <Button
                                                type='primary'
                                                className='custom-secondary-btn'
                                                style={{ marginTop: '20px' }}
                                                onClick={onClickTimeRange}
                                            >
                                                Apply Time Range
                                            </Button>
                                            <p style={{ marginTop: '10px' }}>
                                                <b>Recently Used time changes</b>
                                            </p>
                                            <p>2020-03-16T06:00:00Z - 2020-03-16T06:00:00Z </p>
                                            <p>2020-03-16T06:00:00Z - 2020-03-16T06:00:00Z </p>
                                            <p>2020-03-16T06:00:00Z - 2020-03-16T06:00:00Z </p>
                                            <p>2020-03-16T06:00:00Z - 2020-03-16T06:00:00Z </p>
                                        </div>
                                        <div>
                                            <Search placeholder='Search quick Ranges' style={{ width: 200 }} />
                                            <Button
                                                type='link'
                                                onClick={() => generateISO(5)}
                                                style={{ marginTop: '10px' }}
                                            >
                                                Last 5 minutes
                                            </Button>
                                            <br />
                                            <Button
                                                type='link'
                                                onClick={() => generateISO(15)}
                                                style={{ marginTop: '10px' }}
                                            >
                                                Last 15 minutes
                                            </Button>

                                            <br />
                                            <Button
                                                type='link'
                                                onClick={() => generateISO(25)}
                                                style={{ marginTop: '10px' }}
                                            >
                                                Last 25 minutes
                                            </Button>
                                            <br />
                                            <Button
                                                type='link'
                                                onClick={() => generateISO(35)}
                                                style={{ marginTop: '10px' }}
                                            >
                                                Last 35 minutes
                                            </Button>
                                            <br />
                                            <Button
                                                type='link'
                                                onClick={() => generateISO(45)}
                                                style={{ marginTop: '10px' }}
                                            >
                                                Last 45 minutes
                                            </Button>
                                            <br />
                                            <Button
                                                type='link'
                                                onClick={() => generateISO(60)}
                                                style={{ marginTop: '10px' }}
                                            >
                                                Last 60 minutes
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                            )}
                    </div>
                    <div>
                        <Select defaultValue="Exploration Controls" style={{ width: 230 }}>
                            <Option value='Ph'>PH
                                <Slider range defaultValue={[20, 50]} />
                            </Option>
                            <Option value='Temperature'>Temperature
                                <Slider range defaultValue={[20, 50]} />
                            </Option>
                            <Option value='Batch'>Batch
                                <Slider range defaultValue={[20, 50]} />
                            </Option>



                        </Select>
                    </div>
                    <div>
                        <Button
                            type='primary'
                            className='custom-secondary-btn'
                        >Apply
                        </Button>
                    </div>

                </div>
                <Row gutter={[16, 24]} className='chart-row'>

                    <Col className="gutter-row" span={12}>
                        <div className='chartCard'>
                            <div className='inner-chart-filters'>
                                <span>PH</span>
                                <div style={{ float: 'right' }}>
                                    <span>Edit <EditOutlined style={{ color: '#486BC9' }} onClick={() => setIsEditable(true)} /></span>
                                    <span style={{ marginLeft: '10px' }}><CloseOutlined style={{ color: '#262626' }} /></span>
                                </div>

                                {isEditable && (
                                    <div style={{ float: 'right' }}>
                                        <span>< UndoOutlined style={{ color: '#486BC9' }} /></span>
                                        <span style={{ marginLeft: '20px', marginRight: '20px' }}>Apply <CheckCircleOutlined style={{ color: '#486BC9' }} /></span>
                                        <span><CloseOutlined style={{ color: '#262626' }} /></span>
                                    </div>
                                )}


                            </div>
                            <div>
                                {isEditable && (
                                    <ChartFilter
                                        checkboxChange={onChangeInnerCheckbox}
                                    />
                                )}

                                <Plot
                                    data={[]}
                                    layout={layout}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={12}>
                        <div className='newCard'>
                            {addNewChartFilter == false ? (
                                <div className='before-new-card' onClick={() => setAddNewChartFilter(true)}>
                                    <PlusOutlined />
                                    <p>Add new chart</p>
                                </div>
                            ) :
                                (<>
                                    <div className='inner-chart-filters'>
                                        <span>Untitled</span>

                                        <div style={{ float: 'right' }}>
                                            <span style={{ marginLeft: '20px', marginRight: '20px' }}>Apply <CheckCircleOutlined style={{ color: '#486BC9' }} /></span>
                                            <span><CloseOutlined style={{ color: '#262626' }} /></span>
                                        </div>



                                    </div>
                                    <div>
                                        <ChartFilter
                                            checkboxChange={onChangeInnerCheckbox}
                                        />
                                        <Plot
                                            data={[]}
                                            layout={layout}
                                        />
                                    </div>
                                </>
                                )}

                        </div>
                    </Col>

                </Row>
            </Card>
        </div>
    )
}


export default ViewChart;
