/**
 * @author Mihir Bagga <mihir.bagga@mareana.com>
 * @Mareana - CPV Product
 * @version 1
 * @Last Modified - 22 April, 2022
 * @Last Changed By - @Mihir 
 */

import React, { useState, useEffect } from 'react';
import { Table, Popconfirm, Tag } from 'antd';
import { DeleteOutlined, DeleteTwoTone } from '@ant-design/icons';
import { getJob, putJob, deleteJob } from '../../../services/jobScheduleService';
import moment from 'moment';
import { dispatch } from 'd3';
import { showNotification } from '../../../duck/actions/commonActions';

// 

export default function scheduledAlertsTable(props) {

    const [data, setData] = useState([])

    useEffect(() => {
        getJobs()
    }, []
    );

    const getJobs = () => {
        let login_response = JSON.parse(localStorage.getItem('login_details'));

        let request_headers = {
            'content-type': 'application/json',
            'x-access-token': login_response.token ? login_response.token : '',
            'resource-name': 'DASHBOARD',
        };
        let req = { app_type: props.app_type };
        getJob(req, request_headers).then((res) => {
            setData(res['Data']);
            if (res.Status == 401) {
                dispatch(showNotification('error', 'Session TimeOut Login again'))
            }
        });
    };

    const DeleteJob = async (jobId) => {
        console.log(jobId.job_id)
        let req = {
            job_id: jobId.job_id
        }
        let login_response = JSON.parse(localStorage.getItem('login_details'));

        let request_headers = {
            'content-type': 'application/json',
            'x-access-token': login_response.token ? login_response.token : '',
            'resource-name': 'DASHBOARD',
        };

        let delete_response = await deleteJob(req, request_headers)
        if (delete_response.Status == 200) {
            dispatch(showNotification('success', `${jobId} deleted successfully`))
            getJobs()
        }
        else
        {
            dispatch(showNotification('error', `${jobId} not deleted`))
 
        }
    }

    const columns = [
        {
            title: 'Action',
            key: 'action',
            dataIndex: 'action',
            render: (text,record) =>
            (
                <Popconfirm onConfirm={() => DeleteJob(record)}>
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
