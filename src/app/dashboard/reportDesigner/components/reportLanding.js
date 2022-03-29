import React, { useState, useEffect } from 'react'
import { Card, Input, Divider, Table, Tabs, Avatar } from 'antd';
import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import illustrations from '../../../../assets/images/landing_image.png';
import { getReports } from '../../../../services/reportDesignerServices';
import './style.scss';



export default function Landing(props) {

    const [resultDate, setResultDate] = useState('');
    const [searched, setSearched] = useState(false);
    const [reportList, setReportList] = useState([])
    const [filterTable, setFilterTable] = useState(null)
    const { TabPane } = Tabs;


    const columns = [
        {
            title: 'Report Name',
            dataIndex: 'rep_name',
            key: 'rep_name',
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
            title: 'Report id',
            dataIndex: 'rep_disp_id',
            key: 'rep_disp_id',
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
            title: 'Report Status',
            dataIndex: 'rep_status',
            key: 'rep_status',
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


    useEffect(() => {
        updateDate();
        getReportList();
    }, []);

    const updateDate = () => {
        const date = new Date();
        const month = date.toLocaleString('default', { month: 'long' });
        const latestDate = date.getDate();
        const year = date.getFullYear();
        const resultDate = month + ' ' + latestDate + ',' + ' ' + year
        setResultDate(resultDate);
    }
    const getRandomColor = (index) => {
        let colors = ['#56483F', '#728C69', '#c04000', '#c19578']
        return colors[index % 4];

    }

    const search = (value) => {
        setSearched(true)
        const tableData = reportList
        const filterTable = tableData.filter((o) =>
            Object.keys(o).some((k) =>
                String(o[k]).toLowerCase().includes(value.toLowerCase())
            )
        );

        setFilterTable(filterTable)
    };

    const getReportList = () => {
        let req = { rep_status: 'all' };
        getReports(req).then((res) => {
            setReportList(res['Data']);
        });
    };

    const statusColor = (status) => {
        if (status == 'APRD') {
            return 'aprd'
        }
        if (status == 'DRFT') {
            return 'drft'
        }
        if (status == 'AWAP') {
            return 'awap'
        }
    }
    console.log(filterTable)
    return (
        <div>
            <div className='custom-wrapper'>
                <div className='sub-header'>
                    <div className='sub-header-title'>
                        <ArrowLeftOutlined className='header-icon' />
                        <span className='header-title'>Report Designer</span>

                    </div>
                </div>
                <div className='custom-content-layout'>
                    <Card className='workflow_head'>
                        <div>
                            <p className='dash-username'>Howdy {(localStorage.getItem('username'))}!</p>
                            <p className='dash-text'>Let's get designing some report templates!</p>
                        </div>
                        <img src={illustrations} className='illustration' />
                        <span className='resultdate'>{resultDate}</span>

                    </Card>

                    <Card className="landing-card">
                        <Tabs defaultActiveKey="1" >
                            <TabPane tab="Design Report Template" key="Design Report Template">
                                <Input.Search
                                    placeholder="Search by view ID, name, product number, creator, status"
                                    allowClear
                                    className="landing-btn"
                                    enterButton="Search"
                                    size="large"
                                    onSearch={search}
                                />
                                {searched ? <Table className="landing-table" columns={columns} dataSource={filterTable === null ? reportList : filterTable} /> : <></>}
                                <div className='create-new' >
                                    <PlusOutlined />
                                    <p>Design new report</p>
                                </div><br />
                                <h3 className="recent">Recently designer report templates</h3>
                                <Divider />
                                <div>
                                    <div className="tile">
                                        {reportList.map(i => (
                                            <div className='chart-tiles'>

                                                <div className={`tile-status ${statusColor(i.rep_status)}`} >{i.rep_status}</div>
                                                {i.rep_disp_id}



                                            </div>
                                        ))}

                                    </div>

                                </div>

                            </TabPane>
                            <TabPane tab="Generate Report Variant" key="Generate Report Variant">

                                <Input.Search
                                    placeholder="Search by view ID, name, product number, creator, status"
                                    allowClear
                                    enterButton="Search"
                                    size="large"
                                    onSearch={search}
                                // onSearch={onSearch}
                                />
  
                                {searched ? <Table columns={columns} dataSource={filterTable === null ? reportList : filterTable} /> : <></>}
                                <div className='create-new' >
                                    <PlusOutlined />
                                    <p>Generate new report</p>
                                </div><br />
                                <h3 className="recent-report">Recently created reports</h3>
                                <Divider />
                                <div className="tile">
                                    {reportList.map(i => (
                                        <div className='chart-tiles'>

                                            <div className={`tile-status ${statusColor(i.rep_status)}`} >{i.rep_status}</div>
                                            {i.rep_disp_id}



                                        </div>
                                    ))}

                                </div>

                            </TabPane>
                        </Tabs >
                    </Card>


                </div>
            </div>
        </div>
    )
}
