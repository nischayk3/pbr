import React, { useState, useEffect } from 'react';
import { Table, Popconfirm, Tag } from 'antd';
import { DeleteOutlined, DeleteTwoTone } from '@ant-design/icons';
import { getJob, putJob, deleteJob } from '../../../services/jobScheduleService';
import moment from 'moment';
import { dispatch } from 'd3';
import { showNotification } from '../../../duck/actions/commonActions';

let login_response = JSON.parse(localStorage.getItem('login_details'));

const request_headers = {
    'content-type': 'application/json',
    'x-access-token': login_response.token ? login_response.token : '',
    'resource-name': 'JOB',
};

export default function scheduledAlertsTable(props) {

    const [data, setData] = useState([])

    useEffect(() => {
        getJobs()
    }, []
    );

    const getJobs = () => {
        let req = { app_type: props.app_type };
        getJob(req,request_headers).then((res) => {
            setData(res['Data']);
            if (res.Status == 401) {
                dispatch(showNotification('error', 'Session TimeOut Login again'))
            }
        });
    };

    const DeleteJob = async (jobId) => {
        let req = {
            job_id: jobId
        }

        let delete_response = await deleteJob(req,request_headers)
        if (delete_response.Status == 200) {
            dispatch(showNotification('success', `${jobId} deleted successfully`))
        }
    }

    const columns = [
        {
            title: 'Action',
            key: 'action',
            dataIndex: 'action',
            render: (text) =>
            (
                <Popconfirm onConfirm={() => DeleteJob(text)}>
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
