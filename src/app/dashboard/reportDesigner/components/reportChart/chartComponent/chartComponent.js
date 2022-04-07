import React, { useEffect, useState } from 'react';
import { Tabs, Table } from 'antd'
import { useDispatch } from 'react-redux';
import Plot from 'react-plotly.js';
import { getChartPlotData } from '../../../../../../services/workSpaceServices';
import {
    hideLoader,
    showLoader,
    showNotification,
} from '../../../../../../duck/actions/commonActions';
import './styles.scss';
import 'antd/dist/antd.css';

const { TabPane } = Tabs;

const exclusionColumns = [
    {
        title: 'ARSENIC',
        dataIndex: 'ARSENIC',
        key: 'ARSENIC',
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
        title: 'batch_num',
        dataIndex: 'batch_num',
        key: 'batch_num',
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
        title: 'new function',
        dataIndex: 'new function',
        key: 'new function',
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
        title: 'new function1',
        dataIndex: 'new function1',
        key: 'new function1',
        render: (text, record) => {
            return {
                props: {
                    style: { background: record.color },
                },
                children: <div>{text}</div>,
            };
        },
    },
];

const chartComponent = (props) => {

    const [workspaceChartData, setWorkSpaceChartData] = useState([]);
    const [workspaceChartLayout, setWorkSpaceChartLayout] = useState([]);
    const [workspaceChartLayoutXAxis, setWorkSpaceChartLayoutXAxis] = useState([]);
    const [workspaceChartLayoutYAxis, setWorkSpaceChartLayoutYAxis] = useState([]);
    const [dataTable, setDataTable] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        if (props.activeTab == props.current_tab) {
            getChartData();
        }
    }, [props.activeTab])

    const getChartData = async () => {
        let req = { chartId: 'C189' }
        try {
            dispatch(showLoader());
            const chartResponse = await getChartPlotData(req);
            setWorkSpaceChartData(chartResponse.data[0].data[0]);
            setWorkSpaceChartLayout(chartResponse.data[0].layout)
            setWorkSpaceChartLayoutXAxis(chartResponse.data[0].layout.xaxis)
            setWorkSpaceChartLayoutYAxis(chartResponse.data[0].layout.yaxis)
            setDataTable(chartResponse.extras.data_table)
            dispatch(hideLoader());
        } catch (error) {
            dispatch(hideLoader());
            dispatch(showNotification('error', error.Message));
        }
    }
    const layout = {
        xaxis: workspaceChartLayoutXAxis,
        yaxis: workspaceChartLayoutYAxis,
        autosize: false,
        width: 500,
        height: 310,
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

        <div className="chartTable">
            <div >
                <Plot
                    data={[workspaceChartData]}
                    layout={layout}
                />
            </div>
            <div>
                <Tabs>
                    <TabPane tab="Exclusion" key="Exclusion"><Table columns={props.columns1} dataSource={props.data1} /></TabPane>
                    <TabPane tab="Violation" key="Violation"><Table columns={props.columns2} dataSource={props.data2} /></TabPane>
                    <TabPane tab="Data Table" key="Data Table"><Table columns={exclusionColumns} dataSource={dataTable} size="small" pagination={{ pageSize: 5 }} /></TabPane>

                </Tabs>
            </div>
        </div>


    )
}

export default chartComponent;