import React, { useState, useEffect } from 'react'
import { Card, Input, Divider, Table, Tabs, Avatar } from 'antd';
import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import illustrations from '../../../../../assets/images/ViewCreation_bannerillustration.png';
import { getReports } from '../../../../../services/reportDesignerServices';
import './styles.scss';
import StatusBlock from '../../../../../components/StatusBlock/statusBlock';
import { getViewConfig,getViews } from '../../../../../services/viewCreationPublishing';


export default function Landing(props) {

    const [resultDate, setResultDate] = useState('');
    const [searched, setSearched] = useState(false);
    const [viewList, setViewList] = useState([])
    const [filterTable, setFilterTable] = useState(null)
    const [screen, setScreen] = useState(false)
    const { TabPane } = Tabs;


    const columns = [
        {
            title: 'View',
            dataIndex: 'view',
            key: 'view',
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
            title: 'View Name',
            dataIndex: 'view_name',
            key: 'view_name',
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
            title: 'View Status',
            dataIndex: 'view_status',
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
        getViewsList();
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
        const tableData = viewList
        const filterTable = tableData.filter((o) =>
            Object.keys(o).some((k) =>
                String(o[k]).toLowerCase().includes(value.toLowerCase())
            )
        );

        setFilterTable(filterTable)
    };

    const getViewsList = () => {
        let req = {};
        getViews(req).then((res) => {
          setViewList(res['Data']);
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
                            <p className='dash-text'>Let’s get configuring some Views!</p>
                        </div>
                        <img src={illustrations} className='illustration' />
                        <span className='resultdate'>{resultDate}</span>

                    </Card>

                    <Card className="landing-card">
                        <Input.Search
                            placeholder="Search by view ID or name"
                            allowClear
                            className="landing-btn"
                            enterButton="Search"
                            size="large"
                            onSearch={search}
                        />
                        {searched ? <Table className="landing-table" columns={columns} dataSource={filterTable === null ? viewList : filterTable} /> : <></>}
                        <div className='create-new' onClick={() => props.changeScreen()} >
                            <PlusOutlined />
                            <p>Create new view</p>
                        </div><br />
                        <h3 className="recent">Recently created views</h3>
                        <Divider />
                        <div>
                            <div className="tile">
                                {viewList.length > 0 ? viewList.map((i,index) => (
                                    index < 8 &&
                                    <StatusBlock id={i.view} status={i.view_status} />
                                )) : <></>}
                            </div>

                        </div>
                    </Card>


                </div>
            </div>
        </div>
    )
}
