import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import ScreenHeader from '../../../../../components/ScreenHeader/screenHeader';
import illustrations from '../../../../../assets/images/Dashboard-Banner.svg';
import Banner from '../../../../../assets/images/Popup-Side.svg';
import { getDashboard } from '../../../../../services/dashboardServices';
import {
    hideLoader,
    showLoader,
    showNotification,
} from '../../../../../duck/actions/commonActions';
import { Card, Row, Col, Input, Space, Divider, message, Modal, Button, Avatar, Table } from 'antd';
import ChartSearchTable from './chartTableLoad';
import { PlusOutlined } from '@ant-design/icons';
import './styles.scss';

export default function landingPage(props) {
    const { Search } = Input;
    const [resultDate, setResultDate] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [chartSearch, setChartSearch] = useState(false);
    const [searchTableData, setSearchTableData] = useState([]);
    const [dashboardData, setDashboardData] = useState([]);
    const [searchedLanding, setSearchedLanding] = useState(false);
    const [filterTableLanding, setFilterTableLanding] = useState(null)
    const ref = useRef(null);
    const dispatch = useDispatch();

    const columns = [
        {
            title: 'Dashboard Id',
            dataIndex: 'dashboard_id',
            key: 'dashboard_id',
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
            title: 'Dashboard Name',
            dataIndex: 'dashboard_name',
            key: 'dashboard_name',
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
            title: 'Dashboard Status',
            dataIndex: 'dashboard_status',
            key: 'dashboard_status',
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
            render: (text, row, index) => {
                return (
                    <div>
                        <Avatar className='avatar-icon' style={{ backgroundColor: getRandomColor(index + 1) }} >{text.split("")[0].toUpperCase()} </Avatar>
                        <span className='avatar-text'>{text}</span>
                    </div>
                );
            },
        },
    ];

    const getRandomColor = (index) => {
        let colors = ['#56483F', '#728C69', '#c04000', '#c19578']
        return colors[index % 4];

    }

    //landing page search
    const landingSearch = (value) => {
        setSearchedLanding(true)
        const tableData = dashboardData
        const filterTable = tableData.filter((o) =>
            Object.keys(o).some((k) =>
                String(o[k]).toLowerCase().includes(value.toLowerCase())
            )
        );

        setFilterTableLanding(filterTable)
    };


    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        props.chartCard(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    useEffect(() => {
        updateDate();
        dashboardRes();
        document.addEventListener('mousedown', closeTableView);
    }, []);
    const updateDate = () => {
        const date = new Date();
        const month = date.toLocaleString('default', { month: 'long' });
        const latestDate = date.getDate();
        const year = date.getFullYear();
        const resultDate = month + ' ' + latestDate + ',' + ' ' + year;
        setResultDate(resultDate);
    };

    //get Dashboard
    const dashboardRes = async () => {
        let req = {}
        try {
            dispatch(showLoader());
            const dashboardRes = await getDashboard(req);
            setDashboardData(dashboardRes.data);
            dispatch(hideLoader());
        } catch (error) {
            dispatch(hideLoader());
            message.error('Unable to fetch coverages');
        }
    }

    //on focus of input field showing table results.
    const onFocus = () => {
        setChartSearch(true);
    }
    const onFocusRemove = (value) => {
        setChartSearch(value);
    }
    //function for closing view table result on click of outside.
    const closeTableView = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            setChartSearch(false);
            props.setSearchTableData(props.searchData.current);

        }
    }

    const handleDashboardName = (e) => {
        props.dashboarNameFunction(e.target.value)
    }

    //on search value changes
    // const onSearchChange = (e) => {
    //     if (e.target.value === '') {
    //         setSearchTableData(searchViewData.current);
    //     }
    //     setViewData({ ...viewData, searchValue: e.target.value });
    // }

    //function to handle search
    // const searchTable = (value) => {
    //     const filterData = searchViewData.current.filter((o) =>
    //         Object.keys(o).some((k) =>
    //             String(o[k]).toLowerCase().includes(viewData.searchValue.toLowerCase())
    //         )
    //     );
    //     setSearchTableData(filterData)
    // };
    return (
        <div>
            <ScreenHeader
                bannerbg={{
                    background: 'linear-gradient(180deg, rgba(199, 144, 129, 0.15) 0%, rgba(223, 165, 121, 0.56) 100%)',
                }}
                title={`Howdy ${localStorage.getItem('username')},`}
                description='Lets get designing some report templates'
                source={illustrations}
                sourceClass='dashboard-image'
            />
            <Row className="landing-content">
                <Col span={24}>
                    <Card bordered={false}>
                        <Row>
                            <Col span={6} />
                            <Col span={12} className='p36'>
                                <Search
                                    placeholder="Search by view ID, name, product number, creator, status"
                                    allowClear
                                    enterButton="Search"
                                    size="large"
                                    onSearch={landingSearch}
                                />
                                {searchedLanding ? <Table className="landing-table" columns={columns} dataSource={filterTableLanding === null ? dashboardData: filterTableLanding} /> : <></>}

                            </Col>
                            <Col span={6} />
                        </Row>
                        <Row>
                            <Col span={6} />
                            <Col span={12} className='p36'>
                                <div className='create-new' onClick={() => showModal()}>
                                    <PlusOutlined />
                                    <p>Create new dashboard</p>
                                </div>
                            </Col>
                            <Col span={6} />
                        </Row>
                        <Row className='recent-charts'>
                            <Col span={6} />
                            <Col span={12}>
                                <h3>Recently created dashboard</h3>
                                <Divider />
                                <Row gutter={40}>
                                    {dashboardData.map((el, index) => {
                                        console.log(el)
                                        return (
                                            <Col className="gutter-row" span={6} style={{ marginTop: '10px' }} key={index}>
                                                <div className='chart-tiles'>
                                                    <p className='cid'>{el.dashboard_info.dashboard_id}</p>
                                                    <p className='chartName'>{el.dashboard_info.dashboard_name}</p>
                                                </div>
                                            </Col>
                                        )
                                    })}

                                </Row>
                            </Col>
                            <Col span={6} />
                        </Row>
                    </Card>
                </Col>
            </Row>
            {
                isModalVisible && (
                    <Modal
                        className='landing-modal'
                        title="Create New Dashboard"
                        visible={isModalVisible}
                        //onOk={handleOk} 
                        onCancel={handleCancel}
                        footer={[
                            <Button style={{ backgroundColor: '#093185', color: 'white', borderRadius: '4px' }} onClick={() =>
                                handleOk()
                            }>Let's Go!</Button>
                        ]}>

                        <div>
                            <Row>
                                <Col span={12}>
                                    <img src={Banner} />
                                </Col>
                                <Col span={12}>
                                    <Row>
                                        <p>Let's give your dashboard a name</p>
                                        <Input
                                            placeholder='Enter Dashboard Name'
                                            onChange={handleDashboardName}
                                            value={props.dashboardName}

                                        />
                                    </Row>
                                    <Row ref={ref}>
                                        <p>Add a chart to get started</p>
                                        <Search
                                            placeholder="Search"
                                            onFocus={onFocus}
                                            value={props.viewData.searchValue}
                                            onChange={props.onSearchChange}
                                            onSearch={props.searchTable} />
                                        {chartSearch && <ChartSearchTable searchData={props.searchData} searchTableData={props.searchTableData} setViewData={props.setViewData} viewData={props.viewData} setChartSearch={onFocusRemove} searchData={props.searchData} />}
                                    </Row>
                                    <Row className='chart-view'>
                                        <Col span={12}>
                                            <p className='chart-preview-text'>{props.viewData.chartDispId}</p>
                                            <p className='chart-preview-text'>{props.viewData.chartName}</p>
                                            <p className='chart-preview-text'>
                                                <Avatar className='avatar-icon' style={{backgroundColor:'#52679F'}} >{props.viewData.createdBy?.split("")[0].toUpperCase()} </Avatar>
                                                <span>{props.viewData.createdBy}</span>
                                            </p>
                                        </Col>
                                        <Col span={12}>
                                            <p>{props.viewData.chartName}</p>
                                        </Col>

                                    </Row>
                                </Col>
                            </Row>
                        </div>
                    </Modal>
                )
            }
        </div>

    )
}
