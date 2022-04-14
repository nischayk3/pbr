import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { useDispatch, } from 'react-redux';
import { Row, Col, Input, Button, Card, Select, Switch, Slider, DatePicker, Typography, message } from 'antd';
import SelectField from '../../../../../components/SelectField/SelectField';
import InputField from '../../../../../components/InputField/InputField';
import { getChartPlotData } from '../../../../../services/workSpaceServices';
import ChartFilter from '../chartFilter/chartFilter';
import { getSiteId } from '../../../../../services/chartPersonalizationService';
import { getDashboard } from '../../../../../services/dashboardServices';
import { showLoader, hideLoader, showNotification } from '../../../../../duck/actions/commonActions';
import Plot from 'react-plotly.js';
import dummy from './dummy.json';
import { SyncOutlined, PlusOutlined, EditOutlined, CloseOutlined, CheckCircleOutlined, UndoOutlined } from '@ant-design/icons';
import moment from 'moment';
import './styles.scss';

const dash_info = {
    "dashboard_id": "dashboard1", // text, generated
    "dashboard_name": "Dashboard Test",
    "dashboard_descr": "Test Dashboard Object",// text, chart display name
    "dashboard_description": "Test Dashboard Object", // text, chart detailed description
    "dashboard_version": 1, // integer
    "dashboard_status": 0, // integer, {0: unapproved, 1: pending, 2: approved}
    "data_filter": {
        "date_range": "2007-03-01T13:00:00Z/2008-05-11T15:30:00Z", // ISO 8601 format <start>/<end> time interval
        "unapproved_data": 1, // integer, {0: False, 1: True}
        "site": "" // text
    },
    "dynamic_ranges": [
        {
            "function": "temperature",
            "min": 20,
            "max": 40,
            "lower": 25,
            "upper": 35
        },
        {
            "batches": [],
            "selected": []
        }
    ],
    "panels": [
        // {
        //     "id": 1, // system incremental generated id
        //     "position": {
        //         "h": 1, // panel height default 1 unit
        //         "w": 2, // panel width default 2 units
        //         "x": 0, // panel horizontal position 0-indexed left to right
        //         "y": 0  // panel vertical position 0-indexed top to bottom
        //     },
        //     "source_type": "chart", // panel source type current: {chart}; future: {6.0 analysis charts, grafana}
        //     "source_id": "chart1",
        //     "chart_id": "C192",
        //     "chart_name": "Chart1",
        //     // corresponding id for source
        //     "data_filter": {
        //         "date_range": "2007-03-01T13:00:00Z/2008-05-11T15:30:00Z", // ISO 8601 format <start>/<end> time interval
        //         "unapproved_data": 1, // integer, {0: False, 1: True}
        //         "site": "1255" // text
        //     }
        // },
        {
            "id": 2, // system incremental generated id
            "position": {
                "h": 1, // panel height default 1 unit
                "w": 2, // panel width default 2 units
                "x": 1, // panel horizontal position 0-indexed left to right
                "y": 0  // panel vertical position 0-indexed top to bottom
            },
            "source_type": "chart", // panel source type current: {chart}; future: {6.0 analysis charts, grafana}
            "source_id": "chart2",
            "chart_id": "C193",
            "chart_name": "Chart2",// corresponding id for source
            "data_filter": {
                "date_range": "2007-03-01T13:00:00Z/2008-05-11T15:30:00Z", // ISO 8601 format <start>/<end> time interval
                "unapproved_data": 0, // integer, {0: False, 1: True}
                "site": "1234" // text
            }
        },
        {
            "id": 3, // system incremental generated id
            "position": {
                "h": 1, // panel height default 1 unit
                "w": 2, // panel width default 2 units
                "x": 0, // panel horizontal position 0-indexed left to right
                "y": 1  // panel vertical position 0-indexed top to bottom
            },
            "source_type": "chart", // panel source type current: {chart}; future: {6.0 analysis charts, grafana}
            "source_id": "chart3",
            "chart_id": "C189",
            "chart_name": "Chart3", // corresponding id for source
            "data_filter": {
                "date_range": "2007-03-01T13:00:00Z/2008-05-11T15:30:00Z", // ISO 8601 format <start>/<end> time interval
                "unapproved_data": 1, // integer, {0: False, 1: True}
                "site": "1255" // text
            }
        },
        {
            "id": 4, // system incremental generated id
            "position": {
                "h": 1, // panel height default 1 unit
                "w": 2, // panel width default 2 units
                "x": 1, // panel horizontal position 0-indexed left to right
                "y": 1  // panel vertical position 0-indexed top to bottom
            },
            "source_type": "chart", // panel source type current: {chart}; future: {6.0 analysis charts, grafana}
            "source_id": "chart4",
            "chart_id": "C193",
            "chart_name": "Chart4", // corresponding id for source
            "data_filter": {
                "date_range": "2007-03-01T13:00:00Z/2008-05-11T15:30:00Z", // ISO 8601 format <start>/<end> time interval
                "unapproved_data": 0, // integer, {0: False, 1: True}
                "site": "1234" // text
            }
        }
    ]
}


