import React, { useState } from 'react';

import {
    Card,
    Checkbox,
    DatePicker,
    Input,
    Typography,
    Button,
    Modal,
} from 'antd';
import { connect, useDispatch, useSelector } from 'react-redux';

import InputField from '../../../../../../components/InputField/InputField';
import SelectField from '../../../../../../components/SelectField/SelectField';
import { sendSelectedSite } from '../../../../../../duck/actions/chartPersonalizationAction';

const { Text } = Typography;
const { Search } = Input;

function ChartFilter(props) {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [siteList, setSiteList] = useState(['Site 1', 'Site 2']);
    const [selectedSite, setSelectedSite] = useState([]);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [selectedDateRange, setSelectedDateRange] = useState('');

    //const dispatch = useDispatch()

    const showModal = () => {
        setVisible(true);
    };
    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setVisible(false);
        }, 3000);
    };

    const handleCancel = () => {
        setVisible(false);
    };
    const onChange = () => {
        console.log('onChnage');
    };

    const handleSelectChange = (value) => {
        if (value !== null) {
            setSelectedSite(value);
            //   dispatch(sendSelectedSite(value))
        }
    };
    const onChangeStart = (date, dateString) => {
        console.log('onChnageStart', date, dateString);
        setStartTime(dateString);
    };
    const onChangeEnd = (date, dateString) => {
        console.log('onChangeEnd', date, dateString);
        setEndTime(dateString);
    };

    const handleDateClick = () => {
        showModal();
    };

    const onClickTimeRange = () => {
        setSelectedDateRange(`${startTime} / ${endTime}`);
        console.log('setSelectedDateRange', `${startTime} / ${endTime}`);
        setVisible(false);
    };
    return (
        <div>
            <Card title='Filters'>
                <div>
                    <div className='grid-2-columns'>
                        <SelectField
                            label='Site'
                            onChangeSelect={(e) => handleSelectChange(e)}
                            selectList={siteList}
                            selectedValue={selectedSite}
                        />
                        {/* <DatePicker
                            style={{ height: '35px', marginTop: '20px' }}
                            onClick={() => showModal()}
                            disabled
                        /> */}
                        <InputField
                            label='Date Range'
                            placeholder='Select Date Range'
                            onChangeClick={(e) => handleDateClick(e)}
                            value={
                                selectedDateRange
                                // ? selectedDateRange
                                // : props.chartObj.data_filter.date_range
                            }
                        />
                    </div>
                    <div style={{ padding: '4px 0' }}>
                        <Checkbox onChange={onChange}>Unapproved data</Checkbox>
                    </div>
                </div>
            </Card>

            <Modal
                visible={visible}
                title='Absolute Time Range'
                onOk={handleOk}
                width={700}
                onCancel={handleCancel}
                footer={[
                    <p key='1' style={{ float: 'left' }}>
                        Last 5 minutes United States EST
                    </p>,
                    <Button key='back'>UTC-05:00</Button>,
                    <Button key='submit' type='primary' loading={loading}>
                        Change Time Settings
                    </Button>,
                ]}
            >
                <div className='grid-2-columns'>
                    <div>
                        <Text>From</Text>
                        <br />
                        <DatePicker
                            onChange={onChangeStart}
                            style={{ marginTop: '10px', marginBottom: '10px' }}
                            showTime
                        />
                        <br />
                        <Text style={{ marginTop: '10px' }}>To</Text>
                        <br />
                        <DatePicker
                            onChange={onChangeEnd}
                            style={{ marginTop: '8px' }}
                            showTime
                        />
                        <br />
                        <Button
                            type='primary'
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
                        <Search
                            placeholder='Search quick Ranges'
                            style={{ width: 200 }}
                        />
                        <p style={{ marginTop: '10px' }}>Last 5 minutes</p>
                        <p>Last 15 minutes</p>
                        <p>Last 25 minutes</p>
                        <p>Last 35 minutes</p>
                        <p>Last 45 minutes</p>
                        <p>Last 60 minutes</p>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default ChartFilter;
