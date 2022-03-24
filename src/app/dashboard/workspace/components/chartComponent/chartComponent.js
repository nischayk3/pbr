import React, { useEffect, useState } from 'react';
import { Alert } from 'antd';
import { useDispatch } from 'react-redux';
import Plot from 'react-plotly.js';
import { getChartPlotData } from '../../../../../services/workSpaceServices';
import {
    hideLoader,
    showLoader,
    showNotification,
} from '../../../../../duck/actions/commonActions';
import './styles.scss';
import 'antd/dist/antd.css';

const chartComponent = (props) => {
    const [workspaceChartData, setWorkSpaceChartData] = useState([]);
    const [workspaceChartLayout, setWorkSpaceChartLayout] = useState([]);
    const [workspaceChartLayoutXAxis, setWorkSpaceChartLayoutXAxis] = useState([]);
    const [workspaceChartLayoutYAxis, setWorkSpaceChartLayoutYAxis] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        if (props.activeTab == props.current_tab) {
            getChartData();
        }
    }, [props.activeTab])

    const getChartData = async () => {
        let req = { chartId: props.chartId }
        try {
            dispatch(showLoader());
            const chartResponse = await getChartPlotData(req);
            setWorkSpaceChartData(chartResponse.data.data);
            setWorkSpaceChartLayout(chartResponse.data.layout)
            setWorkSpaceChartLayoutXAxis(chartResponse.data.layout.xaxis)
            setWorkSpaceChartLayoutYAxis(chartResponse.data.layout.yaxis)
            dispatch(hideLoader());
        } catch (error) {
            dispatch(hideLoader());
            dispatch(showNotification('error', error.Message));
        }
    }
    const data = [
        {
            // x: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
            // y: [52.4945, 52.4945, 52.4945, 52.4945, 52.283, 52.283, 52.283, 52.283, 52.283, 52.283, 52.283, 52.283, 52.283, 52.283, 52.283, 52.283, 52.283],
            // text: ["ABL2258", "ABL2259", "ABL2261", "ABL2264", "ABV4295", "ABV4296", "ABV4297", "ABV4298", "ABV4299", "ABY0079", "ABY0080", "ABY0081", "ABY0082", "ABY0083",
            //     "ABY0084", "ABY0086", "ABY0088"],
            // type: 'scatter',
            // mode: 'markers',
            mode: "markers",
            text: ['ABL2258', 'ABL2259', 'ABL2261', 'ABL2264', 'ABV4295', 'ABV4296', 'ABV4297', 'ABV4298', 'ABV4299', 'ABY0079', 'ABY0080', 'ABY0081', 'ABY0082', 'ABY0083', 'ABY0084', 'ABY0086', 'ABY0088'],
            type: "scatter",
            x: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
            y: [52.4945, 52.4945, 52.4945, 52.4945, 52.283, 52.283, 52.283, 52.283, 52.283, 52.283, 52.283, 52.283, 52.283, 52.283, 52.283, 52.283, 52.283]

        }
    ]
    const layout = {
        xaxis: workspaceChartLayoutXAxis,
        yaxis: workspaceChartLayoutYAxis,
        autosize: false,
        width: 800,
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
        <div className='workspace-plot'>
            <Plot
                data={[workspaceChartData]}
                layout={layout}
            />
            <Alert
                style={{marginTop:'-10px'}}
                message="Alert"
                description={`The voilation of [action] has triggered an alert for Chart ID ${props.chartId}`}
                type="warning"
                showIcon
            />
        </div>
    )
}

export default chartComponent;