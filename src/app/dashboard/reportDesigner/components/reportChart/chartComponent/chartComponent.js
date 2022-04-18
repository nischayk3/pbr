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


const { TabPane } = Tabs;

const chartComponent = (props) => {

    const [workspaceChartData, setWorkSpaceChartData] = useState([]);
    const [workspaceChartLayout, setWorkSpaceChartLayout] = useState([]);
    const [workspaceChartLayoutXAxis, setWorkSpaceChartLayoutXAxis] = useState([]);
    const [workspaceChartLayoutYAxis, setWorkSpaceChartLayoutYAxis] = useState([]);
    const [dataTable, setDataTable] = useState([]);
    const [dataTableColumns, setDataTableColumns] = useState([])
    const [violation, setViolation] = useState([]);
    const [violationColumns, setViolationColumns] = useState([])
    const [exclusion, setExclusion] = useState([]);
    const [exclusionColumns, setExclusionColumns] = useState([])

    const dispatch = useDispatch();
    useEffect(() => {
        if (props.activeTab == props.current_tab) {
            getChartData();
        }
    }, [props.activeTab])

    const getColumns = (arr) => {

        let len_arr = arr.length
        if (len_arr > 0) {
            let s = arr[0]
            s = Object.keys(s)
            let res_arr = []
            s.map((i) => {
                let res = {
                    title: i,
                    dataIndex: i,
                    key: i,
                }
                res_arr.push(res)
            })

            return res_arr
        }
        else {
            return []
        }


    }

    const getChartData = async () => {
        let chart_id = props.chartName.split('-')
        let req = { chartId: chart_id[0] }
        let login_response = JSON.parse(localStorage.getItem('login_details'));

        const headers = {

            'content-type': 'application/json',
            'x-access-token': login_response.token ? login_response.token : '',
            'resource-name': 'REPORT_DESIGNER',
        };
        try {
            dispatch(showLoader());
            const chartResponse = await getChartPlotData(req, headers);
            if (chartResponse.data[0]) {
                setWorkSpaceChartData(chartResponse.data[0].data[0]);
                setWorkSpaceChartLayout(chartResponse.data[0].layout)
                setWorkSpaceChartLayoutXAxis(chartResponse.data[0].layout.xaxis)
                setWorkSpaceChartLayoutYAxis(chartResponse.data[0].layout.yaxis)
                // if (chartResponse.data[0].violation.length > 0)
                // {
                // setViolation(chartResponse.data[0].violation)
                // setViolationColumns(getColumns(chartResponse.data[0].violation))
                // }
                // if (chartResponse.data[0].exclusion.length > 0)
                // {
                // setExclusion(chartResponse.data[0].exclusion)
                // setExclusionColumns(getColumns(chartResponse.data[0].exclusion))
                // }
            }
            if (chartResponse.extras.data_table) {
                setDataTable(chartResponse.extras.data_table)
                setDataTableColumns(getColumns(chartResponse.extras.data_table))
            }
            dispatch(hideLoader());
        } catch (error) {
            dispatch(hideLoader());
            dispatch(showNotification('error', 'No Data In Chart'));
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

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridGap: '10px' }}>
            <div >
                <Plot
                    data={[workspaceChartData]}
                    layout={layout}
                />
            </div>
            <div>
                <Tabs>
                    <TabPane tab="Exclusion" key="Exclusion"><Table columns={exclusionColumns} dataSource={exclusion} size="small" pagination={{ pageSize: 5 }}  bordered={false}/></TabPane>
                    <TabPane tab="Violation" key="Violation"><Table columns={violationColumns} dataSource={violation} size="small" pagination={{ pageSize: 5 }}  bordered={false}/></TabPane>
                    <TabPane tab="Data Table" key="Data Table"><Table columns={dataTableColumns} dataSource={dataTable} size="small" pagination={{ pageSize: 5 }}  bordered={false}/></TabPane>
                </Tabs>
            </div>
        </div>


    )
}

export default chartComponent;