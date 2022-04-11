import React, { useEffect, useState } from 'react';
import './styles.scss';
//antd imports
import { Row, Col, Divider } from 'antd';
//components
import InputField from '../../../../../../components/InputField/InputField';
import ScatterChart from './scatterChart/ScatterChart';


//main component
const Chart = ({ postChartData, setPostChartData }) => {

    const [chartValues, setChartValues] = useState({ chartName: '', chartdesc: '', chartId: '', chartVersion: '', chartStatus: '' })

    const handleChange = (e, value) => {
        const newArr = [...postChartData.data];
        newArr.forEach((ele) => {
            if (value === 'name') {
                ele.chart_name = e.target.value;
                setChartValues({ ...chartValues, chartName: e.target.value })
            }
            if (value === 'desc') {
                ele.chart_description = e.target.value;
                setChartValues({ ...chartValues, chartdesc: e.target.value })
            }
        })
        setPostChartData({ ...postChartData, data: newArr })
    }

    useEffect(() => {
        postChartData && postChartData.data && postChartData.data.forEach((ele) => {
            if (ele.chart_id) {
                setChartValues({ ...chartValues, chartId: ele.chart_id, chartVersion: ele.chart_version, chartStatus: ele.chart_status, chartName: ele.chart_name, chartdesc: ele.chart_description });
            }
        })
    }, [postChartData])

    return (
        <div className='chart-container'>
            <Row>
                <Col span={24} className='header'>
                    <h3>Chart</h3>
                </Col>
            </Row>
            <Row gutter={24} className='details-container'>
                <Col span={6}>
                    <Row gutter={16}>
                        <Col span={8}>
                            <p>Chart ID</p>
                        </Col>
                        <Col span={10}>
                            <p>: {chartValues.chartId ? chartValues.chartId : 'Unassigned'}</p>
                        </Col>
                        <Col span={6} />
                    </Row>
                    <Row gutter={16}>
                        <Col span={8}>
                            <p>Version</p>
                        </Col>
                        <Col span={8}>
                            <p>: {chartValues.chartVersion ? chartValues.chartVersion : ''}</p>
                        </Col>
                        <Col span={6} />
                    </Row>
                    <Row gutter={16}>
                        <Col span={8}>
                            <p>Status</p>
                        </Col>
                        <Col span={8}>
                            <p>: {chartValues.chartStatus ? chartValues.chartStatus : ''}</p>
                        </Col>
                        <Col span={6} />
                    </Row>
                </Col>
                <Col span={6}>
                    <label>Chart Name</label>
                    <InputField placeholder="Enter name" value={chartValues.chartName} onChangeInput={(e) => handleChange(e, 'name')} />
                </Col>
                <Col span={10}>
                    <label>Chart description</label>
                    <InputField placeholder="Enter description" value={chartValues.chartdesc} onChangeInput={(e) => handleChange(e, 'desc')} />
                </Col>
            </Row>
            <Divider />
            <ScatterChart postChartData={postChartData} setPostChartData={setPostChartData} />
        </div>
    )
}

export default Chart