const ViewChart = (props, ref) => {
    const dispatch = useDispatch();
    const [dashboardInfo, setDashboardInfo] = useState({});
    const [visible, setVisible] = useState(false);
    const [addNewChartFilter, setAddNewChartFilter] = useState(false);
    const [siteList, setSiteList] = useState([]);
    const [tempPanels, setTempPanels] = useState([]);
    const [tempCard, setTempCard] = useState({});
    const [isEditable, setIsEditable] = useState(null);
    const [startTimeIso, setstartTimeIso] = useState('');
    const [endTimeIso, setendTimeIso] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [selectedDateRange, setSelectedDateRange] = useState('');
    useImperativeHandle(ref, () => ({ getChildState: () => { return Object.assign({}, dashboardInfo, { panels: tempPanels }) } }), [dashboardInfo, tempPanels]);
    const range = [
        { key: 'Last 5 minutes', value: 5 },
        { key: 'Last 10 minutes', value: 10 },
        { key: 'Last 15 minutes', value: 15 },
        { key: 'Last 20 minutes', value: 20 },
        { key: 'Last 25 minutes', value: 25 },
        { key: 'Last 30 minutes', value: 30 },
    ];

    const typeOfCharts = ['Analysis', 'Process Control', 'Grafana']
    const [filterObject, setFilterObject] = useState({ site: '', unapprovedData: '', explorationControl: '', startTime: '', endTime: '' })
    const options = range.map((item, i) => (
        <Option key={i} value={item.value}>
            {item.key}
        </Option>
    ));

    useEffect(() => {
        fetchDataFromUrl();
    }, []);

    const getChartData = (chartId, payload = {}) => {
        let login_response = JSON.parse(localStorage.getItem('login_details'));
        let req = { chartId: chartId, ...payload }
        let headers = {
            'content-type': 'application/json',
            'x-access-token': login_response.token ? login_response.token : '',
            'resource-name': 'DASHBOARD',
        };
        try {
            //dispatch(showLoader());
            return getChartPlotData(req, headers);

            //dispatch(hideLoader());
        } catch (error) {
            dispatch(hideLoader());
            dispatch(showNotification('error', error.Message));
        }
    }

    const getSiteIdHandler = (id = props.viewData.viewId) => {
        console.log(id);
        let reqSite = { view_id: id };
        return getSiteId(reqSite).then((res) => {
            if (res.Status === 200) {
                return res.Data[0];
            } else if (res.Status === 400) {
                dispatch(showNotification('error', 'Site Error - ' + res.Message));
                return []
            } else if (res === 'Internal Server Error') {
                dispatch(showNotification('error', 'Site Error - ' + res));
                return []
            }
        });
    };

    const fetchDataFromUrl = async () => {
        console.log("idd", props.dashboardId)
        if (props.dashboardId) {
            let req = { dashboardId: props.dashboardId }
            try {
                dispatch(showLoader());
                const dashboardRes = await getDashboard(req);
                //setDashboardInfo(dashboardRes.data);
                //setTempPanels(dash_info.panels);
                dash_info.panels.map(async (el, i) => {
                    // let data= props.rawTableData.find(x=>x.chart_disp_id==el.chart_id);
                    // console.log(data);
                    // if(data?.chart_info[0].view_id){
                    //     let resp= await getSiteIdHandler(data?.chart_info[0].view_id);
                    //     dash_info.panels[i].data_filter.site_list=resp;
                    // }
                    let res = await getChartData(el.chart_id)
                    let chartLayout = {
                        xaxis: res.data[0]?.layout.xaxis,
                        yaxis: res.data[0]?.layout.yaxis,
                        autosize: false,
                        width: 580,
                        height: 210,
                        margin: {
                            l: 60,
                            r: 50,
                            //b: 75,
                            t: 10,
                            pad: 4
                        }
                    }
                    //dash_info.panels[i] = Object.assign({}, res, { chartLayout: chartLayout }, dash_info.panels[i]);
                    el.chartLayout = chartLayout
                    el.data = res.data
                    //setTempPanels(dash_info.panels);

                })
                setTempPanels(dash_info.panels);
                setDashboardInfo(dash_info);
                dispatch(hideLoader());
            } catch (error) {
                dispatch(hideLoader());
                message.error('Unable to fetch data');
            }
        } else {
            let newDummy = JSON.parse(JSON.stringify(dummy));
            newDummy.dashboard_name = props.dashboardName;
            newDummy.panels[0].chart_id = props.viewData.chartDispId;
            newDummy.panels[0].chart_name = props.viewData.chartName;
            //setDashboardInfo(newDummy);
            //setTempPanels(newDummy.panels);
            try {
                dispatch(showLoader())
                let resp = await getSiteIdHandler();
                newDummy.panels[0].data_filter.site_list = resp;
                //newDummy.panels.map(async (el, i) => {
                let res = await getChartData(newDummy.panels[0].chart_id)
                let chartLayout = {
                    xaxis: res.data[0]?.layout.xaxis,
                    yaxis: res.data[0]?.layout.yaxis,
                    autosize: false,
                    width: 580,
                    height: 210,
                    margin: {
                        l: 60,
                        r: 50,
                        //b: 75,
                        t: 10,
                        pad: 4
                    }
                }
                newDummy.panels[0] = Object.assign({}, res, { chartLayout: chartLayout }, newDummy.panels[0]);

                //})
                setTempPanels(newDummy.panels);
                setDashboardInfo(newDummy);
                dispatch(hideLoader())
            } catch (error) {
                dispatch(hideLoader());
                message.error('Unable to fetch data');
            }
        }

    }

    const onChangeCheckbox = (checked) => {
        const isChecked = checked;

    };

    const onChangeInnerCheckbox = (checked, index) => {
        console.log("checked,index", checked, index)
        const isChecked = checked ? 1 : 0;
        let arr = [...tempPanels]
        arr[index].data_filter.unapproved_data = isChecked;
        setTempPanels(arr);

    };
    const onChangeTempCheckbox = (checked) => {
        console.log("checked,index", checked)
        const isChecked = checked ? 1 : 0;
        let obj = { ...tempCard }
        obj.data_filter.unapproved_data = isChecked;
        setTempCard(obj);

    };
    const showModal = () => {
        setVisible(true);
    };
    const handleDateClick = () => {
        showModal();

    };
    const onChangeStart = (date, dateString) => {
        console.log('setStartTime', date, dateString);
        let obj = { ...filterObject };
        obj.startTime = dateString;
        setFilterObject(obj);
        console.log('forment', moment(date).toISOString());
        setStartTime(dateString);
        setstartTimeIso(moment(date).toISOString());
    };
    const onChangeEnd = (date, dateString) => {
        console.log('setEndTime', dateString);
        let obj = { ...filterObject };
        obj.endTime = dateString;
        setFilterObject(obj);
        console.log('forment', moment(date).toISOString());
        setEndTime(dateString);
        setendTimeIso(moment(date).toISOString());
    };

    const onInnerStart = (date, dateString, index) => {
        console.log('setStartTime', date, dateString);
        console.log('forment', moment(date).toISOString());
        let arr = [...tempPanels];
        arr[index].data_filter.date_range = `${moment(date).toISOString()}/${arr[index].data_filter.date_range.split("/")[1]}`;
        setTempPanels(arr);


    };
    const onInnerEnd = (date, dateString, index) => {
        console.log('setStartTime', date, dateString);
        console.log('forment', moment(date).toISOString());
        let arr = [...tempPanels];
        arr[index].data_filter.date_range = `${arr[index].data_filter.date_range.split("/")[0]}/${moment(date).toISOString()}`;
        setTempPanels(arr);
    };
    const onInnerTempStart = (date, dateString) => {
        console.log('setStartTime', date, dateString);
        console.log('forment', moment(date).toISOString());
        let obj = { ...tempCard };
        obj.data_filter.date_range = `${moment(date).toISOString()}/${obj.data_filter.date_range.split("/")[1]}`;
        setTempCard(obj);


    };
    const onInnerTempEnd = (date, dateString) => {
        console.log('setStartTime', date, dateString);
        console.log('forment', moment(date).toISOString());
        let obj = { ...tempCard };
        obj.data_filter.date_range = `${obj.data_filter.date_range.split("/")[0]}/${moment(date).toISOString()}`;
        setTempCard(obj);
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

    const handleGlobalDropdownChange = (value, text) => {
        console.log(value)
        let obj = { ...filterObject }
        switch (text) {
            case 'Site': obj.site = value;
                setFilterObject(obj);
                break;
            case 'Unapproved Data': obj.unapprovedData = value;
                setFilterObject(obj);
                break;
            case 'Exploration Controls': obj.explorationControl = value;
                setFilterObject(obj);
                break;
        }


        setFilterObject(obj)
    }
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

    const onTypeChartsChange = (e, index) => {
        console.log("source value",e)
        let arr = [...tempPanels];
        tempPanels[index].source_type = e;
        setTempPanels(arr);
    }
    const onTempChartsChange = (e) => {
        let obj = { ...tempCard };
        obj.source_type = e;
        setTempCard(obj);
    }

    const onSiteChange = (e, index) => {
        let arr = [...tempPanels];
        tempPanels[index].data_filter.site = e;
        setTempPanels(arr);
    }
    const onTempSiteChange = (e) => {
        let obj = { ...tempCard };
        obj.data_filter.site = e;
        setTempCard(obj);
    }

    const removeCard = (index) => {
        console.log(index);
        let obj = { ...dashboardInfo };
        obj.panels = [...obj.panels];
        obj.panels.splice(index, 1);
        setDashboardInfo(obj);
        setTempPanels(tempPanels.splice(index, 1));

    }

    const showPreview = async (index) => {
        let arr = [...tempPanels]
        let id = tempPanels[index].chart_id;
        let payload = {
            site: [tempPanels[index].data_filter.site],
            date_range: tempPanels[index].data_filter.date_range,
            unapproved_data: tempPanels[index].data_filter.unapproved_data
        }

        let res = await getChartData(id, payload);
        let chartLayout = {
            xaxis: res.data[0]?.layout.xaxis,
            yaxis: res.data[0]?.layout.yaxis,
            autosize: false,
            width: 580,
            height: 210,
            margin: {
                l: 60,
                r: 50,
                //b: 75,
                t: 10,
                pad: 4
            }
        }
        arr[index] = Object.assign({}, arr[index], res, { chartLayout: chartLayout });
        setTempPanels(arr);
    }

    const showPreviewTemp = async () => {
        let obj = { ...tempCard }
        let id = obj.chart_id;
        let payload = {
            site: [obj.data_filter.site],
            date_range: obj.data_filter.date_range,
            unapproved_data: obj.data_filter.unapproved_data
        }

        let res = await getChartData(id, payload);
        let chartLayout = {
            xaxis: res.data[0]?.layout.xaxis,
            yaxis: res.data[0]?.layout.yaxis,
            autosize: false,
            width: 580,
            height: 210,
            margin: {
                l: 60,
                r: 50,
                //b: 75,
                t: 10,
                pad: 4
            }
        }
        obj = Object.assign({}, obj, res, { chartLayout: chartLayout });
        setTempCard(obj);
    }

    const searchCallback = async (data, index) => {
        let arr = [...tempPanels];
        arr[index].chart_id = data.chartDispId;
        arr[index].chart_name = data.chartName;
        arr[index].view_id = data.viewId;
        let res = await getSiteIdHandler(data.viewId);
        console.log(res);
        arr[index].data_filter.site_list = res;
        setTempPanels(arr);
    }

    const searchTempCallback = async (data) => {
        let obj = { ...tempCard }
        obj.chart_id = data.chartDispId;
        obj.chart_name = data.chartName;
        obj.view_id = data.viewId;
        let res = await getSiteIdHandler(data.viewId);
        console.log(res);
        obj.data_filter.site_list = res;
        setTempCard(obj);
    }

    const addNewCard = () => {
        let newDummy = { ...dummy }
        setTempCard(newDummy.panels[0]);
    }

    const onTempApply = () => {
        let obj = JSON.parse(JSON.stringify(tempCard))
        let arr = [...tempPanels, obj];
        setTempPanels(arr);
        let info = { ...dashboardInfo };
        info.panels = [...dashboardInfo.panels, obj];
        setDashboardInfo(info);
        setTempCard({});
    }

    console.log("temp", tempPanels)
    console.log("dashInfo", dashboardInfo)
    return (
        <div>
            <Card title={props.dashboardName ? props.dashboardName : dashboardInfo.dashboard_name}>
                <div className='global-filters'>
                    <div>
                        <SyncOutlined />
                    </div>
                    <div>
                        <Select style={{ width: 120 }} value={dashboardInfo?.data_filter?.site} onChange={(value) => handleGlobalDropdownChange(value, 'Site')}>
                            {siteList.map((el, index) => {
                                return (
                                    <Option value={el}>{el}</Option>
                                )
                            })}
                        </Select>
                    </div>
                    <div className='show-data'>
                        <p>Show Unapproved data</p>
                        <Switch type='primary' size='small' checked={dashboardInfo?.data_filter?.unapproved_data} onChange={(value) => handleGlobalDropdownChange(value, 'Unapproved Data')} />

                    </div>
                    <div style={{ marginTop: '3px' }}>
                        {/* <InputField
                            placeholder='Select Time Range'
                            onChangeClick={(e) => handleDateClick(e)}

                        /> */}
                        {/* {
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

                            )} */}
                        <DatePicker
                            onChange={onChangeStart}
                        //value={moment(dashboardInfo?.data_filter?.date_range?.split("/")[0]).format("YYYY/MM/DD")}

                        />

                        <DatePicker onChange={onChangeEnd}
                            //value={dashboardInfo?.data_filter?.date_range.split("/")[1].join("").split("T")[1]}
                            style={{ marginLeft: '22px' }} />

                    </div>
                    <div>
                        <Select defaultValue="Exploration Controls" style={{ width: 230 }} onChange={(value) => handleGlobalDropdownChange(value, 'Exploration Controls')}>
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
                    {tempPanels.map((el, index) => {
                        console.log("undefined", el)
                        return (
                            <Col className="gutter-row" span={12}>
                                <div className='chartCard'>
                                    <div className='inner-chart-filters'>
                                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <div>{el.chart_name}</div>
                                            <div >
                                                {isEditable == index ? (
                                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                        <div>< UndoOutlined style={{ color: '#486BC9' }} /></div>
                                                        <div>
                                                            <span style={{ marginLeft: '20px', marginRight: '20px' }}>Apply <CheckCircleOutlined style={{ color: '#486BC9' }} onClick={() => setIsEditable(null)} /></span>
                                                            <span><CloseOutlined style={{ color: '#262626' }} onClick={() => removeCard(index)} /></span>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <span>Edit <EditOutlined style={{ color: '#486BC9' }} onClick={() => setIsEditable(index)} /></span>
                                                        <span style={{ marginLeft: '10px' }}><CloseOutlined style={{ color: '#262626' }} onClick={() => removeCard(index)} /></span></>
                                                )}

                                            </div></div>

                                        {/* {isEditable && (
                                            <div >
                                                <div>< UndoOutlined style={{ color: '#486BC9' }} /></div>
                                                <div>
                                                <span style={{ marginLeft: '20px', marginRight: '20px' }}>Apply <CheckCircleOutlined style={{ color: '#486BC9' }} /></span>
                                                <span><CloseOutlined style={{ color: '#262626' }} /></span>
                                                </div>
                                            </div>
                                        )} */}


                                    </div>
                                    <div>
                                        {isEditable == index && (
                                            <ChartFilter
                                                checked={tempPanels[index].data_filter.unapproved_data}
                                                typeChartValue={tempPanels[index].source_type}
                                                checkboxChange={(value) => onChangeInnerCheckbox(value, index)}
                                                onChangeTypeCharts={(e) => onTypeChartsChange(e, index)}
                                                typeOfChartsOptions={typeOfCharts}
                                                selectedTypeOfCharts={tempPanels[index].source_type}
                                                dateRange={tempPanels[index].data_filter.date_range}
                                                siteValue={tempPanels[index].data_filter.site}
                                                chartName={tempPanels[index].chart_name}
                                                chartId={tempPanels[index].chart_id}
                                                siteOption={tempPanels[index].data_filter.site_list}
                                                onInnerStart={(date, dateString) => onInnerStart(date, dateString, index)}
                                                onInnerEnd={(date, dateString) => onInnerEnd(date, dateString, index)}
                                                onSiteChange={(e) => onSiteChange(e, index)}
                                                viewData={props.viewData}
                                                searchTableData={props.searchTableData}
                                                setSearchTableData={props.setSearchTableData}
                                                searchTable={props.searchTable}
                                                onSearchChange={props.onSearchChange}
                                                searchData={props.searchData}
                                                setViewData={props.setViewData}
                                                showPreview={() => showPreview(index)}
                                                rawTableData={props.rawTableData}
                                                searchCallback={(data) => searchCallback(data, index)}
                                            />
                                        )}
                                        <div style={{ marginTop: isEditable == index ? '0px' : '70px' }}>
                                            <Plot
                                            data={el.data && el?.data[0]?.data}
                                            layout={el.chartLayout && el?.chartLayout}
                                        />
                                            {/* <Plot
                                                data={tempPanels[index]?.data && tempPanels[index]?.data[0]?.data}
                                                layout={tempPanels[index] && tempPanels[index]?.chartLayout}

                                            /> */}
                                        </div>


                                    </div>
                                </div>
                            </Col>
                        )
                    })}
                    <Col className="gutter-row" span={12}>
                        <div className='newCard'>
                            {Object.keys(tempCard).length == 0 ? (
                                <div className='before-new-card' onClick={() => addNewCard()}>
                                    <PlusOutlined />
                                    <p>Add new chart</p>
                                </div>
                            ) :
                                (<>
                                    <div className='inner-chart-filters'>
                                        <span>{tempCard.chart_name ? tempCard.chart_name : 'Untitled'}</span>

                                        <div style={{ float: 'right' }}>
                                            <span style={{ marginLeft: '20px', marginRight: '20px' }}>Apply <CheckCircleOutlined style={{ color: '#486BC9' }} onClick={() => onTempApply()} /></span>
                                            <span><CloseOutlined style={{ color: '#262626' }} /></span>
                                        </div>



                                    </div>
                                    <div>
                                        <ChartFilter
                                            checked={tempCard.data_filter.unapproved_data}
                                            typeChartValue={tempCard.source_type}
                                            checkboxChange={(value) => onChangeTempCheckbox(value)}
                                            onChangeTypeCharts={(e) => onTempChartsChange(e)}
                                            typeOfChartsOptions={typeOfCharts}
                                            selectedTypeOfCharts={tempCard.source_type}
                                            dateRange={tempCard.data_filter.date_range}
                                            siteValue={tempCard.data_filter.site}
                                            chartName={tempCard.chart_name}
                                            chartId={tempCard.chart_id}
                                            siteOption={tempCard.data_filter.site_list}
                                            onInnerStart={(date, dateString) => onInnerTempStart(date, dateString)}
                                            onInnerEnd={(date, dateString) => onInnerTempEnd(date, dateString)}
                                            onSiteChange={(e) => onTempSiteChange(e)}
                                            showPreview={() => showPreviewTemp()}
                                            rawTableData={props.rawTableData}
                                            searchCallback={(data) => searchTempCallback(data)}
                                        />
                                        {tempCard?.data && (
                                        <Plot
                                            data={tempCard?.data && tempCard?.data[0]?.data}
                                            layout={tempCard && tempCard?.chartLayout}
                                        />
                                        )}
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


export default forwardRef(ViewChart);
