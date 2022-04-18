import React, { useState, useEffect } from 'react';
import { Table, Popconfirm, Tag } from 'antd';
import { DeleteOutlined, DeleteTwoTone } from '@ant-design/icons';
import { getJob, putJob } from '../../../services/jobScheduleService';
import moment from 'moment';
import { dispatch } from 'd3';
import { showNotification } from '../../../duck/actions/commonActions';

export default function scheduledAlertsTable(props) {

    const [data, setData] = useState([])

    useEffect(() => {
        getJobs()
    }, []
    );

    const getJobs = () => {
        let req = { app_type: props.app_type };
        getJob(req).then((res) => {
            setData(res['Data']);
            if (res.Status == 401) {
                dispatch(showNotification('error', 'Session TimeOut Login again'))
            }
        });
    };

    const columns = [
        {
            title: 'Action',
            key: 'action',
            dataIndex: 'action',
            render: (text) =>
            (
                <Popconfirm>
                    <DeleteTwoTone twoToneColor="red" />
                </Popconfirm>
            )
        },
        {
            title: 'Job ID',
            key: 'job_id',
            dataIndex: 'job_id',
            render: (text) =>
            (
                <u><a>{text}</a></u>
            )
        },
        {
            title: 'Job Name',
            key: 'dag_id',
            dataIndex: 'dag_id',
        },
        {
            title: 'Job Description',
            key: 'frequency_unit',
            dataIndex: 'frequency_unit',
        },
        {
            title: 'Schedule',
            key: 'created_on',
            dataIndex: 'created_on',
            render: (text) => (moment(text).format(" MMMM DD, YYYY")),

        },
        {
            title: 'Status',
            key: 'job_status',
            dataIndex: 'job_status',
            render: (text) =>
            (text == 'scheduled' ?
                (<Tag className="tag-sch"><p className="tag-text">Scheduled</p></Tag>) : (<Tag className="tag-new"><p className="tag-text-new">New</p></Tag>)
            )
        },
    ]
    return (
        <Table
            bordered={false}
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 5 }}
        />
    )
}
