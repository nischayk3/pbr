import React, { useEffect, useRef, useState } from 'react';
import './viewChartStyles.scss';
//antd imports
import { Row, Col, Input, Select, Divider, Switch, Tag, Tooltip, Table, Button, message } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
//components
import InputField from '../../../../../../components/InputField/InputField';
import SelectField from '../../../../../../components/SelectField/SelectField';
import ViewSearchTable from './viewSearchTable';
import StatusWrong from '../../../../../../assets/statusWrong.svg';
import StatusCorrect from '../../../../../../assets/statusCorrect.svg';
//redux
import { useDispatch } from 'react-redux';
import { showLoader, hideLoader, showNotification } from '../../../../../../duck/actions/commonActions';
//services
import { getViewTable } from '../../../../../../services/commonService';
import { postChartPlotData } from '../../../../../../services/chartPersonalizationService';
//cjsonw
import chartJson from '../chartObj.json';

//unpacking antd components
const { Search } = Input;
const { Option } = Select;

const ViewChart = ({ postChartData, setPostChartData }) => {

    //redux variables
    const dispatch = useDispatch();
    //state variables
    const [viewSearch, setViewSearch] = useState(false);
    const [searchTableData, setSearchTableData] = useState([]);
    const [coverageTableData, setCoverageTableData] = useState([]);
    const [versionList, setVersionList] = useState([0]);
    const searchViewData = useRef([]);
    const postChart = useRef();
    const postChartView = useRef({});
    const ref = useRef(null);
    const [viewData, setViewData] = useState({ viewName: '', status: '', viewDispId: ' ', searchValue: '', chartVersion: 0 });

    const columns = [
        {
            title: 'Status',
            key: 'param',
            dataIndex: 'param',
            render: (text, record, index) => (
                <>
                    {record.coverage_metric_percent === '100.0%' ||
                        record.coverage_metric_percent === '100%' ? (
                        <span>
                            <img src={StatusCorrect} />
                        </span>
                    ) : (
                        <span>
                            <img src={StatusWrong} />
                        </span>
                    )}
                </>
            ),
        },
        {
            title: 'Parameter',
            key: 'function_name',
            dataIndex: 'function_name',
            render: (function_name) => (
                <Tooltip title={function_name}>
                    <Tag color="geekblue" className='parameter-tag'>
                        {function_name}
                    </Tag>
                </Tooltip>
            ),
        },
        {
            title: 'Batch Coverage',
            key: 'coverage_metric' + 'coverage_metric_percent',
            dataIndex: 'coverage_metric_percent',
            align: 'right',
            render: (text, record) => (
                <span>{record.batchstats}({record.coverage_metric_percent})</span>
            )
        }
    ];

    //function for getting viewdata list
    const getViewTableData = async () => {
        let reqView = { vew_status: 'APRD' };
        let antdDataTable = [];

        try {
            dispatch(showLoader());
            const viewRes = await getViewTable(reqView);
            viewRes.Data.forEach((item, key) => {
                let antdObj = {};
                antdObj['key'] = key;
                antdObj['created_by'] = item.created_by;
                antdObj['created_on'] = item.created_on;
                antdObj['product_num'] = item.product_num;
                antdObj['view_disp_id'] = item.view_disp_id;
                antdObj['view_info'] = item.view_info;
                antdObj['view_name'] = item.view_name;
                antdObj['view_status'] = item.view_status;
                antdObj['view_version'] = item.view_version;
                antdObj['view'] = item.view;
                antdDataTable.push(antdObj);
            });
            searchViewData.current = JSON.parse(JSON.stringify(antdDataTable));
            setSearchTableData(antdDataTable);
            // setviewTableData(antdDataTable);

            dispatch(hideLoader());
        } catch (error) {
            dispatch(hideLoader());
            dispatch(showNotification('error', error.message));
        }
    };

    //function to handle search
    const searchTable = (value) => {
        const filterData = searchViewData.current.filter((o) =>
            Object.keys(o).some((k) =>
                String(o[k]).toLowerCase().includes(viewData.searchValue.toLowerCase())
            )
        );
        setSearchTableData(filterData)
    };

    const setData = async () => {
        try {
            dispatch(showLoader());
            const viewRes = await postChartPlotData(postChartData);
            setPostChartData({ ...postChartData, extras: viewRes.extras })
            setCoverageTableData(viewRes.extras.coverage)
            dispatch(hideLoader());
        } catch (error) {
            dispatch(hideLoader());
            message.error('Unable to fetch coverages');
        }
    }

    //on search value changes
    const onSearchChange = (e) => {
        if (e.target.value === '') {
            setSearchTableData(searchViewData.current);
        }
        setViewData({ ...viewData, searchValue: e.target.value });
    }

    //on focus of input field showing table results.
    const onFocus = () => {
        setViewSearch(true);
    }

    //function for closing view table result on click of outside.
    const closeTableView = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            setViewSearch(false);
            setSearchTableData(searchViewData.current);
        }
    }
    useEffect(() => {
        document.addEventListener('mousedown', closeTableView);
    }, []);

    //function for handle version change
    const handleVersionChange = (e) => {
        setViewData({ ...viewData, chartVersion: e });
        if (e !== viewData.chartVersion) {
            const newArr = [...postChartData.data];
            newArr.forEach((item) => {
                item.view_version = e;
            })
            setPostChartData({ ...postChartData, data: newArr });
            setData();
        }
    };
    //useEffect for calling view list.
    useEffect(() => {
        getViewTableData();
    }, [])


    return (
        <div className='view-container'>
            <Row>
                <Col ref={ref} span={24} className='search-table'>
                    <label>View ID</label>
                    <Search placeholder="Search" onFocus={onFocus} value={viewData.searchValue} onChange={onSearchChange} onSearch={searchTable} />
                    {viewSearch && <ViewSearchTable postChartView={postChartView} setVersionList={setVersionList} searchViewData={searchViewData} postChartData={postChartData} setPostChartData={setPostChartData} setData={setData} setViewSearch={setViewSearch} searchTableData={searchTableData} viewData={viewData} setViewData={setViewData} />}
                </Col>
            </Row>
            <Row className='view-details'>
                <Col span={19}>
                    <Row gutter={16}>
                        <Col span={8}>
                            <p>View Name</p>
                        </Col>
                        <Col span={14}>
                            <p>: {viewData.viewName}</p>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8}>
                            <p>Status</p>
                        </Col>
                        <Col span={8}>
                            <p>: {viewData.status}</p>
                        </Col>
                    </Row>
                </Col>
                {/* <Col span={3} /> */}
                <Col span={5} className='pb'>
                    <p>Version</p>
                    <SelectField placeholder="Select Chart type" selectList={versionList} selectedValue={viewData.chartVersion} onChangeSelect={handleVersionChange} />
                </Col>
            </Row>
            <Row className='batch'>
                <Col span={24} className='pb'>
                    <p>Batch Coverage</p>
                    <Divider />
                </Col>
            </Row>
            <Row gutter={24} className='filter'>
                <Col span={11}>
                    <SelectField
                        placeholder='Site'
                    // label='Site'
                    // onChangeSelect={(e) => handleSelectChange(e)}
                    // selectList={siteList}
                    // selectedValue={selectedSite}
                    />
                </Col>
                <Col span={13} className='unapproved'>
                    <label>Show Unapproved data</label>&nbsp;&nbsp;
                    <Switch type='primary' size='small' />
                </Col>
            </Row>
            <Row gutter={24} className='filter'>
                <Col span={11}>
                    <InputField
                        placeholder='Select Date Range'
                    // onChangeClick={(e) => handleDateClick(e)}
                    // value={selectedDateRange}
                    />
                </Col>
                <Col className='arrow-right' span={12}>
                    <Button>Apply</Button>
                    <ArrowRightOutlined />
                </Col>
            </Row>
            <Row className='table-cont'>
                <Col span={24}>
                    <Table
                        pagination={false}
                        columns={columns}
                        dataSource={coverageTableData}
                        rowKey={(record) => record.function_name}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default ViewChart