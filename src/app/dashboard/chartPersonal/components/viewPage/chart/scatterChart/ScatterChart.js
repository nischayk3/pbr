import React, { useEffect, useState } from 'react';
import './ScatterStyles.scss';
//antd imports
import { Row, Col, Button, message } from 'antd';
//components
import SelectField from '../../../../../../../components/SelectField/SelectField';
import ScatterPlot from '../../../../../../../components/ScatterPlot/ScatterPlot';
//services
import { postChartPlotData } from '../../../../../../../services/chartPersonalizationService';
//redux
import { useDispatch } from 'react-redux';
import { showLoader, hideLoader, showNotification } from '../../../../../../../duck/actions/commonActions';

const ScatterChart = ({ postChartData, setPostChartData }) => {

    const dispatch = useDispatch();
    const chartTypeList = ['Scatter Plot', 'Process Control', 'Levey-Jennings Plot', 'I-MR Plot', 'Trend Control', 'KDE Control', 'Box Control'];
    const [axisValues, setAxisValues] = useState({ xaxis: '', yaxis: '', chartType: '' });
    const [chartData, setChartData] = useState({});
    const [layoutData, setLayoutData] = useState({});
    const [showChart, setShowChart] = useState(false);
    const [xaxisList, setXAxisList] = useState([]);
    const [yaxisList, setYAxisList] = useState([]);


    const onApply = async () => {
        if (axisValues.xaxis === axisValues.yaxis) {
            message.error('X and Y axis cannot be same');

            return;
        }
        let xAxis = {};
        let yAxis = {};
        const newCovArr = JSON.parse(JSON.stringify(postChartData));
        newCovArr.extras.coverage.forEach((ele) => {
            if (ele.function_name === axisValues.xaxis) {
                xAxis.function_name = ele.function_name;
                xAxis.function_id = ele.function_id;
            }
            if (ele.function_name === axisValues.yaxis) {
                yAxis.function_name = ele.function_name;
                yAxis.function_id = ele.function_id;
            }
        })
        const newArr = [...postChartData.data]
        const obj = {
            function_name: axisValues.xaxis === 'Batch' ? 'batch_num' : 'recorded_date',
            function_id: null
        }
        newArr.forEach((ele) => {
            if (ele.chart_type === 'process control') {
                ele.data.mode = 'markers+lines';
            }
            ele.chart_mapping.x = Object.keys(xAxis).length !== 0 ? xAxis : obj;
            ele.chart_mapping.y = yAxis;
            ele.layout.xaxis.title.text = Object.keys(xAxis).length !== 0 ? xAxis.function_name : obj.function_name === 'batch_num' ? 'Batch' : 'Recorded Date';
            ele.layout.yaxis.title.text = yAxis.function_name;
        })
        setPostChartData({ ...postChartData, data: newArr })
        try {
            dispatch(showLoader());
            const viewRes = await postChartPlotData(postChartData);
            let newdataArr = [...postChartData.data];
            newdataArr.forEach((ele) => {
                ele['data'] = viewRes.data;
            })
            setPostChartData({ ...postChartData, data: newdataArr })
            setShowChart(true);
            dispatch(hideLoader());
        } catch (error) {
            dispatch(hideLoader());
            dispatch(showNotification('error', error.message));
        }
    }
    const handleChartType = (e) => {
        let chartType = e;
        if (e === 'Scatter Plot') {
            chartType = 'scatter';
        }
        if (e === 'Process Control') {
            chartType = 'process control';
        }
        setAxisValues({ ...axisValues, chartType: chartType });
        if (axisValues.chartType !== chartType) {
            setAxisValues({ xaxis: '', yaxis: '', chartType: chartType });
        }
        const newArr = [...postChartData.data]
        newArr.forEach((ele) => {
            ele.chart_type = chartType;
        })
        setPostChartData({ ...postChartData, data: newArr });
    }
    useEffect(() => {
        const newCovArr = JSON.parse(JSON.stringify(postChartData));
        let obj = {
            "line": {
                "color": "black"
            },
            "mode": "lines",
            "showlegend": false,
            "type": "scatter",
            "x": [],
            "y": []
        }
        newCovArr.data.forEach((ele) => {
            if (ele.chart_type === 'process control') {
                const meanValue = ele.data.y ? ele.data.y.reduce((a, b) => a + b, 0) / ele.data.y.length : '';
                obj.x = ele.data.x ? ele.data.x : [];
                obj.x.length >= 1 && obj.x.forEach(() => {
                    obj.y.push(meanValue);
                })
            }
            setChartData([ele.data, obj]);
            setLayoutData(ele.layout);
        })
        let list = [];
        postChartData.extras && postChartData.extras.coverage && postChartData.extras.coverage.forEach((ele) => {
            list.push(ele.function_name);
            if (axisValues.chartType === 'scatter') {
                setXAxisList(list);
                setYAxisList(list);
            } else {
                const tempList = ['Batch', 'Date']
                setXAxisList(tempList);
                setYAxisList(list);
            }
        })
    }, [postChartData])


    return (
        <div className='chartLayout-container'>
            <Row gutter={24}>
                <Col span={6}>
                    <label>Chart Type</label>
                    <SelectField placeholder="Select Chart type" selectList={chartTypeList} value={axisValues.chartType} onChangeSelect={handleChartType} />
                </Col>
                <Col span={6}>
                    <label>X-axis</label>
                    <SelectField placeholder="Select X-axis" selectList={xaxisList} value={axisValues.xaxis} onChangeSelect={(e) => setAxisValues({ ...axisValues, xaxis: e })} />
                </Col>
                <Col span={6}>
                    <label>Y-axis</label>
                    <SelectField placeholder="Select Y-axis" selectList={yaxisList} value={axisValues.yaxis} onChangeSelect={(e) => setAxisValues({ ...axisValues, yaxis: e })} />
                </Col>
                <Col span={6} style={{ marginTop: '22px' }}>
                    <Button className='custom-primary-btn' onClick={onApply} disabled={!axisValues.chartType || !axisValues.xaxis || !axisValues.yaxis} >Apply</Button>
                </Col>
            </Row>
            <Row className='scatter-chart'>
                {showChart && <ScatterPlot
                    data={chartData}
                    layout={layoutData}
                // nodeClicked={chartNodeClicked}
                />}
            </Row>
        </div>
    )
}

export default ScatterChart