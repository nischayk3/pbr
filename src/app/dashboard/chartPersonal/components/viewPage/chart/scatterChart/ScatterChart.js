import React, { useEffect, useState } from 'react';
import './ScatterStyles.scss';
//antd imports
import { Row, Col, Button, message } from 'antd';
//components
import SelectField from '../../../../../../../components/SelectField/SelectField';
import ScatterPlot from '../../../../../../../components/ScatterPlot/ScatterPlot';
//mockdata
import chartType from '../../chartType.json'
//services
import { postChartPlotData } from '../../../../../../../services/chartPersonalizationService';
//redux
import { useDispatch } from 'react-redux';
import { showLoader, hideLoader, showNotification } from '../../../../../../../duck/actions/commonActions';

const ScatterChart = ({ xaxisList, yaxisList, postChartData, setPostChartData }) => {

    const dispatch = useDispatch();
    const chartTypeList = chartType.map((item) => item.chart_type);
    const [axisValues, setAxisValues] = useState({ xaxis: '', yaxis: '', chartType });
    const [chartData, setChartData] = useState({});
    const [layoutData, setLayoutData] = useState({});
    const [showChart, setShowChart] = useState(false);

    const onApply = async () => {
        if (axisValues.xaxis === axisValues.yaxis) {
            message.error('X and Y axis cannot be same');

            return;
        }
        let xAxis = {};
        let yAxis = {};
        let chartType = '';
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
        if (axisValues.chartType) {
            if (axisValues.chartType === 'Scatter Plot') {
                chartType = 'scatter';
            }
        }
        newArr.forEach((ele) => {
            ele.chart_type = chartType;
            ele.chart_mapping.x = xAxis;
            ele.chart_mapping.y = yAxis;
            ele.layout.xaxis.title.text = xAxis.function_name;
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
    useEffect(() => {
        const newCovArr = JSON.parse(JSON.stringify(postChartData));
        newCovArr.data.forEach((ele) => {
            setChartData(ele.data);
            setLayoutData(ele.layout);
        })
    }, [postChartData])

    return (
        <div className='chartLayout-container'>
            <Row gutter={24}>
                <Col span={6}>
                    <label>Chart Type</label>
                    <SelectField placeholder="Select Chart type" selectList={chartTypeList} value={axisValues.chartType} onChangeSelect={(e) => setAxisValues({ ...axisValues, chartType: e })} />
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